/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
// @mui
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
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from 'react-redux';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
// sections
import {
  ProductMoreMenu,
  ReferralListHead,
  ReferralListToolbar,
} from '../../../sections/@dashboard/e-commerce/product-list';
import AddNewReferrer from "../../Referral/AddNewReferrer";
import { fetchReferrals, showSnackbar } from '../../../actions';

import EditReferrer from '../../Referral/EditReferrer';
import DeleteReferrer from '../../Referral/DeleteReferrer';
import BulkDeleteReferrers from '../../Referral/BulkDeleteReferrers';
import ReferralDetails from '../../Referral/ReferralDetails';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'referrer', label: 'Referrer', alignRight: false },
  { id: 'mobile', label: 'Mobile', alignRight: false },
  { id: 'comission', label: 'Comission', alignRight: false },
  { id: 'totalSale', label: 'Total Sale', alignRight: false },
  { id: 'totalEarning', label: 'Total Earning', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: true },
];

// ----------------------------------------------------------------------

export default function GeneralReferral() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  const {store} = useSelector((state) => state.store);

  const [openAddReferrer, setOpenAddReferrer] = useState(false);

  const [term, setTerm] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchReferrals(term));
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  const [openDetails, setOpenDetails] = useState();

  const [id, setId] = useState();

  const [IdToEdit, setIdToEdit] = useState();

  const [IdToDelete, setIdToDelete] = useState();

  const [openUpdate, setOpenUpdate] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [openBulkDelete, setOpenBulkDelete] = useState(false);

  const handleOpenDetails = (id) => {
    setId(id);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleOpenBulkDelete = () => {
    setOpenBulkDelete(true);
  };

  const handleCloseBulkDelete = () => {
    setOpenBulkDelete(false);
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

  const handleCloseAddReferrer = () => {
    setOpenAddReferrer(false);
  };

  const handleOpenAddReferrer = () => {
    setOpenAddReferrer(true);
  };

  const { referrals } = useSelector((state) => state.referral);

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
      const selected = referrals.map((n) => n._id);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - referrals.length) : 0;

  const filteredReferrals = applySortFilter(referrals, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredReferrals.length && Boolean(filterName);

  const processReferrersData = () => {
    const processedArray = [];

    referrals.map((referral) => {
      const array = Object.entries(referral);

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
    hiddenElement.download = 'referrers.csv';
    hiddenElement.click();
  };

  const handleExportReferrers = () => {
    CreateAndDownloadCSV(processReferrersData());
  };

  return (
    <>
      <Page title="Referral">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <Card>
            <ReferralListToolbar
              setTerm={setTerm}
              openAddReferrer={handleOpenAddReferrer}
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
              onDeleteReferrals={() => handleOpenBulkDelete()}
              handleExportReferrers={handleExportReferrers}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 900 }}>
                <Table>
                  <ReferralListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={referrals.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />

                  <TableBody>
                    {referrals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { _id, name, phone,  commission, totalSales, totalEarnings } = row;

                      const isItemSelected = selected.indexOf(_id) !== -1;

                      return (
                        <TableRow
                          key={_id}
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
                                <a
                                  href="#"
                                  onClick={() => {
                                    handleOpenDetails(_id);
                                  }}
                                >
                                  {name}
                                </a>
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell style={{ minWidth: 160 }}> {phone} </TableCell>
                          <TableCell style={{ minWidth: 160 }}> {`${commission}%`} </TableCell>
                          <TableCell style={{ minWidth: 160 }}> {`Rs.${totalSales}`} </TableCell>
                          <TableCell align="left"> {`Rs.${totalEarnings}`} </TableCell>
                          <TableCell align="right">
                            <Tooltip title="Copy Referral Link">
                              <IconButton onClick={() => {
                                navigator.clipboard.writeText(`qwikshop.online/${store.subName}/?ref=${_id}`).then(
                                  () => {
                                    console.log("Async: Copying to clipboard was successful!");
                                    dispatch(showSnackbar("success", "Copied to clipboard!"));
                                  },
                                  (err) => {
                                    console.error("Async: Could not copy text: ", err);
                                    dispatch(showSnackbar("error", "Failed to copy to clipboard!"));
                                  }
                                );
                              }} className="me-2">
                                <ContentCopyRoundedIcon style={{ fontSize: '20px' }} />
                              </IconButton>
                            </Tooltip>
                            <ProductMoreMenu
                              productName={''}
                              onDelete={() => handleOpenDelete(_id)}
                              onEdit={() => {
                                handleOpenUpdate(_id);
                              }}
                            />
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

            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={referrals.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, value) => setPage(value)}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>

      {openBulkDelete && (
        <BulkDeleteReferrers
          open={openBulkDelete}
          handleClose={handleCloseBulkDelete}
          setSelected={setSelected}
          selected={selected}
        />
      )}
      {openDelete && <DeleteReferrer open={openDelete} handleClose={handleCloseDelete} id={IdToDelete} />}
      {openUpdate && <EditReferrer open={openUpdate} handleClose={handleCloseUpdate} id={IdToEdit} />}
      {openAddReferrer && <AddNewReferrer open={openAddReferrer} handleClose={handleCloseAddReferrer} />}
      {openDetails && <ReferralDetails open={openDetails} handleClose={handleCloseDetails} id={id} />}
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
