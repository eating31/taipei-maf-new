import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Finder from '../API/Finder';
import { enqueueSnackbar } from 'notistack';


function Profile() {
  const finder = Finder()
  const [isEdit, setIsEdit] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const [role, setRole] = useState('一般會員')

  const initialUserData = {
    username: 'emma',
    email: 'user@example.com',
    phone: '123-456-7890',
    address: '123 Main St',
  };

  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (process.env.REACT_APP_STATIC === 'true') {
      setUserData(initialUserData)
    } else {
      finder.get('/user/manage', {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      }).then(data => {
        setUserData(data.data.data)
        setName(data.data.data.username)
        setEmail(data.data.data.email)
        setPhone(data.data.data.phone)
        setAddress(data.data.data.address)
        setRole(data.data.role)
      }).catch(err => console.log(err))

    }

  }, [])

  const handleSaveClick = () => {

    finder.patch('/user/manage', {
      _id: userData._id,
      username: name,
      email,
      phone,
      address
    }, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }).then(data => {

      setUserData(data.data.updatedData)
      alert('更新成功')
      // 突然有問題 不知道為什麼
      //enqueueSnackbar('公告建立成功!', { variant: 'success' })
    }).catch(err => {
      console.log(err)
      alert(err.response.data)
      //enqueueSnackbar(`資料更新失敗! ${err.response.data.message}`, { variant: 'error' })
    }).finally(() => {
      setIsEdit(false);
    })

  };


  function changeDate(date) {
    const temp = new Date(date)
    return temp.toLocaleString()
  }

  return (
    <div style={{ "minHeight": "75vh" }}>
      <Container >
        <div className='d-flex mt-3'>
          <div className='fs-3'>個人資料管理</div>
        </div>
        <hr />
        <Row className='py-4'>
          <Col xs={12} md={6}>
            <p className='fs-4'>基本資料</p>
            {isEdit
              ?
              <div className='px-3'>

                <label>名稱：</label>
                <input type="text" name="email" value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <br />
                <label>信箱：</label>
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <br />
                <label>電話：</label>
                <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <br />
                <br />
                <label>地址：</label>
                <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                <br />
                <br />
                <div className='d-flex mb-5'>
                  <Button variant='secondary' className="mx-5" onClick={() => setIsEdit(false)}>取消</Button>
                  <Button variant='warning' onClick={handleSaveClick}>儲存</Button>
                </div>

              </div>
              :
              <div className='px-3'>

                <p>名稱：{userData.username}</p>
                <p>信箱：{userData.email}</p>
                <p>電話：{userData.phone}</p>
                <p>地址：{userData.address}</p>
                <p>等級：{role}</p>
                <p>加入時間： {changeDate(userData.createdAt)}</p>
                <Button className="my-3 mx-5 " onClick={() => setIsEdit(true)}>修改基本資料</Button>
              </div>
            }

          </Col>

          {/* 活動報名取消 */}
          {/* <Col xs={12} md={6}>
            <p className='fs-4'>活動報名紀錄</p>
            <div style={{ height: '400px', overflowY: 'auto' }} className="border p-3">
              <Card className='my-3'>
                <Card.Body>
                  <Card.Title>已報名的活動</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Time</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">Place</Card.Subtitle>
                  <Card.Text>
                    報名時間（？
                  </Card.Text>
                  <Card.Link href="#">Card Link</Card.Link>
                </Card.Body>
              </Card>
            </div>
          </Col> */}
        </Row>



      </Container>
    </div>
  )
}

export default Profile