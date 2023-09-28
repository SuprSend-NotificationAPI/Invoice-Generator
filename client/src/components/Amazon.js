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

  console.log(formdata);
  const handleSubmit = async(event) => {
    event.preventDefault();
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
          "cost_per_notif": 0.001, 
          "cost_currency": "USD",
          "vendor_slug": "amazon_ses-email",
          "vendor_config": {
            "send_using": "api",
            "ses_api_auth": {
                "access_key_id": formdata.accessKeyId,
                "secret_access_key": formdata.secretAccessKey,
                "aws_region": formdata.AWSRegion,
              },
            "from_name": "",
            "from_address": formdata.fromEmail,
            "reply_address": "",
            "configuration_set": formdata.configurationSet,
            "sns_topic_arn": formdata. SNSTopicARN
            }
          }
      )
    })
    const json = await response.json();
    console.log(json);
    if(json.code=="400"){
      props.showAlert(json.message,"danger");
    }
    else{
      const response1 = await fetch(`https://hub.suprsend.com/v1/tenant/${formdata.tenant}/vendor_routing/email/_/transactional/`,{
        method : "POST",
        headers:{
          Authorization: `Bearer ${apisuprsend}`,
          'Content-Type':"application/json",
        },
        body : JSON.stringify(
          {
            "routes": [
              {
                "fallbacks": [
                  {
                    "tenant_vendor_id": json.id 
                  }
                  ]
              }
              ]
            }
        )
      })
      const json1 = await response1.json();
      const response2 = await fetch(`https://hub.suprsend.com/v1/tenant/${formdata.tenant}/vendor_routing/email/_/transactional/override/`,{
        method : "POST",
        headers:{
          Authorization: `Bearer ${apisuprsend}`,
          'Content-Type':"application/json",
        },
        body : JSON.stringify(
          {
            "override": true
          }
        )
      })
      const json2 = await response2.json();
    props.showAlert("AmazonSES vendor added to your Tenant succesfully","success");
    }
  };

  return (
    <div className='container'>
      <h1 className='text-center'>AmazonSES Configuration</h1>
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
        <label htmlFor='AWSRegion'>AWS Region</label>
        <select
          id='AWSRegion'
          name='AWSRegion'
          className='form-control'
          value={formdata.AWSRegion}
          onChange={handleInputChange}
          required
        >
          <option value='us-east-2'>US East (Ohio) - us-east-2</option>
          <option value='us-east-1'>US East (N. Virginia) - us-east-1</option>
          <option value='us-west-1'>US West (N. California) - us-west-1</option>
          <option value='us-west-2'>US West (Oregon) - us-west-2</option>
          <option value='af-south-1'>Africa (Cape Town) - af-south-1</option>
          <option value='ap-south-1'>Asia Pacific (Mumbai) - ap-south-1</option>
          <option value='ap-northeast-3'>Asia Pacific (Osaka) - ap-northeast-3</option>
          <option value='ap-northeast-2'>Asia Pacific (Seoul) - ap-northeast-2</option>
          <option value='ap-southeast-1'>Asia Pacific (Singapore) - ap-southeast-1</option>
          <option value='ap-southeast-2'>Asia Pacific (Sydney) - ap-southeast-2</option>
          <option value='ap-northeast-1'>Asia Pacific (Tokyo) - ap-northeast-1</option>
          <option value='ca-central-1'>Canada (Central) - ca-central-1</option>
          <option value='eu-central-1'>Europe (Frankfurt) - eu-central-1</option>
          <option value='eu-west-1'>Europe (Ireland) - eu-west-1</option>
          <option value='eu-west-2'>Europe (London) - eu-west-2</option>
          <option value='eu-south-1'>Europe (Milan) - eu-south-1</option>
          <option value='eu-west-3'>Europe (Paris) - eu-west-3</option>
          <option value='eu-north-1'>Europe (Stockholm) - eu-north-1</option>
          <option value='me-south-1'>Middle East (Bahrain) - me-south-1</option>
          <option value='sa-east-1'>South America (São Paulo) - sa-east-1</option>

        </select>
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
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
}
