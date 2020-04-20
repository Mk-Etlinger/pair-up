import {Client} from "@googlemaps/google-maps-services-js";

const apiKey = process.env.GOOGLE_API_KEY;
const googleMapsClient = new Client({});

export async function getLatLngFromAddress( address ) {
  const params = { address, key: apiKey };
  try {
    const response = await googleMapsClient.geocode({params, timeout: 1000});
    const { results } = response.data;
    
    if (!results.length) {
      throw new Error('Error geocoding address to coordinates')
    }

    const { location } = results[0].geometry;

    return {
      latitude: location.lat,
      longitude: location.lng
    }
  } catch (error) {
    console.error(error);
  }
  
}