import React, { useState } from 'react'
import { Image, Carousel } from 'react-bootstrap';
//import ExampleCarouselImage from '../../Image/test.jpg';
import Banner from '../../Image/banner (1).jpg';
import Banner2 from '../../Image/banner (2).jpg';
import Banner3 from '../../Image/banner (3).jpg';
import Banner4 from '../../Image/banner (4).jpg';
import Banner5 from '../../Image/banner (5).jpg';

function TopCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}  style={{'height': '100vh'}}>
      <Carousel.Item>
        <Image src={Banner} text="First slide" style={{ objectFit: 'cover', width: '100%', height: '100vh' }} />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={Banner2} text="Second slide" style={{ objectFit: 'cover', width: '100%', height: '100vh' }} />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={Banner3} text="Third slide" style={{ objectFit: 'cover', width: '100%', height: '100vh' }} />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={Banner4} text="Third slide" style={{ objectFit: 'cover', width: '100%', height: '100vh' }} />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={Banner5} text="Third slide" style={{ objectFit: 'cover', width: '100%', height: '100vh'}} />
      </Carousel.Item>
    </Carousel>
  );
}

export default TopCarousel