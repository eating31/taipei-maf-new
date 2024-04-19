import React from 'react'
import { Dropdown, Container, Row, Col, NavDropdown } from 'react-bootstrap';
import test from '../../Image/test0.png';
function Related() {

    const reference = [test, test, test, test, test]

    return (

        // <div style={{backgroundColor:'#D9DCD6', minHeight: "75vh"}}>
        <div style={{minHeight: "50vh"}}>
            <Container>
                <div className='fs-3 p-4 fw-bold'> <mark style={{background: "linear-gradient(transparent 40%, rgba(255,255,255,0) 50%, lightblue 75%, lightblue 90%, transparent 95%)"}}>相關連結</mark></div>
                <div className='d-flex justify-content-center  flex-wrap'>
                    {reference.map((each,index) => {
                        return (
                            <img
                                key={index}
                                src={each}
                                alt="Logo"
                                className="img-fluid"
                                style={{ width: 'auto', height: '150px' }}
                            />
                        )
                    })}


                </div>

            </Container>
        </div>
    )
}

export default Related