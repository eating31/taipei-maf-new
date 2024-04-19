import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../../Image/logo.jpg';
function Footer() {
  return (

    <footer className="text-white stick-bottom pt-3"  style={{backgroundColor:'#2f6690'}}>
      <Container >
        <Row className='d-flex justify-content-center'>
          {/* Logo 區塊 */}
          <Col xs={12} md={4} className="d-flex justify-content-center">
            <img
              src={Logo}
              alt="Logo"
              className="img-fluid pb-3"
              style={{ width: '150px', height: 'auto' }}
            />
          </Col>
          <Col xs={12} md={4} className="d-flex justify-content-center">
            <div>
              <h5>Contact Us</h5>
              <div className='ps-4'>
                <p>台北市松山區敦化北路3號168室</p>
                <p>Email : <a href="mailto:tmaf01012264@gmail.com" style={{ textDecoration: 'none', color: 'white' }}>tmaf01012264@gmail.com</a></p>
                <p>Phone : <a href="tel:2577-5669" style={{ textDecoration: 'none', color: 'white' }}>(02) 2577-5669</a></p>
              </div>
            </div>
          </Col>

          <Col xs={12} md={4} className="d-flex justify-content-center w-full">
            <div className='px-3'>
              <h5>Related Links</h5>
              <ul className="list-unstyled ps-4">
                <li><a href="#link1" className="text-white">Link 1</a></li>
                <li><a href="#link2" className="text-white">Link 2</a></li>
                <li><a href="#link3" className="text-white">Link 3</a></li>
                <li><a href="#link3" className="text-white">Link 3</a></li>
              </ul>

            </div>
            <div className='px-3'>
            <h5>Related Links</h5>
            <ul className="list-unstyled ps-4">
                <li><a href="#link1" className="text-white">Link 1</a></li>
                <li><a href="#link2" className="text-white">Link 2</a></li>
                <li><a href="#link3" className="text-white">Link 3</a></li>
                <li><a href="#link3" className="text-white">Link 3</a></li>
              </ul>
            </div>

          </Col>
        </Row>
      </Container>

      {/* 底部訊息 */}
      <div className="text-center p-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        Copyright © <a target="_blank" href='https://eating31.github.io/' rel="noreferrer nofollow " style={{ textDecoration: 'none', color: 'white' }}>Emma </a> 2024
      </div>
    </footer>
  );
}

export default Footer