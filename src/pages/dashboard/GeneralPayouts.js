/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  
  Stack,
  Chip,
  
} from '@mui/material';
import dateFormat from 'dateformat';
import { useDispatch, useSelector } from '../../redux/store';
// hooks
// components
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
// sections
import { TransactionListHead, PayoutListToolbar } from '../../sections/@dashboard/e-commerce/product-list';
import { fetchPayouts } from '../../actions';
import NoPayout from '../../assets/suitcase-with-cash.png';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'transactionId', label: 'Transaction Id', alignRight: false },
  { id: 'orderId', label: 'Amount', alignRight: false },
  { id: 'amount', label: 'Date', alignRight: false },
  { id: 'type', label: 'Method', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];

// ----------------------------------------------------------------------

export default function GeneralPayout() {
  const dispatch = useDispatch();

  const [term, setTerm] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchPayouts(term));
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  const { payouts } = useSelector((state) => state.transaction);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [orderBy, setOrderBy] = useState('createdAt');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const selected = payouts.map((n) => n._id);
      setSelected(selected);
    } else {
      setSelected([]);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - payouts.length) : 0;

  const filteredTransactions = applySortFilter(payouts, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredTransactions.length && Boolean(filterName);

  const processTransactionsData = () => {
    const processedArray = [];

    payouts.map((transaction) => {
      const array = Object.entries(transaction);

      const filtered = array.filter(([key]) => key === 'name' || key === 'totalSales' || key === 'outOfStock');

      const asObject = Object.fromEntries(filtered);

      return processedArray.push(asObject);
    });

    const finalArray = processedArray.map((obj) => Object.values(obj));

    return finalArray;
  };

  const CreateAndDownloadCSV = (data) => {
    let csv = 'name, out_of_stock, total_sales, \n';
    data.forEach((row) => {
      csv += row.join(',');
      csv += '\n';
    });

    console.log(csv);
    const hiddenElement = document.createElement('a');
    hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
    hiddenElement.target = '_blank';
    hiddenElement.download = 'payouts.csv';
    hiddenElement.click();
  };

  const handleExportTransactions = () => {
    CreateAndDownloadCSV(processTransactionsData());
  };

  return (
    <>
      <Card sx={{ px: 0 }}>
        <PayoutListToolbar
          setTerm={setTerm}
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          handleExportTransactions={handleExportTransactions}
        />

{!(typeof payouts !== 'undefined' && payouts.length > 0) ? (
              <Stack sx={{ width: '100%' }} direction="column" alignItems="center" justifyContent="center">
                <Card sx={{ p: 3, my: 3 }}>
                  <img style={{ height: '150px', width: '150px' }} src={NoPayout} alt="no payout" />
                </Card>
                <Typography sx={{ mb: 3 }} variant="subtitle2">
                  There is no payout history
                </Typography>
              </Stack>
            ) : (

        <Scrollbar>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TransactionListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={payouts.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />

              <TableBody>
                {payouts.slice(0)
                  .reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const { _id } = row;

                  const isItemSelected = selected.indexOf(_id) !== -1;

                  return (
                    <TableRow key={_id} hover tabIndex={-1} role="checkbox" aria-checked={isItemSelected}>
                      <TableCell>
                        <Stack direction={'row'} alignItems={'center'}>
                          <Typography variant="subtitle2" noWrap>
                            {/* {name} */}
                            {row?.payoutId}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell style={{ minWidth: 160 }}>Rs.{row.amount}</TableCell>
                      <TableCell style={{ minWidth: 160 }}>
                        {/*  */}
                        {dateFormat(new Date(row.createdAt || Date.now()), 'ddd mmm dS, yy hh:mm TT')}
                      </TableCell>
                      <TableCell align="left">{row.method}</TableCell>
                      <TableCell align="left">
                        <Chip label="Proccessed" color="primary" variant="outlined" />
                      </TableCell>
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

            )}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={payouts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, value) => setPage(value)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}

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
