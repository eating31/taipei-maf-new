import React, { useContext, useEffect, useState } from 'react'
import { Modal, Form, Button, Row, Col, FloatingLabel, Table, Spinner } from 'react-bootstrap';
import Finder from '../../API/Finder';
import { enqueueSnackbar } from 'notistack';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
function CreateNewTypeModal({ show, handle }) {
    const finder = Finder()
    const token = localStorage.getItem('token')


    const [isCreate, setIsCreate] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const [allType, setAllType] = useState([])
    const [type, setType] = useState('')
    const [selectedType, setSelectedType] = useState()

    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [editType, setEditType] = useState('')

    const handleKeyPress = (e) => {
        // 判斷是否按下的是 "Enter"
        if (e.key === 'Enter') {
            createType();
        }
    };

    function createType() {
        if (type.length >= 6) {
            enqueueSnackbar('公告建立失敗! 標籤不可超過六個字', { variant: 'error' })
        } else if (type.length < 2) {
            enqueueSnackbar('公告建立失敗! 標籤不可低於兩個字', { variant: 'error' })
        } else {
            setIsCreate(true)
            finder.post('/news/type', { name: type }, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                }
            }).then(data => {
                if (!data) {
                    // 通常是403
                    handle()
                    setType('')
                    console.error("An unknown error occurred");
                    enqueueSnackbar('公告建立失敗! 只有管理員可以新增公告', { variant: 'error' })
                    return;
                }
                enqueueSnackbar('公告建立成功!', { variant: 'success' })
                setType('')
                setAllType(prev => [data.data.savedNews, ...prev]);

            }).catch(err => {
                console.log(err)
                enqueueSnackbar(`公告建立失敗! ${err.response.data}`, { variant: 'error' })
            }).finally(() => setIsCreate(false))
        }
    }

    function getAllType() {

        finder.get('/news/type', {
            headers: {
                Authorization: token,
            }
        }).then(data => {
            setAllType(data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllType()
    }, [])



    // 編輯刪除Modal
    function handleClose() {
        setDeleteModal(false)
        setEditModal(false)
    }

    function OpenEditModal(each) {
        setEditModal(true)
        setSelectedType(each)
        setEditType(each.name)
    }

    function OpenModal(each) {
        setDeleteModal(true)
        setSelectedType(each)
    }

    function handleDelete() {
        setIsEdit(true)
        finder.delete('/news/type',
            {
                headers: {
                    Authorization: token
                },
                data: {
                    _id: selectedType._id
                }
            }
        ).then(data => {
            if (!data) {
                // 通常是403
                handleClose()
                console.error("An unknown error occurred");
                enqueueSnackbar('公告刪除失敗! 只有管理員可以刪除公告', { variant: 'error' })
                return;
            }

            //重新呼叫
            getAllType()
            enqueueSnackbar('公告刪除成功!', { variant: 'success' })
            handleClose()
        }).catch(err => {
            enqueueSnackbar(`公告刪除失敗! ${err.response.data}`, { variant: 'error' })
            console.log(err.response)
        }).finally(() => setIsEdit(false))
    }

    function handleEdit() {
        setIsEdit(true)
        finder.patch('/news/type',
            {
                _id: selectedType._id,
                name: editType
            }, {
            headers: {
                Authorization: token
            }
        }

        ).then(data => {
            if (!data) {
                // 通常是403
                handleClose()
                console.error("An unknown error occurred");
                enqueueSnackbar('公告更新失敗! 只有管理員可以更新公告', { variant: 'error' })
                return;
            }

            //重新呼叫
            getAllType()
            enqueueSnackbar('公告更新成功!', { variant: 'success' })
            handleClose()
        }).catch(err => {
            enqueueSnackbar(`公告更新失敗! ${err.response.data}`, { variant: 'error' })
            console.log(err.response)
        }).finally(() => setIsEdit(false))
    }
    return (

        <>
            <Modal centered show={show} onHide={handle} size='md'>
                <Modal.Header closeButton>
                    <Modal.Title>公告種類管理</Modal.Title>
                </Modal.Header>
                <Modal.Body className='px-5'>
                    <Row>
                        <Col md={8}>
                            <Form>
                                <FloatingLabel label="新增公告標籤" >
                                    <Form.Control type="text" value={type} onChange={(e) => setType(e.target.value)} onKeyDown={handleKeyPress} />
                                </FloatingLabel>
                                <Form.Text className="text-muted">最少兩個字，最多六個字</Form.Text>
                            </Form>
                        </Col>
                        <Col md={4} >
                            {
                                isCreate ?
                                    <Button variant="primary" className='mt-2' disabled>
                                        <Spinner animation="border" size="sm" /> 新增中
                                    </Button> :
                                    <Button variant="primary" className='mt-2' onClick={createType}>
                                        建立
                                    </Button>
                            }
                        </Col>
                    </Row>

                    <div className='py-4'>
                        <hr />
                        <p className='fs-4'>目前標籤</p>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>標籤</th>
                                    <th>管理</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allType.length > 0 ? allType.map((each, index) => {
                                    return (
                                        <tr key={each._id}>
                                            <td>{index + 1}</td>
                                            <td>{each.name}</td>
                                            <td><FaRegEdit size={25} onClick={(e) => { e.stopPropagation(); OpenEditModal(each) }} /> <MdDelete size={30} style={{ "color": "red" }} onClick={(e) => { e.stopPropagation(); OpenModal(each) }} /></td>
                                        </tr>
                                    )
                                })
                                    :
                                    <tr>
                                        <td colSpan={3} className='text-center fs-4 py-3'> - 尚無標籤 - </td>
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    </div>
                </Modal.Body>
            </Modal>




            <Modal show={deleteModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>刪除公告標籤</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedType &&
                        <p className='pt-3'>
                            請問您確定要刪除「<span className='text-danger'>{selectedType.name}</span>」公告標籤嗎?
                        </p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        取消
                    </Button>
                    {
                        isEdit ?
                            <Button variant="danger" disabled>
                                <Spinner animation="border" size="sm" /> 刪除中
                            </Button> :
                            <Button variant="danger" onClick={handleDelete}>
                                確定刪除
                            </Button>
                    }

                </Modal.Footer>
            </Modal>

            <Modal show={editModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>編輯公告標籤</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {selectedType &&
                        <div>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>請輸入要修改的名稱</Form.Label>
                                    <Form.Control type="text" value={editType} onChange={e => setEditType(e.target.value)} />
                                    <Form.Text className="text-muted">
                                        最少兩個字，最多六個字
                                    </Form.Text>
                                </Form.Group>
                            </Form>
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        取消
                    </Button>
                    {
                        isEdit ?
                            <Button variant="warning" disabled>
                                <Spinner animation="border" size="sm" /> 修改中
                            </Button> :
                            <Button variant="warning" onClick={handleEdit}>
                                確定修改
                            </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default CreateNewTypeModal