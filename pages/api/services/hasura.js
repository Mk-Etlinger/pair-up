import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import gql from 'graphql-tag';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all'
  },
};

const client = new ApolloClient({
  link: createHttpLink({
    uri: process.env.HASURA_API_URL,
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
      'x-hasura-role': 'admin',
    },
    fetch,
  }),
  defaultOptions: defaultOptions,
  cache: new InMemoryCache()
});

export async function createRequest({ 
  name,
  address,
  phoneNumber,
  email,
  requestDetails,
  latitude,
  longitude, 
}) {
  try {
    const response = await client.mutate({
      mutation: gql`
        mutation {
          insert_requests(
            objects: [
              {
                name: "${name}",
                address: "${address}",
                phoneNumber: "${phoneNumber}",
                email: "${email}",
                requestDetails: "${requestDetails}",
                geolocation: {
                  type: "Point",
                  coordinates: [
                    ${latitude}, 
                    ${longitude}
                  ]
                },
              }
            ]
          ) {
            affected_rows
            returning {
              id
              name
              phoneNumber
              email
              address
              requestDetails
            }
          }
        }
      `
    });

    return response;

  } catch (error) {
    console.error(error);
  }
  
}

export async function createVolunteer({ 
  name,
  address,
  phoneNumber,
  email,
  latitude,
  longitude, 
}) {
  const response = await client.mutate({
    mutation: gql`
      mutation {
        insert_volunteers(
          objects: [
            {
              name: "${name}",
              address: "${address}",
              phoneNumber: "${phoneNumber}",
              email: "${email}",
              geolocation: {
                type: "Point",
                coordinates: [
                  ${latitude}, 
                  ${longitude}
                ]
              },
            }
          ]
        ) {
          affected_rows
          returning {
            id
            name
            phoneNumber
            email
            address
          }
        }
      }
    `
  })
  return response;
}

export async function getVolunteersNearRequester({ latitude,longitude, }) {

  try {
    const response = await client.query({
      query: gql`
        query {
          get_volunteers_near_requester(
            args: {
              distance: 1000,
              requestgeolocation: {
                type: "Point",
                coordinates: [
                  ${latitude}, 
                  ${longitude}
                ]
              }
            }
          ){
            id
            name
            phone_number
            email
            distance_from_requester
          }
        }
      `
    });

    return response;

  } catch (error) {
    console.error(error);
  }
  
}
