/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  Stack,
  Button,
  DialogTitle,
  DialogActions,
  Box,
  Card,
  Typography,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { exportComponentAsPNG } from 'react-component-export-image';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import dateFormat from 'dateformat';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import MessageIcon from '@mui/icons-material/Message';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import FilterFramesRoundedIcon from '@mui/icons-material/FilterFramesRounded';
import MopedRoundedIcon from '@mui/icons-material/MopedRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { DeliveryDiningRounded, DiningRounded } from '@mui/icons-material';
import Iconify from '../../components/Iconify';
import CoinPNG from '../../assets/coin.png';
import RejectOrder from './RejectOrder';
import CancelOrder from './CancelOrder';
import { acceptOrder, askForReview, fetchReviews } from '../../actions';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <CheckBoxRoundedIcon />,
    2: <FilterFramesRoundedIcon />,
    3: <LocalShippingRoundedIcon />,
    4: <MopedRoundedIcon />,
    5: <CheckCircleRoundedIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

function RestaurantColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <FilterFramesRoundedIcon />,
    2: <DiningRounded />,
    3: <DeliveryDiningRounded />,
    4: <CheckCircleRoundedIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

RestaurantColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['Waiting for acceptance', 'Preparing for shipment', 'Shipped', 'Out for Delivery', 'Delivered'];

const restaurantSteps = ['Waiting for acceptance', 'Accepted & Preparing', 'Out for Delivery', 'Delivered'];

const ComponentToPrint = React.forwardRef(({ id, setOpenCancel, setOpenReject }, ref) => {
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  const { discounts } = useSelector((state) => state.discount);
  const { store } = useSelector((state) => state.store);

  const order = orders.find((el) => el._id === id);

  useEffect(() => {
    switch (order?.status_id * 1) {
      case -1: // 'Waiting for acceptance'
        setActiveStep(0);
        break;
      case 0: // 'Accepted / Ready to ship'
        setActiveStep(1);
        break;
      case 6: // Shipped
        if (store.orderFlow === 'regular') {
          setActiveStep(2);
        } else {
          setActiveStep(100);
        }
        break;
      case 17: // Out for delivery
        if (store.orderFlow === 'regular') {
          setActiveStep(3);
        } else {
          setActiveStep(2);
        }
        break;
      case 7: // Delivered
        if (store.orderFlow === 'regular') {
          setActiveStep(4);
        } else {
          setActiveStep(3);
        }
        break;
      default:
        // default
        setActiveStep(100);
        break;
    }
  }, [orders]);

  const appliedDiscount = discounts.find((el) => el._id === order?.couponId);

  let orderedProducts = [];
  let givenProducts = [];

  orderedProducts = order?.items.map((el) => {
    const matchedProduct = products.find((elm) => elm._id === el.product);
    console.log(el);
    return {
      product: matchedProduct,
      // color: matchedProduct?.colorList?.find((col) => col.index === el.color),
      price: el.pricePerUnit,
      quantity: el.quantity,
      color: matchedProduct.colorsList.find((col) => col.index === el.color),
      variants: el.variants.map((v) => {
        const variant = matchedProduct.customVariants.find((op) => op.index === v.index);
        const selected = variant !== undefined ? variant.options.find((ab) => ab.index === v.selectedOption) : {};
        return {
          name: selected,
          type: variant ? variant.title : null,
        };
      }),
      // TODO Similarly find populate array of custom variants
    };
  });

  givenProducts = order?.givenProducts.map((el) => {
    const matchedProduct = products.find((elm) => elm._id.toString() === el.productId.toString());
    return {
      product: matchedProduct,
      quantity: el.quantity,
      price: matchedProduct.price,
    };
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const finalArr = store.formFields.map((el) => ({
    name: el.fieldName,
    type: el.type.title,
    value: order?.values ? order?.values[el._id] : null,
  }));

  console.log(finalArr);

  return (
    <div ref={ref}>
      <Box sx={{ width: { xs: '480px', md: '600px', lg: '1200px' }, p: 3 }}>
        <Stack sx={{ mb: 3 }} direction={'row'} alignItems="center" justifyContent={'space-between'}>
          <DialogTitle sx={{ mb: 2 }}>{'Order Receipt'}</DialogTitle>

          {(() => {
            switch (order?.status_id * 1) {
              case -1:
                return (
                  <Stack spacing={2} sx={{ flexDirection: { sx: 'column', md: 'row' }, alignItems: 'center' }}>
                    <Button
                      sx={{ mr: 3, mt: 2 }}
                      onClick={() => {
                        dispatch(acceptOrder(id));
                      }}
                      fullWidth
                      variant="contained"
                      endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => {
                        setOpenReject(true);
                      }}
                      fullWidth
                      variant="contained"
                      color="error"
                      endIcon={<Iconify icon={'eva:close-circle-fill'} />}
                    >
                      Reject
                    </Button>
                  </Stack>
                );

              default:
                return order?.status_id * 1 !== 8 ? (
                  <Stack spacing={2} direction="row" alignItems="center">
                    {' '}
                    <Button
                      disabled={order?.status_id * 1 === 8 || order?.status_id * 1 === 7}
                      onClick={() => {
                        setOpenCancel(true);
                      }}
                      fullWidth
                      variant="contained"
                      endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}
                      color="warning"
                    >
                      Cancel
                    </Button>
                  </Stack>
                ) : (
                  <></>
                );
            }
          })()}
        </Stack>
        <Card sx={{ p: 3, mb: 3 }}>
          <Box
            className="mb-2"
            sx={{
              display: 'grid',
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
            }}
          >
            <Typography variant="subtitle2">
              <span style={{ marginRight: '10px' }}>Order Id:</span>
              {order?.ref}
            </Typography>
            <Typography variant="subtitle2">
              <span style={{ marginRight: '10px' }}>Placed On:</span>
              {dateFormat(new Date(order?.createdAt || Date.now()), 'ddd, mmm dS, yy, h:MM TT')}
            </Typography>
            <Typography variant="subtitle2">
              {' '}
              <span style={{ marginRight: '10px' }}>Delivered On:</span>{' '}
              {order?.deliveredOn ? dateFormat(new Date(order?.deliveredOn)) : '----'}
            </Typography>
          </Box>
        </Card>

        <Card sx={{ p: 3, mb: 3 }}>
          {console.log(activeStep, activeStep * 1 !== 0)}

          {activeStep * 1 !== 100 ? (
            store.orderFlow === 'regular' ? (
              <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            ) : (
              <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {restaurantSteps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={RestaurantColorlibStepIcon}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )
          ) : (
            <Card sx={{ p: 3 }}>
              <Stack spacing={1} direction={'row'} alignItems="center">
                <Typography>Current Status is: </Typography>
                <Typography>
                  {' '}
                  <strong>{order?.status}</strong>
                </Typography>
              </Stack>
            </Card>
          )}
        </Card>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Ordered Products
        </Typography>
        <Card sx={{ p: 3, mb: 3 }}>
          {orderedProducts.map((el) => {
            console.log(el);
            return (
              <div key={el._id}>
                <Box
                  className="mb-2"
                  sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                  }}
                >
                  <Stack direction={'row'} alignItems="center" spacing={2}>
                    <Avatar
                      variant="rounded"
                      src={`https://qwikshop.s3.ap-south-1.amazonaws.com/${el.product.images[0]}`}
                      sx={{ width: 70, height: 70 }}
                    />
                    <Stack spacing={1}>
                      <Typography variant="subtitle2">{el.product.productName}</Typography>
                      <Typography variant="caption">
                        {' '}
                        Rs. {el.price} * {el.quantity}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction={'row'} alignItems="center" justifyContent={'center'}>
                    <Typography variant="body2">
                      {el?.color && (
                        <>
                          <Stack spacing={2} direction={'row'} alignItems="center" justifyContent={'space-between'}>
                            <Typography variant="subtitle2">Color</Typography>
                            <Stack spacing={1} direction={'row'} alignItems="center" justifyContent={'space-between'}>
                              <Card sx={{ backgroundColor: el?.color?.color, p: 1, width: '10px', height: '10px' }} />
                              <Typography variant="caption">({el?.color?.name})</Typography>
                            </Stack>
                          </Stack>
                          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
                        </>
                      )}

                      {el.variants.map((vr) => (
                        <>
                          <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
                            <Typography>{vr.type}</Typography>
                            <Typography>{vr.name.name}</Typography>
                          </Stack>
                          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
                        </>
                      ))}
                    </Typography>
                  </Stack>
                </Box>
                <Divider sx={{ my: 1 }} />
              </div>
            );
          })}
        </Card>
        {/* // TODO Similarly render list of given products */}

        {givenProducts !== undefined && givenProducts.length > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Given Products (Via OFFER)
            </Typography>

            <Card sx={{ p: 3, mb: 3 }}>
              {givenProducts !== undefined &&
                givenProducts.length > 0 &&
                givenProducts.map((el) => (
                  <div key={el._id}>
                    <Box
                      className="mb-2"
                      sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 3,
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                      }}
                    >
                      <Stack direction={'row'} alignItems="center" spacing={2}>
                        <Avatar
                          variant="rounded"
                          src={`https://qwikshop.s3.ap-south-1.amazonaws.com/${el.product.images[0]}`}
                          sx={{ width: 70, height: 70 }}
                        />
                        <Stack spacing={1}>
                          <Typography variant="subtitle2">{el.product.productName}</Typography>
                          <Typography variant="caption">
                            {' '}
                            Rs. {el.price} * {el.quantity}
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack direction={'row'} alignItems="center" justifyContent={'center'}>
                        <Typography variant="body2">{'------------'}</Typography>
                      </Stack>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                  </div>
                ))}
            </Card>
          </>
        )}

        <Box
          className="mb-2"
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          }}
        >
          <Card sx={{ p: 3 }}>
            <Typography sx={{ mb: 2 }} variant="subtitle1">
              Shipping Address
            </Typography>

            <div>
              <Stack sx={{ my: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
                <Typography variant="caption">Name</Typography>
                <Typography variant="subtitle2">{order?.shippingAddress?.shipping_name || '----'}</Typography>
              </Stack>
            </div>

            <Divider sx={{ my: 1 }} />
            <div>
              <Stack sx={{ my: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
                <Typography variant="caption">Address</Typography>
                <Typography variant="subtitle2">{order?.shippingAddress?.shipping_address1 || '----'}</Typography>
              </Stack>
            </div>

            <Divider sx={{ my: 1 }} />
            <div>
              <Stack sx={{ my: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
                <Typography variant="caption">Pincode</Typography>
                <Typography variant="subtitle2">{order?.shippingAddress?.shipping_zip || '----'}</Typography>
              </Stack>
            </div>

            <Divider sx={{ my: 1 }} />
            <div>
              <Stack sx={{ my: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
                <Typography variant="caption">Contact Number</Typography>
                <Typography variant="subtitle2">{order?.shippingAddress?.shipping_contact || '----'}</Typography>
              </Stack>
            </div>
            <Divider sx={{ my: 1 }} />

            <div>
              <Stack sx={{ my: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
                <Typography variant="caption">Landmark</Typography>
                <Typography variant="subtitle2">{order?.shippingAddress?.shipping_landmark || '----'}</Typography>
              </Stack>
            </div>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography variant="subtitle1">Charges Summary</Typography>

            <div>
              <Stack sx={{ my: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
                <Typography variant="caption">Subtotal</Typography>
                <Typography variant="subtitle2">Rs.{order?.charges?.items_total || '----'}</Typography>
              </Stack>
            </div>
            <div>
              <Stack sx={{ my: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
                <Typography variant="caption">Shipping Fees</Typography>
                <Typography variant="subtitle2">Rs.{order?.charges?.shipping_charge || '----'}</Typography>
              </Stack>
            </div>
            <div>
              <Stack sx={{ my: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
                <Typography variant="caption">Discount</Typography>
                <Typography variant="subtitle2">- Rs.{order?.charges?.discount || '----'}</Typography>
              </Stack>
            </div>

            {order?.charges !== undefined &&
              order?.charges?.extra_charges !== undefined &&
              order?.charges?.extra_charges?.length > 0 &&
              order?.charges?.extra_charges.map((el) => (
                <div key={el?.name}>
                  <Stack sx={{ my: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
                    <Typography variant="caption">{el?.name}</Typography>
                    <Typography variant="subtitle2">Rs.{el?.amount || '----'}</Typography>
                  </Stack>
                </div>
              ))}

            <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

            <Stack sx={{ my: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="caption">{'Total'}</Typography>
              <Typography variant="subtitle2">Rs.{order?.charges?.total || '---'}</Typography>
            </Stack>

            <Divider sx={{ my: 2, borderStyle: 'dashed' }} />

            <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
              <Typography>Mode of payment</Typography>

              <Chip
                sx={{ fontWeight: 600 }}
                color={'primary'}
                label={order?.paymentMode ? order?.paymentMode?.toUpperCase() : '-----'}
              />
            </Stack>
          </Card>
        </Box>

        {order?.paymentMode === 'cod' && (
          <Card sx={{ p: 3, mb: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                justifyItems: 'center',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
              }}
            >
              <Typography variant="caption">
                <span style={{ marginRight: '10px' }}>Order Total</span>
                <Typography sx={{ color: '#3116AC' }} variant="subtitle2">
                  {' '}
                  Rs.{order?.charges?.total}{' '}
                </Typography>
              </Typography>
              <Typography variant="caption">
                <span style={{ marginRight: '10px' }}>Coins used</span>
                <Typography sx={{ color: '#47A31C' }} variant="subtitle2">
                  {' '}
                  Rs.{order?.coinsUsed}{' '}
                </Typography>
              </Typography>
              <Typography variant="caption">
                <span style={{ marginRight: '10px' }}>Remaining amount</span>{' '}
                <Typography color="error" variant="subtitle2">
                  {' '}
                  Rs.{order?.charges?.total - order?.coinsUsed}{' '}
                </Typography>
              </Typography>
            </Box>
          </Card>
        )}

        <Box
          className="mb-2"
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          }}
        >
          <Card sx={{ p: 3 }}>
            <Stack sx={{ mb: 3 }} direction={'row'} alignItems="center" spacing={2}>
              <Typography variant="subtitle2">Coins</Typography>
              <img src={CoinPNG} style={{ height: '30px', width: '30px' }} alt={'Loyalty (Bonus) Coin'} />
            </Stack>

            <Stack direction={'row'} justifyContent={'space-between'} alignItems="center" spacing={2}>
              <Stack alignItems="center" spacing={2}>
                <Typography variant="subtitle2">Used</Typography>
                <Typography>{order?.coinsUsed}</Typography>
              </Stack>
              <Divider orientation="vertical" />
              <Stack alignItems="center" spacing={2}>
                <Typography variant="subtitle2">Earned</Typography>
                <Typography>{order?.coinsEarned}</Typography>
              </Stack>
            </Stack>
          </Card>
          {appliedDiscount && (
            <Card sx={{ p: 3 }}>
              <Typography sx={{ mb: 2 }} variant="subtitle2">
                Applied Discount
              </Typography>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                <Typography variant="h6">{appliedDiscount?.discountCode}</Typography>
              </Stack>
              <Divider className="my-3" variant="dashed" />
              <Typography sx={{ textAlign: 'center' }} variant="subtitle2">
                {(() => {
                  switch (appliedDiscount?.type) {
                    case 'regular':
                      if (appliedDiscount?.discountType === 'percentage') {
                        // Percentage
                        return `${appliedDiscount?.discountPercentage}% off upto Rs.${appliedDiscount?.maxDiscount} above Rs.${appliedDiscount?.minOrderValue}`;
                      }
                      // Flat
                      return `Flat Rs.${appliedDiscount?.discountAmount} Off above Rs.${appliedDiscount?.minOrderValue}`;

                    case 'buyXGetYFree':
                      return `Buy ${appliedDiscount?.buyX} get ${appliedDiscount?.getY} Free`;

                    case 'firstPurchase':
                      if (appliedDiscount?.discountType === 'percentage') {
                        // Percentage
                        return `${appliedDiscount?.discountPercentage}% off upto Rs.${appliedDiscount?.maxDiscount} above Rs.${appliedDiscount?.minOrderValue}`;
                      }
                      // Flat
                      return `Flat Rs.${appliedDiscount?.discountAmount} Off above Rs.${appliedDiscount?.minOrderValue}`;

                    default:
                      break;
                  }
                })()}
              </Typography>

              <Divider className="my-3" variant="dashed" />
              <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                <Chip
                  color={'primary'}
                  label={`${capitalizeFirstLetter(appliedDiscount?.type || '--')} Discount`}
                  variant="outlined"
                />
              </Stack>
            </Card>
          )}

          <Card sx={{ p: 3 }}>
            <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
              <Typography variant="caption">Customer Note</Typography>
              <Typography variant="caption">{order?.note || '----'}</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
              <Typography variant="caption">Referrer Name</Typography>
              <Typography variant="caption">{order?.referral?.name || '----'}</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
              <Typography variant="caption">Referrer Phone</Typography>

              <Typography variant="caption">{order?.referral?.phone || '----'}</Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
              <Typography variant="caption">Referrer Email</Typography>

              <Typography variant="caption">{order?.referral?.email || '----'}</Typography>
            </Stack>
          </Card>

          {finalArr !== undefined && finalArr.length > 0 && (
            <Card sx={{ p: 3 }}>
              <Typography sx={{ mb: 2 }} variant="subtitle2">
                Checkout Details
              </Typography>

              {finalArr.map((el) => (
                <div>
                  <Stack key={el.name} direction="row" alignItems={'center'} justifyContent="space-between">
                    <Typography variant="caption">{el?.name}</Typography>
                    <Typography variant="subtitle2">
                      {el?.value ? (el?.type !== 'Custom Dropdown' ? el?.value : el?.value?.label) : '----'}
                    </Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                </div>
              ))}
            </Card>
          )}

          <Card sx={{ p: 3 }}>
            <Typography sx={{ mb: 2 }} variant="subtitle1">
              Billing Address
            </Typography>

            <Stack direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="caption">Name</Typography>
              <Typography variant="subtitle2">{order?.billingAddress?.billing_name || '----'}</Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />
            <Stack direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="caption">Address</Typography>
              <Typography variant="subtitle2">{order?.billingAddress?.billing_address1 || '----'}</Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />
            <Stack direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="caption">Pincode</Typography>
              <Typography variant="subtitle2">{order?.billingAddress?.billing_zip || '----'}</Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />
            <Stack direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="caption">Contact Number</Typography>
              <Typography variant="subtitle2">{order?.billingAddress?.billing_contact || '----'}</Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />

            <Stack direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="caption">Landmark</Typography>
              <Typography variant="subtitle2">{order?.billingAddress?.billing_landmark || '----'}</Typography>
            </Stack>
          </Card>
        </Box>

        {/* // TODO Billing Address */}
        {/* // TODO Custom form answers */}
      </Box>
    </div>
  );
});

const OrderReceipt = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();
  const componentRef = useRef();

  const [openReject, setOpenReject] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);

  const { orders } = useSelector((state) => state.order);
  const { reviews } = useSelector((state) => state.review);

  const order = orders.find((el) => {
    console.log(id, el._id);
    return el._id === id;
  });

  const customerReviews = reviews.filter((el) => el.customer._id === order?.customer._id);

  const handleCloseReject = () => {
    setOpenReject(false);
  };

  const handleCloseCancel = () => {
    setOpenCancel(false);
  };

  const [reviewed, setReviewed] = useState(false);

  useEffect(() => {
    customerReviews.forEach((el) => {
      if (order?.items.map((a) => a.product).includes(el.product)) {
        setReviewed(true);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(fetchReviews());
  }, []);

  return (
    <>
      <Dialog
        maxWidth={'xl'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogActions>
          <Chip label={order?.status} color="primary" variant="outlined" />
          <Stack sx={{ mx: 3 }} direction={'row'} alignItems="center" justifyContent={'end'}>
            {reviewed ? (
              <Chip label={'Review Received'} color="primary" variant="outlined" />
            ) : (
              <Button
                onClick={() => {
                  dispatch(askForReview(id));
                }}
                disabled={order?.status_id * 1 !== 7}
                variant="outlined"
                startIcon={<MessageIcon />}
                color="success"
              >
                Ask for review
              </Button>
            )}
          </Stack>

          <Button
            variant="outlined"
            onClick={() => exportComponentAsPNG(componentRef)}
            startIcon={<CloudDownloadIcon />}
          >
            Download Receipt
          </Button>
        </DialogActions>
        <ComponentToPrint id={id} setOpenCancel={setOpenCancel} setOpenReject={setOpenReject} ref={componentRef} />
      </Dialog>
      {openReject && <RejectOrder open={openReject} handleClose={handleCloseReject} id={id} />}
      {openCancel && <CancelOrder open={openCancel} handleClose={handleCloseCancel} id={id} />}
    </>
  );
};

export default OrderReceipt;
