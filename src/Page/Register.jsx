import React from 'react'
import { useParams } from "react-router-dom";
import { Carousel, Image, Container } from 'react-bootstrap';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
function Register() {
  let { code } = useParams();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    console.log(date)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{

      event.preventDefault();
      event.stopPropagation();
      // TO DO api

    }

    // 只是顯示有沒有溝溝和叉叉而已
    setValidated(true);
  };

  return (
    <div style={{ "minHeight": "75vh" }}>
      <Container >
        <div className='fs-3 pt-4'>活動報名</div>
        <hr />
        <div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" >
                <Form.Label>姓名</Form.Label>
                <Form.Control
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="請輸入姓名"
                />
                <Form.Control.Feedback type="invalid">請輸入姓名</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>信箱</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="請輸入信箱"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    請輸入正確的信箱格式
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>生日</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    請選擇日期
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>地址</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="請輸入地址"
                  required />
                <Form.Control.Feedback type="invalid">
                  請輸入地址
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>電話</Form.Label>
                <Form.Control
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09XXXXXXXX"
                  required />
                <Form.Control.Feedback type="invalid">
                  請輸入電話
                </Form.Control.Feedback>
              </Form.Group>

            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="我同意相關注意事項"
                feedback="請勾選"
                feedbackType="invalid"
              />
            </Form.Group>
            <Button type="submit">確定報名</Button>
          </Form>
        </div>

      </Container>

    </div>
  )
}

export default Register