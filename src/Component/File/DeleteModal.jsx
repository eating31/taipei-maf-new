import React, {useContext} from 'react'
import { Modal, Button } from 'react-bootstrap';
import Finder from '../../API/Finder';
import { enqueueSnackbar } from 'notistack';
import { Context } from '../../Contexts/Context';

function DeleteModal({ show, handle, detail }) {
    const finder = Finder();
    const token = localStorage.getItem('token')
    const {manageAllFile, setManageAllFile} =useContext(Context)
    function handleDelete() {
        finder.delete('/file',
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
                enqueueSnackbar('檔案刪除失敗! 只有管理員可以刪除檔案', { variant: 'error' })
                return;
            }
            //移除刪除的檔案
            const updatedData = manageAllFile.filter(item => item._id !== detail._id);
            setManageAllFile(updatedData);
            enqueueSnackbar('檔案刪除成功!', { variant: 'success' })
            handle()
        }).catch(err => {
            enqueueSnackbar(`檔案刪除失敗! ${err.response.data}`, { variant: 'error' })
            console.log(err.response)
        })
    }

    return (
        <Modal show={show} onHide={handle} centered>
            <Modal.Header closeButton>
                <Modal.Title>刪除檔案</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {detail &&
                    <p className='pt-3'>
                        請問您確定要刪除「<span className='text-danger'>{detail.name} - {detail.path.slice(7,)}</span>」檔案嗎?
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