import React, {useContext} from 'react'
import { Modal, Button } from 'react-bootstrap';
import Finder from '../../API/Finder';
import { enqueueSnackbar } from 'notistack';
import { Context } from '../../Contexts/Context';

function DeleteModal({ show, handle, detail }) {
    const finder = Finder();
    const token = localStorage.getItem('token')
    const {manageAllActivity, setManageAllActivity } =useContext(Context)
    function handleDelete() {
        finder.delete('/activity',
            {
                headers: {
                    Authorization: token
                },
                data: {
                    _id: detail._id
                }
            }
        ).then(data => {
            if (!data) {
                // 通常是403
                handle()
                console.error("An unknown error occurred");
                enqueueSnackbar('公告刪除失敗! 只有管理員可以刪除公告', { variant: 'error' })
                return;
            }
            //移除刪除的公告
            const updatedData = manageAllActivity.filter(item => item._id !== detail._id);
            setManageAllActivity(updatedData);
            enqueueSnackbar('公告刪除成功!', { variant: 'success' })
            handle()
        }).catch(err => {
            enqueueSnackbar(`公告刪除失敗! ${err.response.data}`, { variant: 'error' })
            console.log(err.response)
        })
    }

    return (
        <Modal show={show} onHide={handle} centered>
            <Modal.Header closeButton>
                <Modal.Title>刪除公告</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {detail &&
                    <p className='pt-3'>
                        請問您確定要刪除這篇「<span className='text-danger'>{detail.title}</span>」公告嗎?
                    </p>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handle}>
                    取消
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    確定刪除
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default DeleteModal