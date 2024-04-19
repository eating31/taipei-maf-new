import React, { useState, useEffect, useContext } from 'react'
import { Alert, Modal, Form, Spinner, Button } from 'react-bootstrap';
import Finder from '../../API/Finder'
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { Context } from '../../Contexts/Context';

function CreateModal({ show, handle }) {

    const finder = Finder()
    const {manageAllFile, setManageAllFile} = useContext(Context)
    const [file, setFile] = useState(null);
    const [name, setName] = useState(null)
    const [isCreate, setIsCreate] = useState(false)
    const [message, setMessage] = useState({})
    const [isPinned, setIsPinned] = useState(false)

    useEffect(()=>{
        setMessage({})
    },[])

    const onChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onSubmit = async () => {
        if (name && file) {
            setIsCreate(true)
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', name);
            formData.append('is_pinned', isPinned);

            finder.post('/file',
                formData,
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    }
                }
            ).then((data) => {
                console.log(data)
                setMessage({ message: data.data.message, variant: 'success' })
                setIsCreate(false)
                setName('')
                setFile('')
                setManageAllFile(prev => [data.data.savedFiles, ...prev]);
            }).catch(err => {
                console.log(err)
                setMessage({ message: err.response.data, variant: 'danger' })
                enqueueSnackbar(`檔案上傳失敗! ${err.response.data}`, { variant: 'error' })
            }).finally(() => setIsCreate(false))
        } else {
            alert('請輸入名稱')
        }

    };

    return (
        <div>
            <Modal centered show={show} onHide={handle} >
                <Modal.Header closeButton>
                    <Modal.Title>上傳檔案</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-4'>
                    <Form>
                        <Form.Label>請輸入名稱</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='檔案名稱' />
                        <Form.Group controlId="formFile" className="my-3">
                            <Form.Label>請選擇檔案</Form.Label>
                            <Form.Control type="file" onChange={onChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='pe-4'>是否釘選在首頁</Form.Label>
                            <Form.Check
                                inline
                                name="group1"
                                value={true}
                                type='radio'
                                label='是'
                                onChange={(e) => setIsPinned(e.target.value === 'true')}
                            />

                            <Form.Check
                                inline
                                name="group1"
                                value={false}
                                type='radio'
                                label='否'
                                onChange={(e) => setIsPinned(e.target.value === 'true')}
                                defaultChecked
                            />
                        </Form.Group>
                    </Form>

                    {Object.keys(message).length !== 0 && <Alert variant={message.variant} >
                        {message.message}
                    </Alert>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handle}>
                        取消
                    </Button>
                    {
                        isCreate ?
                            <Button variant="primary" disabled>
                                <Spinner animation="border" size="sm" /> 新增中
                            </Button> :
                            <Button variant="primary" onClick={onSubmit}>
                                建立
                            </Button>
                    }

                </Modal.Footer>
            </Modal>
            <SnackbarProvider />
        </div>
    )
}

export default CreateModal