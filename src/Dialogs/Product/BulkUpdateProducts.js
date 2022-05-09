/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Card, Grid, Dialog, DialogTitle, Button, Typography, Stack } from '@mui/material';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import { LoadingButton } from '@mui/lab';
// @mui
import { styled } from '@mui/material/styles';

// components
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { bulkUpdateProducts, resetIsBulkUpdatingProducts } from '../../actions';

const columns = [
  {
    field: 'productName',
    headerName: 'Product Name',
    description: 'Name of this product',
    width: 150,
    editable: true,
    sortable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    description: 'Actual MRP of this product',
    width: 150,
    editable: true,
    sortable: true,
  },
  {
    field: 'discountedPrice',
    headerName: 'Discounted Price',
    description: 'price at which you are selling this product',
    type: 'number',
    width: 200,
    editable: true,
    sortable: true,
  },
  {
    field: 'brand',
    headerName: 'Brand',
    description: 'Brand for this product',
    sortable: true,
    editable: true,
    width: 160,
  },
  {
    field: 'wholesalePrice',
    headerName: 'Wholesale Price',
    description: 'wholesale price for this product',
    sortable: true,
    editable: true,
    width: 160,
  },
  {
    field: 'isFragile',
    headerName: 'Is Fragile',
    description: 'Is this product made of glass or something which can be damaged easily',
    sortable: true,
    editable: true,
    width: 160,
  },
  {
    field: 'weight',
    headerName: 'Weight',
    description: 'Weight in grams',
    sortable: true,
    editable: true,
    width: 160,
  },
  {
    field: 'productSKU',
    headerName: 'SKU',
    description: 'Unique identification number',
    sortable: true,
    editable: true,
    width: 160,
  },
  {
    field: 'length',
    headerName: 'Length',
    description: 'Length of this product (in cm)',
    sortable: true,
    editable: true,
    width: 160,
  },
  {
    field: 'width',
    headerName: 'Width',
    description: 'Width of this product (in cm)',
    sortable: true,
    editable: true,
    width: 160,
  },
  {
    field: 'height',
    headerName: 'Height',
    description: 'Height of this product (in cm)',
    sortable: true,
    editable: true,
    width: 160,
  },
  {
    field: 'minQuantitySold',
    headerName: 'Min. Quantity Sold',
    description: 'Minimum quantity that should be ordered',
    sortable: true,
    editable: true,
    width: 200,
  },
  {
    field: 'minWholesaleQuantity',
    headerName: 'Min. Wholesale Quantity',
    description: 'Minimum quantity for wholesale pricing',
    sortable: true,
    editable: true,
    width: 210,
  },
  {
    field: 'quantityInStock',
    headerName: 'Quantity In Stock',
    description: 'Available Quantity in stock for this product',
    sortable: true,
    editable: true,
    width: 200,
  },
  {
    field: 'metaTitle',
    headerName: 'Meta Title',
    description: 'complete title for this product',
    sortable: true,
    editable: true,
    width: 200,
  },
  {
    field: 'metaKeywords',
    headerName: 'Meta Keywords',
    description: 'keywords which can help customers find this product',
    sortable: true,
    editable: true,
    width: 200,
  },
  {
    field: 'metaDescription',
    headerName: 'Meta Description',
    description: 'It is the brief description of this product',
    sortable: true,
    width: 210,
  },
  {
    field: 'coins',
    headerName: 'Coins',
    description: 'Coins that you want to give to your customer for this purchase',
    sortable: true,
    editable: true,
    width: 210,
  },
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const allowed = [
  '_id',
  'productName',
  'brand',
  'price',
  'discountedPrice',
  'coins',
  'wholesalePrice',
  'isFragile',
  'weight',
  'productSKU',
  'length',
  'width',
  'height',
  'minQuantitySold',
  'minWholesaleQuantity',
  'quantityInStock',
  'metaTitle',
  'metaKeywords',
  'metaDescription',
];

const BlukUpdateProducts = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(50);

  useEffect(() => {
    dispatch(resetIsBulkUpdatingProducts());
  }, []);

  const { products, isBulkUpdating } = useSelector((state) => state.product);

  useEffect(() => {
    const mRows = products
      .map((el) =>
        Object.keys(el)
          .filter((key) => allowed.includes(key))
          .reduce((obj, key) => {
            obj[key] = el[key];
            return obj;
          }, {})
      )
      .map((e) => {
        e.id = uuidv4();
        return e;
      });

    setRows(mRows);
  }, []);

  const handleChangeRowsPerPage = (value) => {
    alert(value);
  };

  return (
    <>
      <Dialog fullWidth maxWidth="xl" open={open}>
        <DialogTitle>Bulk Update Products</DialogTitle>
        <Stack sx={{ p: 3 }} direction="row" alignItems="center" justifyContent="space-between">
          <LabelStyle>Double click & update</LabelStyle>
          <div className="d-flex flex-row align-items-center justify-content-end">
            <LoadingButton
              loading={isBulkUpdating}
              disabled={!(rows !== undefined && rows.length > 0)}
              startIcon={<UpdateRoundedIcon />}
              onClick={() => {
                dispatch(bulkUpdateProducts(rows, handleClose));
              }}
              type="button"
              variant="contained"
            >
              Update products
            </LoadingButton>
            <Button
              onClick={() => {
                handleClose();
              }}
              className="ms-3"
            >
              Close
            </Button>
          </div>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <div>
                <div style={{ width: '100%' }}>
                  <DataGrid
                    onCellFocusOut={(params) => {
                      console.log(params);
                    }}
                    onCellEditCommit={(params) => {
                      console.log(params, 'from the commit');
                      const mRows = rows.map((el) => {
                        if (el.id.toString() === params.id.toString()) {
                          el[`${params.field}`] = params.value;
                          return el;
                        }
                        return el;
                      });
                      setRows(mRows);
                    }}
                    autoHeight
                    rows={rows}
                    columns={columns}
                    pageSize={pageSize}
                    rowsPerPageOptions={[25, 50, 100, 200, 500]}
                    disableSelectionOnClick
                  />
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default BlukUpdateProducts;
