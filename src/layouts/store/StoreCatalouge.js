/* eslint-disable react/jsx-key */
import React from 'react';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { IconButton, Stack, Typography, Card, CardActionArea, Box, Chip } from '@mui/material';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const StoreCatalouge = () => (
    <div className="container">
      <Stack direction="row" spacing={4} alignItems={'center'} className="my-4">
        <IconButton>
          <ArrowBackIosNewRoundedIcon />
        </IconButton>

        <Typography variant="h5">Catalouge</Typography>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        {categories.map((el) => (
          <Card sx={{ width: '100%' }}>
            <CardActionArea>
              <CardMedia component="img" height="240" image={el.image} alt={el.label} />
              <CardContent>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <Typography gutterBottom variant="h5" component="div">
                    {el.label}
                  </Typography>

                  <Chip label={`Rs. ${el.minPrice} - ${el.maxPrice}`} variant="outlined" />
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </div>
  );

export default StoreCatalouge;

const categories = [
  {
    label: 'Nike',
    minPrice: 3000,
    maxPrice: 18000,
    image: 'https://s3.amazonaws.com/nikeinc/assets/48622/2015-Nike-Mag-02_hd_1600.jpg?1445446034',
  },
  {
    label: 'Adidas',
    minPrice: 3000,
    maxPrice: 18000,
    image:
      'https://assets.adidas.com/images/w_600,f_auto,q_auto/e86f2cad9730409397bead5d00f31c91_9366/adidas_4DFWD_Shoes_White_FY3967_01_standard.jpg',
  },
  {
    label: 'Clarks',
    minPrice: 3000,
    maxPrice: 18000,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0fYPU1HbV4ZkqXDE2hnz-A312NT83uPTeEw&usqp=CAU',
  },
  {
    label: 'Seeandwear',
    minPrice: 3000,
    maxPrice: 18000,
    image:
      'https://www.looksgud.in/upload/item-image/955/khe5/khe5-seeandwear-tan-brogue-formal-shoes-for-men_500x500_0.jpg',
  },
  {
    label: 'Woodland',
    minPrice: 3000,
    maxPrice: 18000,
    image: 'https://m.media-amazon.com/images/I/81oOLEnk3nL._UL1500_.jpg',
  },
  {
    label: 'LeeCooper',
    minPrice: 3000,
    maxPrice: 18000,
    image: 'https://m.media-amazon.com/images/I/81aVx5K8vTL._UX500_.jpg',
  },
  {
    label: 'Fila',
    minPrice: 3000,
    maxPrice: 18000,
    image: 'https://scene7.zumiez.com/is/image/zumiez/image/FILA-Disruptor-Multicolor-%26-White-Shoes-_311646.jpg',
  },
  {
    label: 'Puma',
    minPrice: 3000,
    maxPrice: 18000,
    image:
      'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/375971/01/sv01/fnd/IND/fmt/png/Future-Rider-International-Game-Shoes',
  },
  {
    label: 'Reebok',
    minPrice: 3000,
    maxPrice: 18000,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc76K5J7vUC9gyXGaklSNME1Pvs1JZeJVOOQ&usqp=CAU',
  },
  {
    label: 'Hush Puupies',
    minPrice: 3000,
    maxPrice: 18000,
    image: 'https://5.imimg.com/data5/SELLER/Default/2020/12/QE/CN/PC/9339838/new-product-500x500.jpeg',
  },
  {
    label: 'Crocs',
    minPrice: 3000,
    maxPrice: 18000,
    image: 'https://media.crocs.com/images/t_pdphero%2Cf_auto/products/10001_0DA_ALT140/crocs',
  },
  {
    label: 'Prince',
    minPrice: 3000,
    maxPrice: 18000,
    image:
      'https://rukminim1.flixcart.com/image/714/857/shoe/g/q/g/white-green-ftw641-prozone-8-original-imae6fnzytqbchqy.jpeg?q=50',
  },
  {
    label: 'Yonex',
    minPrice: 3000,
    maxPrice: 18000,
    image: 'https://s3.amazonaws.com/nikeinc/assets/48622/2015-Nike-Mag-02_hd_1600.jpg?1445446034',
  },
  {
    label: 'Wilson',
    minPrice: 3000,
    maxPrice: 18000,
    image:
      'https://www.tennispro.eu/media/catalog/product/cache/5/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/w/r/wrs328220_blanc_2_12.jpg',
  },
  {
    label: 'Lotto',
    minPrice: 3000,
    maxPrice: 18000,
    image: 'https://cf.shopee.com.my/file/133287f668415bb2aca38b4b67dc6e32',
  },
  {
    label: 'New Balance',
    minPrice: 3000,
    maxPrice: 18000,
    image:
      'https://media.gq.com/photos/5e9897f2dad9540008456f78/4:3/w_2800,h_2100,c_limit/gq%20april%202020%20Casablanca%20x%20New%20Balance%20327%20Idealiste%20sneaker.jpg',
  },
  {
    label: 'Red Tape',
    minPrice: 3000,
    maxPrice: 18000,
    image: 'https://n3.sdlcdn.com/imgs/j/o/6/Red-Tape-Sneakers-Multi-Color-SDL238308117-1-95633.jpeg',
  },
  {
    label: 'Jack wolfskin',
    minPrice: 3000,
    maxPrice: 18000,
    image:
      'https://www.jack-wolfskin.com/dw/image/v2/AAQL_PRD/on/demandware.static/-/Library-Sites-JackWolfskin_SharedContentLib/default/dwcc1fe1a4/background/grey5/4042461_4287_1-f360-vojo-3-texapore-mid-m-khaki-phantom-7.jpg?sw=640&ox=0&oy=0&oimg=https%3A%2F%2Fwww.jack-wolfskin.com%2Fdw%2Fimage%2Fv2%2FAAQL_PRD%2Fon%2Fdemandware.static%2F-%2FSites-22021_FH21%2Fdefault%2Fdw7f193525%2Flarge%2F4042461_4287_1-f360-vojo-3-texapore-mid-m-khaki-phantom.png%3Fsw%3D640&sfrm=png',
  },
  {
    label: 'Lowa',
    minPrice: 3000,
    maxPrice: 18000,
    image: 'https://m.media-amazon.com/images/I/415GHorwyEL.jpg',
  },
  {
    label: 'Sketchers',
    minPrice: 3000,
    maxPrice: 18000,
    image: 'https://www.worldfootwear.com/media/images/news/wf2020204543p.jpg',
  },
];
