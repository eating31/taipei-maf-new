import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';

function Manage() {
    return (
        <div style={{ "minHeight": "70vh" }}>
            {/* 設定最小高度避免資料不足時footer往上跑 */}
            <Container >
                <Row className='pt-5 justify-content-md-center'>
                    <Col  md="auto">
                    <Card style={{ width: '18rem' }} className='m-4 py-3'>
                        <Card.Body>
                            <Card.Title>公告管理</Card.Title>
                            <Card.Text className='pt-2'>
                                新增、修改、編輯相關公告
                            </Card.Text>
                            <Card.Link href="/manage/news">前往頁面</Card.Link>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col  md="auto">
                    <Card style={{ width: '18rem' }} className='m-4 py-3'>
                        <Card.Body>
                            <Card.Title>活動管理</Card.Title>
                            <Card.Text className='pt-2'>
                                新增、修改、編輯相關公告
                            </Card.Text>
                            <Card.Link href="/manage/activity">前往頁面</Card.Link>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col  md="auto">
                    <Card style={{ width: '18rem' }} className='m-4 py-3'>
                        <Card.Body>
                            <Card.Title>使用者管理</Card.Title>
                            <Card.Text className='pt-2'>
                                管理使用者權限、修改使用者資料
                            </Card.Text>
                            <Card.Link href="/manage/user">前往頁面</Card.Link>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col  md="auto">
                    <Card style={{ width: '18rem' }} className='m-4 py-3'>
                        <Card.Body>
                            <Card.Title>檔案管理</Card.Title>
                            <Card.Text className='pt-2'>
                                上傳、更新檔案
                            </Card.Text>
                            <Card.Link href="/manage/file">前往頁面</Card.Link>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Manage