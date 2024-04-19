import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Spinner, Form, Image, Table, Button, Carousel } from 'react-bootstrap';
import { Context } from '../Contexts/Context';
import Finder from '../API/Finder';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

function UserManage() {
    const finder = Finder();
    const token = localStorage.getItem('token')

    const [allUser, setAllUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [a, setA] = useState(false)

    useEffect(() => {
        // 靜態網頁測試版
        if (process.env.REACT_APP_STATIC === 'true') {
            // setManageAllNews(tempManageAllNews)
            setIsLoading(false)
        } else {
            finder.get('/user/manage/all', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                }
            }).then(data => {
                console.log(data.data)
                setAllUser(data.data.data)
                setIsLoading(false)
            }).catch(err => console.log(err))
                .finally(() => setIsLoading(false))
        }

    }, [])

     // 更新是否釘選
     function UpdateReadAuth(id, status, way) {
        finder.patch('/user/manage/auth',
            {
                _id: id,
                status: status,
                way
            }, {
            headers: {
                Authorization: token
            },
        }
        ).then(data => {
            console.log(data.data)
            const newArray = allUser.map(obj => {
                // 如果物件的 id 符合，則用更新後的data 取代
                if (obj._id === id) {
                    return data.data.updatedNew;
                }
                // 否則保持原樣
                return obj;
            });
            setAllUser(newArray);
            enqueueSnackbar('狀態更新成功!', { variant: 'success' })
        }).catch(err => {
            enqueueSnackbar(`狀態更新失敗! ${err.response.data.message}`, { variant: 'error' })
        })
            .finally(() => setIsLoading(false))
    }

    function changeDate(date) {
        const temp = new Date(date)
        return temp.toLocaleString()
    }

    function changeGender(gender) {
        if(gender ==='female'){
            return '女'
        }else if(gender ===' male'){
            return '男'
        }else{
            return '其他'
        }
    }

    function isAdmin(role){
        if(role === 'admin'){
            return true
        }else{
            return false
        }
    }

    return (
        <div style={{ "minHeight": "75vh" }}>
            {/* 設定最小高度避免資料不足時footer往上跑 */}
            <Container >
                <Button variant="link" className='pt-3 pb-0' href='/manage'>--返回--</Button>
                <div className='d-flex justify-content-between my-2'>
                    <div className='fs-3'>使用者管理</div>
                </div>
                <Table striped bordered hover responsive="md" className='my-3'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>姓名</th>
                            <th>性別</th>
                            <th style={{ whiteSpace: 'nowrap' }}>信箱</th>
                            <th>電話</th>
                            <th className='d-none d-sm-table-cell'>地址</th>
                            <th>建立日期</th>
                            <th>管理者</th>
                            <th>啟用</th>
                        </tr>
                    </thead>
                    <tbody>

                        {isLoading ? <tr> <td colSpan={8} className='text-center fs-3 py-5'> <Spinner animation="border" size="lg" /> 查詢中  </td> </tr> :
                            <> {
                                allUser.length > 0 ? allUser.map((each, index) => {
                                    return (
                                        <tr key={each._id}>
                                            <td>{index + 1}</td>
                                            <td>{each.username}</td>
                                            <td>{changeGender(each.gender)}</td>
                                            <td>{each.email}</td>
                                            <td>{each.phone}</td>
                                            <td>{each.address}</td>
                                            <td>{changeDate(each.createdAt)}</td>
                                            <td style={{ whiteSpace: 'nowrap' }} onClick={e => e.stopPropagation()}>
                                                <Form.Check type="switch" checked={isAdmin(each.role)} onChange={(e) => UpdateReadAuth(each._id, each.role, 'admin')} />
                                            </td>
                                            <td style={{ whiteSpace: 'nowrap' }} onClick={e => e.stopPropagation()}>
                                                <Form.Check type="switch" checked={each.is_active} onChange={(e) => UpdateReadAuth(each._id, each.is_active, 'active')} />
                                            </td>
                                        </tr>
                                    )
                                })
                                    :
                                    <tr>
                                        <td colSpan={8} className='text-center fs-3 py-5'> - 尚無使用者 - </td>
                                    </tr>
                            }
                            </>}

                    </tbody>
                </Table>


            </Container>
<SnackbarProvider />
        </div>
    )
}

export default UserManage