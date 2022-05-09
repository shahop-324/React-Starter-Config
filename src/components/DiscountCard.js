/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Card,
  Typography,
  Stack,
  Switch,
  Divider,
  FormControlLabel,
  Chip,
} from '@mui/material';
import dateFormat from 'dateformat';
import { useDispatch } from 'react-redux';
import { updateDiscount } from '../actions';
import { ProductMoreMenu } from '../sections/@dashboard/e-commerce/product-list';
import EditDiscount from '../Dialogs/Discount/EditDiscount';
import DeleteDiscount from '../Dialogs/Discount/DeleteDiscount';

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
  ({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  })
);

const DiscountCard = ({
  id,
  code,
  discountType,
  applicableFromDateTime,
  applicableTillDateTime,
  type,
  numberOfCoupons,
  totalUsed,
  buyX,
  getY,
  discountPercentage,
  discountAmount,
  minOrderValue,
  maxDiscount,
  active,
}) => {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <Card sx={{ px: 3, py: 2 }}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="h6">{code}</Typography>
          <ProductMoreMenu
            onDelete={() => {
              handleOpenDelete();
            }}
            onEdit={() => {
              handleOpenEdit();
            }}
            productName="discount"
          />
        </Stack>
        <Divider className="my-3" variant="dashed" />
        <Typography sx={{ textAlign: 'center' }} variant="subtitle2">
          {(() => {
            switch (type) {
              case 'regular':
                if (discountType === 'percentage') {
                  // Percentage
                  return `${discountPercentage}% off upto Rs.${maxDiscount} above Rs.${minOrderValue}`;
                }
                // Flat
                return `Flat Rs.${discountAmount} Off above Rs.${minOrderValue}`;

              case 'buyXGetYFree':
                return `Buy ${buyX} get ${getY} Free`;

              case 'firstPurchase':
                if (discountType === 'percentage') {
                  // Percentage
                  return `${discountPercentage}% off upto Rs.${maxDiscount} above Rs.${minOrderValue}`;
                }
                // Flat
                return `Flat Rs.${discountAmount} Off above Rs.${minOrderValue}`;

              default:
                break;
            }
          })()}
        </Typography>
        <Divider className="my-3" variant="dashed" />
        <Stack className="my-2" direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="caption">Applicable From</Typography>
          <Typography variant="caption">{dateFormat(applicableFromDateTime, 'ddd, mmm dS, yy, h:MM')}</Typography>
        </Stack>
        <Stack className="my-2" direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="caption">Applicable till</Typography>
          <Typography variant="caption">{dateFormat(applicableTillDateTime, 'ddd, mmm dS, yy, h:MM')}</Typography>
        </Stack>
        <Divider className="my-3" variant="dashed" />
        <Stack className="my-2" direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="caption">Total coupons</Typography>
          <Typography variant="caption">{numberOfCoupons}</Typography>
        </Stack>
        <Stack className="my-2" direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="caption">Total Remaining</Typography>
          <Typography variant="caption">{numberOfCoupons - totalUsed}</Typography>
        </Stack>
        <Divider className="my-3" variant="dashed" />
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant="subtitle2">Status</Typography>
          <FormControlLabel
            control={
              <IOSSwitch
                sx={{ m: 1 }}
                checked={active}
                onChange={(e) => {
                  dispatch(updateDiscount({ active: e.target.checked }, id, () => {}));
                }}
              />
            }
            label=""
          />
        </Stack>
        <Divider className="my-3" variant="dashed" />
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
          <Chip color={'primary'} label={`${capitalizeFirstLetter(type)} Discount`} variant="outlined" />
        </Stack>
      </Card>
      {openEdit && <EditDiscount open={openEdit} handleClose={handleCloseEdit} id={id} />}
      {openDelete && <DeleteDiscount open={openDelete} handleClose={handleCloseDelete} id={id} />}
    </>
  );
};

export default DiscountCard;

// Discount code DONE
// enable disable DONE
// more menu DONE
// Total Coupons DONE
// Remaining DONE
// Type
// 15% off upto Rs.500 above Rs.4000
// Type
// Applicable from DONE
// Applicable till DONE
