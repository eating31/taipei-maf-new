import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import Files from '../File/1121141Rule.pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Broad from '../Image/broad.jpg'

import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

function About() {

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  let { title, subTitle } = useParams();
  // 判斷是不是手機大小
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [selectedTitle, setSelectedTitle] = useState('體總簡介');
  const [selectedSubTitle, setSelectedSubTitle] = useState('副會長')

  // 確認有無參數
  useEffect(() => {
    if (title) {
      setSelectedTitle(title)
    }
    if (subTitle) {
      setSelectedSubTitle(subTitle)
    }
    // 監聽寬度
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const containerRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }


  return (
    <div style={{ "minHeight": "70vh" }}>
      <Container fluid className='py-4 '>
        <Row>
          <Col xs={12} md={3}>
            <p className='fs-3 text-center'>關於本會</p>
            <ListGroup className='px-3 fs-5'>
              <ListGroup.Item action variant="secondary" onClick={() => setSelectedTitle('體總簡介')} active={selectedTitle === '體總簡介'}>
                體總簡介
              </ListGroup.Item>
              <ListGroup.Item action variant="secondary" onClick={() => setSelectedTitle('會長簡介')} active={selectedTitle === '會長簡介'}>
                會長簡介
              </ListGroup.Item>
              <ListGroup.Item action variant="secondary" onClick={() => setSelectedTitle('體總組織')} active={selectedTitle === '體總組織'}>
                體總組織
              </ListGroup.Item>

              {selectedTitle === '體總組織' &&
                <ListGroup className=' fs-5' >
                  <ListGroup.Item action variant="light" onClick={() => setSelectedSubTitle('副會長')} active={selectedSubTitle === '副會長'}>
                    &nbsp;&nbsp;。副會長
                  </ListGroup.Item>
                  <ListGroup.Item action variant="light" onClick={() => setSelectedSubTitle('理監事')} active={selectedSubTitle === '理監事'}>
                    &nbsp;&nbsp;。理監事
                  </ListGroup.Item>
                  <ListGroup.Item action variant="light" onClick={() => setSelectedSubTitle('顧問群')} active={selectedSubTitle === '顧問群'}>
                    &nbsp;&nbsp;。顧問群
                  </ListGroup.Item>
                  <ListGroup.Item action variant="light" onClick={() => setSelectedSubTitle('幹事部')} active={selectedSubTitle === '幹事部'}>
                    &nbsp;&nbsp; 。幹事部
                  </ListGroup.Item>
                </ListGroup>
              }


              <ListGroup.Item action variant="secondary" onClick={() => setSelectedTitle('組織章程')} active={selectedTitle === '組織章程'}>
                組織章程
              </ListGroup.Item>
            </ListGroup>

          </Col>
          <Col xs={12} md={9}>



            <div>
              {/* Maybe TO DO 手機板點及圖片會放大 */}
              {selectedTitle === '體總簡介' && (
                <div className='p-5'>
                  <h2>組織架構：</h2>
                  <Image src={Broad} fluid />
                  <div>
                    <h2 className='py-3'>服務宗旨：</h2>
                    <p className='fs-5 px-3'>
                    臺北市體育總會，累積與攜手邁過 78 年服務之經驗與
                    信譽，秉持奉獻精神、活力、體育休閒、體育競技、運動
                    研習、裁判講習、體育交流、學習之理念，建立了全方位
                    服務架構，是落實臺北市政府關心市民體能、完成「健康
                    城市」政策之目標最佳服務工作夥伴。
                    協助市民增進知能，鍛鍊健康體魄、參與社會服務，
                    78 年來策劃辦理各種有益國民身心及有助國家體育發展的
                    活動與服務。且為契合國際脈動與世界潮流，提振總會服務
                    精義，邀聘體育精英與專家學者，組成專業運動顧問群；結
                    合市民運動需求之協力資源；匯合廣泛運動諮詢與技術支援
                    之個人及運動團體，組成經營執行團隊。旨在期許以嶄新面
                    貌與服務風格，協助臺北市各單項協會，提供更體貼、用心、
                    積極的運動休閒與健康之服務，共創二十一世紀運動休閒新榮景
                    </p>
                  </div>
                </div>
              )}

              {selectedTitle === '會長簡介' && (
                <div className='p-5'>
                  <h2>{selectedTitle}</h2>
                  <div className='fs-4 py-2'>
                    第十七屆 會長 : 葉林傳
                  </div>
                  <div className='fs-5 px-5'>
                    <p>現職 :</p>
                    <div className='px-4'>
                      <ul>
                        <li>臺北市中山區圓山里 里長</li>
                        <li>臺北市大同區體育會 理事長</li>
                        <li>臺北市里長聯誼會 總會長</li>
                        <li>國民黨青年團 臺北市團長</li>
                        <li>國民黨臺北市黨部 副主委</li>
                        <li>國民黨全國青工會 副總會長</li>
                        <li>國民黨中央 委員</li>
                        <li>第 11、12、13、14 屆臺北市 議員</li>
                        <li>臺北市議會第 13 屆 副議長</li>
                        <li>臺北市議會第 14 屆 副議長</li>
                        <li>臺北市體育總會 會長</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {selectedTitle === '體總組織' &&
                <div className='p-5'>
                  <h2>{selectedTitle}</h2>

                  {selectedSubTitle === '副會長' &&
                    <div className='px-5'>
                      <div className='fs-4 py-2'>
                        榮譽會長 : 呂威震
                      </div>
                      <div className='fs-4 py-2'>
                        副會長 : 李孟奎、胡德昌、陳重文、黃承國、劉家增
                      </div>
                    </div>
                  }

                  {selectedSubTitle === '理監事' &&
                    <div className='px-5'>
                      <div className='fs-4 py-2'>
                        常務理事 : 汪志冰、郭昭巖、廖美娥
                      </div>
                      <div className='fs-4 py-2'>
                        理事 : 江志銘、吳志剛、吳沛憶、阮昭雄、林世宗、林承達、洪健益、郭明欽、陳炳甫、陳正德、張茂楠、陳慈慧、黃金維、楊金東、蔣炳正
                      </div>
                      <div className='fs-4 py-2'>
                        常務監事 : 袁俊麒
                      </div>
                      <div className='fs-4 py-2'>
                        監事 : 李芳儒、呂文通、許一南、廖寶珠、劉耀仁、韓亞男
                      </div>
                    </div>
                  }

                  {selectedSubTitle === '顧問群' &&
                    <div className='px-5'>
                      <div className='fs-4 py-2'>
                        顧問群 : 李招譽、陳彥伯、彭臺臨、楊萬賀
                      </div>
                    </div>
                  }

                  {selectedSubTitle === '幹事部' &&
                    <div className='px-5'>
                      <div className='fs-4 py-2'>
                        臺北市體育總會 秘書長 : 陳芊妤
                      </div>
                      <div className='fs-4 py-2'>
                        臺北市體育總會 副秘書長 : 李建明
                      </div>
                      <div className='fs-4 py-2'>
                        臺北市體育總會 活動組 專任助理 : 吳佳駿（威爾）
                      </div>
                      <div className='fs-4 py-2'>
                        臺北市體育總會 行政組 行政專員 : 陶映瑜（陶子）
                      </div>
                      <div className='fs-4 py-2'>
                        臺北市體育總會 行政組 財務會計 : 吳玉絃（絃絃）
                      </div>
                    </div>
                  }
                </div>
              }


              {selectedTitle === '組織章程' && (
                <div className='p-3'>

                  <div className={`d-flex justify-content-center border ${!isMobile && 'm-5 px-5'}`} ref={containerRef} style={{ overflowX: 'auto' }}>
                    <Document file={Files} onLoadSuccess={onDocumentLoadSuccess}>
                      <Page
                        pageNumber={pageNumber}
                        scale={isMobile ? 1 : 1.5}
                      //width={containerRef.current ? containerRef.current.offsetWidth : undefined}
                      />
                    </Document>

                  </div>
                  <div className='d-flex justify-content-center'>
                    <div>
                      {pageNumber !== 1 &&
                        <button className='btn' onClick={() => setPageNumber(pageNumber - 1)}>上一頁</button>
                      }

                    </div>
                    <div>
                      頁數 {pageNumber} / {numPages}
                    </div>
                    <div>
                      {pageNumber !== numPages &&
                        <button className='btn' onClick={() => setPageNumber(pageNumber + 1)}>下一頁</button>

                      }
                    </div>
                  </div>

                </div>
              )}

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default About