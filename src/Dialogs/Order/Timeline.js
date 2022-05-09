/* eslint-disable react/prop-types */
import React from 'react';
import { Dialog, Slide, Card, Box, Stack, Divider } from '@mui/material';
import dateFormat from 'dateformat';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';

import { useSelector } from 'react-redux';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const OrderTimeline = ({ shipmentId, orderId, open, handleClose }) => {
  console.log(shipmentId);
  const { orders } = useSelector((state) => state.order);
  const { shipments } = useSelector((state) => state.shipment);

  const orderDoc = orders.find((el) => el._id === orderId);
  const shipmentDoc = shipments.find((el) => el._id === shipmentId);

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
        <Box sx={{ p: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gridGap: '10px' }}>
          <Box>
            <Card sx={{ p: 3 }}>
              <Stack spacing={4} direction="row" alignItems="center" justifyContent="space-between">
                <Typography  variant="body2">Order ID</Typography>
                <Typography variant="subtitle2">{orderDoc?.ref}</Typography>
              </Stack>
            </Card>
            <Divider sx={{ my: 2 }} />
            <Card sx={{ p: 3 }}>
              <Stack spacing={4} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body2">Shipment ID</Typography>
                <Typography variant="subtitle2">{shipmentDoc?._id?.toUpperCase()}</Typography>
              </Stack>
            </Card>
            <Divider sx={{ my: 2 }} />
            <Card sx={{ p: 3 }}>
              <Stack spacing={4} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body2">Current status</Typography>
                <Typography variant="subtitle2">{orderDoc?.status}</Typography>
              </Stack>
            </Card>
            { orderDoc && orderDoc?.etd  && <><Divider sx={{ my: 2 }} />
            <Card sx={{ p: 3 }}>
              <Stack spacing={4} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body2">Est Time of Delivery</Typography>
                <Typography variant="subtitle2">
                  {dateFormat(
                    orderDoc && orderDoc?.etd ? new Date(orderDoc?.etd) : new Date(),
                    'ddd mmm, dS, yy hh:mm TT'
                  )}
                </Typography>
              </Stack>
            </Card></>  }
            
          </Box>

          <Timeline position="alternate">
            {orderDoc?.scans &&
              orderDoc?.scans?.length > 0 ?
              orderDoc.scans.map((el, ind) => (
                <TimelineItem key={ind}>
                  <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                    {dateFormat(el?.get('date') ? new Date(el?.get('date')) : new Date(), 'ddd, mmm dS, yy, h:MM TT')}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary" variant="outlined" />

                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                      {el.get('activity')}
                    </Typography>
                    <Typography>{el.get('location')}</Typography>
                  </TimelineContent>
                </TimelineItem>
              )) : 
              
              <Card sx={{width: '100%', height: '100%',}}>
                  <Stack sx={{width: '100%', height: '100%',}} direction={"row"} alignItems='center' justifyContent={'center'}>
                  <Typography variant="h6">No Timeline Found!</Typography>
                  </Stack>

              </Card>
              
              }
          </Timeline>
        </Box>
      </Dialog>
    </>
  );
};

export default OrderTimeline;
