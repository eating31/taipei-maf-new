import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, Image, Spinner, Col, Row, Alert } from 'react-bootstrap';
import { enqueueSnackbar,  SnackbarProvider } from 'notistack';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import Finder from '../../API/Finder';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
function UpdateModal({ show, handle, detail }) {

    const [editor, setEditor] = useState(null)
    const [allType, setAllType] = useState([])



    // 工具栏配置，移除下方工具（有些html無法渲染）
    const toolbarConfig = {
        excludeKeys: [
            'blockquote',
            'todo',
            'codeBlock',
            'fontSize',
            'fontFamily',
            'lineHeight',
            'insertTable',
            'group-more-style',
            'group-indent',
            'group-image',
            'group-video',
        ]
    }

    const finder = Finder()
    const [newsData, setNewsData] = useState({});

    const [isEdit, setIsEdit] = useState(false)


    useEffect(() => {
        console.log(detail)
        if (detail) {
            console.log(detail)
            const initialUserData = {
                title: detail.title,
                description: detail.description,
                code: detail.code,
                place: detail.place,
                start_date: detail.start_date,
                end_date: detail.end_date,
                read: detail.read,
                is_pinned: detail.is_pinned,
                type: detail.type,

            };

            setNewsData(initialUserData)
        }
    }, [detail]);


    function getAllType() {

        finder.get('/activity/type', {
            headers: {
                Authorization: localStorage.getItem('token'),
            }
        }).then(data => {
            setAllType(data.data)
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllType()
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setNewsData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const handleDescriptionChange = (value) => {
        setNewsData((prevUserData) => ({
            ...prevUserData,
            description: value,
        }));
    };

    const handleTypeChange = (value) => {
        setNewsData((prevUserData) => ({
            ...prevUserData,
            type: value,
        }));
    };


    const [images, setImages] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // 使用 Promise.all 來處理多個圖片的非同步讀取
        Promise.all(
            selectedFiles.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        resolve({ file, previewURL: e.target.result });
                    };

                    reader.onerror = (error) => {
                        reject(error);
                    };

                    reader.readAsDataURL(file);
                });
            })
        )
            .then((results) => {
                // 在這裡處理 results，每個元素包含 { file, previewURL }
                setImages((prevImages) => [...prevImages, ...results]);
            })
            .catch((error) => {
                console.error('Error reading files:', error);
            });
    };
    const handleRemoveImage = (index) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };


    function handleSave() {
        setIsEdit(true)
        finder.patch('/activity',
            {
                _id: detail._id,
                title: newsData.title,
                description: newsData.description,
                read: newsData.read,
                code: newsData.code,
                place: newsData.place,
                start_date: newsData.start_date,
                end_date: newsData.end_date,
                is_pinned: newsData.is_pinned,
                type: newsData.type,
                activity_update: new Date()
            }, {
            headers: {
                Authorization: localStorage.getItem('token')
            },
        }

        ).then(data => {

            console.log(data)
            // to do 活動成功顯示不出來
            window.location.reload()

            enqueueSnackbar('活動更新成功!', { variant: 'success' })
        }).catch(err => {
            enqueueSnackbar(`活動更新失敗! ${err.response.data.message}`, { variant: 'error' })
        })
            .finally(() => setIsEdit(false))
    }

    return (
<>
        <Modal centered show={show} onHide={handle} size='lg' >
            <Modal.Header closeButton>
                <Modal.Title>活動建立</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>
                {detail &&
                    <>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>標題</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newsData.title}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>內文</Form.Label>
                                <div className='p-2'>
                                    <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                                        <Toolbar
                                            editor={editor}
                                            defaultConfig={toolbarConfig}
                                            mode="default"
                                            style={{ borderBottom: '1px solid #ccc' }}
                                        />
                                        <Editor
                                            value={newsData.description}
                                            onCreated={setEditor}
                                            onChange={editor => handleDescriptionChange(editor.getHtml())}
                                            mode="default"
                                            style={{ height: '300px', overflowY: 'hidden' }}
                                        />
                                    </div>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>活動標籤</Form.Label>
                                <Form.Select value={newsData.type} onChange={(e) => handleTypeChange(e.target._id)}>
                                    <option value="0" disabled>請選擇活動標籤</option>
                                    {allType.length > 0 && allType.map(each => {
                                        return (
                                            <option value={each._id} key={each._id}>{each.name}</option>
                                        )
                                    })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className='pe-4'>是否釘選在首頁</Form.Label>
                                <Form.Check
                                    inline
                                    name="is_pinned"
                                    value={true}
                                    type='radio'
                                    label='是'
                                    onChange={handleChange}
                                    defaultChecked={newsData.is_pinned}
                                />

                                <Form.Check
                                    inline
                                    name="is_pinned"
                                    value={false}
                                    type='radio'
                                    label='否'
                                    onChange={handleChange}
                                    defaultChecked={!newsData.is_pinned}
                                />
                            </Form.Group>
                            <Row className='my-2'>
                                <Col xs={2}>權限</Col>
                                <Col>
                                    <Form.Select name="read" value={newsData.read} onChange={handleChange}>
                                        <option value="all">所有人</option>
                                        <option value="member">會員</option>
                                    </Form.Select></Col>
                            </Row>
                            <Row className='my-2'>
                                <Col xs={2}>
                                    活動代號
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        name="code"
                                        value={newsData.code}
                                        onChange={handleChange}
                                        placeholder="活動代號(選填)"
                                    />
                                </Col>

                            </Row>
                            <Row className='my-2'>
                                <Col xs={2}>
                                    活動地點
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        name="place"
                                        onChange={handleChange}
                                        value={newsData.place}
                                        placeholder="活動地點(選填)"
                                    />
                                </Col>
                            </Row>
                            <Row className='my-2'>
                                <Col xs={2}><Form.Label>活動開始時間(選填)</Form.Label></Col>
                                <Col>
                                    <DateTimePicker onChange={(value) => setNewsData((prevUserData) => ({
                                        ...prevUserData,
                                        'start_date': value,
                                    }))} value={newsData.start_date} />
                                </Col>
                            </Row>
                            <Row className='my-2'>
                                <Col xs={2}><Form.Label>活動結束時間(選填)</Form.Label></Col>
                                <Col>
                                    <DateTimePicker onChange={(value) => setNewsData((prevUserData) => ({
                                        ...prevUserData,
                                        'end_date': value,
                                    }))} value={newsData.end_date} />
                                </Col>
                            </Row>
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                {detail.photo.length > 0 &&
                                    <>
                                        <p className='mb-2'>圖片</p>
                                        <PhotoProvider maskOpacity={0.5}>
                                            <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }} >
                                                {detail.photo.map((item, index) => {
                                                    return (
                                                        <PhotoView key={index} src={process.env.REACT_APP_BACKEND_URL + item}>
                                                            <Image className='me-4' src={process.env.REACT_APP_BACKEND_URL + item} alt="item" fluid style={{ height: '150px', width: "150px", objectFit: 'cover' }} />
                                                        </PhotoView>
                                                    )
                                                })}
                                            </div>
                                        </PhotoProvider>
                                    </>
                                }
                                <p classNamep="pt-3">新增圖片</p>
                                <input type="file" multiple onChange={handleFileChange} ></input>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {images.map((image, index) => (
                                        <div key={index} style={{ margin: '8px', position: 'relative' }}>
                                            <button
                                                onClick={() => handleRemoveImage(index)}
                                                style={{
                                                    position: 'absolute',
                                                    top: '4px',
                                                    right: '4px',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: 'red',
                                                    fontSize: '18px',
                                                }}
                                            >
                                                &times;
                                            </button>
                                            <img
                                                src={image.previewURL}
                                                alt={`Preview ${index}`}
                                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Form.Group>
                        </Form>

                    </>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handle}>
                    取消
                </Button>
                {
                    isEdit ?
                        <Button variant="warning" disabled>
                            <Spinner animation="border" size="sm" /> 修改中
                        </Button> :
                        <Button variant="warning" onClick={handleSave}>
                            確定修改
                        </Button>
                }
            </Modal.Footer>
        </Modal>
          <SnackbarProvider />
        </>
    )
}

export default UpdateModal