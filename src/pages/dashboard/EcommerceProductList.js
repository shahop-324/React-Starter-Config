/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
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
  Stack,
  IconButton,
} from '@mui/material';
// redux
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
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
  ProductListHead,
  ProductListToolbar,
} from '../../sections/@dashboard/e-commerce/product-list';
import AddNewProduct from '../../Dialogs/AddNewProduct';
import { fetchProducts, updateProductStock, reorderProducts } from '../../actions';
import ShareProduct from '../../Dialogs/Product/ShareProduct';
import EditProduct from '../../Dialogs/Product/EditProduct';
import DeleteProduct from '../../Dialogs/Product/DeleteProduct';
import BulkDeleteProducts from '../../Dialogs/Product/BulkDeleteProducts';
import AlterProductStock from '../../Dialogs/Product/AlterProductStock';
import NoProducts from '../../assets/no-results.png';
import BulkUploadProduct from '../../Dialogs/Product/BulkUploadProducts';
import BulkUpdateProduct from '../../Dialogs/Product/BulkUpdateProducts';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Product', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'inventoryType', label: 'Status', alignRight: false },
  { id: 'price', label: 'Price', alignRight: true },
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

export default function EcommerceProductList() {
  const { products } = useSelector((state) => state.product);

  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [term, setTerm] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchProducts(term));
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  const [openAddProduct, setOpenAddproduct] = useState(false);

  const [openBulkImport, setOpenBulkImport] = useState(false);

  const [IdToShare, setIdToShare] = useState();
  const [openShare, setOpenShare] = useState(false);

  const handleOpenShare = (id) => {
    setIdToShare(id);
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleOpenBulkImport = () => {
    setOpenBulkImport(true);
  };

  const handleCloseBulkImport = () => {
    setOpenBulkImport(false);
  };

  const handleCloseAddProduct = () => {
    setOpenAddproduct(false);
  };

  const handleOpenAddProduct = () => {
    setOpenAddproduct(true);
  };

  const [openBulkDelete, setOpenBulkDelete] = useState(false);
  const [openBulkUpdate, setOpenBulkUpdate] = useState(false);

  const handleOpenBulkDelete = () => {
    setOpenBulkDelete(true);
  };

  const handleCloseBulkDelete = () => {
    setOpenBulkDelete(false);
  };

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [orderBy, setOrderBy] = useState('createdAt');

  const [openUpdate, setOpenUpdate] = useState(false);
  const [IdToEdit, setIdToEdit] = useState();
  const [IdToDelete, setIdToDelete] = useState();
  const [openDelete, setOpenDelete] = useState(false);

  const [openStock, setOpenStock] = useState(false);
  const [stockId, setStockId] = useState('');

  const handleOpenUpdate = (id) => {
    setIdToEdit(id);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleOpenStock = (id) => {
    setStockId(id);
    setOpenStock(true);
  };

  const handleCloseStock = () => {
    setOpenStock(false);
  };

  useEffect(() => {
    // dispatch(getProducts());
  }, [dispatch]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const selected = products.map((n) => n._id);
      setSelected(selected);
      return;
    }
    setSelected([]);
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

  const handleOpenDelete = (id) => {
    setIdToDelete(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenBulkUpdate = () => {
    setOpenBulkUpdate(true);
  };

  const handleCloseBulkUpdate = () => {
    setOpenBulkUpdate(false);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const filteredProducts = applySortFilter(products, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredProducts.length && Boolean(filterName);

  const processProductsData = () => {
    const processedArray = [];

    products.map((category) => {
      const array = Object.entries(category);

      const filtered = array.filter(
        ([key, value]) =>
          key === 'productName' ||
          key === 'price' ||
          key === 'discountedPrice' ||
          key === 'wholesalePrice' ||
          key === 'minWholesaleQuantity' ||
          key === 'isFragile' ||
          key === 'acceptCOD' ||
          key === 'outOfStock' ||
          key === 'totalSales' ||
          key === 'totalOrders' ||
          key === 'minQuantitySold'
      );

      const asObject = Object.fromEntries(filtered);

      return processedArray.push(asObject);
    });

    const finalArray = processedArray.map((obj) => Object.values(obj));

    return finalArray;
  };

  const CreateAndDownloadCSV = (data) => {
    let csv =
      'total_sales, total_orders, name, maximum_retail_price, discounted_price, wholesale_price, minimum_wholesale_quantity,  is_fragile, accept_cod, minimum_quantity_sold, out_of_stock, \n';
    data.forEach((row) => {
      csv += row.join(',');
      csv += '\n';
    });

    console.log(csv);
    const hiddenElement = document.createElement('a');
    hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
    hiddenElement.target = '_blank';
    hiddenElement.download = 'products.csv';
    hiddenElement.click();
  };

  const handleExportProducts = () => {
    CreateAndDownloadCSV(processProductsData());
  };

  const handleDragEnd = (result) => {
    console.log(result);
    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(reorderProducts(items));
  };

  return (
    <>
      <Page title="Product List">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <Card>
            <ProductListToolbar
              setTerm={setTerm}
              openBulkImport={handleOpenBulkImport}
              openAddProduct={handleOpenAddProduct}
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
              onDeleteProducts={() => {
                handleOpenBulkDelete();
              }}
              handleExportProducts={handleExportProducts}
              products={products}
              handleOpenBulkUpdate={handleOpenBulkUpdate}
            />

            {!(typeof products !== 'undefined' && products.length > 0) ? (
              <Stack sx={{ width: '100%' }} direction="column" alignItems="center" justifyContent="center">
                <Card sx={{ p: 3, my: 3 }}>
                  <img style={{ height: '150px', width: '150px' }} src={NoProducts} alt="no products in store" />
                </Card>
                <Typography sx={{ mb: 3 }} variant="subtitle2">
                  You haven't added any products to your store, Hurry up, set it up and Earn
                </Typography>
              </Stack>
            ) : (
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <ProductListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={products.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />

                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable droppableId="list">
                        {(provided) => (
                          <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                            {products
                              .slice(0)
                              .reverse()
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => {
                                const { _id, productName, category, discountedPrice, price, outOfStock, images } = row;

                                const isItemSelected = selected.indexOf(_id) !== -1;

                                return (
                                  <Draggable key={_id} draggableId={_id} index={index}>
                                    {(provided) => (
                                      <TableRow
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        hover
                                        key={_id}
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
                                              alt={productName}
                                              src={
                                                images !== undefined && images.length > 0
                                                  ? `https://qwikshop.s3.ap-south-1.amazonaws.com/${images[0]}`
                                                  : 'https://qwikshop.s3.ap-south-1.amazonaws.com/images/noimage.png'
                                              }
                                              sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2 }}
                                            />
                                            <Typography variant="subtitle2" noWrap>
                                              {productName}
                                            </Typography>
                                          </Stack>
                                        </TableCell>
                                        <TableCell style={{ minWidth: 160 }}>
                                          {category?.label || 'No category assigned'}
                                        </TableCell>
                                        <TableCell style={{ minWidth: 160 }}>
                                          {' '}
                                          <FormControlLabel
                                            control={
                                              <IOSSwitch
                                                sx={{ m: 1 }}
                                                checked={!outOfStock}
                                                onClick={(e) => {
                                                  if (!outOfStock) {
                                                    handleOpenStock(_id);
                                                  } else {
                                                    dispatch(
                                                      updateProductStock(
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
                                          />{' '}
                                          <Label
                                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                            color={(outOfStock && 'error') || 'success'}
                                          >
                                            {outOfStock ? 'Out of stock' : 'In stock'}
                                          </Label>
                                        </TableCell>
                                        <TableCell align="right">{`Rs.${discountedPrice || price}`}</TableCell>
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
                                            productName={productName}
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
                            {emptyRows > 0 && (
                              <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                            {provided.placeholder}
                          </TableBody>
                        )}
                      </Droppable>
                    </DragDropContext>

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
              count={products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, value) => setPage(value)}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>
      {openStock && <AlterProductStock open={openStock} handleClose={handleCloseStock} id={stockId} />}
      {openDelete && <DeleteProduct open={openDelete} handleClose={handleCloseDelete} id={IdToDelete} />}
      {openShare && <ShareProduct open={openShare} handleClose={handleCloseShare} id={IdToShare} />}
      {openAddProduct && <AddNewProduct open={openAddProduct} handleClose={handleCloseAddProduct} />}
      {openUpdate && <EditProduct open={openUpdate} handleClose={handleCloseUpdate} id={IdToEdit} />}
      {openBulkDelete && (
        <BulkDeleteProducts
          open={openBulkDelete}
          handleClose={handleCloseBulkDelete}
          setSelected={setSelected}
          selected={selected}
        />
      )}
      {openBulkImport && <BulkUploadProduct open={openBulkImport} handleClose={handleCloseBulkImport} />}
      {openBulkUpdate && <BulkUpdateProduct open={openBulkUpdate} handleClose={handleCloseBulkUpdate} />}
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
