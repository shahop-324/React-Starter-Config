/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
// @mui
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
  IconButton,
  Stack,
  Button,
  Chip,
} from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
// redux
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import LocalShippingRounded from '@mui/icons-material/LocalShippingRounded';
import dateFormat from 'dateformat';
import { useDispatch, useSelector } from '../../redux/store';
// hooks
// components
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
// sections
import { ShipmentListHead, ShipmentListToolbar } from '../../sections/@dashboard/e-commerce/product-list';
import { fetchShipments } from '../../actions';
import AssignCarrier from '../../Dialogs/Delivery/AssignCarrier';
import UpdateShipment from '../../Dialogs/Delivery/UpdateShipmentStatus';
import Print from '../../Dialogs/Delivery/Print';
import OrderTimeline from '../../Dialogs/Order/Timeline';
import NoShipment from '../../assets/male-postman.png';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'orderId', label: 'Order Id', alignRight: false },
  { id: 'carrier', label: 'Carrier', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'charge', label: 'Charge', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: true },
];

// ----------------------------------------------------------------------

export default function GeneralShipments() {
  const dispatch = useDispatch();

  const [term, setTerm] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchShipments(term));
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  const [Id, setId] = useState();

  const [openPrint, setOpenPrint] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);

  const [shipmentId, setShipmentId] = useState();
  const [scans, setScans] = useState();
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

  const handleOpenPrint = (id) => {
    setId(id);
    setOpenPrint(true);
  };

  const handleClosePrint = () => {
    setOpenPrint(false);
  };

  const handleOpenAssign = (id) => {
    setId(id);
    setOpenAssign(true);
  };

  const handleCloseAssign = () => {
    setOpenAssign(false);
  };

  const handleOpenUpdate = (id) => {
    setId(id);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const { shipments } = useSelector((state) => state.shipment);

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
      const selected = shipments.map((n) => n._id);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - shipments.length) : 0;

  const filteredShipments = applySortFilter(shipments, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredShipments.length && Boolean(filterName);

  return (
    <>
      <Card sx={{ px: 0 }}>
        <ShipmentListToolbar
          setTerm={setTerm}
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        {!(typeof shipments !== 'undefined' && shipments.length > 0) ? (
          <Stack sx={{ width: '100%' }} direction="column" alignItems="center" justifyContent="center">
            <Card sx={{ p: 3, my: 3 }}>
              <img style={{ height: '150px', width: '150px' }} src={NoShipment} alt="no shipment to process" />
            </Card>
            <Typography sx={{ mb: 3 }} variant="subtitle2">
              There are no shipments to process, Market your store and earn more
            </Typography>
          </Stack>
        ) : (
          <Scrollbar>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <ShipmentListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={shipments.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {shipments.slice(0)
                  .reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      _id,
                      orderRef,
                      carrier,
                      status,
                      order,
                      // eslint-disable-next-line camelcase
                      status_id,
                      createdAt,
                    } = row;

                    const isItemSelected = selected.indexOf(_id) !== -1;

                    return (
                      <TableRow key={_id} hover tabIndex={-1} role="checkbox" aria-checked={isItemSelected}>
                        <TableCell>
                          <Stack direction={'row'} alignItems={'center'}>
                            <Typography variant="subtitle2" noWrap>
                              {orderRef}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell style={{ minWidth: 160 }}>{carrier || 'Not Assigned'}</TableCell>
                        <TableCell style={{ minWidth: 160 }}>{status}</TableCell>
                        <TableCell align="left">Rs.{order?.deliveryCharge}</TableCell>
                        <TableCell align="left">{dateFormat(new Date(createdAt), 'ddd mmm dS, yy hh:mm TT')}</TableCell>
                        {status_id * 1 !== 8 ? (
                          <TableCell align="right">
                            {carrier ? (
                              <Stack spacing={1} direction={'row'} alignItems="center">
                                <IconButton
                                  onClick={() => {
                                    handleOpenUpdate(_id);
                                  }}
                                  className="me-2"
                                >
                                  <ModeEditOutlineRoundedIcon color={'primary'} style={{ fontSize: '20px' }} />
                                </IconButton>
                                {carrier === 'Shiprocket' && (
                                  <IconButton
                                    onClick={() => {
                                      handleOpenPrint(_id);
                                    }}
                                    className="me-2"
                                  >
                                    <ReceiptLongIcon color={'secondary'} style={{ fontSize: '20px' }} />
                                  </IconButton>
                                )}

                                <IconButton
                                  onClick={() => {
                                    handleOpenTimeline(row.order._id, _id, row.scans);
                                  }}
                                >
                                  <TimelineIcon style={{ fontSize: '20px', color: '#4A7DCF' }} />
                                </IconButton>
                              </Stack>
                            ) : (
                              <Button
                                onClick={() => {
                                  handleOpenAssign(_id);
                                }}
                                startIcon={<LocalShippingRounded />}
                                variant="outlined"
                              >
                                Assign Carrier
                              </Button>
                            )}
                          </TableCell>
                        ) : (
                          <TableCell align="right">
                            <Chip variant="outlined" label="Cancelled" color="error" />
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
        )}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={shipments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, value) => setPage(value)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {openPrint && <Print open={openPrint} handleClose={handleClosePrint} id={Id} />}
      {openAssign && <AssignCarrier open={openAssign} handleClose={handleCloseAssign} id={Id} />}
      {openUpdate && <UpdateShipment open={openUpdate} handleClose={handleCloseUpdate} id={Id} />}
      {openTimeline && (
        <OrderTimeline
          open={openTimeline}
          handleClose={handleCloseTimeline}
          shipmentId={shipmentId}
          scans={scans}
          orderId={Id}
        />
      )}
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
