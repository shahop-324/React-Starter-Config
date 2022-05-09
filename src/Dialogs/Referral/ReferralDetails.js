/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,

  Stack,
  
  Button,
  Dialog,
  DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import dateFormat from 'dateformat';
import { useSelector, useDispatch } from 'react-redux';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { ReferralListHead } from '../../sections/@dashboard/e-commerce/product-list';
import useSettings from '../../hooks/useSettings';
import { updateReferralPurchase } from '../../actions';

const TABLE_HEAD = [
  { id: 'orderRef', label: 'Order Id', alignRight: false },
  { id: 'orderAmount', label: 'OrderAmount', alignRight: false },
  { id: 'earning', label: 'Earning', alignRight: false },
  { id: 'commission', label: 'Commission', alignRight: false },
  { id: 'date&Time', label: 'Date & Time', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: true },
];

const ReferralDetails = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const { themeStretch } = useSettings();

  const { purchases } = useSelector((state) => state.referral);

  const myPurchases = purchases.filter((el) => el.ref === id);

 

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  
  const [filterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [orderBy, setOrderBy] = useState('createdAt');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };





  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - myPurchases.length) : 0;

  const filteredEarnings = applySortFilter(myPurchases, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredEarnings.length && Boolean(filterName);

  return (
    <>
      <Dialog fullWidth maxWidth="lg" open={open}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} className="my-3 pe-4">
          <DialogTitle>Referrer Details (Omprakash shah)</DialogTitle>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Stack>

        <Container maxWidth={themeStretch ? false : 'lg'}>
          <Card>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 900 }}>
                <Table>
                  <ReferralListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={myPurchases.length}
                    onRequestSort={handleRequestSort}
                    hideCheckbox
                  />

                  <TableBody>
                    {myPurchases.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const {
                        _id,
                        order,
                        paid,
                        
                        commissionPercent,
                        commissionAmount,
                        timestamp,
                        status,
                      } = row;

                      return (
                        <TableRow key={_id} hover tabIndex={-1} role="checkbox">
                          <TableCell>
                            <Stack direction={'row'} alignItems={'center'}>
                              <Typography variant="subtitle2" noWrap>
                                {order.ref}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell style={{ minWidth: 160 }}> {`Rs.${order.charges.total}`} </TableCell>
                          <TableCell style={{ minWidth: 160 }}> {`Rs.${commissionAmount}`} </TableCell>
                          <TableCell style={{ minWidth: 160 }}>
                            {' '}
                            {status === 'Not Paid' ? (
                              <Chip label={`${commissionPercent}%`} color="error" />
                            ) : (
                              <Chip label={`${commissionPercent}%`} color="success" />
                            )}{' '}
                          </TableCell>
                          <TableCell align="left">
                            {' '}
                            {dateFormat(new Date(timestamp), 'ddd, mmm dS, yy, hh:MM TT')}{' '}
                          </TableCell>
                          {paid ? (
                            <TableCell align="right">
                              <Chip label={`Paid`} color="success" />
                            </TableCell>
                          ) : (
                            <TableCell align="right">
                              <Button
                                onClick={() => {
                                  dispatch(updateReferralPurchase({ paid: true }, _id));
                                }}
                                variant="outlined"
                              >
                                Mark as paid
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })}
                  </TableBody>

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6}>
                          <Box sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={myPurchases.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, value) => setPage(value)}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Dialog>
    </>
  );
};

export default ReferralDetails;

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return array.filter((_product) => _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return stabilizedThis.map((el) => el[0]);
}
