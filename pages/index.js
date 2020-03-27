import fetch from 'isomorphic-unfetch';

function Index({ hero }) {
  const { heading, subheading } = hero;
  // console.log(landing);
  
  return (
    <section className=''>
      <header className='flex justify-end bg-blue-400 py-8 px-12'>
        <ul>
          <li className='inline-block mr-3'><a href="#get-help">Get Help</a></li>
          <li className='inline-block'><a href="#volunteer">Volunteer</a></li>
        </ul>
      </header>

      <section className='flex flex-col items-center p-16 md:p-20 md:my-32'>
        <h1 className='text-6xl'>{ heading }</h1>
        <p>{ subheading }</p>
      </section>
      
      <section className='flex flex-col items-center p-16 my-10 md:p-20 md:my-32'>
        <section  className='flex flex-col items-center mb-8'>
          <h1 id='get-help' className='text-6xl'>Need Help?</h1>
          <p>Fill out the form and get notified when a volunteer nearby accepts your request</p>
        </section>
        <section>
          <form className='' action="">
            <label className='' htmlFor="name">Name</label>
            <input className='' id='name' name='name' type="text"/>
            <label className='' htmlFor="phone-number">Phone Number</label>
            <input className='' name='phone-number' type="text"/>
            <label className='' htmlFor="email">Email</label>
            <input className='' name='email' type="text"/>
            <label className='' htmlFor="details">Details of your request</label>
            <textarea className='' id="details" name="details"></textarea>
            <br/>
            <button className='bg-blue-500 p-3 rounded'>Submit Request</button>
          </form>
        </section>
      </section>

      <section className='flex flex-col items-center p-16 my-32 md:p-20 md:my-32'>
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