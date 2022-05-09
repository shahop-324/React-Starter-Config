/* eslint-disable react/prop-types */
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
    title: 'How to add products?',
    description:
      'In this article you can learn how to manage product categories and add items to your shop. How to update your stock and various other things...',
    image:
      'https://www.elegantthemes.com/blog/wp-content/uploads/2020/12/online-shopping-products.png',
      href: 'https://www.youtube.com/channel/UCFdJ6n7vox94QFlFsnTLPtQ'
  },
  {
    id: '89292j93u',
    title: 'How to manage customers?',
    description:
      'In this article you can learn how to manage customers of your shop. You can print their invoices and see their purchase history...',
    image:
      'https://mswebappcdn.azureedge.net/episerverprod/580561b7653c477ebd7909a6c9465a72/435513bac8ab490dbfab4ac14a61e26b.png',
      href: 'https://www.youtube.com/channel/UCFdJ6n7vox94QFlFsnTLPtQ'
  },
  {
    id: '89292j93u',
    title: 'How to accept orders?',
    description:
      'In this article you can learn how to accept orders and prepare them for shipping...',
    image:
      'https://www.brightpearl.com/wp-content/uploads/2021/02/image1-3.png',
      href: 'https://www.youtube.com/channel/UCFdJ6n7vox94QFlFsnTLPtQ'
  },
  {
    id: '89292j93u',
    title: 'How to get payments?',
    description:
      'In this article you can learn how to set up payments for your shop with QwikShop',
    image:
      'https://cdn.searchenginejournal.com/wp-content/uploads/2020/03/the-top-10-most-popular-online-payment-solutions-5e9978d564973-1520x800.png',
      href: 'https://www.youtube.com/channel/UCFdJ6n7vox94QFlFsnTLPtQ'
  },
  {
    id: '89292j93u',
    title: 'How to create discount?',
    description:
      'In this article you can learn how to create discount and promote your sales?',
    image:
      'https://cms-assets.tutsplus.com/cdn-cgi/image/width=630/uploads/users/23/posts/28611/image/how-to-set-discount-pricing-right.jpg',
      href: 'https://www.youtube.com/channel/UCFdJ6n7vox94QFlFsnTLPtQ'
  },
  {
    id: '89292j93u',
    title: 'How to setup delivery?',
    description:
      'In this article you can learn how to setup delivery for your products?',
    image:
      'https://assets.theedgemarkets.com/DE12-thumnails-tem1360_theedgemarkets.jpg?rWaliQB6sVOlrzjcUeO0mshfTGHckWaZ',
      href: 'https://www.youtube.com/channel/UCFdJ6n7vox94QFlFsnTLPtQ'
  },
  {
    id: '89292j93u',
    title: 'How to measure sales?',
    description:
      'In this article you can learn how to measure your sales?',
    image:
      'https://fizfy.com/wp-content/uploads/2020/09/sales-trends.jpg',
      href: 'https://www.youtube.com/channel/UCFdJ6n7vox94QFlFsnTLPtQ'
  },
];

// ----------------------------------------------------------------------

export default function AppFeatured() {
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
  const { image, title, description, href } = item;

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
          <Link component={RouterLink} to={href} color="inherit" underline="none">
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
