import React, { useState, useContext, useEffect } from 'react'
import DatePicker from 'react-datepicker';
import { Pagination, Row, Spinner, Button, Col, Image, Form, Carousel, Badge } from 'react-bootstrap'
import { Context } from '../../Contexts/Context'
import 'react-datepicker/dist/react-datepicker.css';
import defaultPhoto from '../../Image/logo.jpg'
import { useNavigate } from "react-router-dom";
import Finder from '../../API/Finder';

function AllNew({ allNews }) {

    const { isLoading } = useContext(Context)

    const navigate = useNavigate();
    const finder = Finder();


    // search bar
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [options, setOptions] = useState([])
    const [showNews, setShowNews] = useState([])

    // 換頁的東西們
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentNews, setCurrentNews] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;


    useEffect(() => {
        setCurrentNews(showNews.slice(startIndex, endIndex))
        setTotalPages(Math.ceil(showNews.length / itemsPerPage))
    }, [showNews, startIndex])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    useEffect(() => {
        setShowNews(allNews)
    }, [allNews])

    useEffect(() => {
        if (process.env.REACT_APP_STATIC === 'true') {
            setOptions([
                { value: 'option1', name: '選項1' },
                { value: 'option2', name: '選項2' },
                { value: 'option3', name: '選項3' },
            ])
        } else {
            finder.get('/news/type').then(data => {
                setOptions(data.data)
                console.log(data)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [])


    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    function SearchNews() {

        if (startDate && endDate) {
            const temp = allNews.filter((news) => {
                const newsDate = new Date(news.news_update); // 假設每則公告有一個 date 屬性
                const matchDate = newsDate >= startDate && newsDate <= endDate;
                const matchCategory = !selectedOption || news.newsType === selectedOption;
                
                return matchDate && matchCategory;
            });
            setShowNews(temp)
            //頁數歸1
            setCurrentPage(1)
        } else {
            const temp = selectedOption ? allNews.filter(each => each.newsType._id === selectedOption) : allNews
            setShowNews(temp)
            //頁數歸1
            setCurrentPage(1)
        }

    }

    function handleGoDetail(id) {
        navigate(`/news/${id}`)
    }

    
  function changeDate(date) {
    const temp = new Date(date)
    return temp.toLocaleString()
  }

    return (
        <div>
            <div className='m-2 p-3 rounded-4 d-flex justify-content-start' style={{ backgroundColor: 'lightblue' }}>
                <Form className='w-100'>
                    <Row className="mb-1">
                        <Form.Group as={Col} md="4">
                            <Form.Label className='px-2 pe-4'>開始日期</Form.Label>
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                dateFormat="yyyy-MM-dd"
                                className="form-control my-2"
                            />

                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label className='px-2 pe-4'>結束日期</Form.Label>
                            <DatePicker
                                selected={endDate}
                                onChange={handleEndDateChange}
                                dateFormat="yyyy-MM-dd"
                                className="form-control my-2"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Row>
                                <Col md={5} xs={4} className='px-4 text-end pt-3'>
                                    <Form.Label>公告種類</Form.Label>
                                </Col>
                                <Col md={7} xs={8} >
                                    <Form.Select value={selectedOption} onChange={handleSelectChange} className='my-2'>
                                        <option value="">全部</option>
                                        {options.map((option) => (
                                            <option key={option._id} value={option._id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Col className='d-flex justify-content-center align-items-end my-2'>
                            <Button variant="light" onClick={SearchNews}>查詢</Button>
                        </Col>
                    </Row>
                </Form>

            </div>
            {/* 設定最小高度避免資料不足時footer往上跑 */}
            <div className='py-3'>
                {isLoading
                    ?
                    <p className='fs-3 text-center py-5'><Spinner animation="border" size="lg" /> 查詢中 </p>
                    :
                    <>
                        {currentNews.length > 0 ? <>
                            {currentNews.map(each => {
                                return (
                                    <div key={each._id}>
                                        <Row className='newsPointer mx-3 rounded-4' style={{ cursor: "pointer" }}>
                                            <Col xs={12} md={4} className='py-3 px-4'>
                                                {each.photo.length > 0 ?
                                                    <Carousel>
                                                        {
                                                            each.photo.map(path => {
                                                                //console.log(path)
                                                                return (
                                                                    <Carousel.Item key={path}>
                                                                        {path && process.env.REACT_APP_STATIC === 'true' ?
                                                                            <Image src={path} fluid style={{ height: '250px', width: "100%", objectFit: 'cover' }} />
                                                                            :
                                                                            <Image src={process.env.REACT_APP_BACKEND_URL + path} fluid style={{ height: '250px', width: "100%", objectFit: 'cover' }} />
                                                                        }
                                                                    </Carousel.Item>
                                                                )
                                                            })
                                                        }
                                                    </Carousel>
                                                    :
                                                    <Image src={defaultPhoto} fluid style={{ height: '250px', width: "100%", objectFit: 'cover' }} />
                                                }

                                            </Col>
                                            <Col xs={12} md={8} className='py-3 px-4' onClick={() => handleGoDetail(each._id)}>
                                                <div className='fs-3 pb-3'>
                                                     {each.is_pinned && <Badge className='mx-2' bg="warning">New</Badge>} {each.title} 
                                                </div>
                                                <p>發布日期 : {changeDate(each.news_update)}</p>
                                                <div style={{ overflowWrap: "break-word", height: '200px', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: each.description }}>

                                                </div>
                                            </Col>
                                        </Row>
                                        <hr></hr>
                                    </div>
                                )
                            })} </>
                            :
                            <p className="text-center fs-3"> - 查無資料 - </p>
                        }
                    </>
                }
            </div>
            <div className='d-flex justify-content-center'>
                <Pagination>
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                </Pagination>
            </div>
        </div>
    )
}

export default AllNew