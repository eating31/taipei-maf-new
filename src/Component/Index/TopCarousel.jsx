import React, { useState } from 'react'
import{Image, Carousel} from 'react-bootstrap';
import ExampleCarouselImage from '../../Image/test.jpg';

function TopCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect} >
        <Carousel.Item>
          <Image src={ExampleCarouselImage} text="First slide" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <Image src={ExampleCarouselImage} text="Second slide" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <Image src={ExampleCarouselImage}text="Third slide" style={{ objectFit: 'cover', width: '100%', height: '100%' }}/>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
}

export default TopCarousel