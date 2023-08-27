import React, { useState } from 'react';

export default function Sendgrid(props) {
  const [formdata, setFormdata] = useState({
    tenant:'',
    nickname: '',
    apikey: '',
    fromName: '',
    fromEmail: '',
    ReplyMail: '',
    price: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const apisuprsend = process.env.REACT_APP_API;
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('Form Data:', formdata);
    const response = await fetch(`https://hub.suprsend.com/v1/tenant/${formdata.tenant}/vendor/`,{
      method : "POST",
      headers:{
        Authorization: `Bearer ${apisuprsend}`,
        'Content-Type':"application/json",
      },
      body : JSON.stringify(
        {
          "nickname": formdata.nickname,
          "root_categories": ["transactional"],
          "cost_per_notif": formdata.price, 
          "cost_currency": "USD",
          "vendor_slug": "sendgrid-email",
          "vendor_config": {
            "api_key": formdata.apikey,
            "from_name": formdata.fromName,
            "from_address": formdata.fromEmail,
            "reply_address": formdata.ReplyMail
            }
          }
      )
    })
    const json = await response.json();
    props.showAlert("Sendgrid vendor added to your Tenant succesfully","success");
  };

  return (
    <div className='container'>
      <h1 className='text-center'>SendGrid Configuration</h1>
      <form onSubmit={handleSubmit}>
      <div className='form-group'>
          <label htmlFor='tenantname'>Select Tenant</label>
          <input
            type='text'
            id='tenantname'
            name='tenant'
            className='form-control'
            value={formdata.tenant}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='nickname'>Nickname</label>
          <input
            type='text'
            id='nickname'
            name='nickname'
            className='form-control'
            value={formdata.nickname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='apikey'>API Key</label>
          <input
            type='text'
            id='apikey'
            name='apikey'
            className='form-control'
            value={formdata.apikey}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='fromName'>From Name</label>
          <input
            type='text'
            id='fromName'
            name='fromName'
            className='form-control'
            value={formdata.fromName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='fromEmail'>From Email</label>
          <input
            type='email'
            id='fromEmail'
            name='fromEmail'
            className='form-control'
            value={formdata.fromEmail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='ReplyMail'>Reply Mail</label>
          <input
            type='email'
            id='ReplyMail'
            name='ReplyMail'
            className='form-control'
            value={formdata.ReplyMail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            id='price'
            name='price'
            step='0.001'
            className='form-control'
            value={formdata.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
}
