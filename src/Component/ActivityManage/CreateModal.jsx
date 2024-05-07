import React, { useState, useEffect, useContext } from 'react'
import { Alert, Modal, Form, Spinner, Image, Button, Row, Col } from 'react-bootstrap';
import Finder from '../../API/Finder'
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { Context } from '../../Contexts/Context';

import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

function CreateModal({ show, handle }) {

    const [editor, setEditor] = useState(null)

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

    // 编辑器配置
    const editorConfig = {
        placeholder: '請輸入内容...',
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        console.log(editor)
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])



    const finder = Finder();
    const token = localStorage.getItem('token')


    const [read, setRead] = useState('all')
    const [title, setTitle] = useState('')
    const [type, setType] = useState('0')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState({})
    const [isPinned, setIsPinned] = useState(false)
    const [code, setCode] = useState(null)
    const [place, setPlace] = useState(null)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [allType, setAllType] = useState([])

    const [isCreate, setIsCreate] = useState(false)
    const { setManageAllActivity } = useContext(Context)
    const [photo, setPhoto] = useState([])

    function handleCreated() {
        console.log(description)
        if (type === '0') {
            setMessage({ message: '請選擇活動標籤', variant: 'danger' })
        } else {
            setIsCreate(true)
            const formData = new FormData();
            formData.append('title', title);
            formData.append('read', read);
            formData.append('activityType', type);
            formData.append('code', code);
            formData.append('place', place);
            formData.append('start_date', startDate);
            formData.append('end_date', endDate);
            formData.append('description', description);
            formData.append('is_pinned', isPinned);
            if (photo.length > 0) {
                photo.map(each => {
                    formData.append('photos', each.file);
                })
            }

            finder.post('/activity',
                formData,
                {
                    headers: {
                        Authorization: token,
                    }
                }
            )
                .then(data => {
                    if (!data) {
                        // 通常是403
                        handle()
                        setDescription('')
                        setIsPinned(false)
                        setTitle('')
                        console.error("An unknown error occurred");
                        enqueueSnackbar('活動建立失敗! 只有管理員可以新增活動', { variant: 'error' })
                        return;
                    }
                    console.log(data.data)
                    enqueueSnackbar('活動建立成功!', { variant: 'success' })
                    setDescription('')
                    setTitle('')
                    setIsPinned(false)
                    setMessage({ message: data.data.message, variant: 'success' })
                    handle()
                    setManageAllActivity(prev => [data.data.savedNews, ...prev]);
                })
                .catch(err => {
                    // if(err.message === "Request failed with status code 400" ){
                    setMessage({ message: err.response.data, variant: 'danger' })
                    enqueueSnackbar(`活動建立失敗! ${err.response.data}`, { variant: 'error' })
                    //}
                }).finally(() => setIsCreate(false))
        }
    }

    useEffect(() => {
        if (show) {
            setMessage({})
            finder.get('/activity/type', {
                headers: {
                    Authorization: token,
                }
            }).then(data => {
                setAllType(data.data)
                console.log(data)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [show])

    // 圖片處理
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
                setPhoto((prevImages) => [...prevImages, ...results]);
            })
            .catch((error) => {
                console.error('Error reading files:', error);
            });
    };
    const handleRemoveImage = (index) => {
        setPhoto((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            return updatedImages;
        });
    };
    return (
        <>
            <Modal centered show={show} onHide={handle} size='lg' >
                <Modal.Header closeButton>
                    <Modal.Title>活動建立</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-4'>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>標題</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                placeholder="請輸入標題"
                            />
                            <Form.Text muted>
                                標題最少6個字
                            </Form.Text>
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
                                        defaultConfig={editorConfig}
                                        value={description}
                                        onCreated={setEditor}
                                        onChange={editor => setDescription(editor.getHtml())}
                                        mode="default"
                                        style={{ height: '300px', overflowY: 'hidden' }}
                                    />
                                </div>
                            </div>

                            <Form.Text muted>
                                內文最少6個字
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>活動標籤</Form.Label>
                            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
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
                                name="group1"
                                value={true}
                                type='radio'
                                label='是'
                                onChange={(e) => setIsPinned(e.target.value === 'true')}
                            />

                            <Form.Check
                                inline
                                name="group1"
                                value={false}
                                type='radio'
                                label='否'
                                onChange={(e) => setIsPinned(e.target.value === 'true')}
                                defaultChecked
                            />
                        </Form.Group>
                        <Row className='my-2'>
                            <Col xs={2}>權限</Col>
                            <Col>
                                <Form.Select value={read} onChange={(e) => setRead(e.target.value)}>
                                    <option value="all">所有人</option>
                                    <option value="member">會員</option>
                                </Form.Select></Col>
                        </Row>
                        <Row  className='my-2'>
                            <Col xs={2}>
                                活動代號
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setCode(e.target.value)}
                                    value={code}
                                    placeholder="活動代號(選填)"
                                />
                            </Col>

                        </Row>
                        <Row  className='my-2'>
                            <Col xs={2}>
                                活動地點
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setPlace(e.target.value)}
                                    value={place}
                                    placeholder="活動地點(選填)"
                                />
                            </Col>
                        </Row>
                        <Row  className='my-2'>
                            <Col xs={2}><Form.Label>活動開始時間(選填)</Form.Label></Col>
                            <Col>
                                 <DateTimePicker onChange={(value) => setStartDate(value)} value={startDate} />
                            </Col>
                        </Row>
                        <Row  className='my-2'>
                            <Col xs={2}><Form.Label>活動結束時間(選填)</Form.Label></Col>
                            <Col>
                                <DateTimePicker onChange={(value) => setEndDate(value)} value={endDate} />
                            </Col>
                        </Row>
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>圖片(選填)</Form.Label>
                            <Form.Control type="file" multiple onChange={handleFileChange} />
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {photo.map((image, index) => (
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
                    {Object.keys(message).length !== 0 && <Alert variant={message.variant} >
                        {message.message}
                    </Alert>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handle}>
                        取消
                    </Button>
                    {
                        isCreate ?
                            <Button variant="primary" disabled>
                                <Spinner animation="border" size="sm" /> 新增中
                            </Button> :
                            <Button variant="primary" onClick={handleCreated}>
                                建立
                            </Button>
                    }

                </Modal.Footer>
            </Modal>
            <SnackbarProvider />
        </>
    )
}

export default CreateModal