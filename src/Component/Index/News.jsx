import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap';
import '../../index.css'
import Finder from '../../API/Finder';
import { useNavigate } from "react-router-dom";

function News() {

    const finder = Finder()
    const [allNews, setAllNews] = useState([])
    const [allActivity, setAllActivity] = useState([])

    const navigate = useNavigate();

    // 靜態網頁測試版
    useEffect(() => {
            finder.get('/news/index',
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    }
                }
            ).then(data => {
                console.log(data.data)
                setAllNews(data.data)
            }).catch(err => {
                console.log(err)
            })

            finder.get('/activity/index',
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    }
                }
            ).then(data => {
                console.log(data.data)
                setAllActivity(data.data)
            }).catch(err => {
                console.log(err)
            })

            //.finally(() => setIsLoading(false))
    }, [])

    function handleGoNewsDetail(id) {
        navigate(`/news/${id}`)
    }

    function handleGoActivityDetail(id) {
        navigate(`/activity/${id}`)
    }


    return (
        <div className='py-5'>
            <Container>
                <div className='fs-3 p-4  fw-bold'> <mark style={{ background: "linear-gradient(transparent 40%, rgba(255,255,255,0) 50%, lightblue 75%, lightblue 90%, transparent 95%)" }}>最新消息</mark></div>
                <Row className='px-5'>
                    <Col xs={12} md={6} className='px-0 px-md-5'>
                        <div className='py-3'>
                            <p className='fs-5'>活動資訊</p>
                            <Table striped>
                                <tbody>
                                    {allActivity.map(each => {
                                        return (
                                            <tr key={each.title} onClick={() =>handleGoActivityDetail(each._id)} style={{ cursor: 'pointer'}}>
                                                <td className="text-nowrap"> {each.activity_update.slice(0,10)}</td>
                                                <td>{each.title}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col xs={12} md={6} className='px-0 px-md-5'>
                        <div className='py-3'>
                            <p className='fs-5'>訊息公告</p>
                            <Table striped>
                                <tbody>
                                    {allNews.map(each => {
                                        return (
                                            <tr key={each.title} onClick={() =>handleGoNewsDetail(each._id)} style={{ cursor: 'pointer'}}>
                                                <td> {each.news_update.slice(0,10)}</td>
                                                <td>{each.title}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default News