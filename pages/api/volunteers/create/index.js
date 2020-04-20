import { getLatLngFromAddress } from '../../services/google';
import { createVolunteer } from '../../services/hasura';

export default async (req, res ) => {
  const { name, address, phoneNumber, email } = JSON.parse(req.body);
  // @TODO: Add validations
  try {
    const { latitude, longitude } = await getLatLngFromAddress(address);

    const response = createVolunteer({
      name,
      address,
      phoneNumber,
      email,
      latitude,
      longitude, 
    });
   
    if (response.errors) { 
      throw new Error('Error inserting into database: ' + JSON.stringify(response.errors)) 
    }

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end();
  }
  catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end();
  }
};
