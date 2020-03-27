import fetch from 'isomorphic-unfetch';

function Index({ hero }) {
  const { heading, subheading } = hero;
  // console.log(landing);
  
  return (
    <section className=''>
      <header className='flex justify-end bg-blue-400 py-4 px-12'>
        <ul>
          <li className='inline-block mr-3'><a href="#get-help">Get Help</a></li>
          <li className='inline-block'><a href="#volunteer">Volunteer</a></li>
        </ul>
      </header>

      <section className='flex flex-col items-center p-20 my-32'>
        <h1 className='text-6xl'>{ heading }</h1>
        <p>{ subheading }</p>
      </section>
      
      <section className='flex flex-col items-center p-20 my-32'>
        <h1 id='get-help' className='text-6xl'>Need Help?</h1>
        <p>Fill out the form and get notified when a volunteer nearby accepts your request</p>
      </section>

      <section className='flex flex-col items-center p-20 my-32'>
        <h1 id='volunteer' className='text-6xl'>Volunteer</h1>
        <p>Sign up to volunteer</p>
      </section>

      <footer className='flex justify-end bg-blue-400 py-20 px-32'>
        <ul>
          <li className=''><a href="#get-help">Legal</a></li>
          <li className=''><a href="#volunteer">Contact</a></li>
        </ul>
      </footer>
    </section>
  );
}

Index.getInitialProps = async function() {
  const HOST = process.env.HOST
  const API_URL = process.env.API_URL
  try {
    const response = await fetch(`${HOST}${API_URL}/landing-page`)
    const data = await response.json()
    
    console.log('api response: ', data)

    return data.landing;

  } catch (err) {
    console.error('Error fetching data', err);
  }
}

export default Index