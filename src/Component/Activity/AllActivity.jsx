import React, { useState, useContext, useEffect } from 'react'
import { Badge, Carousel, Button, ButtonGroup, Card } from 'react-bootstrap'
import { Context } from '../../Contexts/Context'
import 'react-datepicker/dist/react-datepicker.css';
import defaultPhoto from '../../Image/logo.jpg'
import '../../index.css'
import Finder from '../../API/Finder';
import { useNavigate } from "react-router-dom";

function AllActivity({ allActivity }) {
    const { singleActivityId, setSingleActivityId } = useContext(Context)
    const [selectedType, setSelectedType] = useState(null)
    const [showActivity, setShowActivity] = useState([])

    const [options, setOptions] = useState({})

    const finder = Finder();
    const navigate = useNavigate();

    useEffect(() => {

        if (selectedType) {
            setShowActivity(allActivity.filter(each => each.activityType._id === selectedType))
        } else {
            setShowActivity(allActivity)
        }

    }, [selectedType])


    useEffect(() => {
        if (process.env.REACT_APP_STATIC === 'true') {
            setOptions([
                { value: 'option1', name: '世壯會' },
                { value: 'option2', name: '路跑' },
                { value: 'option3', name: '徵人' },
            ])
        } else {
            finder.get('/activity/type').then(data => {
                setOptions(data.data)
                console.log(data)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [])


    useEffect(() => {
        if (allActivity) {
            setShowActivity(allActivity)
        }
    }, [allActivity])

    function handleGoDetail(id) {
        navigate(`/activity/${id}`)
    }

    function changeDate(date) {
        const temp = new Date(date)
        return temp.toLocaleString()
    }
    return (
        <div className='pb-5'>
            <div className=' d-flex justify-content-center pb-4'>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="outline-secondary" onClick={() => setSelectedType(null)} active={selectedType === null}>全部</Button>
                    {options.length > 0 && options.map((each, index) => {
                        return (
                            <Button key={index} variant="outline-secondary" onClick={() => setSelectedType(each._id)} active={selectedType === each._id}>{each.name}</Button>
                        )
                    })}
                </ButtonGroup>

            </div>
            <div className='d-flex justify-content-start flex-wrap'>
                {
                    showActivity.length > 0 && showActivity.map(each => {
                        return (
                            <Card key={each._id} style={{ width: '24rem', cursor: "pointer" }} className='m-3 p-2' onClick={() =>  handleGoDetail(each._id)} >

                                {each.photo.length > 0 ?
                                    <Carousel controls={false}>
                                        {
                                            each.photo.map(path => {
                                                console.log(path)
                                                return (
                                                    <Carousel.Item key={path}>
                                                        {path && process.env.REACT_APP_STATIC === 'true' ?
                                                            <Card.Img className='p-2 pb-0' variant="top" src={path} fluid={true} style={{ height: '300px', objectFit: 'cover' }} />
                                                            :
                                                            <Card.Img src={process.env.REACT_APP_BACKEND_URL + path} fluid={true} className='p-2 pb-0' variant="top" style={{ height: '300px', objectFit: 'cover' }} />
                                                        }
                                                    </Carousel.Item>
                                                )
                                            })
                                        }
                                    </Carousel>
                                    :
                                    <Card.Img className='p-2 pb-0' variant="top" src={defaultPhoto} fluid={true} style={{ height: '300px', objectFit: 'cover' }} />

                                }
                                <Card.Body>
                                    {each.is_pinned &&
                                        <Badge bg="danger" text="dark" className='mb-3'>
                                            最新
                                        </Badge>
                                    }
                                    <Badge bg="info" text="dark" className='mb-3 mx-3'>
                                        {each.activityType.name}
                                    </Badge>
                                    <Card.Title> {each.title}</Card.Title>
                                    <Card.Text> 建立時間 : {changeDate(each.createdAt)}</Card.Text>
                                    {each.place !== 'null' &&  <Card.Text> 地點 : {each.place}</Card.Text>}
                                   

                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default AllActivity