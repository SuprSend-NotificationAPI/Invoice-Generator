import React from 'react';
import { Link } from 'react-router-dom';


export default function Vendor() {
  const host = process.env.REACT_APP_PORT;
  const api = process.env.REACT_APP_API;

  return (
    <div className='container'>
      <h1 className='text-center'>Choose your provider</h1>
      <div className='text-center'>
        <Link to='/amazon' className='btn btn-secondary provider-link my-4 amazon' style={{width:"160px",height:"60px"}}>Amazon SES</Link>
        <br></br>
        <Link to='/sendgrid' className='btn btn-secondary provider-link my-4  sendgrid'style={{width:"160px",height:"60px"}}>Sendgrid</Link>
        <br></br>
        <Link to='/mailgun' className='btn btn-secondary provider-link my-4 mailgun'style={{width:"160px",height:"60px"}}>Mailgun</Link>
      </div>
    </div>
  );
}
