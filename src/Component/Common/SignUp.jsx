import React, { useContext, useState, useEffect } from 'react'
import { Button, InputGroup, Form, Modal, Col, Row } from 'react-bootstrap';
import { Context } from '../../Contexts/Context';
import Finder from '../../API/Finder';
//import { FaCommentsDollar } from 'react-icons/fa';

function SignUp() {
  const finder = Finder();
  const { signupModal, setSignupModal } = useContext(Context)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()
  const [password, setPassword] = useState()
  const [checkPassword, setCheckPassword] = useState('')

  const [validated, setValidated] = useState(false);


  useEffect(() => {
    setValidated(false)
  }, [signupModal])

  function handleClose() {
    setSignupModal(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    // 驗證成功
    if (form.checkValidity() !== false) {
      if (password === checkPassword) {
        if (process.env.REACT_APP_STATIC === 'true') {
          alert('註冊成功!')
        } else {
          finder.post('/user/register', { email, username: name, phone, address, gender, password })
            .then(data => {
              console.log(data)
              alert('註冊成功')

              // clear data
              setName('')
              setEmail('')
              setGender('')
              setPhone()
              setAddress()
              setPassword()
              setCheckPassword('')


              setSignupModal(false)
            }).catch(err => {
              console.log(err)
              alert(err.response.data)
            })
        }
      } else {
        alert('兩次密碼不一致，確請再次確認')
      }
    }

    setValidated(true);

  };

  return (
    <Modal centered show={signupModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>會員註冊</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group >
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
          <Form.Group className='pt-3'>
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
          <Form.Group  className='pt-3'>
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
          <Form.Group className='pt-3' >
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
          <Form.Group className='pt-3'>
            <Form.Label className='pe-3'>性別 : </Form.Label>
            <Form.Check
              inline
              label="男性"
              name="gender"
              type='radio'
              value='male'
              required
              onChange={(e) => setGender(e.target.value)}
            />
            <Form.Check
              inline
              label="女性"
              name="gender"
              type='radio'
              value='female'
              onChange={(e) => setGender(e.target.value)}
            />
            <Form.Check
              inline
              name="gender"
              label="其他"
              type='radio'
              value='other'
              onChange={(e) => setGender(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">請選擇性別</Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>密碼</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">密碼為必填</Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>確認密碼</Form.Label>
            <Form.Control
              type="password"
              name="checkPassword"
              required
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">請再輸入一次密碼</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              required
              label="我同意相關注意事項"
              feedback="請勾選"
              feedbackType="invalid"
            />
          </Form.Group>
          <Button variant='secondary'>取消</Button>
          <Button type="submit" className='mx-4'>確定註冊</Button>
        </Form>

      </Modal.Body>
    </Modal>
  )
}

export default SignUp