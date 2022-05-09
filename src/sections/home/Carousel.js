// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, Typography } from '@mui/material';

import React from 'react';
import Slider from 'react-slick';
import useResponsive from '../../hooks/useResponsive';

export default function SimpleSlider() {

  const isDesktop = useResponsive('up', 'md');

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: isDesktop ? 4 : 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    { url: 'https://qwikshop.s3.ap-south-1.amazonaws.com/Carousel/Carousel/Group+10.png', title: 'Sell Shoes Online' },
    { url: 'https://qwikshop.s3.ap-south-1.amazonaws.com/Carousel/Carousel/Group+11.png', title: 'Sell Books Online' },
    { url: 'https://qwikshop.s3.ap-south-1.amazonaws.com/Carousel/Carousel/Group+12.png', title: 'Sell Laptop Online' },
    { url: 'https://qwikshop.s3.ap-south-1.amazonaws.com/Carousel/Carousel/Group+13.png', title: 'Sell Food Online' },
    {
      url: 'https://qwikshop.s3.ap-south-1.amazonaws.com/Carousel/Carousel/Group+14.png',
      title: 'Sell Clothes Online',
    },
    { url: 'https://qwikshop.s3.ap-south-1.amazonaws.com/Carousel/Carousel/Group+15.png', title: 'Sell Art Online' },
    {
      url: 'https://qwikshop.s3.ap-south-1.amazonaws.com/Carousel/Carousel/Group+16.png',
      title: 'Sell Grocery Online',
    },
    { url: 'https://qwikshop.s3.ap-south-1.amazonaws.com/Carousel/Carousel/Group+17.png', title: 'Sell Mobile Online' },
    {
      url: 'https://qwikshop.s3.ap-south-1.amazonaws.com/Carousel/Carousel/Group+18.png',
      title: 'Sell Furniture Online',
    },
  ];

  return (
    <Slider {...settings}>
      {images.map((el) => (
        <Card key={el.title} sx={{ p: 2, m: 3 }}>
          {/*  */}

          <img style={{ height: '260px', objectFit: 'contain' }} src={el.url} alt="seller" />
          <Typography sx={{ mt: 2 }} variant="subtitle1">
            {el.title}
          </Typography>
        </Card>
      ))}
    </Slider>
  );
}
