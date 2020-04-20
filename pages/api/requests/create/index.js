import { getLatLngFromAddress } from '../../services/google';
import { createRequest, getVolunteersNearRequester } from '../../services/hasura';

export default async (req, res ) => {
  const { name, address, phoneNumber, email, requestDetails } = JSON.parse(req.body);
  // @TODO: Add validations
  try {
    const { latitude, longitude } = await getLatLngFromAddress(address);
    
    const volunteerResponse = await getVolunteersNearRequester({
      latitude,
      longitude,
    });

    console.log(volunteerResponse.data);

    const response = await createRequest({
      name,
      address,
      phoneNumber,
      email,
      requestDetails,
      latitude,
      longitude,
    });

    if (response.errors) {
      console.log(response.errors[0].extensions);
      throw new Error(response.errors[0].message);
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
