/* eslint-disable react/prop-types */
import React, { useRef } from 'react';

import { useSelector } from 'react-redux';
import {
  Dialog,
  Stack,
  Button,
  DialogActions,
  Box,
  Card,
  Typography,
  Chip,
  Divider,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { exportComponentAsPNG } from 'react-component-export-image';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import dateFormat from 'dateformat';

import Barcode from 'react-barcode';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ComponentToPrint = React.forwardRef(({ id }, ref) => {
  
  const { products } = useSelector((state) => state.product);
 
  const { store } = useSelector((state) => state.store);
  const { shipments } = useSelector((state) => state.shipment);

  const shipment = shipments.find((el) => el._id === id);

  const { order } = shipment;

  // const appliedDiscount = discounts.find((el) => el._id === order.couponId);

  let orderedProducts = [];

  if (order && order?.items) {
    orderedProducts = order.items.map((el) => {
      const matchedProduct = products.find((elm) => elm._id === el.product);
      return {
        product: matchedProduct,
        color: matchedProduct?.colorList?.find((col) => col.index === el.color),
        price: el.pricePerUnit,
        quantity: el.quantity,
        //   Similarly find populate array of custom variants
      };
    });
  }

 

  const finalArr = store.formFields.map((el) => ({
    name: el.fieldName,
    type: el.type.title,
    value: order?.values ? order?.values[el._id] : null,
  }));

  console.log(finalArr);

  let barcodeValue = {};

  if (order) {
    barcodeValue = {
      deliveredVia: shipment.carrier,
      seller: store._id,
      sellerName: store.name,
      orderId: order?.ref,
      shipmentId: shipment._id,
      amountToCollect: order?.charges?.total - order?.paidAmount,
      customer: order.customer._id,
      timestamp: Date.now(),
      shippingName: order?.shippingAddress.shipping_name,
      shippingLandmark: order?.shippingAddress.shipping_landmark,
      shippingContact: order?.shippingAddress.shipping_contact,
      shippingAddress1: order?.shippingAddress.shipping_address1,
      shippingZip: order?.shippingAddress.shipping_zip,
    };
  }

  return (
    <div ref={ref}>
      <Box sx={{ width: '1000px', p: 3 }}>
        <Card sx={{ p: 3, mb: 3 }}>
          <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
            <Barcode value={barcodeValue} displayValue={false} flat />

            <Stack sx={{ width: 350 }}>
              <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
                <Typography variant="subtitle2">Deliver to </Typography>

                <Typography variant="subtitle2">Shreyansh shah</Typography>
              </Stack>
              <Stack sx={{ width: 350 }}>
                <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
                  <Typography variant="subtitle2">Delivered Via </Typography>

                  <Typography variant="subtitle2">Delhivery</Typography>
                </Stack>
                <Stack sx={{ width: 350 }}>
                  <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
                    <Typography variant="subtitle2">Seller </Typography>

                    <Typography variant="subtitle2">Uncle Kirana Store</Typography>
                  </Stack>
                  <Stack sx={{ width: 350 }}>
                    <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
                      <Typography variant="subtitle2">Pincode </Typography>

                      <Typography variant="subtitle2">474020</Typography>
                    </Stack>
                    <Stack sx={{ width: 350 }}>
                      <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
                        <Typography variant="subtitle2">Amount to Collect </Typography>

                        <Typography variant="subtitle2">Rs. 450</Typography>
                      </Stack>
                    </Stack>
                    <Stack sx={{ width: 350 }}>
                      <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
                        <Typography variant="subtitle2">Generated on </Typography>

                        <Typography variant="subtitle2">
                          {dateFormat(new Date(), 'ddd mmm dS, yy, hh:mm TT')}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Card>
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
            <Typography variant="subtitle2" sx={{ fontSize: '12px' }}>
              <span style={{ marginRight: '10px' }}>Order Id:</span>
              {order?.ref}
            </Typography>
            <Typography variant="subtitle2" sx={{ fontSize: '12px' }}>
              <span style={{ marginRight: '10px' }}>Placed On:</span>
              {order && dateFormat(new Date(order?.createdAt), 'ddd, mmm dS, yy, h:MM TT')}
             
            </Typography>
            <Typography variant="subtitle2" sx={{ fontSize: '12px' }}>
              {' '}
              <span style={{ marginRight: '10px' }}>Shipment Id:</span> {id.toUpperCase()}
            </Typography>
          </Box>
        </Card>

        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Line Items
        </Typography>
        <Card sx={{ p: 3, mb: 3 }}>
          {orderedProducts.map((el, index) => (
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
                <Stack spacing={1} direction={'row'} alignItems="center">
                  {index + 1}
                </Stack>
                <Stack direction={'row'} alignItems="center" spacing={2}>
                  <Stack justifySelf="center" spacing={1}>
                    <Typography variant="subtitle2">{el?.product?.productName}</Typography>
                    <Typography variant="caption">
                      {' '}
                      Rs. {el?.price} * {el?.quantity}
                    </Typography>
                  </Stack>
                </Stack>
                
              </Box>
              <Divider sx={{ my: 1 }} />
            </div>
          ))}
        </Card>
        {/* // TODO Similarly render list of given products */}

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

            <Typography variant="caption">Name</Typography>
            <Typography variant="subtitle2">{order?.shippingAddress.shipping_name}</Typography>

            <Divider sx={{ my: 1 }} />
            <Typography variant="caption">Address</Typography>
            <Typography variant="subtitle2">{order?.shippingAddress.shipping_address1}</Typography>

            <Divider sx={{ my: 1 }} />
            <Typography variant="caption">Pincode</Typography>
            <Typography variant="subtitle2">{order?.shippingAddress.shipping_zip}</Typography>

            <Divider sx={{ my: 1 }} />
            <Typography variant="caption">Contact Number</Typography>
            <Typography variant="subtitle2">{order?.shippingAddress.shipping_contact}</Typography>

            <Divider sx={{ my: 1 }} />

            <Typography variant="caption">Landmark</Typography>
            <Typography variant="subtitle2">{order?.shippingAddress.shipping_landmark}</Typography>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography variant="subtitle1">Charges Summary</Typography>

            <div>
              <Stack sx={{ my: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
                <Typography variant="caption">Subtotal</Typography>
                <Typography variant="subtitle2">Rs.{order?.charges.items_total}</Typography>
              </Stack>
            </div>
            <div>
              <Stack sx={{ my: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
                <Typography variant="caption">Shipping Fees</Typography>
                <Typography variant="subtitle2">Rs.{order?.charges.shipping_charge}</Typography>
              </Stack>
            </div>
            <div>
              <Stack sx={{ my: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
                <Typography variant="caption">Discount</Typography>
                <Typography variant="subtitle2">- Rs.{order?.charges.discount}</Typography>
              </Stack>
            </div>

            {order?.charges.extra_charges.map((el) => (
              <div key={el.name}>
                <Stack sx={{ my: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
                  <Typography variant="caption">{el.name}</Typography>
                  <Typography variant="subtitle2">Rs.{el.amount}</Typography>
                </Stack>
              </div>
            ))}

            <Divider sx={{ my: 2 }} />

            <Stack sx={{ my: 2 }} direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="caption">{'Total'}</Typography>
              <Typography variant="subtitle2">Rs.{order?.charges.total}</Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
              <Typography>Mode of payment</Typography>

              <Chip color={'primary'} label={order?.paymentMode} />
            </Stack>
          </Card>
        </Box>

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
              Billing Address
            </Typography>

            <Stack direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="caption">Name</Typography>
              <Typography variant="subtitle2">{order?.billingAddress.billing_name}</Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />
            <Stack direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="caption">Address</Typography>
              <Typography variant="subtitle2">{order?.billingAddress.billing_address1}</Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />
            <Stack direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="caption">Pincode</Typography>
              <Typography variant="subtitle2">{order?.billingAddress.billing_zip}</Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />
            <Stack direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="caption">Contact Number</Typography>
              <Typography variant="subtitle2">{order?.billingAddress.billing_contact}</Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />

            <Stack direction="row" alignItems={'center'} justifyContent="space-between">
              <Typography variant="caption">Landmark</Typography>
              <Typography variant="subtitle2">{order?.billingAddress.billing_landmark}</Typography>
            </Stack>
          </Card>
        </Box>
      </Box>
    </div>
  );
});

const DeliveryReceipt = ({ open, handleClose, id }) => {
  const componentRef = useRef();

  return (
    <>
      <Dialog
        maxWidth={'lg'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => exportComponentAsPNG(componentRef)}
            startIcon={<CloudDownloadIcon />}
          >
            Download Receipt
          </Button>
        </DialogActions>

        <ComponentToPrint id={id} ref={componentRef} />
      </Dialog>
    </>
  );
};

export default DeliveryReceipt;
