import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, Container, Table, Spinner } from 'react-bootstrap';
import Finder from '../API/Finder';
import CreateModal from '../Component/File/CreateModal';
import UpdateModal from '../Component/File/UpdateModal';
import DeleteModal from '../Component/File/DeleteModal';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { Context } from '../Contexts/Context';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function FileManage() {
    const finder = Finder();
    const token = localStorage.getItem('token')
    const {manageAllFile, setManageAllFile} = useContext(Context)

   // const [allFile, setAllFile] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [createModal ,setCreateModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [detail, setDetail] = useState({})


    useEffect(() => {
        finder.get('/file', {
            headers: {
                Authorization: localStorage.getItem('token'),
            }
        }).then((data) => {
            console.log(data.data)
            setIsLoading(false)
            setManageAllFile(data.data)

        })
    }, [])

    function changeDate(date) {
        const temp = new Date(date)
        return temp.toLocaleString()
    }

    function handle(){
        setCreateModal(false)
        setUpdateModal(false)
        setDeleteModal(false)
    }

    function OpenUpdateModal(each){
        setUpdateModal(true)
        setDetail(each)
    }

    function OpenDeleteModal(each){
        setDeleteModal(true)
        setDetail(each)
    }

    // 更新是否釘選
    function UpdateFilePinned(id, is_pinned) {
        finder.patch('/file/pinned',
            {
                _id: id,
                is_pinned: !is_pinned
            }, {
            headers: {
                Authorization: token
            },
        }
        ).then(data => {
            const newArray = manageAllFile.map(obj => {
                // 如果物件的 id 符合，則用更新後的data 取代
                if (obj._id === id) {
                    return data.data.updatedNew;
                }
                // 否則保持原樣
                return obj;
            });
            setManageAllFile(newArray);
            enqueueSnackbar('公告釘選狀態更新成功!', { variant: 'success' })
        }).catch(err => {
            console.log(err)
            enqueueSnackbar(`公告釘選狀態更新失敗! ${err.response.data.message}`, { variant: 'error' })
        })
            .finally(() => setIsLoading(false))
    }

    return (
        <div style={{ "minHeight": "75vh" }}>
            <Container>
            <Button variant="link" className='pt-3 pb-0' href='/manage'>--返回--</Button>
                <div className='d-flex justify-content-between my-2'>
                    <div className='fs-3'>檔案管理</div>
                    <div>
                        <Button className='mt-3' onClick={() => setCreateModal(true)}>上傳檔案</Button>
                    </div>
                </div>
           
                <Table striped bordered hover responsive="md" className='my-3 mb-5'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>名稱</th>
                            <th style={{ whiteSpace: 'nowrap' }}>檔案</th>
                            <th>建立日期</th>
                            <th>上傳者</th>
                            <th>釘選</th>
                            <th>管理</th>
                        </tr>
                    </thead>
                    <tbody>

                        {isLoading ? <tr> <td colSpan={8} className='text-center fs-3 py-5'> <Spinner animation="border" size="lg" /> 查詢中  </td> </tr> :
                            <> {
                                manageAllFile.length > 0 ? manageAllFile.map((each, index) => {
                                    return (
                                        <tr key={each._id}>
                                            <td>{index + 1}</td>
                                            <td>{each.name}</td>
                                            <td><a rel="noreferrer" href={process.env.REACT_APP_BACKEND_URL + each.path} target='_blank'>{each.path.slice(7,)}</a></td>
                                            <td>{changeDate(each.createdAt)}</td>
                                            <td>{each.triggerBy.username ? each.triggerBy.username: each.triggerBy}</td>
                                            <td style={{ whiteSpace: 'nowrap' }} onClick={e => e.stopPropagation()}>
                                                <Form.Check type="switch" checked={each.is_pinned} onChange={(e) => UpdateFilePinned(each._id, each.is_pinned)} />
                                            </td>
                                            <td style={{ whiteSpace: 'nowrap' }}><FaRegEdit size={25} onClick={(e) => { e.stopPropagation(); OpenUpdateModal(each) }} /> <MdDelete size={30} style={{ "color": "red" }} onClick={(e) => { e.stopPropagation(); OpenDeleteModal(each) }} /></td>
                                        </tr>
                                    )
                                })
                                    :
                                    <tr>
                                        <td colSpan={8} className='text-center fs-3 py-5'> - 尚無檔案 - </td>
                                    </tr>
                            }
                            </>}

                    </tbody>
                </Table>
            </Container>
            {
                createModal &&  <CreateModal show={createModal} handle={handle} />
            }
          
           {deleteModal &&
                    <DeleteModal show={deleteModal} handle={handle} detail={detail} />
                }

                {updateModal &&
                    <UpdateModal show={updateModal} handle={handle} detail={detail} />
                }
           <SnackbarProvider />
        </div>
    )
}

export default FileManage