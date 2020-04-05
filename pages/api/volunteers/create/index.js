import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
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
}

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://pair-up-graphql.herokuapp.com/v1/graphql',
    headers: {
      'x-hasura-admin-secret': 'oP#kJ2rUShV%Jw!zUQSjO!30f9UsKS&!RYztv*g',
      'x-hasura-role': 'admin',
    },
  }),
  defaultOptions: defaultOptions,
  cache: new InMemoryCache()
})

export default async (req, res ) => {
  const { name, address, phoneNumber, email } = JSON.parse(req.body);
  
  try {
    const response = await client.mutate({
      mutation: gql`
      mutation {
        insert_volunteers(objects: [
          {
            name: "${name}",
            address: "${address}",
            phoneNumber: "${phoneNumber}",
            email: "${email}",
            geolocation: "(40.688617,-73.977499)",
          }
        ]) {
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
    if (response.errors) { 
      throw new Error('Error inserting into database: ' + JSON.stringify(response.errors)) 
    }

    console.log(response);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end();
  }
  catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: error.message }));
  }
};
