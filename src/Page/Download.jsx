import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Pagination, Badge, Table } from 'react-bootstrap';
import Finder from '../API/Finder';
import Lottie from 'lottie-react'
import pinned from '../assets/pinned.json'

function Download() {
    const finder = Finder()

     // 最多顯示10頁
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [allFile, setAllFile] = useState([])

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentNews = allFile.slice(startIndex, endIndex);
    const totalPages = Math.ceil(allFile.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    // 最多顯示10頁
    const startPage = Math.max(1, currentPage - 4);
    const endPage = Math.min(totalPages, startPage + 9);


    useEffect(() => {
        finder.get('/file')
            .then(data => {
                console.log(data.data)
                setAllFile(data.data)
            })
    }, [])


    function changeDate(date) {
        const temp = new Date(date)
        return temp.toLocaleString()
    }
    return (
        <div style={{ "minHeight": "70vh" }}>
            <Container>
                <div className='fs-3 py-4'>檔案下載</div>
                <div className='px-4'>
                    <Row>
                        <Col>
                            <div>
                                <Table striped  hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>名稱</th>
                                            <th>上傳時間</th>
                                            <th>下載</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentNews.map((file, index) => (
                                            <tr key={file._id} >
                                                <td >
                                                    {index + 1 + '.'}  {file.is_pinned && <Badge className='mx-2' bg="warning">New</Badge>}
                                                </td>
                                                <td>{file.name}</td>
                                                <td>{changeDate(file.updatedAt)}</td>
                                                <td>
                                                    <a rel="noreferrer" href={process.env.REACT_APP_BACKEND_URL + file.path} target='_blank'>Download</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='mt-auto d-flex justify-content-center py-4'>
                    <Pagination>
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        {[...Array(endPage - startPage + 1)].map((_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={startPage + index === currentPage}
                                onClick={() => handlePageChange(startPage + index)}
                            >
                                {startPage + index}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    </Pagination>
                </div>

            </Container>
        </div>
    )
}

export default Download