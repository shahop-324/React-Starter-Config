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
  Chip,
} from '@mui/material';
//
import { useSelector } from 'react-redux';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';
import SMSCustomer from '../../../../Dialogs/Customer/SMSCustomer';

// English.
TimeAgo.addDefaultLocale(en);

// ----------------------------------------------------------------------

export default function AbondonedCartDetails() {
  const timeAgo = new TimeAgo('en-US');
  const { abondonedCarts } = useSelector((state) => state.order);

  const [id, setId] = useState('');

  const [openSMSCustomer, setOpenSMSCustomer] = useState(false);

  const handleCloseSMSCustomer = () => {
    setOpenSMSCustomer(false);
  };

  const handleOpenSMSCustomer = (id) => {
    setId(id);
    setOpenSMSCustomer(true);
  };

  return (
    <>
      <Card>
        <CardHeader title="Carts" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 200 }}>Name</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Mobile Number</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Products</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Amount</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Last Visited</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Action</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {abondonedCarts?.length > 0 &&
                  abondonedCarts
                    ?.slice(0)
                    .reverse()
                    .map((row) => {
                      console.log(row);
                      return (
                        <TableRow key={row?._id}>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2">{row?.name}</Typography>
                            </Stack>
                          </TableCell>

                          <TableCell>{row?.contact}</TableCell>
                          <TableCell>
                            {/* {Render Products in cart with their quantity, clickable link and name} */}

                            {row.cart.map((el) => (
                              <Chip color="primary" variant="outlined" key={el.id} label={`${el.name} (${el.qty})`} />
                            ))}
                          </TableCell>

                          <TableCell>
                            <Label
                              variant={'ghost'}
                              color={
                                (row.status === 'paid' && 'success') ||
                                (row.status === 'pending' && 'warning') ||
                                'error'
                              }
                            >
                              Rs.{row?.amount}
                            </Label>
                          </TableCell>

                          <TableCell sx={{ textTransform: 'capitalize' }}>
                            {timeAgo.format(new Date(row?.updatedAt || Date.now()))}
                          </TableCell>

                          <TableCell align="right">
                            <IconButton
                              onClick={() => {
                                handleOpenSMSCustomer(row.customerId);
                              }}
                            >
                              <MessageRoundedIcon style={{ fontSize: '20px', color: '#4A7DCF' }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <Divider />
        <Box sx={{ p: 2, textAlign: 'right' }}> </Box>
      </Card>
      {openSMSCustomer && <SMSCustomer open={openSMSCustomer} handleClose={handleCloseSMSCustomer} id={id} />}
    </>
  );
}
