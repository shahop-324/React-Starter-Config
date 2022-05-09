/* eslint-disable react-hooks/exhaustive-deps */
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
import dateFormat from 'dateformat';
import BulkUpdateCategory from '../../Dialogs/Category/BulkUpdateCategory';
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
  CategoryListHead,
  CategoryListToolbar,
} from '../../sections/@dashboard/e-commerce/product-list';
import AddNewCategory from '../../Dialogs/AddNewCategory';
import { fetchCategory, updateCategoryStock, reorderCategories } from '../../actions';

import EditCategory from '../../Dialogs/Category/EditCategory';
import DeleteCategory from '../../Dialogs/Category/DeleteCategory';
import ShareCategory from '../../Dialogs/Category/ShareCategory';
import AlterCategoryStock from '../../Dialogs/Category/AlterCategoryStock';
import BulkUploadCategory from '../../Dialogs/Category/BulkUploadCategory';
import BulkDeleteCategory from '../../Dialogs/Category/BulkDeleteCategories';
import NoCategories from '../../assets/tri-discs.png';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'products', label: 'Products', alignRight: false },
  { id: 'stock', label: 'Stock', alignRight: false },
  { id: 'updatedAt', label: 'Updated At', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: true },
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

export default function GeneralCategory() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [openAddCategory, setOpenAddcategory] = useState(false);

  const [openBulkImport, setOpenBulkImport] = useState(false);

  const handleOpenBulkImport = () => {
    setOpenBulkImport(true);
  };

  const handleCloseBulkImport = () => {
    setOpenBulkImport(false);
  };

  const [term, setTerm] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchCategory(term));
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

  const [openBulkUpdate, setOpenBulkUpdate] = useState(false);

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

  const handleCloseAddCategory = () => {
    setOpenAddcategory(false);
  };

  const handleOpenAddcategory = () => {
    setOpenAddcategory(true);
  };

  const handleOpenBulkUpdate = () => {
    setOpenBulkUpdate(true);
  };

  const handleCloseBulkUpdate = () => {
    setOpenBulkUpdate(false);
  };

  const { categories } = useSelector((state) => state.category);

  const handleDragEnd = (result) => {
    console.log(result);
    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(reorderCategories(items));
  };

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
      const selected = categories.map((n) => n._id);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

  const filteredCategories = applySortFilter(categories, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredCategories.length && Boolean(filterName);

  const processCategoriesData = () => {
    const processedArray = [];

    categories.map((category) => {
      const array = Object.entries(category);

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
    hiddenElement.download = 'categories.csv';
    hiddenElement.click();
  };

  const handleExportCategories = () => {
    CreateAndDownloadCSV(processCategoriesData());
  };

  return (
    <>
      <Page title="Category">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <Card>
            <CategoryListToolbar
              setTerm={setTerm}
              openBulkImport={handleOpenBulkImport}
              openAddCategory={handleOpenAddcategory}
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
              onDeleteCategories={() => handleOpenBulkDelete()}
              handleExportCategories={handleExportCategories}
              handleOpenBulkUpdate={handleOpenBulkUpdate}

            />

            {!(typeof categories !== 'undefined' && categories.length > 0) ? (
              <Stack sx={{ width: '100%' }} direction="column" alignItems="center" justifyContent="center">
                <Card sx={{ p: 3, my: 3 }}>
                  <img style={{ height: '150px', width: '150px' }} src={NoCategories} alt="no products in store" />
                </Card>
                <Typography sx={{ mb: 3 }} variant="subtitle2">
                  You haven't added any categories in your store, It helps your customer find products easily
                </Typography>
              </Stack>
            ) : (
              <Scrollbar>
                <TableContainer sx={{ minWidth: 900 }}>
                  <Table>
                    <CategoryListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={categories.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />

                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable droppableId="list">
                        {(provided) => (
                          <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                            {categories
                            .slice(0)
                            .reverse()
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => {
                                const { _id, name, image, products, outOfStock, updatedAt } = row;

                                const isItemSelected = selected.indexOf(_id) !== -1;

                                return (
                                  <Draggable key={_id} draggableId={_id} index={index}>
                                    {(provided) => (
                                      <TableRow
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
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
                                            <Image
                                              disabledEffect
                                              alt={name}
                                              src={
                                                image && !image.endsWith('undefined')
                                                  ? `https://qwikshop.s3.ap-south-1.amazonaws.com/${image}`
                                                  : 'https://qwikshop.s3.ap-south-1.amazonaws.com/images/noimage.png'
                                              }
                                              sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2 }}
                                            />
                                            <Typography variant="subtitle2" noWrap>
                                              {name}
                                            </Typography>
                                          </Stack>
                                        </TableCell>
                                        <TableCell style={{ minWidth: 160 }}>{products.length}</TableCell>
                                        <TableCell style={{ minWidth: 160 }}>
                                          <FormControlLabel
                                            control={
                                              <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={!outOfStock}
                                                onClick={() => {
                                                  if (!outOfStock) {
                                                    handleOpenStock(_id);
                                                  } else {
                                                    dispatch(
                                                      updateCategoryStock(
                                                        _id,
                                                        { hidden: false, outOfStock: false },
                                                        handleCloseStock
                                                      )
                                                    );
                                                  }
                                                }}
                                              />
                                            }
                                            label=""
                                          />
                                          <Label
                                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                            color={(outOfStock && 'error') || 'success'}
                                          >
                                            {!outOfStock ? 'In stock' : 'Out of stock'}
                                          </Label>
                                        </TableCell>
                                        <TableCell align="left">
                                          {dateFormat(
                                            updatedAt ? new Date(updatedAt) : Date.now(),
                                            'ddd mmm dS, yy hh:mm TT'
                                          )}
                                        </TableCell>
                                        <TableCell align="right">
                                          <IconButton
                                            onClick={() => {
                                              handleOpenShare(_id);
                                            }}
                                            className="me-2"
                                          >
                                            <ShareRoundedIcon style={{ fontSize: '20px' }} />
                                          </IconButton>
                                          <ProductMoreMenu
                                            productName={name}
                                            onDelete={() => handleOpenDelete(_id)}
                                            onEdit={() => {
                                              handleOpenUpdate(_id);
                                            }}
                                          />
                                        </TableCell>
                                      </TableRow>
                                    )}
                                  </Draggable>
                                );
                              })}
                            {provided.placeholder}
                          </TableBody>
                        )}
                      </Droppable>
                    </DragDropContext>

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
              count={categories.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, value) => setPage(value)}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>

      {openBulkDelete && (
        <BulkDeleteCategory
          open={openBulkDelete}
          handleClose={handleCloseBulkDelete}
          setSelected={setSelected}
          selected={selected}
        />
      )}
      {openStock && <AlterCategoryStock open={openStock} handleClose={handleCloseStock} id={stockId} />}
      {openShare && <ShareCategory open={openShare} handleClose={handleCloseShare} id={IdToShare} />}
      {openDelete && <DeleteCategory open={openDelete} handleClose={handleCloseDelete} id={IdToDelete} />}
      {openUpdate && <EditCategory open={openUpdate} handleClose={handleCloseUpdate} id={IdToEdit} />}
      {openBulkImport && <BulkUploadCategory open={openBulkImport} handleClose={handleCloseBulkImport} />}
      {openBulkUpdate && <BulkUpdateCategory open={openBulkUpdate} handleClose={handleCloseBulkUpdate} />}
      {openAddCategory && <AddNewCategory open={openAddCategory} handleClose={handleCloseAddCategory} />}
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
