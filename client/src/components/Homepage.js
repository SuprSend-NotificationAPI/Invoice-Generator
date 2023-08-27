import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function Homepage(props) {
   const host = process.env.REACT_APP_PORT; 
    const [invoiceData, setInvoiceData] = useState({
      from: '',
      billTo: '',
      shipTo: '',
      date: '',
      amount: '',
      itemDescription: '',
      notes: '',
      tenantid: 'SuprSend1',
    });
   
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setInvoiceData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async(event) => {
      event.preventDefault();
      const response = await fetch(`${host}/send-notif`,{
        method : "POST",
        headers:{
          'Content-Type':"application/json",
        },
        body : JSON.stringify(invoiceData)
      })
      const json = await response.json();
      props.showAlert(json.msg,"success");
      setInvoiceData({
        from: '',
        billTo: '',
        shipTo: '',
        date: '',
        amount: '',
        itemDescription: '',
        notes: '',
        tenantid: '',
      })
    };
    return (
      <>
      <Container className="mt-5" style={{maxWidth:"65%"}}>
        <h1 className='text-center'>Invoice Generator</h1>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mx-2 my-2'>
                <Form.Label>Who is this invoice from</Form.Label>
                <Form.Control
                  type="text"
                  name="from"
                  value={invoiceData.from}
                  onChange={handleInputChange}
                  required
                  placeholder='Your Name'
                />
              </Form.Group>
              <Form.Group className='mx-2 my-2'>
                <Form.Label>Bill To</Form.Label>
                <Form.Control
                  type="email"
                  name="billTo"
                  value={invoiceData.billTo}
                  onChange={handleInputChange}
                  required
                  placeholder='Email Address of User'
                />
              </Form.Group>
              <Form.Group className='mx-2 my-2'>
                <Form.Label>Ship To</Form.Label>
                <Form.Control
                  type="text"
                  name="shipTo"
                  value={invoiceData.shipTo}
                  onChange={handleInputChange}
                  required
                  placeholder='Place name'
                />
              </Form.Group>
              <Form.Group className='mx-2 my-2'>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={invoiceData.date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className='mx-2 my-2'>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="text"
                  name="amount"
                  value={invoiceData.amount}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className='mx-2 my-2'>
                <Form.Label>Item Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="itemDescription"
                  value={invoiceData.itemDescription}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className='mx-2 my-2'>
                <Form.Label>Extra Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="notes"
                  value={invoiceData.notes}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className='mx-2 my-2'>
                <Form.Label>Add Tenant</Form.Label>
                <Form.Control
                  type="text"
                  name="tenantid"
                  value={invoiceData.tenantid}
                  onChange={handleInputChange}
                  placeholder='supr'
                />
              </Form.Group>
              <Row className="justify-content-center mt-3 mx-2 my-3">
                    <Button  type="submit" className='btn btn-secondary mx-1'>
                    Generate Invoice
                    </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="container3 my-3">
      <a className="github" href="https://github.com/SuprSend-NotificationAPI/Invoice-Generator"  target="_blank"></a>
      <a className="suprsend" href="https://www.suprsend.com"  target="_blank"></a>
      </div>  
      </>
    );
  }