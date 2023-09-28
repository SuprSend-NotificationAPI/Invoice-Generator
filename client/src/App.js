import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Tenant from './components/Tenant';
import Vendor from './components/Vendor';
import Alert from './components/Alert';
import Amazon from './components/Amazon';
import Sendgrid from './components/Sendgrid';
import Mailgun from './components/Mailgun';

export default function App() {
  const [alert,setAlert] = React.useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }

  return (
    <Router style={{position:'relative'}}>
      <Navbar />
      <div style={{ position: 'fixed', right: '2%' }}>
       <Alert alert={alert} />
       </div>
      <Routes>
       <Route exact path="/" element = {<Homepage showAlert={showAlert}/>} />
       <Route exact path="/addtenant" element = {<Tenant showAlert={showAlert}/>} />
       <Route exact path="/addvendor" element = {<Vendor showAlert={showAlert}/>} />
       <Route exact path="/amazon" element = {<Amazon showAlert={showAlert}/>} />
       <Route exact path="/sendgrid" element = {<Sendgrid showAlert={showAlert}/>} />
       <Route exact path="/mailgun" element = {<Mailgun showAlert={showAlert}/>} />
       </Routes>
    </Router>
  )
}
