import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import Finder from '../../API/Finder';

function UpdateModal({ show, handle, detail }) {
    const finder = Finder()
    const [name, setName] = useState(detail.name);

    const [isEdit, setIsEdit] = useState(false)

    function handleSave() {
        setIsEdit(true)
        finder.patch('/file',
            {
                _id: detail._id,
                name,
            }, {
            headers: {
                Authorization: localStorage.getItem('token')
            },
        }
        ).then(data => {

            console.log(data)

            window.location.reload()

            enqueueSnackbar('檔案更新成功!', { variant: 'success' })
        }).catch(err => {
            enqueueSnackbar(`檔案更新失敗! ${err.response.data.message}`, { variant: 'error' })
        })
            .finally(() => setIsEdit(false))
    }
    return (
        <>
            <Modal centered show={show} onHide={handle} >
                <Modal.Header closeButton>
                    <Modal.Title>檔案修改名稱</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-4'>
                    {detail &&
                        <>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>名稱</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>
                        </>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handle}>
                        取消
                    </Button>
                    {
                        isEdit ?
                            <Button variant="warning" disabled>
                                <Spinner animation="border" size="sm" /> 修改中
                            </Button> :
                            <Button variant="warning" onClick={handleSave}>
                                確定修改
                            </Button>
                    }
                </Modal.Footer>
            </Modal>
            <SnackbarProvider />
        </>
    )
}

export default UpdateModal