import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MUIStyled from 'styled-components';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { styled } from '@mui/material/styles';
// @mui
import { Box, Card, Typography, Stack, IconButton, Button, Tooltip } from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import { ColorPreview } from '../../../../components/color-utils';

// ----------------------------------------------------------------------

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
}));

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

const WishListButton = MUIStyled.div`
border-radius: 50px;
background-color: #ffffff;
`;

export default function ShopProductCard({ product }) {
  const { name, cover, price, colors, status, priceSale } = product;

  // const linkTo = `${PATH_DASHBOARD.integration.root}/product/${paramCase(name)}`;

  const [showFav, setShowFav] = useState(false);

  return (
    <Card
      onMouseEnter={() => {
        setShowFav(true);
      }}
      onMouseLeave={() => {
        setShowFav(false);
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        {showFav && (
          <WishListButton style={{ top: 16, left: 16, zIndex: 9, position: 'absolute' }}>
            <Tooltip title="Add to wishlist">
            <IconButton>
              <FavoriteBorderRoundedIcon />
            </IconButton>
            </Tooltip>
            
          </WishListButton>
        )}
        <Image alt={name} src={cover} ratio="1/1" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />

          <Stack direction="row" spacing={0.5}>
            {priceSale && (
              <Typography component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(priceSale)}
              </Typography>
            )}

            <Typography variant="subtitle1">{fCurrency(price)}</Typography>
          </Stack>
        </Stack>

        <Stack direction={'row'} alignItems={'center'} justifyContent={'end'}>
          <Button variant="outlined">Add to Bag</Button>
          {/* 
            <Incrementer
              quantity={2}
              available={2000}
              onDecrease={() => onDecreaseQuantity()}
              onIncrease={() => onIncreaseQuantity()}
            />
          */}
        </Stack>
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
};

function Incrementer({ available, quantity, onIncrease, onDecrease }) {
  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <IncrementerStyle>
        <IconButton size="small" color="inherit" onClick={onDecrease} disabled={quantity <= 1}>
          <Iconify icon={'eva:minus-fill'} width={16} height={16} />
        </IconButton>
        {quantity}
        <IconButton size="small" color="inherit" onClick={onIncrease} disabled={quantity >= available}>
          <Iconify icon={'eva:plus-fill'} width={16} height={16} />
        </IconButton>
      </IncrementerStyle>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        available: {available}
      </Typography>
    </Box>
  );
}
