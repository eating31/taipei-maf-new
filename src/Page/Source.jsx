import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import {  useParams } from "react-router-dom";
import '../index.css'
function Source() {
  let { title } = useParams();
  const [selectedTitle, setSelectedTitle] = useState();
  
  // 確認有無參數
  useEffect(() => {
    if(title === '協會' || title ==='委員會'){
      setSelectedTitle(title)
    }else{
      setSelectedTitle('體育會')
    }
  }, []);

  return (
    <div style={{ "minHeight": "75vh" }}>
      <Container fluid className='py-4'>
        <Row>
          <Col xs={12} md={3}>
            <p className='fs-3 text-center'>相關資源</p>
            <ListGroup className='px-3 fs-5'>
              <ListGroup.Item action onClick={() => setSelectedTitle('體育會')} active={selectedTitle === '體育會'}>
                體育會
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => setSelectedTitle('運動中心')} active={selectedTitle === '運動中心'}>
                運動中心
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => setSelectedTitle('協會')} active={selectedTitle === '協會'}>
                協會
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => setSelectedTitle('委員會')} active={selectedTitle === '委員會'}>
                委員會
              </ListGroup.Item>

            </ListGroup>
          </Col>
          <Col xs={12} md={9}>
          <p className='fs-3 text-center'>台北市</p>
            {selectedTitle === '體育會' && (
              <div className='p-3 d-flex justify-content-center'>
                <svg className='map' width="413" height="550" xmlns="http://www.w3.org/2000/svg">
                  <metadata id="metadata7">image/svg+xml</metadata>

                  <g>
                    <title>background</title>
                    <rect x="-1" y="-1" width="415" height="552" id="canvas_background" fill="none" />
                  </g>
                  <g>
                    <title>Layer 1</title>
                    <path className="map"  id="path3311" strokeMiterlimit="4" stroke="#fd0000" fill="#e5e5e5" />
                    <path className="map"  id="path3315" strokeMiterlimit="4" stroke="#fd0000" fill="#e5e5e5" />
                    <path className="map"  id="path3321" strokeMiterlimit="4" stroke="#fd0000" fill="#e5e5e5" />
                    <path className="map"  id="path2513" d="m94.88095,249.57284c-14.1957,-1.13845 -15.68038,-2.82136 -15.75883,-17.86287c-0.07358,-14.11027 -2.04541,-18.8162 -9.28243,-22.15316c-4.82518,-2.22489 -5.16577,-2.22824 -13.81468,-0.13606c-4.87713,1.17982 -11.85611,3.38716 -15.50881,4.90525c-9.44781,3.92657 -14.35485,4.579 -18.63773,2.47804c-5.19239,-2.54712 -13.07369,-8.67732 -12.20772,-9.49537c0.40554,-0.38307 -0.17773,-1.56086 -1.29605,-2.61731c-1.18816,-1.12239 -2.03333,-3.87056 -2.03333,-6.6113c0,-4.27472 0.33791,-4.75432 3.81225,-5.41074c4.00852,-0.75734 6.59228,-3.8596 6.0592,-7.27516c-0.86533,-5.54445 1.89092,-11.65039 8.44006,-18.6972c3.74333,-4.02781 6.8061,-7.73328 6.8061,-8.23434c0,-1.12665 6.94872,-8.91563 14.29934,-16.02848c3.03443,-2.93632 5.9003,-6.53997 6.36855,-8.00813c0.55205,-1.73101 1.837,-2.66938 3.65524,-2.66938c3.08906,0 5.81801,-2.02917 5.81801,-4.32607c0,-4.75592 16.32824,-25.33368 20.102,-25.33368c0.57926,0 1.69106,-1.82586 2.47069,-4.05746c0.77968,-2.2316 2.17721,-4.65307 3.10574,-5.38102c0.92852,-0.72798 2.05549,-3.1731 2.50442,-5.43366c0.84284,-4.24431 2.34543,-5.20858 4.09367,-2.6271c0.55236,0.81564 3.4755,2.67571 6.49581,4.13348c5.18297,2.50158 5.68533,2.54236 8.94118,0.7255c3.18389,-1.7767 3.91413,-1.77551 9.47807,0.01542c3.31565,1.06721 6.17961,1.79757 6.36444,1.62296c1.93877,-1.8315 5.51741,-12.89401 5.51741,-17.05579c0,-3.8645 0.86996,-6.39702 3.18051,-9.25867c2.84029,-3.51776 4.0477,-4.02687 11.28738,-4.75926c7.04049,-0.71226 8.45062,-1.27612 10.71971,-4.28645c1.90061,-2.52147 3.6472,-3.46632 6.40759,-3.46632c4.7598,0 8.49441,-3.98187 8.5512,-9.11728c0.02297,-2.07819 0.56574,-5.08038 1.20613,-6.67154c1.34999,-3.35431 9.40282,-8.45955 11.91011,-7.55065c0.93927,0.34048 2.96771,-0.21461 4.50764,-1.23354c2.39634,-1.58558 2.70729,-2.62847 2.15755,-7.23596c-0.45066,-3.77701 -0.10046,-5.89525 1.17362,-7.09882c0.99872,-0.9435 2.12574,-3.17861 2.50427,-4.9669c0.46731,-2.20734 2.07446,-3.8758 5.00456,-5.19576c6.19764,-2.79194 7.31487,-2.47598 8.85697,2.50465c0.75767,2.44693 1.98856,6.05059 2.73555,8.00813c0.74688,1.95755 1.65149,4.96741 2.01017,6.6886c0.48175,2.31116 2.00237,3.63972 5.8156,5.08107c2.92169,1.10436 5.4391,2.94779 5.79853,4.2462c0.34925,1.26204 1.69569,2.61257 2.99189,3.00119c2.01807,0.60511 1.43384,1.52938 -4.06667,6.43369c-6.28882,5.60724 -6.40587,5.83664 -5.59194,10.96359c1.02919,6.48384 -3.7709,18.04195 -7.91845,19.06656c-4.20757,1.0394 -5.90666,6.06375 -4.03176,11.92238c1.99183,6.22401 1.99811,6.90198 0.14757,15.90754c-1.39515,6.78992 -1.8528,7.49666 -5.70684,8.81319c-2.97079,1.01481 -5.12613,3.05609 -7.40731,7.01534c-1.76945,3.07121 -3.2172,6.2358 -3.2172,7.03236c0,0.79658 -1.63825,3.40233 -3.64058,5.79058c-2.62203,3.12738 -3.89756,6.2853 -4.55908,11.28698c-1.09367,8.26882 -4.26332,11.56071 -11.49036,11.93337c-2.79573,0.14415 -6.83909,1.57172 -9.68446,3.41923c-2.68666,1.74445 -5.40879,3.17172 -6.04922,3.17172c-0.64039,0 -3.18028,1.4525 -5.64416,3.22778l-4.47974,3.22781l0.71288,10.39417c0.43684,6.36963 0.22874,10.67676 -0.53748,11.1241c-0.68766,0.4015 -1.76661,2.01282 -2.39763,3.58071c-0.68511,1.70225 -2.16214,2.85073 -3.66625,2.85073c-1.72723,0 -2.75678,1.02545 -3.27568,3.26257c-0.41624,1.79441 -1.63795,4.91375 -2.71496,6.93184c-1.79311,3.35993 -1.773,4.12737 0.23866,9.10334c2.22846,5.51222 1.87498,7.98921 -1.14006,7.98921c-2.45555,0 -5.27858,4.6883 -6.31609,10.48942c-0.50155,2.80438 -1.63247,5.36008 -2.51318,5.67933c-0.88067,0.31925 -2.5851,2.64149 -3.78756,5.16051c-1.79011,3.75015 -3.58226,5.18012 -9.89045,7.89179c-9.25247,3.97729 -7.87652,3.66486 -13.98358,3.1751z" strokeMiterlimit="4" stroke="#000000" fill="#e5e5e5" />
                    <path className="map"  id="path2515" d="m130.67355,292.3904c0,-0.5887 -1.55415,-1.67783 -3.45368,-2.4203c-1.89951,-0.74247 -4.94129,-2.12839 -6.75951,-3.07984c-2.83166,-1.48179 -3.91249,-1.49692 -7.53529,-0.10562c-2.32616,0.89334 -7.05516,1.94269 -10.50884,2.33187l-6.2794,0.70759l-5.02352,-9.7204c-3.46765,-6.70982 -7.47802,-12.09274 -12.94847,-17.38008c-4.35876,-4.21284 -9.69914,-9.77585 -11.86761,-12.36226c-6.54152,-7.80231 -16.98514,-11.61879 -36.01762,-13.16208c-17.07093,-1.38422 -18.77023,-2.04314 -25.89346,-10.04019l-3.39462,-3.81101l2.2973,-4.98435c4.42748,-9.60625 4.51493,-9.64575 10.05679,-4.54181c6.40893,5.90252 11.82541,7.65801 18.61141,6.03202c5.26124,-1.26064 10.93347,-3.52615 12.06076,-4.81708c1.40471,-1.60863 19.14964,-5.99322 21.75514,-5.37545c1.54226,0.36566 4.38983,2.22838 6.32792,4.13937c3.78795,3.73502 5.69971,12.50563 5.78463,26.53852c0.03899,6.44634 0.24839,6.89254 4.1227,8.78519c5.43861,2.65684 19.78195,4.13439 22.29188,2.29635c1.0361,-0.75875 4.71253,-2.58468 8.16986,-4.05763c5.43246,-2.31445 6.8367,-3.67588 10.34146,-10.02624c2.23044,-4.04149 4.39404,-8.76351 4.8079,-10.49344c0.79356,-3.31703 4.84537,-8.12538 6.84691,-8.12538c2.39166,0 2.69147,-5.93944 0.56532,-11.19868c-2.00951,-4.97068 -2.01855,-5.57877 -0.12336,-8.31117c1.12463,-1.62142 2.0448,-3.79543 2.0448,-4.83111c0,-1.03567 1.62127,-2.41694 3.60283,-3.0695c5.39002,-1.775 7.45014,-7.85453 6.71681,-19.82158c-0.39156,-6.38976 -0.14097,-9.71466 0.73222,-9.71466c0.73013,0 2.07434,-0.67117 2.98709,-1.49148c3.63746,-3.26906 18.1653,-9.56093 21.58784,-9.34951c5.50698,0.34018 10.2488,-5.02372 11.20858,-12.67903c0.50954,-4.06427 2.08921,-7.95456 4.66727,-11.49433c2.14339,-2.9429 4.47711,-7.07957 5.18592,-9.19258c2.05588,-6.1276 3.90165,-9.18062 5.55063,-9.18062c3.37668,0 7.29088,-4.67905 9.49521,-11.3506c2.77436,-8.39668 2.88161,-11.96566 0.47874,-15.93637c-2.84395,-4.69964 -3.11744,-7.30496 1.56985,-10.72428c3.95607,-2.88592 4.84295,-4.01582 7.32737,-10.1389c2.96184,-7.29972 1.82108,-10.57619 0.28885,-12.9645c-0.40853,-0.63679 0.01483,-0.49047 0.11529,-1.17494c0.11774,-0.80225 0.22889,-0.7003 0.47359,-0.9969c0.3194,-0.38711 2.93568,-1.93076 6.18465,-4.78903c5.58201,-4.91093 13.12307,-7.79163 15.99992,-6.11204c0.63134,0.36857 1.50278,0.12751 1.93657,-0.53565c0.4339,-0.66316 1.75735,-1.20574 2.94102,-1.20574c1.53468,0 2.55132,1.61643 3.54409,5.63535c1.22738,4.9692 1.10216,6.0216 -1.05958,8.90281c-1.34845,1.7971 -2.31899,4.46648 -2.1571,5.93196c0.16201,1.46546 -0.41633,4.05514 -1.28515,5.75484c-1.35786,2.65638 -1.21028,3.77435 1.05055,7.96088c1.44664,2.67878 2.63032,5.50753 2.63032,6.28612c0,0.77859 -2.82574,4.23809 -6.27941,7.68778c-5.06635,5.06054 -6.2794,7.07165 -6.2794,10.4108c0,2.27626 0.88728,4.97678 1.9716,6.00119c2.39233,2.2599 7.3714,3.56156 9.99116,2.61191c1.09175,-0.39574 2.84017,0.31736 4.04947,1.65165c1.29958,1.43375 3.69655,2.3481 6.15569,2.3481c3.80482,0 4.13926,0.36349 6.05083,6.57531c1.96521,6.38656 1.94411,6.70856 -0.73882,11.2181c-2.98373,5.01507 -2.23359,7.43276 2.77172,8.93348c1.31742,0.39502 2.76872,2.1508 3.22498,3.90172c0.45614,1.75093 1.49851,4.25125 2.31635,5.55628c0.81782,1.30503 2.24438,4.67806 3.17021,7.49564c1.30085,3.95907 3.27182,6.26163 8.6755,10.13545c6.76392,4.84901 7.00455,5.21589 7.37377,11.24453c0.32402,5.29383 0.8471,6.43237 3.47427,7.56316l3.09286,1.33117l-2.75138,2.76665c-1.51334,1.52165 -3.74277,2.76663 -4.95457,2.76663c-3.04074,0 -6.15017,3.20267 -6.15017,6.33447c0,1.43321 -1.37419,4.51625 -3.05381,6.85118c-1.67949,2.33492 -3.53317,5.99317 -4.11916,8.1294c-0.91366,3.33109 -1.68577,3.93815 -5.4234,4.26396c-2.39697,0.20894 -5.48832,0.63788 -6.86979,0.95316c-1.38146,0.31527 -3.22585,0.6141 -4.09869,0.66402c-0.87284,0.04993 -2.95031,2.9067 -4.61674,6.34838c-2.55395,5.27468 -3.97574,6.66861 -9.05051,8.8741c-3.93153,1.70856 -6.44769,2.21308 -7.25132,1.45393c-1.8366,-1.73485 -7.08732,-1.30719 -11.91705,0.97059c-4.41241,2.08098 -4.78441,2.53348 -8.21409,9.99209c-1.64746,3.58273 -2.99942,4.66042 -7.1805,5.72399c-2.83301,0.72063 -6.39155,1.01611 -7.9079,0.6566c-2.9144,-0.69101 -5.76349,2.05907 -9.83078,9.48939c-1.5956,2.91493 -3.67589,4.2054 -10.06582,6.24438c-7.38051,2.35507 -8.3582,2.4205 -11.684,0.78202c-8.03334,-3.95767 -12.58527,-1.81168 -27.70996,13.06371c-4.95546,4.87374 -9.55743,8.86137 -10.22666,8.86137c-1.8827,0 -2.75051,3.21946 -1.92231,7.13132c0.4777,2.25619 0.23681,3.54619 -0.66209,3.54619c-0.77708,0 -1.41286,-0.48165 -1.41286,-1.07032l0,0.00001z" strokeMiterlimit="4" stroke="#000000" fill="#e5e5e5" />
                    <path className="map"  id="path2517" d="m228.52059,347.73805c-0.06129,-0.81564 -0.03466,-3.88543 0.0594,-6.82175c0.09406,-2.9363 -0.89758,-8.27506 -2.2037,-11.86389l-2.37461,-6.52514l2.92707,-5.93195c3.46184,-7.01564 3.66705,-10.73815 0.94656,-17.16131c-1.55515,-3.67154 -3.57436,-5.59621 -8.87958,-8.46358c-4.8507,-2.6217 -7.47148,-4.97799 -8.92653,-8.02547c-2.80878,-5.88306 -5.25147,-8.46648 -8.00512,-8.46648c-1.43108,0 -2.3171,-0.85343 -2.3171,-2.23197c0,-1.22757 -1.97801,-3.65719 -4.39558,-5.39913c-5.0035,-3.60521 -5.2672,-4.5257 -2.19779,-7.67214c1.20879,-1.23914 3.61066,-4.16074 5.33749,-6.49249c1.72684,-2.33175 4.08563,-4.25423 5.24167,-4.27219c1.15616,-0.01795 5.00444,-0.66556 8.55192,-1.4391c6.58345,-1.43555 7.94759,-2.95817 11.70054,-13.06042c0.41054,-1.10536 3.07339,-2.66833 5.91733,-3.47325c4.41442,-1.2494 5.67708,-1.18098 8.63179,0.46789c3.26115,1.81979 3.58227,1.79767 5.5584,-0.38252c1.15341,-1.27263 2.87421,-2.31388 3.82403,-2.31388c3.07063,0 8.31494,-4.8142 10.76906,-9.88556c1.9647,-4.06022 3.33699,-5.21871 7.6743,-6.47878c4.90133,-1.42396 6.69825,-1.23206 6.9611,0.74354c0.05802,0.43499 0.76433,2.29383 1.56986,4.13073c0.80564,1.83689 1.46461,4.04111 1.46461,4.89827c0,0.89103 4.70615,3.11698 10.98895,5.19757c6.04392,2.00149 14.03936,4.68027 17.76769,5.9528c3.72833,1.27255 8.6171,4.10416 10.86412,6.2925c9.27731,9.03521 12.76514,11.69033 15.35679,11.69033c2.35489,0 2.5748,0.38753 1.59785,2.81502c-1.20176,2.98626 0.8854,10.43441 4.30654,15.36674c1.54398,2.2261 1.56609,3.31069 0.14669,7.21086c-0.91893,2.52488 -2.56865,5.06541 -3.66617,5.64566c-1.09752,0.58026 -2.99314,4.11113 -4.21222,7.84637c-1.21884,3.73526 -2.93876,7.21829 -3.82165,7.7401c-0.94894,0.56094 -1.60514,3.33236 -1.60514,6.78001c0,4.57686 -0.52935,6.09889 -2.4609,7.0754c-1.35346,0.68428 -3.35647,3.02697 -4.45096,5.20598c-1.59045,3.16596 -2.57895,3.85547 -4.92117,3.4325c-2.22655,-0.40206 -3.73813,0.47035 -6.28883,3.6294c-3.83068,4.74438 -9.61188,7.26188 -19.55456,8.51528c-3.79903,0.47893 -7.8176,1.32212 -8.93006,1.87378c-1.69632,0.84113 -2.00024,0.29266 -1.88382,-3.39918c0.1232,-3.9031 -0.23285,-4.44291 -3.14007,-4.76164c-2.72138,-0.29832 -3.66329,0.40803 -5.53832,4.15236c-4.78603,9.5576 -9.34902,12.48797 -26.27704,16.87513c-11.12836,2.88409 -11.96465,2.95199 -12.11284,0.9836z" strokeMiterlimit="4" stroke="#000000" fill="#e5e5e5" />
                    <path className="map"  id="path2519" d="m145.96327,360.53769c-5.05996,-1.54766 -11.95892,-3.17236 -15.33103,-3.61048c-6.1177,-0.79485 -6.12916,-0.80478 -5.24269,-4.54798c0.48863,-2.06326 0.74248,-8.55627 0.56413,-14.4289c-0.87758,-28.89693 -0.66975,-34.36909 1.48718,-39.15086c2.03427,-4.50979 2.23013,-4.63115 3.94252,-2.44262c0.99109,1.26661 1.80193,2.73477 1.80193,3.26256c0,0.52781 0.92454,0.95964 2.05452,0.95964c1.69798,0 1.92621,-0.88432 1.31516,-5.09579c-0.40663,-2.8027 -1.09011,-5.95925 -1.5188,-7.01458c-0.45522,-1.12071 -0.0775,-2.08529 0.90823,-2.31915c0.9282,-0.22019 6.51741,-5.46236 12.42047,-11.64925c12.21697,-12.8044 15.72305,-14.53099 22.93896,-11.29629c4.50736,2.02055 5.55032,1.9318 13.60165,-1.15742c1.53421,-0.58867 2.64006,0.15233 4.03777,2.70563c1.05865,1.93395 3.28538,3.83888 4.94817,4.23313c2.05073,0.4862 3.25574,1.81503 3.74604,4.13071c0.5571,2.63107 1.60175,3.57997 4.55584,4.13809c3.02101,0.57078 3.83306,1.33957 3.83306,3.6288c0,3.73506 5.10654,9.45823 10.22702,11.46183l3.99847,1.56458l-4.81015,3.92804c-2.64564,2.16044 -5.49272,3.92806 -6.32674,3.92806c-0.83391,0 -3.98944,-1.27125 -7.01197,-2.82499c-3.02265,-1.55376 -7.07048,-3.17043 -8.99512,-3.59261c-3.05357,-0.66982 -3.70705,-0.30117 -5.12885,2.89319c-2.32686,5.22783 -7.02368,7.08358 -17.92822,7.08358c-7.46541,0 -9.47152,0.38538 -10.10336,1.94084c-1.01571,2.50047 1.0995,5.65643 4.14153,6.17922c3.07054,0.52769 17.86016,9.8254 18.63109,11.71273c0.32435,0.79406 -0.22236,4.02708 -1.21493,7.18448c-1.46184,4.65025 -2.64417,6.11892 -6.22405,7.7316c-4.22555,1.90353 -4.41998,2.2648 -4.4332,8.23857c-0.00763,3.43625 -0.36412,8.24978 -0.79227,10.6967l-0.7784,4.44896l-7.05704,-0.05308c-3.88133,-0.02919 -11.19694,-1.31932 -16.25691,-2.86695l-0.00001,0.00001z" strokeMiterlimit="4" stroke="#000000" fill="#e5e5e5" />
                    <path className="map"  id="path2521" d="m97.03006,356.57153c-1.29449,-0.81758 -1.31213,-1.71502 -0.0881,-4.48295c0.84171,-1.9034 1.68908,-8.26562 1.88302,-14.13825c0.19395,-5.87262 0.70148,-14.68157 1.12788,-19.57542c0.51691,-5.93249 0.15948,-11.66569 -1.0724,-17.20266c-1.01622,-4.5676 -1.67798,-8.47751 -1.47058,-8.68868c0.20739,-0.21117 3.39668,-0.77868 7.0873,-1.26111c3.69059,-0.48245 7.97908,-1.52829 9.52994,-2.32412c2.38615,-1.2245 3.59296,-1.03062 7.84926,1.26111c3.41883,1.84081 4.79379,3.27798 4.29333,4.48766c-2.57854,6.23259 -4.38137,19.15541 -3.64127,26.10057c1.56452,14.6817 1.35721,31.80498 -0.40502,33.45775c-0.90906,0.85262 -4.83536,1.61392 -8.79117,1.70458c-3.93157,0.09009 -8.84381,0.50581 -10.91602,0.92379c-2.0722,0.41798 -4.49597,0.29997 -5.38615,-0.26225l-0.00002,-0.00002z" strokeMiterlimit="4" stroke="#000000" fill="#e5e5e5" />
                    <path className="map"  id="path2523" d="m143.23236,439.51584c-3.38679,-1.1326 -6.0509,-3.76661 -11.6082,-11.47705c-6.32482,-8.77532 -8.01682,-10.32286 -13.74603,-12.57198c-3.81605,-1.49809 -6.93112,-3.58043 -7.48962,-5.00664c-0.52591,-1.34304 -2.30688,-2.76211 -3.95773,-3.15352c-1.65082,-0.39136 -5.10152,-3.08492 -7.66818,-5.98552l-4.66665,-5.27392l3.21827,-7.59915c1.76998,-4.17954 3.21819,-9.13106 3.21819,-11.00335c0,-5.38452 3.66235,-17.41135 5.75773,-18.90792c3.13362,-2.23811 22.27165,-0.75703 35.37236,2.73741l6.59338,1.75868l0,12.50494l0,12.50496l-4.70956,-0.82563c-2.59025,-0.45409 -5.60176,-1.58123 -6.69225,-2.50479c-1.0905,-0.9236 -2.38808,-1.67921 -2.88352,-1.67921c-1.62947,0 -7.03984,12.37811 -7.05237,16.13485c-0.01345,4.03191 4.56251,10.82258 13.11126,19.45682c2.90726,2.93633 7.96454,8.37581 11.23844,12.08768l5.95255,6.74895l-3.79195,1.85237c-4.38544,2.14232 -4.39333,2.1425 -10.19612,0.20198l0,0.00004z" strokeMiterlimit="4" stroke="#000000" fill="#e5e5e5" />
                    <path className="map"  id="path2525" d="m69.35654,439.01584c-3.99535,-4.01755 -6.85931,-14.20691 -5.88131,-20.92438c0.71146,-4.8865 0.16193,-6.94596 -4.4707,-16.75562c-7.32389,-15.50848 -6.86423,-20.35735 2.21244,-23.34024c6.24697,-2.05295 25.82218,-13.2498 28.85199,-16.50311c2.29756,-2.46708 3.42474,-2.79986 7.21066,-2.12891c3.77363,0.66879 4.38912,1.19912 3.86957,3.33449c-3.97174,16.32418 -5.63624,22.22573 -7.36552,26.11531c-1.12335,2.5266 -2.04241,5.91194 -2.04241,7.52294c0,3.65896 7.55479,12.16471 12.57613,14.1592c4.53702,1.80213 4.9051,3.97696 0.67311,3.97696c-3.08587,0 -6.22744,3.01637 -16.02781,15.38922c-4.06656,5.13403 -12.76559,11.77778 -15.52676,11.85831c-0.74302,0.02168 -2.57875,-1.19519 -4.07941,-2.70417l0.00002,0z" strokeMiterlimit="4" stroke="#000000" fill="#e5e5e5" />
                    <path className="map"  id="path2527" d="m168.45407,444.15313c-4.80503,-0.53193 -5.89736,-1.20309 -8.16321,-5.01571c-2.8876,-4.85886 -9.81587,-13.18737 -21.79228,-26.19671c-4.33042,-4.70388 -8.21258,-9.77692 -8.62702,-11.27338c-0.41442,-1.49643 0.22251,-5.13516 1.41546,-8.08599c1.68409,-4.16567 2.63009,-5.18192 4.23143,-4.54548c4.57665,1.81898 12.15917,2.64938 13.63672,1.49349c0.96374,-0.75392 1.65879,-5.56891 1.88381,-13.05049l0.3566,-11.85575l17.58232,0.16651c9.67029,0.09158 20.30806,0.21585 23.63944,0.27617l6.05725,0.10967l-0.40578,16.38332l-0.40565,16.38323l-4.70955,4.55267c-5.20203,5.02876 -5.85305,7.68326 -2.45762,10.02073c3.10704,2.13897 16.02616,18.61792 17.97942,22.93376c0.87887,1.94189 2.71886,4.73189 4.08903,6.20007c4.20959,4.51108 -0.1374,2.99795 -5.96468,-2.0762c-2.99741,-2.61002 -6.43149,-4.74554 -7.63123,-4.74554c-1.19975,0 -3.72168,1.55766 -5.60438,3.46145c-2.43785,2.46538 -3.93806,3.15339 -5.21335,2.39094c-2.67142,-1.59711 -6.94168,-1.32626 -8.58527,0.54454c-1.93425,2.20169 -4.65503,2.66565 -11.31144,1.9287l-0.00002,0z" strokeMiterlimit="4" stroke="#000000" fill="#e5e5e5" />
                    <path className="map"  id="path2529" d="m215.28285,440.86964c-1.38524,-1.7944 -2.86881,-4.15278 -3.29669,-5.24081c-0.69475,-1.76696 -4.74132,-7.08608 -16.38786,-21.5417l-3.65596,-4.5377l4.15266,-4.88161l4.15283,-4.88163l0.23347,-15.49482c0.12834,-8.52222 0.29827,-16.35265 0.37751,-17.40101c0.0893,-1.18195 4.00124,-3.54828 10.29697,-6.22855c9.07851,-3.86504 11.26613,-4.32244 20.67356,-4.32244l10.52076,0l1.32169,4.6372c1.13506,3.98177 7.04436,10.55989 10.89828,12.13168c1.45568,0.59369 6.72172,10.6906 6.72322,12.89087c0.00063,0.97877 1.09526,3.47445 2.43227,5.54596l2.43113,3.76637l-3.37769,2.07076c-5.46371,3.34964 -10.28503,10.62703 -10.28503,15.52429c0,3.93759 -1.64232,6.56431 -7.8902,12.62008c-3.52513,3.41675 -7.29164,5.68758 -11.26198,6.78992c-3.28099,0.91094 -5.96543,2.11806 -5.96543,2.6825c0,0.91369 -8.2848,9.13322 -9.20574,9.13322c-0.20294,0 -1.5024,-1.46815 -2.88777,-3.26258z" strokeMiterlimit="4" stroke="#000000" fill="#e5e5e5" />
                    <path className="map"  id="path2531" d="m179.82896,364.76431l-7.98715,-1.28245l0.76585,-5.27829c0.42121,-2.90306 0.76582,-7.06518 0.76582,-9.24915c0,-3.3757 0.62493,-4.21752 4.16951,-5.61658c3.46477,-1.36757 4.65142,-2.89434 7.02097,-9.03348l2.8515,-7.38774l-3.40983,-3.36216c-3.68831,-3.63673 -17.05002,-11.82166 -19.29863,-11.82166c-0.75928,0 -1.38055,-0.53386 -1.38055,-1.18638c0,-0.67951 3.80903,-1.18639 8.91533,-1.18639c9.8254,0 16.88427,-2.35487 18.12457,-6.04643c1.01612,-3.02443 3.75466,-2.83866 11.26445,0.76415c7.47225,3.58477 10.10193,3.19325 16.4322,-2.44658c2.57166,-2.29123 4.79972,-4.02548 4.95106,-3.85387c1.5927,1.80567 4.36229,8.46276 4.36229,10.48566c0,1.41898 -1.42906,5.58826 -3.17587,9.26509l-3.17574,6.68513l2.54781,6.99582c1.4111,3.87457 2.54793,10.05324 2.54793,13.8485c0,5.96327 0.34938,6.95741 2.69147,7.65965c1.48043,0.44384 4.87407,0.12655 7.54156,-0.70507c5.21932,-1.6272 6.83902,-1.11599 5.66001,1.7864c-0.58964,1.45168 -2.95735,1.83075 -11.4353,1.83075c-9.84773,0 -11.56089,0.37949 -21.70337,4.80755c-12.38575,5.40747 -17.53862,6.17518 -29.0459,4.32753l0.00001,0z" strokeMiterlimit="4" stroke="#000000" fill="#e5e5e5" />
                    <path className="map"  id="path2533" d="m243.35694,435.10525c-1.9745,-1.86522 -0.67078,-4.50767 4.68505,-9.49557c3.87691,-3.61055 5.84964,-6.57613 6.42396,-9.65696c1.02467,-5.49769 7.44762,-15.36892 10.61885,-16.31971c3.22409,-0.96672 4.38566,-5.03692 2.13738,-7.49036c-1.00357,-1.09514 -2.18749,-3.85973 -2.63094,-6.14353c-1.12917,-5.81569 -6.09919,-15.42307 -7.97836,-15.42307c-2.89757,0 -9.39549,-6.5789 -11.08604,-11.22403c-2.56953,-7.06084 -1.19207,-11.06281 4.29713,-12.48485c7.84284,-2.03178 14.1186,-6.46724 17.59538,-12.43569c4.18384,-7.18234 6.85259,-7.12763 4.52004,0.09267c-1.11334,3.44608 1.99811,4.35706 7.48493,2.19139c2.41229,-0.95213 6.36605,-1.73119 8.78613,-1.73119c6.05661,0 17.2931,-4.91633 19.93209,-8.72102c2.50172,-3.60688 4.62491,-4.0936 4.65291,-1.06669c0.01545,1.6604 0.24137,1.74489 1.12815,0.42184c1.6633,-2.48134 9.51845,2.5056 11.53264,7.3216c0.87936,2.10312 1.82428,4.22427 2.09958,4.71366c0.27516,0.48938 -0.73834,0.88979 -2.25231,0.88979c-2.3034,0 -2.62491,0.48033 -1.97034,2.94389c0.64904,2.44308 0.0339,3.40172 -3.61594,5.63534c-3.74278,2.29032 -4.40047,3.36046 -4.41366,7.17987c-0.01369,3.91359 3.12839,11.02396 8.18119,18.51439c3.18967,4.72868 9.19392,9.24778 14.09512,10.60878c2.93562,0.81517 5.33749,1.99463 5.33749,2.62094c0,0.62629 1.27158,1.15048 2.82574,1.16482c3.29467,0.03037 10.52729,3.25616 18.52423,8.26186c3.1083,1.94564 6.49918,3.91352 7.53528,4.37304c1.0361,0.45954 2.44897,1.5366 3.1397,2.39351c0.81243,1.00783 4.80387,1.66225 11.30293,1.85312c8.87405,0.26063 10.50694,-0.03102 13.98637,-2.49808c5.25384,-3.72515 11.75918,-2.74094 11.75918,1.77902c0,1.62233 -0.57783,3.9697 -1.28413,5.21635c-1.35397,2.39003 -1.17778,2.38682 -19.84329,0.35818c-5.64657,-0.61368 -7.26126,-0.32396 -10.39618,1.86553l-3.71126,2.59205l-3.26403,-2.42549c-2.71961,-2.02084 -4.36896,-2.30276 -9.88767,-1.69004c-5.03873,0.5594 -7.32116,0.27381 -9.53905,-1.19374c-5.46547,-3.61634 -8.4988,-2.55762 -11.36974,3.96856c-1.42995,3.25055 -3.6536,6.21521 -4.95395,6.6051c-1.29769,0.38906 -2.35942,1.1196 -2.35942,1.62341c0,3.4568 -15.81052,3.94748 -17.19714,0.53373c-0.37752,-0.92963 -2.50486,-1.60964 -5.03533,-1.60964c-2.40966,0 -6.06076,-0.93428 -8.11337,-2.07618c-3.55414,-1.97733 -3.79063,-1.97733 -4.96575,0c-0.71334,1.20029 -2.7073,2.07618 -4.72676,2.07618c-3.51771,0 -5.28123,1.99957 -7.06282,8.00814c-0.54317,1.83177 -1.75019,2.66937 -3.84663,2.66937c-1.68025,0 -3.05507,-0.59924 -3.05507,-1.33165c0,-0.92875 -0.47497,-0.96046 -1.56985,-0.10474c-0.86342,0.67481 -2.98271,1.22425 -4.70954,1.22101c-4.08011,-0.00766 -9.32743,0.84163 -10.91046,1.76585c-0.68823,0.40183 -4.30768,1.24055 -8.0433,1.86382c-3.73549,0.62329 -7.93641,1.47563 -9.33545,1.89414c-1.39906,0.41851 -2.95321,0.37406 -3.45367,-0.09873l0,0.00001z" strokeMiterlimit="4" stroke="#000000" fill="#e5e5e5" />
                    <path className="map"  id="path2535" d="m273.73329,544.82851c-2.66761,-3.53892 -3.09436,-3.67667 -9.46544,-3.0555c-5.44537,0.53092 -8.4257,0.0126 -16.21028,-2.81912c-11.22179,-4.08199 -16.34755,-4.45609 -17.23294,-1.25762c-1.15956,4.18857 -16.49035,4.64589 -23.10456,0.68922c-1.48608,-0.88898 -3.68878,-4.17441 -4.8948,-7.30096c-1.20602,-3.12651 -4.03627,-9.26332 -6.28933,-13.63732c-3.62459,-7.03621 -4.01957,-8.75667 -3.42692,-14.92986c0.82888,-8.63635 -0.83904,-12.11591 -5.80804,-12.11591c-2.92325,0 -3.69666,0.6149 -4.28829,3.40936c-1.36845,6.46378 -8.38332,5.58925 -8.38332,-1.04518c0,-3.07925 -0.41373,-3.32601 -6.84909,-4.08557c-7.28516,-0.85987 -7.29944,-0.87495 -8.80904,-9.31511c-0.44381,-2.48122 -1.61257,-4.80335 -2.59725,-5.16032c-1.84369,-0.66834 -6.75838,4.08343 -11.13665,10.76759c-3.04779,4.65283 -4.18177,2.05389 -1.37782,-3.15772c4.37214,-8.12651 6.87571,-18.10421 6.89192,-27.46718c0.01297,-7.51126 0.45036,-9.67165 2.21399,-10.93637c2.88265,-2.06714 5.33749,-2.06662 5.33749,0.00117c0,2.07889 1.65756,2.67309 10.30296,3.69353c5.12909,0.60532 7.89276,0.34704 10.63883,-0.99444c2.44872,-1.19625 5.48635,-1.58716 8.93608,-1.15004c4.717,0.59764 5.3423,0.3741 6.41621,-2.29436c1.91496,-4.7581 4.67275,-4.83831 9.50199,-0.27631c3.66692,3.46411 5.24016,4.11452 9.95235,4.11452c5.55576,0 11.29364,-3.13079 15.49354,-8.45381c2.41469,-3.06055 7.52097,-3.74377 11.47775,-1.53579c3.23917,1.80755 4.1964,1.80138 13.44483,-0.08629c17.87734,-3.64889 21.04039,-4.17084 21.66984,-3.57617c0.3416,0.32251 -0.03491,2.65388 -0.83629,5.18073c-1.7777,5.60529 -1.92363,16.77605 -0.21903,16.77605c0.68095,0 2.73519,2.13703 4.56488,4.74895c3.28262,4.68585 3.29945,4.81637 1.27372,9.82739c-2.94793,7.29175 -2.62341,12.00709 1.08658,15.78872c3.71377,3.78552 3.69531,3.68482 1.11913,6.11849c-1.5401,1.45495 -1.88107,3.47986 -1.43384,8.51658c0.32275,3.63433 0.03001,7.76967 -0.65056,9.18971c-3.16984,6.61434 4.47721,12.22514 19.16286,14.0602c7.12561,0.89036 19.36392,6.51175 20.55375,9.44085c0.48966,1.2057 -1.16132,2.01536 -6.07471,2.97896c-3.71112,0.72779 -9.0191,2.8778 -11.79561,4.77777c-2.77649,1.90001 -6.59487,3.82128 -8.48535,4.26948c-1.89034,0.44821 -4.88764,1.53003 -6.66043,2.40401c-5.72707,2.82328 -10.87919,2.05011 -14.0091,-2.10233l-0.00001,0z" strokeMiterlimit="4" stroke="#000000" fill="#e5e5e5" />
                  </g>
                </svg>
               
                {/* 其他詳細資訊 */}
              </div>
            )}

            {selectedTitle === '運動中心' && (
              <div className='p-3 '>
              <ul className='fs-4 py-2'>
                  <li>松山區運動中心</li>
                  <li>信義區運動中心</li>
                  <li>大安區運動中心</li>
                  <li>中山區運動中心</li>
                  <li>中正區運動中心</li>
                  <li>大同區運動中心</li>
                  <li>萬華區運動中心</li>
                  <li>文山區運動中心</li>
                  <li>南港區運動中心</li>
                  <li>內湖區運動中心</li>
                  <li>士林區運動中心</li>
                  <li>北投區運動中心</li>
                </ul>
              </div>
            )}

            {selectedTitle === '協會' && (
              <div className='p-3'>
              <p>- No data now -</p>
                {/* 其他詳細資訊 */}
              </div>
            )}

            {selectedTitle === '委員會' && (
              <div className='p-3'>
              <p>- No data now -</p>
                {/* 其他詳細資訊 */}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Source