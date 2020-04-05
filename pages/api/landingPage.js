// import prismic from '../../../services/prismic'
// import gql from 'graphql-tag'

export default async (req, res, router) => {
  // const lang = (req.query.lang ? req.query.lang : 'en-us').toLowerCase()
  // console.log('Fetching language', lang, 'from Prismic.');
  try {

    // if (!response.data?.allLanding_pages?.edges[0]?.node) {
    //   throw new Error('Landing Page data response is empty, please try again')
    // }
    
    const content = {
      landing: {
        hero: {
          heading: 'Community Connect',
          subheading: 'An app to easily connect with your neighbors during a time of need',
        }
      }
    }
    
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(content))
  } catch (error) {
    console.error(error);
    return error
  }
};
