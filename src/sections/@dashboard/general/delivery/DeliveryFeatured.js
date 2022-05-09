import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { m } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { CardContent, Box, Card, Typography, Link } from '@mui/material';

// components
import Image from '../../../../components/Image';
import { MotionContainer, varFade } from '../../../../components/animate';
import { CarouselDots, CarouselArrows } from '../../../../components/carousel';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

const QwikshopLearn = [
  {
    id: '89292j93u',
    title: 'How does QwikShop delivery works?',
    description: 'In this article you can learn how QwikShop delivery works?',
    image:
      'https://media.edgeprop.my/s3fs-public/styles/newsthumbnails/public/field/image/delivery-man-with-face-mask-delivering-order-motorcycle_154993-160_0.jpg',
    href: 'https://www.youtube.com/channel/UCFdJ6n7vox94QFlFsnTLPtQ',
  },
  {
    id: '89292j93u',
    title: 'How to prepare items for delivery?',
    description: 'In this article you can learn how to how to prepare your items for shipping?',
    image:
      'https://i.guim.co.uk/img/media/3ed1a62c989d9edfe6232dad1dfe49fa7f25aaf9/0_450_4500_2700/master/4500.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=ce20365626a27d9d3aee9bfe51249f69',
    href: 'https://www.youtube.com/channel/UCFdJ6n7vox94QFlFsnTLPtQ',
  },
  {
    id: '89292j93u',
    title: 'How to set delivery pricing?',
    description: 'In this article you can learn how to set delivery pricing based on pincodes and distance?',
    image: 'https://www.manageengine.com/products/service-desk-msp/images/msp-pricing.png',
    href: 'https://www.youtube.com/channel/UCFdJ6n7vox94QFlFsnTLPtQ',
  },
  {
    id: '89292j93u',
    title: 'How to do self delivery?',
    description: 'In this article you can learn how to do self delivery?',
    image:
      'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/09/631650-The-6-Best-Vegetarian-Meal-Delivery-Services-of-2020-1296x728-Header_81b9bf.jpg?w=1155&h=1528',

    href: 'https://www.youtube.com/channel/UCFdJ6n7vox94QFlFsnTLPtQ',
  },
];

// ----------------------------------------------------------------------

export default function DeliveryFeatured() {
  const theme = useTheme();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? QwikshopLearn.length - 1 : 0);

  const settings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselDots({
      zIndex: 9,
      top: 24,
      left: 24,
      position: 'absolute',
    }),
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <Card>
      <Slider ref={carouselRef} {...settings}>
        {QwikshopLearn.map((app, index) => (
          <CarouselItem key={app.id} item={app} isActive={index === currentIndex} />
        ))}
      </Slider>

      <CarouselArrows
        onNext={handleNext}
        onPrevious={handlePrevious}
        spacing={0}
        sx={{
          top: 16,
          right: 16,
          position: 'absolute',
          '& .arrow': {
            p: 0,
            width: 32,
            height: 32,
            opacity: 0.48,
            color: 'common.white',
            '&:hover': { color: 'common.white', opacity: 1 },
          },
        }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  isActive: PropTypes.bool,
  item: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }),
};

function CarouselItem({ item, isActive }) {
  const { image, title, description } = item;

  return (
    <Box sx={{ position: 'relative' }}>
      <CardContent
        component={MotionContainer}
        animate={isActive}
        action
        sx={{
          bottom: 0,
          width: 1,
          zIndex: 9,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <m.div variants={varFade().inRight}>
          <Typography variant="overline" component="div" sx={{ mb: 1, opacity: 0.48 }}>
            Learn Qwikshop
          </Typography>
        </m.div>
        <m.div variants={varFade().inRight}>
          <Link component={RouterLink} to="#" color="inherit" underline="none">
            <Typography variant="h5" gutterBottom noWrap>
              {title}
            </Typography>
          </Link>
        </m.div>
        <m.div variants={varFade().inRight}>
          <Typography variant="body2" noWrap>
            {description}
          </Typography>
        </m.div>
      </CardContent>
      <OverlayStyle />
      <Image alt={title} src={image} sx={{ height: { xs: 280, xl: 320 } }} />
    </Box>
  );
}
