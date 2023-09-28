require("dotenv").config()
const express = require("express")
const port = 4000;
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const {Suprsend} = require("@suprsend/node-sdk");
const { Workflow } = require("@suprsend/node-sdk")
const { Event } = require("@suprsend/node-sdk");
const workspace_key = process.env.WORKSPACE_KEY;
const workspace_secret = process.env.WORKSPACE_SECRET;
const supr_client = new Suprsend(workspace_key, workspace_secret);


app.get("/",function(req, res){
    res.send("Suprsend-Api");
}); 

/****************************************** Adding Tenants to suprsend ***************************************/

app.post("/AddTenants",async function(req,res){
   try{
     const {brand_id,brand_name,logo_url,website,facebook,linkedin,twitter,medium,primaryColor,secondaryColor,tertiaryColor} = req.body;
     brand_payload = {
       "brand_id": brand_id,
       "brand_name": brand_name,
       "logo": logo_url,
       "primary_color": primaryColor,
       "secondary_color": secondaryColor,
       "tertiary_color": tertiaryColor,
       "social_links": {
         "website": website,
         "facebook": facebook,
         "linkedin": linkedin,
         "twitter": twitter,
         "medium": medium,
       },
       "properties": {
         "prop1": "value1",
         "prop2": "value2"
       }
      }   
   
     const response = await supr_client.brands.upsert(brand_id, brand_payload); 
     console.log(response);
     const success = true;
     res.json({success});
   }
   catch{
    console.error(`Error occured while adding tenant`);
    return res.status(500).send("some error occurred");
   }
  })
  

/****************************************** send notification to suprsend ***************************************/
app.post("/send-notif",async(req,res)=>{
  try {
    const {from,billTo,shipTo,date,amount,itemDescription,notes,tenantid} = req.body;
    const distinct_id = billTo; 
    const user1 = supr_client.user.get_instance(distinct_id);
    user1.add_email(distinct_id);
    const response1 = await user1.save();
    console.log('response', response1);
    const properties = {				
      "from":from,
      "to": billTo,
      "shipped_on": date,
      "total": amount,
      "items": itemDescription,
      "notes": notes,
    }  
    const event_name = 'INVOICE'
    const event = new Event(distinct_id, event_name, properties,{brand_id: tenantid});
    const response = await supr_client.track_event(event);
    console.log('response', response);
    let msg = "Notification Successfully sent to the user";
    return res.json({msg});
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("some error occurred");
  }
})

  
/****************************************** Listen event  ***************************************/
  
app.listen(port,()=>{
    console.log("server started on port 4000");
})

  