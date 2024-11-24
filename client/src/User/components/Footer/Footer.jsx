import React from "react"
import "./style.css"
import { Col, Container, Row } from "react-bootstrap"

const Footer = () => {
  return (
    <footer>
        <Container>
          <Row className="footer-row">
            <Col md={6} sm={5} className='box'>
              <div className="logo">
                  <ion-icon name="bag"></ion-icon>
                  <h1 style={{color:'white'}}>Handy Man</h1>
              </div>
              <p>A handyman is a skilled person who is proficient in a wide range of repair, maintenance, and installation tasks around the house or in various settings. They are known for their versatility and ability to tackle various jobs, typically smaller in scale, that don't require the expertise of specialized tradespeople like plumbers or electricians</p>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2 style={{color:'white'}}>About Us</h2>
              <ul>
                <li>Home</li>
                <li>Category</li>
                <li>Worker</li>
                <li>Worker Details</li>
                <li>Service Details</li>
              </ul>
            </Col>
           
            <Col md={3} sm={5} className='box'>
              <h2>Contact Us</h2>
              <ul>
                <li>70 Washington Square South, New York, NY 10012, United States </li>
                <li>Email: uilib.help@gmail.com</li>
                <li>Phone: +1 1123 456 780</li>
              </ul>
            </Col>
          </Row>
        </Container>
    </footer>
  )
}

export default Footer
