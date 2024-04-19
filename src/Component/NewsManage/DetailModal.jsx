import React,{useState } from 'react'
import { Modal, Form, Button, Image } from 'react-bootstrap';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import UpdateModal from './UpdateModal';


function DetailModal({ show, handle, detail }) {
  // Read only

  const [isUpdate, setIsUpdate] = useState(false)
  const [data,setData] = useState({})

  function handleOpen(){
    setIsUpdate(true)
    //handle()
    setData(detail)
  }

  function handleUpdateClose(){
    setIsUpdate(false)
  }

  function readPerson(name){
    if(name === 'all'){
      return '所有人'
    }else if(name === 'member'){
      return '會員'
    }
  }

  function changeDate(date) {
    const temp = new Date(date)
    return temp.toLocaleString()
}

function changePinned(value){
  if(value){
    return '是'
  }else{
    return '否'
  }
}

  return (
    <>
    <Modal centered show={show} onHide={handle} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>公告內容</Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-5'>
        {detail &&
          <>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>標題</Form.Label>
                <Form.Control
                  type="text"
                  value={detail.title}
                  disabled
                />
              </Form.Group>
            </Form>

            {/* 利用dangerouslySetInnerHTML顯示將字串的Html渲染出來 */}
            <p>內文</p>
            <div className='border rounded-3 p-3' style={{ overflowWrap: "break-word" }} dangerouslySetInnerHTML={{ __html: detail.description }} />
     
            <div>
              {detail.photo.length > 0 &&
              <>
              <p className='mb-2'>圖片</p>
                <PhotoProvider maskOpacity={0.5}>
                  <div  style={{ overflowX: 'auto', whiteSpace: 'nowrap'}} >
                  {detail.photo.map((item, index) => {
                    return (
                      <PhotoView key={index} src={process.env.REACT_APP_BACKEND_URL + item}>
                        <Image className='me-4' src={process.env.REACT_APP_BACKEND_URL + item} alt="item" fluid style={{ height: '150px', width: "150px", objectFit: 'cover' }} />
                      </PhotoView>
                    )
                  })}
                  </div>
                </PhotoProvider>
                </>
              }
            </div>
            <div className='pt-3'>
              <p>是否釘選 : {changePinned(detail.is_pinned)}</p>
              <p>點擊 : {detail.clicked}</p>
              <p>公告種類 : {detail.newsType.name}</p>
              <p>權限 : {readPerson(detail.read)}</p>
              <p>建立者 : {detail.triggerBy.username}</p>
              <p>建立時間 : {changeDate(detail.createdAt)}</p>
              <p>更新時間 : {changeDate(detail.news_update)}</p>
            </div>
          </>
        }

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handle}>
          返回
        </Button>
        <Button variant="warning" onClick={handleOpen}>
          編輯
        </Button>
      </Modal.Footer>
    </Modal>

    {isUpdate &&
      <UpdateModal show={isUpdate} handle={handleUpdateClose} detail={data} />    
    }


</>
  )
}

export default DetailModal