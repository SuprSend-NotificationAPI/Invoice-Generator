import React, { useState } from 'react';

export default function Amazon(props) {
  const [formdata, setFormdata] = useState({
    tenant:'',
    nickname: '',
    fromEmail: '',
    fromName: '',
    ReplyMail: '',
    AWSRegion: '',
    accessKeyId: '',
    secretAccessKey: '',
    configurationSet: '',
    SNSTopicARN: '',
    SuprSendSQS: '',
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
          "vendor_slug": "amazon_ses-email",
          "vendor_config": {
            "send_using": "api",
            "ses_api_auth": {
                "access_key_id": formdata.accessKeyId,
                "secret_access_key": formdata.secretAccessKey,
                "aws_region": formdata.AWSRegion,
              },
            "from_name": formdata.fromName,
            "from_address": formdata.from_address,
            "reply_address": formdata.reply_address,
            "configuration_set": formdata.configurationSet,
            "sns_topic_arn": formdata. SNSTopicARN
            }
          }
      )
    })
    const json = await response.json();
    props.showAlert("AmazonSES vendor added to your Tenant succesfully","success");
  };

  return (
    <div className='container'>
      <h1 className='text-center'>Amazon Configuration</h1>
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
          <label htmlFor='AWSRegion'>AWS Region</label>
          <input
            type='text'
            id='AWSRegion'
            name='AWSRegion'
            className='form-control'
            value={formdata.AWSRegion}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='accessKeyId'>Access Key ID</label>
          <input
            type='text'
            id='accessKeyId'
            name='accessKeyId'
            className='form-control'
            value={formdata.accessKeyId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='secretAccessKey'>Secret Access Key</label>
          <input
            type='text'
            id='secretAccessKey'
            name='secretAccessKey'
            className='form-control'
            value={formdata.secretAccessKey}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='configurationSet'>Configuration Set</label>
          <input
            type='text'
            id='configurationSet'
            name='configurationSet'
            className='form-control'
            value={formdata.configurationSet}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='SNSTopicARN'>SNS Topic ARN</label>
          <input
            type='text'
            id='SNSTopicARN'
            name='SNSTopicARN'
            className='form-control'
            value={formdata.SNSTopicARN}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='SuprSendSQS'>SuprSend SQS</label>
          <input
            type='text'
            id='SuprSendSQS'
            name='SuprSendSQS'
            className='form-control'
            value={formdata.SuprSendSQS}
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
