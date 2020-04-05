import fetch from 'isomorphic-unfetch';
import { useState } from 'react';

const HOST = process.env.HOST
const API_URL = process.env.API_URL

function Index({ hero }) {
  const { heading, subheading } = hero;
  
  return (
    <section className=''>
      <header className='flex justify-end bg-blue-400 py-8 px-12'>
        <ul>
          <li className='inline-block mr-3'><a href="#get-help">Get Help</a></li>
          <li className='inline-block'><a href="#volunteer">Volunteer</a></li>
          <li className='inline-block'><a href="#how-it-works">How it works</a></li>
        </ul>
      </header>

      <section className='flex flex-col items-center p-16 md:p-20 md:my-32'>
        <h1 className='text-3xl md:text-6xl'>{ heading }</h1>
        <p>{ subheading }</p>
      </section>

      <section className='flex flex-col items-center p-16 md:p-20 md:my-32'>
        <h1 id='how-it-works' className='text-3xl md:text-6xl'>How it works</h1>
        <p>Werk it</p>
      </section>
      
      <RequestForm />
      
      <VolunteerForm />
      
      <footer className='flex justify-end bg-blue-400 py-20 px-32'>
        <ul>
          <li className=''><a href="#get-help">Legal</a></li>
          <li className=''><a href="#volunteer">Contact</a></li>
        </ul>
      </footer>
    </section>
  );
}

function RequestForm() {
  const [formInputs, setFormInputs] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    requestDetails: '',
  });

  function handleOnChange(e) {
    const { value, name } = e.target;

    setFormInputs({
      ...formInputs,
      [name]: value,
    })
  }
  
  async function hanldeOnSubmit(e) {
    e.preventDefault();
    const response = await fetch(`${HOST}${API_URL}/requests/create`, {
      method: 'POST',
      body: JSON.stringify(formInputs),
    })

    const { status } = await response;
    console.log(status);
  };
  
  return (
    <section className='flex flex-col items-center p-16 my-10 md:p-20 md:my-32'>
      <section  className='flex flex-col items-center mb-8'>
        <h1 id='get-help' className='text-6xl'>Need Help?</h1>
        <p>Fill out the form and get notified when a volunteer nearby accepts your request</p>
      </section>
      <section>
        <form className='' onSubmit={hanldeOnSubmit}>
          <label className='' htmlFor="name">Name</label>
          <input className='' onChange={handleOnChange} id='name' name='name' type="text"/>

          <label className='' htmlFor="phone-number">Phone Number</label>
          <input className='' onChange={handleOnChange} id='phone-number' name='phoneNumber' type="text"/>
          
          <label className='' htmlFor="email">Email</label>
          <input className='' onChange={handleOnChange} id='email' name='email' type="text"/>
          
          <label className='' htmlFor="request-details">Details of your request</label>
          <textarea className='' onChange={handleOnChange} id="request-details" name="requestDetails"></textarea>
          <br/>
          <button className='bg-blue-500 p-3 rounded'>Submit Request</button>
        </form>
      </section>
    </section>
  )
}

function VolunteerForm() {
  const [formInputs, setFormInputs] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });

  function handleOnChange(e) {
    const { value, name } = e.target;

    setFormInputs({
      ...formInputs,
      [name]: value,
    })
  }
  
  async function hanldeOnSubmit(e) {
    e.preventDefault();
    const response = await fetch(`${HOST}${API_URL}/volunteers/create`, {
      method: 'POST',
      body: JSON.stringify(formInputs),
    })

    const { status } = await response;
    console.log(status);
  }
  
  return (
    <section className='flex flex-col items-center p-16 my-32 md:p-20 md:my-32'>
      <h1 id='volunteer' className='text-6xl'>Volunteer</h1>
      <p>Sign up to volunteer</p>
      <section>
        <form className='' onSubmit={hanldeOnSubmit}>
          <label className='' htmlFor="name">Name</label>
          <input className='' onChange={handleOnChange} id='name' name='name' type="text"/>

          <label className='' htmlFor="phone-number">Phone Number</label>
          <input className='' onChange={handleOnChange} id='phone-number' name='phoneNumber' type="text"/>
          
          <label className='' htmlFor="email">Email</label>
          <input className='' onChange={handleOnChange} id='email' name='email' type="text"/>
          
          <label className='' htmlFor="address">Address</label>
          <input className='' onChange={handleOnChange} id='address' name='address' type="text"/>

          <br/>
          <button className='bg-blue-500 p-3 rounded'>Submit Request</button>
        </form>
      </section>
    </section>
  );
}

Index.getInitialProps = async function() {
  const HOST = process.env.HOST
  const API_URL = process.env.API_URL
  try {
    const response = await fetch(`${HOST}${API_URL}/landingPage`)
    const data = await response.json()
    
    console.log('api response: ', data)

    return data.landing;

  } catch (err) {
    console.error('Error fetching data', err);
  }
}

export default Index