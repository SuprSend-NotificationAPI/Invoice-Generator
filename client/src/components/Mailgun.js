import React, { useState } from 'react';

export default function Mailgun(props) {
  const [formdata, setFormdata] = useState({
    tenant:'',
    nickname: '',
    privateapikey: '',
    webhooksigningkey: '',
    DomainPrefix: '',
    DataCenterRegion: '',
    FromName: '',
    FromEmail: '',
    ReplyEmail: '',
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
          "vendor_slug": "mailgun-email",
          "vendor_config": {
            "api_key": formdata.privateapikey,
            "webhook_signing_key": formdata.webhooksigningkey,
            "from_name": formdata.FromName,
            "from_address":formdata.FromEmail,
            "reply_address": formdata.ReplyEmail,
            "domain_type": "SANDBOX",  // ("SANDBOX"/"CUSTOM")
            "sandbox_domain": "",  // if domain_type="SANDBOX", otherwise empty
            "domain_prefix": formdata.DomainPrefix,   // if domain_type="CUSTOM" and prefix applicable, otherwise empty
            "domain_region":formdata.DataCenterRegion,  //("eu"/"non_eu")
            }
          }
      )
    })
    const json = await response.json();
    props.showAlert("Mailgun vendor added to your Tenant succesfully","success");
  };

  return (
    <div className='container'>
      <h1 className='text-center'>Mailgun Configuration</h1>
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
          <label htmlFor='privateapikey'>Private API Key</label>
          <input
            type='text'
            id='privateapikey'
            name='privateapikey'
            className='form-control'
            value={formdata.privateapikey}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='webhooksigningkey'>Webhook Signing Key</label>
          <input
            type='text'
            id='webhooksigningkey'
            name='webhooksigningkey'
            className='form-control'
            value={formdata.webhooksigningkey}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='DomainPrefix'>Domain Prefix</label>
          <input
            type='text'
            id='DomainPrefix'
            name='DomainPrefix'
            className='form-control'
            value={formdata.DomainPrefix}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='DataCenterRegion'>Data Center Region</label>
          <input
            type='text'
            id='DataCenterRegion'
            name='DataCenterRegion'
            className='form-control'
            value={formdata.DataCenterRegion}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='FromName'>From Name</label>
          <input
            type='text'
            id='FromName'
            name='FromName'
            className='form-control'
            value={formdata.FromName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='FromEmail'>From Email</label>
          <input
            type='email'
            id='FromEmail'
            name='FromEmail'
            className='form-control'
            value={formdata.FromEmail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='ReplyEmail'>Reply Email</label>
          <input
            type='email'
            id='ReplyEmail'
            name='ReplyEmail'
            className='form-control'
            value={formdata.ReplyEmail}
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
