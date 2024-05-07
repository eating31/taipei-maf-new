import React, { useContext, useState, useEffect } from 'react'
import { Dropdown, Container, Nav, Navbar, NavDropdown, Alert } from 'react-bootstrap';
import { Context } from '../../Contexts/Context';
import Login from './Login';
import Logo from '../../Image/navbarLogo.png'
import { BsWifiOff } from "react-icons/bs";
import { VscError } from "react-icons/vsc";
import { RiSignalWifiErrorLine } from "react-icons/ri";

function TopNavbar() {
    const { setLoginModal, isConnected, setIsConnected, connectedMessage, setConnectedMessage } = useContext(Context)
    const [brandHeight, setBrandHeight] = useState(60);
    const name = localStorage.getItem('name')
    const token = localStorage.getItem('token')
    const [role, setRole] = useState('')

    function signOut() {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        alert('登出成功')
        window.location.assign('/')
    }

    const decodeJwt = (token) => {
        // 将token通过`.`分割成数组，取第二个元素（payload部分）
        const payloadBase64 = token.split('.')[1];
        // 使用atob解码Base64字符串
        const decodedPayload = window.atob(payloadBase64);
        // 将解码后的JSON字符串转换成对象
        const payloadObj = JSON.parse(decodedPayload);

        return payloadObj.role;
    };

    useEffect(() => {
        if(token){
            setRole(decodeJwt(token))
        }
        

        // 監聽視窗寬度變化，根據視窗寬度修改 Brand 的高度
        const handleResize = () => {
            if (window.innerWidth <= 992) {
                setBrandHeight(35);
            } else {
                setBrandHeight(60);
            }
        };

        window.addEventListener('resize', handleResize);

        // 初始設定
        handleResize();

        // 清除事件監聽
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand className="p-0" href="/">
                        <img
                            alt="logo"
                            src={Logo}

                            height={brandHeight}
                            className="d-inline-block align-center"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="my-2 ms-auto fs-5 px-3">
                            <NavDropdown title="關於本會" className='px-3'>
                                <NavDropdown.Item href="/about/體總簡介">體總簡介</NavDropdown.Item>
                                <NavDropdown.Item href="/about/會長簡介">會長簡介</NavDropdown.Item>
                                
                                <NavDropdown title="體總組織" drop='end' className='ps-sm-2 ps-3'>
                                    <Dropdown.Item href="/about/體總組織/副會長">副會長</Dropdown.Item>
                                    <Dropdown.Item href="/about/體總組織/理監事">理監事</Dropdown.Item>
                                    <Dropdown.Item href="/about/體總組織/顧問群">顧問群</Dropdown.Item>
                                    <Dropdown.Item href="/about/體總組織/幹事部">幹事部</Dropdown.Item>
                                </NavDropdown>
                                <NavDropdown.Item href="/about/組織章程">組織章程</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/download" className='px-3'>檔案下載</Nav.Link>
                            <Nav.Link href="/news" className='px-3'>訊息公告</Nav.Link>
                            <Nav.Link href="/activity" className='px-3'>最新活動</Nav.Link>
                            <NavDropdown title="相關資源" className='px-3'>
                                <NavDropdown title="體育會" drop='end' className='ps-sm-2 ps-3'>
                                    <Dropdown.Item href="#action7">子選單項目1</Dropdown.Item>
                                    <Dropdown.Item href="#action8">子選單項目2</Dropdown.Item>
                                    <Dropdown.Item href="#action7">子選單項目1</Dropdown.Item>
                                    <Dropdown.Item href="#action8">子選單項目2</Dropdown.Item>
                                    <Dropdown.Item href="#action7">子選單項目1</Dropdown.Item>
                                    <Dropdown.Item href="#action8">子選單項目2</Dropdown.Item>
                                    <Dropdown.Item href="#action7">子選單項目1</Dropdown.Item>
                                    <Dropdown.Item href="#action8">子選單項目2</Dropdown.Item>
                                    <Dropdown.Item href="#action7">子選單項目1</Dropdown.Item>
                                    <Dropdown.Item href="#action8">子選單項目2</Dropdown.Item>
                                    <Dropdown.Item href="#action7">子選單項目1</Dropdown.Item>
                                    <Dropdown.Item href="#action8">子選單項目2</Dropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="運動中心" drop='end' className='ps-sm-2 ps-3'>
                                    <Dropdown.Item href="#action7">子選單項目1</Dropdown.Item>
                                    <Dropdown.Item href="#action8">子選單項目2</Dropdown.Item>
                                    <Dropdown.Item href="#action7">子選單項目1</Dropdown.Item>
                                    <Dropdown.Item href="#action8">子選單項目2</Dropdown.Item>
                                    <Dropdown.Item href="#action7">子選單項目1</Dropdown.Item>
                                    <Dropdown.Item href="#action8">子選單項目2</Dropdown.Item>
                                    <Dropdown.Item href="#action7">子選單項目1</Dropdown.Item>
                                    <Dropdown.Item href="#action8">子選單項目2</Dropdown.Item>
                                    <Dropdown.Item href="#action7">子選單項目1</Dropdown.Item>
                                    <Dropdown.Item href="#action8">子選單項目2</Dropdown.Item>
                                    <Dropdown.Item href="#action7">子選單項目1</Dropdown.Item>
                                    <Dropdown.Item href="#action8">子選單項目2</Dropdown.Item>
                                </NavDropdown>
                                <NavDropdown.Item href="/source/協會">協會</NavDropdown.Item>
                                <NavDropdown.Item href="/source/委員會">委員會</NavDropdown.Item>

                            </NavDropdown>
                            <Nav.Link className='px-3' target="_blank" href="https://www.facebook.com/profile.php?id=100094196177790" >
                                活動剪影
                            </Nav.Link>
                            {!name ? <Nav.Link className='px-3' onClick={() => setLoginModal(true)} >
                                會員登入
                            </Nav.Link> :
                                <NavDropdown title={`HI, ${name}`} className='px-3'>
                                    <NavDropdown.Item href="/profile">個人資料</NavDropdown.Item>
                                    {
                                        role === 'admin' && <NavDropdown.Item href="/manage">管理</NavDropdown.Item>
                                    }

                                    <NavDropdown.Item onClick={signOut}>登出</NavDropdown.Item>
                                </NavDropdown>
                            }
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* 連線不穩處理 */}
            <Alert show={!isConnected} variant='danger' className='m-5' onClose={() => setIsConnected(true)} dismissible>
                {connectedMessage === '網路不佳，請再次嘗試!' && <BsWifiOff size={20} />}
                {connectedMessage === '您已斷線!' && <RiSignalWifiErrorLine size={20} />}
                {connectedMessage === '權限錯誤!' && <VscError size={20} />}
                {connectedMessage}   <Alert.Link onClick={() => window.location.reload()}>點擊重新整理</Alert.Link>.
            </Alert>

            <Login />
        </>
    )
}

export default TopNavbar