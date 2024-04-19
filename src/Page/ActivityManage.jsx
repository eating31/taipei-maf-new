import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Spinner, Form, Image, Table, Button, Carousel } from 'react-bootstrap';
import { Context } from '../Contexts/Context';
import test from '../Image/test.jpg'
import test0 from '../Image/test0.png'
import test1 from '../Image/logo.jpg'
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import CreateModal from '../Component/ActivityManage/CreateModal'
import DetailModal from '../Component/ActivityManage/DetailModal'
import Finder from '../API/Finder';
import DeleteModal from '../Component/ActivityManage/DeleteModal';
import UpdateModal from '../Component/ActivityManage/UpdateModal';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';


import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import CreateActivityTypeModal from '../Component/ActivityManage/CreateActivityTypeModal';
//import UpdateModal from '../Component/ActivityManage/UpdateModal';

function ActivityManage() {
    const finder = Finder();

    const token = localStorage.getItem('token')
    const [createdModal, setCreateModal] = useState(false)
    const [detailModal, setDetailModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [createActivityTypeModal, setCreateActivityTypeModal] = useState(false)

    const [detail, setDetail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)


    const { manageAllActivity, setManageAllActivity } = useContext(Context)

    function handleModal() {
        setCreateModal(false)
        setDetailModal(false)
        setDeleteModal(false)
        setUpdateModal(false)
        setCreateActivityTypeModal(false)
    }

    function OpenDetailModal(each) {
        console.log('1243')
        setDetail(each)
        setDetailModal(true)
    }

    function OpenDeleteModal(each) {
        setDeleteModal(true)
        setDetail(each)
    }

    function OpenUpdateModal(each) {
        setUpdateModal(true)
        setDetail(each)
    }

    function changeDate(date) {
        const temp = new Date(date)
        return temp.toLocaleString()
    }

    // 更新閱覽權限
    function UpdateReadAuth(id, e) {
        finder.patch('/activity/read',
            {
                _id: id,
                read: e.target.value
            }, {
            headers: {
                Authorization: token
            },
        }
        ).then(data => {
            //更新公告
            const newArray = manageAllActivity.map(obj => {
                // 如果物件的 id 符合，則用更新後的data 取代
                if (obj._id === id) {
                    return data.data.updatedNew;
                }
                // 否則保持原樣
                return obj;
            });
            setManageAllActivity(newArray);
            enqueueSnackbar('公告權限更新成功!', { variant: 'success' })
        }).catch(err => {
            enqueueSnackbar(`公告權限更新失敗! ${err.response.data.message}`, { variant: 'error' })
        })
            .finally(() => setIsLoading(false))
    }

    // 更新是否釘選
    function UpdatePinned(id, is_pinned) {
        finder.patch('/activity/pinned',
            {
                _id: id,
                is_pinned: !is_pinned
            }, {
            headers: {
                Authorization: token
            },
        }
        ).then(data => {
            const newArray = manageAllActivity.map(obj => {
                // 如果物件的 id 符合，則用更新後的data 取代
                if (obj._id === id) {
                    return data.data.updatedNew;
                }
                // 否則保持原樣
                return obj;
            });
            setManageAllActivity(newArray);
            enqueueSnackbar('公告釘選狀態更新成功!', { variant: 'success' })
        }).catch(err => {
            enqueueSnackbar(`公告釘選狀態更新失敗! ${err.response.data.message}`, { variant: 'error' })
        })
            .finally(() => setIsLoading(false))
    }

    const tempManageAllActivity = [{ "_id": 1, "triggerBy": { "username": "emma" }, "type": "活動", "read": "all", "createdAt": "2024-01-18", "updatedAt": "2024-01-18", "clicked": 0, "photo": [], "title": "新聞360》中共選後露真面目！專家曝「這理由」台海局勢惡化機率小", "description": "dshjkhjsdgv" },
    { "_id": 2, "triggerBy": { "username": "emma" }, "type": "活動", "read": "all", "createdAt": "2024-01-18", "updatedAt": "2024-01-18", "clicked": 0, "photo": [test0, test1], "title": "北京奪走諾魯 駐美代表俞大㵢：只會增加台灣人反感", "description": "〔中央社〕諾魯共和國日前宣布與台灣斷交並與中國建交，駐美代表俞大㵢表示，北京想要將台灣納為己有的目標不會達成，北京透過奪走台灣邦交國的做法，只會讓台灣人民感受更加負面前白宮國安會台灣、中國與蒙古事務主任簡以榮（Ivan Kanapathy）在回覆中央社郵件詢問對諾魯在大選後立即宣布與台灣斷交的看法時表示，樂見美國國務院就諾魯的決定發出聲明，相信這有助於阻止更多案例發生。" },
    { "_id": 3, "triggerBy": { "username": "emma" }, "type": "活動", "read": "member", "createdAt": "2024-01-18", "updatedAt": "2024-01-18", "clicked": 0, "photo": [], "title": "繼中國降價後 特斯拉也在歐洲多國下調Model Y價格", "description": "綜合媒體報導，特斯拉週二（16日）晚間調降銷往包括德國、法國、挪威、荷蘭、丹麥等歐洲多國的Model Y汽車的價格。" },
    { "_id": 4, "triggerBy": { "username": "emma" }, "type": "活動", "read": "all", "createdAt": "2024-01-18", "updatedAt": "2024-01-18", "clicked": 0, "photo": [test1], "title": "城堡風再起！ 嘉義大埔美新增迪士尼風城堡", "description": "〔記者蔡宗勳／嘉義報導〕嘉義縣大林大埔美精密機械園區又被新城堡搶盡鋒頭，不讓歐風佐登妮絲城堡與希臘風蓋婭莊園專美於前，走迪士尼風的「歐樂沃築夢城堡」即將登場，這家巧克力觀光工廠是大林鄉親翰億董事長毛榮海投資打造，預料將再掀起一波城堡旅遊打卡熱潮。" },
    { "_id": 5, "triggerBy": { "username": "emma" }, "type": "活動", "read": "member", "createdAt": "2024-01-18", "updatedAt": "2024-01-18", "clicked": 0, "photo": [test0], "title": "在英國Herne Bay海邊吃炸魚薯條能有多浪漫？！在海邊也會遇見你不知道致命的危險！", "description": "英國炸魚是鱈魚，鱈魚在台灣會比較貴一點，但是這個是英國北部蘇格蘭那邊的鱈魚，價格大概839元台幣，兩個人吃很划算。" },
    { "_id": 6, "triggerBy": { "username": "emma" }, "type": "活動", "read": "all", "createdAt": "2024-01-18", "updatedAt": "2024-01-18", "clicked": 0, "photo": [test], "title": "台南學測考生不到1萬人 明14:00~16:00開放看考場", "description": "〔記者洪瑞琴／台南報導〕大學入學考試中心學科能力測驗1月20日到22日舉行，台南一考區應考人數7854人、台南二考區則有1254名考生，共9108人。考場分別設在台南一中、台南二中、台南女中、家齊高中、長榮中學、新營高中，明（19）日下午2點到4點開放查看試場。" }]


    useEffect(() => {
        // 靜態網頁測試版
        if (process.env.REACT_APP_STATIC === 'true') {
            setManageAllActivity(tempManageAllActivity)
            setIsLoading(false)
        } else {
            finder.get('/activity', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                }
            }).then(data => {
                console.log(data.data)
                setManageAllActivity(data.data)
                setIsLoading(false)
            }).catch(err => console.log(err))
                .finally(() => setIsLoading(false))
        }

    }, [])

    return (
        <div style={{ "minHeight": "75vh" }}>
            {/* 設定最小高度避免資料不足時footer往上跑 */}
            <Container >
                <Button variant="link" className='pt-3 pb-0' href='/manage'>--返回--</Button>
                <div className='d-flex justify-content-between my-2'>
                    <div className='fs-3'>活動管理</div>
                    <div>
                        <Button className='mt-3 mx-4' onClick={() => setCreateActivityTypeModal(true)}>活動種類管理</Button>
                        <Button className='mt-3' onClick={() => setCreateModal(true)}>建立活動</Button>
                    </div>

                </div>
                <Table striped bordered hover responsive="md">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>標題</th>
                            <th>釘選</th>
                            <th style={{ whiteSpace: 'nowrap' }}>點擊</th>
                            <th className='d-none d-sm-table-cell' >圖片</th>
                            <th>權限</th>
                            <th>建立日期</th>
                            <th>更新日期</th>
                            <th>管理</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? <tr> <td colSpan={8} className='text-center fs-3 py-5'> <Spinner animation="border" size="lg" /> 查詢中  </td> </tr> :
                            <> {
                                manageAllActivity.length > 0 ? manageAllActivity.map((each, index) => {
                                    return (
                                        <tr key={each._id} onClick={() => OpenDetailModal(each)}>
                                            <td>{index + 1}</td>
                                            <td>{each.title}</td>
                                            <td style={{ whiteSpace: 'nowrap' }} onClick={e => e.stopPropagation()}>
                                                <Form.Check type="switch" checked={each.is_pinned} onChange={(e) => UpdatePinned(each._id, each.is_pinned)} />
                                            </td>
                                            <td>{each.clicked}</td>

                                            <td className='d-none d-sm-table-cell' onClick={(e) => e.stopPropagation()}>
                                                {each.photo.length > 0 &&
                                                    <PhotoProvider maskOpacity={0.5} toolbarRender={({ rotate, onRotate }) => {
                                                        return <svg className="PhotoView-Slider__toolbarIcon" onClick={() => onRotate(rotate + 90)} />;
                                                    }}>
                                                        <Carousel slide={false}>
                                                            {each.photo.map((item, index) => {
                                                                return (
                                                                    <Carousel.Item key={item}>
                                                                        <PhotoView key={index} src={process.env.REACT_APP_BACKEND_URL + item}>
                                                                            <Image src={process.env.REACT_APP_BACKEND_URL + item} alt="item" fluid style={{ height: '200px', width: "100%", objectFit: 'cover' }} />
                                                                        </PhotoView>
                                                                    </Carousel.Item>
                                                                )
                                                            })}
                                                        </Carousel>
                                                    </PhotoProvider>


                                                }
                                                {/* {each.photo[0] &&<Image src={process.env.REACT_APP_BACKEND_URL+each.photo[0]} fluid style={{ height: '250px', width: "auto", objectFit: 'cover' }} /> } */}
                                            </td>

                                            <td style={{ whiteSpace: 'nowrap' }} onClick={e => e.stopPropagation()}>
                                                <Form.Select value={each.read} onChange={(e) => UpdateReadAuth(each._id, e)}>
                                                    <option value="all">所有人</option>
                                                    <option value="member">會員</option>
                                                </Form.Select>
                                            </td>
                                            <td>{changeDate(each.createdAt)}</td>
                                            <td>{changeDate(each.activity_update)}</td>
                                            <td style={{ whiteSpace: 'nowrap' }}><FaRegEdit size={25} onClick={(e) => { e.stopPropagation(); OpenUpdateModal(each) }} /> <MdDelete size={30} style={{ "color": "red" }} onClick={(e) => { e.stopPropagation(); OpenDeleteModal(each) }} /></td>
                                        </tr>
                                    )
                                })
                                    :
                                    <tr>
                                        <td colSpan={9} className='text-center fs-3 py-5'> - 尚無活動 - </td>
                                    </tr>
                            }
                            </>}

                    </tbody>
                </Table>
                <SnackbarProvider />

                <CreateActivityTypeModal show={createActivityTypeModal} handle={handleModal} />
                {createdModal &&
                    <CreateModal show={createdModal} handle={handleModal} />
                }

                {detailModal &&
                    <DetailModal show={detailModal} handle={handleModal} detail={detail} />
                }

                {deleteModal &&
                    <DeleteModal show={deleteModal} handle={handleModal} detail={detail} />
                }

                {updateModal &&
                    <UpdateModal show={updateModal} handle={handleModal} detail={detail} />
                }

            </Container>

        </div>
    )
}

export default ActivityManage