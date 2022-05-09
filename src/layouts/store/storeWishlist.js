/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { Box, Typography, IconButton, Stack, Link, Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { RHFSelect, FormProvider } from '../../components/hook-form';
import { ColorSinglePicker } from '../../components/color-utils';

import Iconify from '../../components/Iconify';
// form

const Card = styled.div`
  min-height: 200px;
  width: 100%;
  border: 1px solid #21212167;
  border-radius: 10px;
`;

const WishlistCard = ({ image, discountedPrice }) => {
 const product = {
  id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
  cover: 'https://www.cookwithmanali.com/wp-content/uploads/2021/09/Moong-Dal-Dosa-500x500.jpg',
  images: [
    'https://minimal-assets-api.vercel.app/assets/images/products/product_1.jpg',
    'https://minimal-assets-api.vercel.app/assets/images/products/product_2.jpg',
    'https://minimal-assets-api.vercel.app/assets/images/products/product_3.jpg',
    'https://minimal-assets-api.vercel.app/assets/images/products/product_4.jpg',
    'https://minimal-assets-api.vercel.app/assets/images/products/product_5.jpg',
    'https://minimal-assets-api.vercel.app/assets/images/products/product_6.jpg',
    'https://minimal-assets-api.vercel.app/assets/images/products/product_7.jpg',
    'https://minimal-assets-api.vercel.app/assets/images/products/product_8.jpg',
  ],
  name: 'Nike Air Force 1 NDESTRUKT',
  code: '38BEE270',
  sku: 'WW75K5210YW/SV',
  tags: ['Dangal', 'The Sting', '2001: A Space Odyssey', "Singin' in the Rain"],
  price: 16.19,
  priceSale: 16.19,
  totalRating: 2.5,
  totalReview: 4419,
  ratings: [
    {
      name: '1 Star',
      starCount: 3190,
      reviewCount: 9945,
    },
    {
      name: '2 Star',
      starCount: 3896,
      reviewCount: 8266,
    },
    {
      name: '3 Star',
      starCount: 8436,
      reviewCount: 4386,
    },
    {
      name: '4 Star',
      starCount: 7690,
      reviewCount: 2444,
    },
    {
      name: '5 Star',
      starCount: 1514,
      reviewCount: 8045,
    },
  ],
  reviews: [
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
      name: 'Jayvion Simon',
      avatarUrl: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_1.jpg',
      comment: 'Assumenda nam repudiandae rerum fugiat vel maxime.',
      rating: 2.5,
      isPurchased: true,
      helpful: 8583,
      postedAt: '2022-01-18T05:37:30.091Z',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
      name: 'Lucian Obrien',
      avatarUrl: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg',
      comment: 'Quis veniam aut saepe aliquid nulla.',
      rating: 2,
      isPurchased: true,
      helpful: 1307,
      postedAt: '2022-01-17T04:37:30.091Z',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
      name: 'Deja Brady',
      avatarUrl: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_3.jpg',
      comment: 'Reprehenderit ut voluptas sapiente ratione nostrum est.',
      rating: 4.9,
      isPurchased: true,
      helpful: 7273,
      postedAt: '2022-01-16T03:37:30.091Z',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
      name: 'Harrison Stein',
      avatarUrl: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_4.jpg',
      comment: 'Error ut sit vel molestias velit.',
      rating: 2,
      isPurchased: false,
      helpful: 6943,
      postedAt: '2022-01-15T02:37:30.091Z',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
      name: 'Reece Chung',
      avatarUrl: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_5.jpg',
      comment: 'Quo quia sit nihil nemo doloremque et.',
      rating: 4,
      isPurchased: false,
      helpful: 2602,
      postedAt: '2022-01-14T01:37:30.091Z',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
      name: 'Lainey Davidson',
      avatarUrl: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_6.jpg',
      comment: 'Autem doloribus harum vero laborum.',
      rating: 5,
      isPurchased: true,
      helpful: 6668,
      postedAt: '2022-01-13T00:37:30.091Z',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
      name: 'Cristopher Cardenas',
      avatarUrl: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_7.jpg',
      comment: 'Tempora officiis consequuntur architecto nostrum autem nam adipisci.',
      rating: 4.9,
      isPurchased: false,
      helpful: 2332,
      postedAt: '2022-01-11T23:37:30.091Z',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
      name: 'Melanie Noble',
      avatarUrl: 'https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_8.jpg',
      comment: 'Voluptas sunt magni adipisci praesentium saepe.',
      rating: 5,
      isPurchased: false,
      helpful: 3990,
      postedAt: '2022-01-10T22:37:30.091Z',
    },
  ],
  status: 'sale',
  inventoryType: 'out_of_stock',
  sizes: ['6', '7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
  available: 70,
  description:
    '\n<p><strong><small> SPECIFICATION</small></strong></p>\n<p>Leather panels. Laces. Rounded toe. Rubber sole.\n<br /><br />\n<p><strong><small> MATERIAL AND WASHING INSTRUCTIONS</small></strong></p>\n<p>Shoeupper: 54% bovine leather,46% polyurethane. Lining: 65% polyester,35% cotton. Insole: 100% polyurethane. Sole: 100% thermoplastic. Fixing sole: 100% glued.</p>\n',
  sold: 379,
  createdAt: '2022-01-18T05:37:30.091Z',
  category: 'Accessories',
  gender: 'Men',
  colors: ['#00AB55', '#000000'],
};

  const {
    id,
    name,
    sizes,
    price,
    cover,
    status,
    colors,
    available,
    priceSale,
    totalRating,
    totalReview,
    inventoryType,
  } = product;

  const defaultValues = {
    id,
    name,
    cover,
    available,
    price,
    color: colors[0],
    size: sizes[4],
    quantity: available < 1 ? 0 : 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  const onSubmit = () => {};

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <Stack direction="row" spacing={2} className="p-3">
            <img
              style={{ height: '160px', width: '160px', objectFit: 'contain' }}
              src={
                'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/18a5494e-0f14-422c-9fce-4b469db7c936/air-max-pre-day-shoes-hlv9tD.png'
              }
              alt={'shoes'}
            />
            <Stack spacing={2} sx={{ width: '100%', padding: '10px' }}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant="h6">Nike Air Force 1</Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Typography variant="subtitle2" style={{ textDecoration: 'line-through' }}>
                    Rs. 12999
                  </Typography>
                  <Typography variant="subtitle1">Rs. 7999</Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Color
                </Typography>

                <Controller
                  name="color"
                  control={control}
                  render={({ field }) => (
                    <ColorSinglePicker
                      colors={colors}
                      value={field.value}
                      onChange={field.onChange}
                      sx={{
                        ...(colors.length > 4 && {
                          maxWidth: 144,
                          justifyContent: 'flex-end',
                        }),
                      }}
                    />
                  )}
                />
              </Stack>

              <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Size
                </Typography>

                <RHFSelect
                  name="size"
                  size="small"
                  fullWidth={false}
                  FormHelperTextProps={{
                    sx: { textAlign: 'right', margin: 0, mt: 1 },
                  }}
                  helperText={
                    <Link underline="always" color="text.secondary">
                      Size Chart
                    </Link>
                  }
                >
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>

              <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                  Quantity
                </Typography>

                <div>
                  <Incrementer
                    name="quantity"
                    quantity={values.quantity}
                    available={available}
                    onIncrementQuantity={() => setValue('quantity', values.quantity + 1)}
                    onDecrementQuantity={() => setValue('quantity', values.quantity - 1)}
                  />
                  <Typography
                    variant="caption"
                    component="div"
                    sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}
                  >
                    Available: {available}
                  </Typography>
                </div>
              </Stack>
              <Stack direction={'row'} spacing={3} alignItems={'center'}>
                <Button variant="contained">Add to Bag</Button>
                <Button variant="outlined">Share</Button>
                <Button>Remove</Button>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </FormProvider>
    </>
  );
};

const StoreWishlist = () => {
  const [state, setState] = useState();

  return (
    <div className="container mt-5">
      <div className="mb-4 d-flex flex-row align-items-center">
        <IconButton>
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
        <Typography variant="h5" className="ms-3">
          Wishlist
        </Typography>
      </div>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            sm: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          },
        }}
      >
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
      </Box>
    </div>
  );
};

export default StoreWishlist;

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrementQuantity: PropTypes.func,
  onDecrementQuantity: PropTypes.func,
};

function Incrementer({ available, quantity, onIncrementQuantity, onDecrementQuantity }) {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <IconButton size="small" color="inherit" disabled={quantity <= 1} onClick={onDecrementQuantity}>
        <Iconify icon={'eva:minus-fill'} width={14} height={14} />
      </IconButton>

      <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center' }}>
        {quantity}
      </Typography>

      <IconButton size="small" color="inherit" disabled={quantity >= available} onClick={onIncrementQuantity}>
        <Iconify icon={'eva:plus-fill'} width={14} height={14} />
      </IconButton>
    </Box>
  );
}
