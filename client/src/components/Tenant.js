import React, { useState } from 'react';

export default function Tenant(props) {
  const host = process.env.REACT_APP_PORT; 
  const [formData, setformData] = useState({
    brand_id : "",
    brand_name:"",
    logo_url:"",
    website:"",
    primaryColor:"#FFFFFF",
    secondaryColor:"#FFFFFF",
    tertiaryColor:"#FFFFFF",
    facebook:"",
    twitter:"",
    linkedin:"",
    medium:""
  });
 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const response = await fetch(`${host}/AddTenants`,{
      method : "POST",
      headers:{
        'Content-Type':"application/json",
      },
      body : JSON.stringify(formData)
    })
    const json = await response.json();
    props.showAlert("Tenant added to Suprsend succesfully","success");
  };
  

  return (
    <div className='container'>
      <h1 className='text-center'>Add Tenants</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="brand_id">Brand ID:</label>
          <input type="text" id="brand_id" name="brand_id" placeholder="[a-z]-[0-9]-[ _ or -]" required onChange={handleChange} value={formData.brand_id}/>
        </div>
        <div className="form-group">
          <label htmlFor="brand_name">Brand Name:</label>
          <input type="text" id="brand_name" placeholder="Suprsend" name="brand_name" required onChange={handleChange} value={formData.brand_name}/>
        </div>
        <div className="form-group">
          <label htmlFor="logo_url">Logo URL:</label>
          <input type="url" id="logo_url" placeholder="https://yourlogo=" name="logo_url" required onChange={handleChange} value={formData.logo_url}/>
        </div>
        <div className="form-group">
          <label htmlFor="website">Website:</label>
          <input type="url" id="website" placeholder="https://www.suprsend.com" name="website" required onChange={handleChange} value={formData.website} />
        </div>
        <div className="form-group">
          <label htmlFor="select color">Select Colors:</label>
          <div className="row1">
            <div className="color-container">
              <input type="color" id="primary-color" name="primaryColor"  onChange={handleChange} value={formData.primaryColor}/>
              <label htmlFor="primary-color">Primary Color</label>
            </div>
            <div className="color-container">
              <input type="color" id="secondary-color" name="secondaryColor" onChange={handleChange} value={formData.secondaryColor}/>
              <label htmlFor="secondary-color">Secondary Color</label>
            </div>
            <div className="color-container">
              <input type="color" id="tertiary-color" name="tertiaryColor"  onChange={handleChange} value={formData.tertiaryColor}/>
              <label htmlFor="tertiary-color">Tertiary Color</label>
            </div>
          </div>
        </div>

        {/* Social media handles :- */}

        <div className="form-group">
          <label htmlFor="facebook">Facebook Link</label>
          <input type="text" id="facebook"  name="facebook" required onChange={handleChange} value={formData.facebook}/>
        </div>


        <div className="form-group">
          <label htmlFor="twitter">Twitter Link</label>
          <input type="text" id="twitter"  name="twitter" required onChange={handleChange} value={formData.twitter}/>
        </div>


        <div className="form-group">
          <label htmlFor="linkedin">Linkedin Link</label>
          <input type="text" id="linkedin"  name="linkedin" required onChange={handleChange} value={formData.linkedin}/>
        </div>


        <div className="form-group">
          <label htmlFor="medium">Medium Link</label>
          <input type="text" id="medium"  name="medium" required onChange={handleChange} value={formData.medium}/>
        </div>
       
        <button type="submit" className='btn btn-secondary mx-1'>Submit</button>
      </form>
    </div>
  );
}
