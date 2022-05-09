/* eslint-disable camelcase */
import { useState } from 'react';
import {
  Box,
  Card,
  Stack,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  TableHead,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
//
import { useSelector } from 'react-redux';
import ReceiptIcon from '@mui/icons-material/Receipt';
import dateFormat from 'dateformat';
import { EditRounded, LocalShipping, ReceiptLongRounded } from '@mui/icons-material';
import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';
import OrderReceipt from '../../../../Dialogs/Order/OrderReceipt';
import OrderTimeline from '../../../../Dialogs/Order/Timeline';
import AssignCarrier from '../../../../Dialogs/Delivery/AssignCarrier';
import UpdateShipment from '../../../../Dialogs/Delivery/UpdateShipmentStatus';
import Print from '../../../../Dialogs/Delivery/Print';

// ----------------------------------------------------------------------

export default function OrderDetails() {
  const { orders } = useSelector((state) => state.order);

  const [openPrint, setOpenPrint] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);

  const [id, setId] = useState('');
  const [shipmentId, setShipmentId] = useState();
  const [scans, setScans] = useState();

  const [openReceipt, setOpenReceipt] = useState(false);
  const [openTimeline, setOpenTimeline] = useState(false);

  const handleCloseTimeline = () => {
    setOpenTimeline(false);
  };

  const handleOpenTimeline = (orderId, shipmentId, scans) => {
    setId(orderId);
    setShipmentId(shipmentId);
    setScans(scans);
    setOpenTimeline(true);
  };

  const handleCloseReceipt = () => {
    setOpenReceipt(false);
  };

  const handleOpenReceipt = (id) => {
    setId(id);
    setOpenReceipt(true);
  };

  const handleOpenAssign = (shipmentId) => {
    setShipmentId(shipmentId);
    setOpenAssign(true);
  };

  const handleCloseAssign = () => {
    setOpenAssign(false);
  };

  const handleOpenUpdate = (shipmentId) => {
    setShipmentId(shipmentId);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleOpenPrint = (shipmentId) => {
    setShipmentId(shipmentId);
    setOpenPrint(true);
  };

  const handleClosePrint = () => {
    setOpenPrint(false);
  };

  let statusColor = 'info';

  const getStatusColor = (status_id) => {
    switch (status_id*1) {
      case -1: // 'Waiting for acceptance'
        statusColor = 'warning';
        break;
      case 0: // 'Accepted / Ready to ship'
        statusColor = 'info';
        break;
      case 6: // Shipped
        statusColor = 'info';
        break;
      case 17: // Out for delivery
        statusColor = 'primary';
        break;
      case 7: // Delivered
        statusColor = 'success';
        break;
      default:
        // default
        break;
    }

    return statusColor;
  };

  return (
    <>
      <Card>
        <CardHeader title="Orders" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 200 }}>Order Id</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Customer</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Status</TableCell>

                  <TableCell sx={{ minWidth: 100 }}>Total</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Timestamp</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Receipt</TableCell>

                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.length > 0 &&
                  orders
                    ?.slice(0)
                    .reverse()
                    .map((row) => (
                      <TableRow key={row?._id}>
                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2">{row?.ref}</Typography>
                          </Stack>
                        </TableCell>

                        <TableCell>{row?.customer?.name}</TableCell>
                        <TableCell>
                          <Label variant={'ghost'} color={getStatusColor(row.status_id)}>
                            {row?.status}
                          </Label>
                        </TableCell>

                        <TableCell sx={{ textTransform: 'capitalize' }}>Rs.{(row?.charges?.total * 1).toFixed(2)}</TableCell>

                        <TableCell align="center">
                          <Typography variant="caption">
                            {dateFormat(row?.createdAt, 'ddd mmm dS, yy hh:mm TT')}
                          </Typography>
                        </TableCell>

                        <TableCell align="right">
                          <Stack spacing={1} direction={'row'} alignItems="center">
                            <IconButton
                              onClick={() => {
                                handleOpenReceipt(row._id);
                              }}
                            >
                              <ReceiptIcon style={{ fontSize: '20px', color: '#4A7DCF' }} />
                            </IconButton>

                            <IconButton
                              onClick={() => {
                                handleOpenTimeline(row._id, row.shipment, row.scans);
                              }}
                            >
                              <TimelineIcon style={{ fontSize: '20px', color: '#CF4A6B' }} />
                            </IconButton>
                            {!row.carrier ? (
                              <IconButton
                                onClick={() => {
                                  console.log(row);

                                  handleOpenAssign(row.shipment);
                                }}
                              >
                                <LocalShipping style={{ fontSize: '20px', color: '#CF844A' }} />
                              </IconButton>
                            ) : (
                              <IconButton
                                onClick={() => {
                                  handleOpenUpdate(row.shipment);
                                }}
                              >
                                <EditRounded style={{ fontSize: '20px', color: '#00AB5C' }} />
                              </IconButton>
                            )}
                            {row.carrier === 'Shiprocket' && (
                              <IconButton
                                onClick={() => {
                                  handleOpenPrint(row.shipment_id);
                                }}
                              >
                                <ReceiptLongRounded style={{ fontSize: '20px', color: '#00AB5C' }} />
                              </IconButton>
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}> </Box>
      </Card>
      {openReceipt && <OrderReceipt open={openReceipt} handleClose={handleCloseReceipt} id={id} />}
      {openTimeline && (
        <OrderTimeline
          open={openTimeline}
          handleClose={handleCloseTimeline}
          shipmentId={shipmentId}
          scans={scans}
          orderId={id}
        />
      )}
      {openAssign && <AssignCarrier open={openAssign} handleClose={handleCloseAssign} id={shipmentId} />}
      {openUpdate && <UpdateShipment open={openUpdate} handleClose={handleCloseUpdate} id={shipmentId} />}
      {openPrint && <Print open={openPrint} handleClose={handleClosePrint} id={shipmentId} />}
    </>
  );
}
