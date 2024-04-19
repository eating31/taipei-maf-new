import React, { useEffect, useContext, useState } from 'react'
import { Button, Carousel, Image, Container } from 'react-bootstrap';
import { Context } from '../../Contexts/Context'
import Finder from '../../API/Finder'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function SingleActivity({ }) {
    let { id } = useParams();

    const finder = Finder();

    //找對應公告的index
    const [newIndex, setNewIndex] = useState(null)
    const [allNews, setAllNews] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        // 靜態網頁測試版
        if (process.env.REACT_APP_STATIC === 'true') {
            console.log('do nothing')
            //setAllNews(tempNllNews)
        } else {
            finder.get('/activity',
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    }
                }
            ).then(data => {
                console.log(data.data)
                setAllNews(data.data)
                setNewIndex(data.data.findIndex(news => news._id == id))
            }).catch(err => console.log(err))
        }

    }, [id])

    useEffect(() => {
        console.log(newIndex)
        //確定有該公告且閱覽超過五秒才會算點閱數
        if (newIndex >= 0) {
            setTimeout(() => {
                finder.post('/activity/clicked', { _id: id })
                    .then(data => {
                        console.log(data)
                    }).catch(err => {
                        console.log(err)
                    })
            }, [5000])
        }
    }, [newIndex])


    function changeDate(date) {
        const temp = new Date(date)
        return temp.toLocaleString()
    }

    return (
        <div style={{ minHeight:'70vh'}}>
            <Container >
                {newIndex >= 0 &&
                    <div>
                        {allNews.map((each, index) => {
                            if (each._id === id) {
                                return (
                                    <>
                                        <Button className='mt-3' variant="" style={{ textDecoration: 'none' }} onClick={() => navigate('/activity')}> {'<'} 返回</Button>

                                        <div className='d-flex justify-content-between py-3'>
                                            <p className='fs-2'> {each.title}</p>
                                            {/* 開始報名(disable) */}
                                            {/* <Button variant="info" className="text-white" onClick={() => handleGoRegister(each.code)}> 開始報名</Button> */}
                                        </div>

                                        <div className='rounded-4 border p-4 mb-5 fs-5' style={{ backgroundColor: "rgba(129, 195, 215, 0.5)" }}>
                                            <div className='d-flex justify-content-start'>
                                                <p className='pe-3'>閱讀次數 : {each.clicked}</p>
                                                <p>發布時間 : {changeDate(each.activity_update)}</p>
                                                {each.place !== 'null' && <p> 地點 ：{each.place}</p>}
                                            </div>

                                            <div className='pt-3' style={{ overflowWrap: "break-word" }} dangerouslySetInnerHTML={{ __html: each.description }} />
                                            {
                                                each.photo.length >0 &&
                                            
                                                <PhotoProvider maskOpacity={0.5}>
                                                <Carousel>
                                                    {each.photo.map((path, index) => {
                                                        return (

                                                            <Carousel.Item key={index}>
                                                                <PhotoView key={index} src={process.env.REACT_APP_BACKEND_URL + path}>
                                                                    <Image src={process.env.REACT_APP_BACKEND_URL + path} fluid={true} style={{ height: 'auto', width: "100%", objectFit: 'cover' }} />
                                                                </PhotoView>
                                                            </Carousel.Item>

                                                        )
                                                    })}
                                                </Carousel>
                                            </PhotoProvider>
                                            }
                                        </div>

                                    </>
                                )
                            }
                        })}

                    </div>

                }
            </Container>
        </div>
    )
}

export default SingleActivity