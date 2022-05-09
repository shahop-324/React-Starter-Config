/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Switch,
  FormControlLabel,
  IconButton,
  Stack,
} from '@mui/material';
// redux
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import dateFormat from 'dateformat'
import { useDispatch, useSelector } from '../../redux/store';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Image from '../../components/Image';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
// sections
import {
  ProductMoreMenu,
  PickupPointListHead,
  PickupPointListToolbar,
} from '../../sections/@dashboard/e-commerce/product-list';
import AddNewPickupPoint from '../../Dialogs/AddNewPickupPoint';
import { fetchPickupPoints, updatePickupPointStatus } from '../../actions';

import EditPickupPoint from '../../Dialogs/PickupPoint/EditPickupPoint';
import DeletePickupPoint from '../../Dialogs/PickupPoint/DeletePickupPoint';
import BulkDeletePickupPoint from '../../Dialogs/PickupPoint/BulkDeletePickupPoint';
import NoPickupPoint from '../../assets/lady-delivering-post.png';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'city', label: 'City', alignRight: false },
  { id: 'pincode', label: 'Pincode', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'date', label: 'Date Added', alignRight: false },
];

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

// ----------------------------------------------------------------------

export default function GeneralPickupPoints() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [openAddPickupPoint, setOpenAddPickupPoint] = useState(false);

  const [term, setTerm] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchPickupPoints(term));
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  const [IdToEdit, setIdToEdit] = useState();

  const [IdToDelete, setIdToDelete] = useState();

  const [IdToShare, setIdToShare] = useState();

  const [stockId, setStockId] = useState();

  const [openUpdate, setOpenUpdate] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [openShare, setOpenShare] = useState(false);

  const [openStock, setOpenStock] = useState(false);

  const [openBulkDelete, setOpenBulkDelete] = useState(false);

  const handleOpenBulkDelete = () => {
    setOpenBulkDelete(true);
  };

  const handleCloseBulkDelete = () => {
    setOpenBulkDelete(false);
  };

  const handleOpenStock = (id) => {
    setStockId(id);
    setOpenStock(true);
  };

  const handleCloseStock = () => {
    setOpenStock(false);
  };

  const handleOpenUpdate = (id) => {
    setIdToEdit(id);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleOpenDelete = (id) => {
    setIdToDelete(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseAddPickupPoint = () => {
    setOpenAddPickupPoint(false);
  };

  const handleOpenAddPickupPoint = () => {
    setOpenAddPickupPoint(true);
  };

  const { pickupPoints } = useSelector((state) => state.delivery);

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
      const selected = pickupPoints.map((n) => n._id);
      setSelected(selected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
  };

  const handleOpenShare = (id) => {
    setIdToShare(id);
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pickupPoints.length) : 0;

  const filteredPickupPoints = applySortFilter(pickupPoints, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredPickupPoints.length && Boolean(filterName);


  return (
    <>
      <Card sx={{ px: 0 }}>
        <PickupPointListToolbar
          setTerm={setTerm}
          openAddPickupPoint={handleOpenAddPickupPoint}
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          onDeletePickupPoints={() => handleOpenBulkDelete()}
          
        />

{!(typeof pickupPoints !== 'undefined' && pickupPoints.length > 0) ? (
              <Stack sx={{ width: '100%' }} direction="column" alignItems="center" justifyContent="center">
                <Card sx={{ p: 3, my: 3 }}>
                  <img style={{ height: '150px', width: '150px' }} src={NoPickupPoint} alt="no shipment to process" />
                </Card>
                <Typography sx={{ mb: 3 }} variant="subtitle2">
                  There are no Pickup Points to pick your orders
                </Typography>
              </Stack>
            ) : (
        <Scrollbar>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <PickupPointListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={pickupPoints.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />

              <TableBody>
                {pickupPoints.slice(0)
                  .reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  const { _id, pickupPointName, city, pincode, operational, address, createdAt } = row;

                  const isItemSelected = selected.indexOf(_id) !== -1;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} onClick={() => handleClick(_id)} />
                      </TableCell>
                      <TableCell>
                        <Stack direction={'row'} alignItems={'center'}>
                          <Typography variant="subtitle2" noWrap>
                            {pickupPointName}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction={'row'} alignItems={'center'}>
                          <Typography variant="subtitle2" noWrap>
                            {city}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack direction={'row'} alignItems={'center'}>
                          <Typography variant="subtitle2" noWrap>
                            {pincode}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }}>
                      <Typography variant="subtitle2" noWrap>
                            {address}
                          </Typography>
                       
                      </TableCell>

                      <TableCell >
                      {dateFormat(new Date(createdAt || Date.now()), 'ddd mmm dS, yy hh:mm TT')}
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
          count={pickupPoints.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, value) => setPage(value)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {openBulkDelete && (
        <BulkDeletePickupPoint
          open={openBulkDelete}
          handleClose={handleCloseBulkDelete}
          setSelected={setSelected}
          selected={selected}
        />
      )}

      {openDelete && <DeletePickupPoint open={openDelete} handleClose={handleCloseDelete} id={IdToDelete} />}
      {openUpdate && <EditPickupPoint open={openUpdate} handleClose={handleCloseUpdate} id={IdToEdit} />}

      {openAddPickupPoint && <AddNewPickupPoint open={openAddPickupPoint} handleClose={handleCloseAddPickupPoint} />}
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
