import React from 'react'
import {Link} from "react-router-dom"

export default function Navbar() {
  return (
    <div>
         <nav className="navbar navbar-expand-lg navbar-dark" style={{minHeight:"10px",backgroundColor:"#444487"}}>
            <div className="container-fluid">
            <Link className="navbar-brand" to="/">
            <img src="https://uploads-ssl.webflow.com/62a87a4ff7326e1bc863e8f3/646b441e3d69c9698ce63214_logo.svg"  className="d-inline-block align-top mx-3" alt="" />
            </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                
                </ul>
                <Link className='btn btn-secondary mx-1' to='/addtenant' role='button'>Add Tenants</Link>
                <Link className='btn btn-secondary mx-1' to='/addvendor' role='button'>Add Vendors</Link>
                </div>
            </div>
            </nav>
    </div>
  )
}
