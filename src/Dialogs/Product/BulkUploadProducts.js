/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Card, Grid, Dialog, DialogTitle, Button, Typography, Stack } from '@mui/material';
import readXlsxFile from 'read-excel-file';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import {LoadingButton} from '@mui/lab';

import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui

import { styled } from '@mui/material/styles';

// components
import { DataGrid } from '@mui/x-data-grid';
import { UploadRounded } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, RHFUploadSingleFile } from '../../components/hook-form';
import { bulkImportProducts, resetIsBulkImportingProducts } from '../../actions';

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
    field: 'description',
    headerName: 'Description',

    sortable: true,
    editable: true,
    width: 220,
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

const schema = {
  id: {
    prop: 'id',
    type: Number,
  },
  name: {
    prop: 'productName',
    type: String,
    required: true,
  },
  price: {
    prop: 'price',
    type: Number,
    required: true,
  },
  coins: {
    prop: 'coins',
    type: Number,
  },
  discounted_price: {
    prop: 'discountedPrice',
    type: Number,
  },
  description: {
    prop: 'description',
    type: String,
  },
  brand: {
    prop: 'brand',
    type: String,
  },
  wholesale_price: {
    prop: 'wholesalePrice',
    type: Number,
  },
  is_fragile: {
    prop: 'isFragile',
    type: Boolean,
  },
  weight: {
    prop: 'weight',
    type: Number,
  },
  sku: {
    prop: 'productSKU',
    type: String,
  },
  length: {
    prop: 'length',
    type: Number,
  },
  width: {
    prop: 'width',
    type: Number,
  },
  height: {
    prop: 'height',
    type: Number,
  },
  min_quantity_sold: {
    prop: 'minQuantitySold',
    type: Number,
  },
  min_wholesale_quantity: {
    prop: 'minWholesaleQuantity',
    type: Number,
  },
  quantity_in_stock: {
    prop: 'quantityInStock',
    type: Number,
  },
  meta_title: {
    prop: 'metaTitle',
    type: String,
  },
  meta_description: {
    prop: 'metaDescription',
    type: String,
  },
  meta_keywords: {
    prop: 'metaKeywords',
    type: String,
  },
};

const BulkUploadProduct = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetIsBulkImportingProducts());
  }, []);
  const {isBulkImporting} = useSelector((state) => state.product);
  const [rows, setRows] = useState([]);
  const [invalidFormat, setInvalidFormat] = useState(false);

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().min(1000).required('Content is required'),
    cover: Yup.mixed().required('Cover is required'),
  });

  const defaultValues = {
    title: '',
    description: '',
    content: '',
    cover: null,
    tags: ['Logan'],
    publish: true,
    comments: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ['Logan'],
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {};

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    readXlsxFile(file, { schema }).then(({ rows, errors }) => {
      if (errors !== undefined && errors.length > 0) {
        setInvalidFormat(true);
      } else {
        setInvalidFormat(false);
        const newRows = rows.map((e) => {
          e.id = uuidv4();
          return e;
        });

        console.log(rows);
        setRows(newRows);
      }
    });
  };
  return (
    <>
      <Dialog fullWidth maxWidth="xl" open={open}>
        <DialogTitle>Bulk Upload Products</DialogTitle>
        <Stack sx={{ p: 3 }} direction="row" alignItems="center" justifyContent="space-between">
          <LabelStyle>Import Products via Excel / CSV</LabelStyle>
          <div className="d-flex flex-row align-items-center justify-content-end">
            <LoadingButton loading={isBulkImporting} disabled={!(rows !== undefined && rows.length > 0)} onClick={() => {
                dispatch(bulkImportProducts(rows, handleClose));
              }} startIcon={<UploadRounded />} type="button" variant="contained">
              Upload products
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
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <div>
                  <RHFUploadSingleFile
                    name="cover"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    maxSize={314572800}
                    onDrop={handleDrop}
                  />
                  <div className="my-3">
                    <Typography variant="caption">
                      Note: Download File format (
                      <a
                        target={'_blank'}
                        rel="noreferrer"
                        href="https://qwikshop.s3.ap-south-1.amazonaws.com/excel_template/product_upload_format.xlsx"
                        download="qwikshop_product_upload_format"
                      >
                        Click here
                      </a>
                      )
                    </Typography>
                  </div>
                  {!invalidFormat ? (
                    rows !== undefined &&
                    rows.length > 0 && (
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
                          pageSize={25}
                          rowsPerPageOptions={[25, 50, 100, 200, 500]}
                          disableSelectionOnClick
                        />
                      </div>
                    )
                  ) : (
                    <Card sx={{ p: 4 }}>
                      <Stack direction={'column'} alignItems="center" justifyContent={'center'} spacing={3}>
                        <Typography variant='subtitle2' color={'error'} fontWeight="500">Invalid format, Please upload file in below format</Typography>
                        <Typography variant='body2' color={'#538bF7'}>NOTE: Only name & price fields are mandatory</Typography>
                        <a
                          style={{ textDecoration: 'none' }}
                          target={'_blank'}
                          rel="noreferrer"
                          href="https://qwikshop.s3.ap-south-1.amazonaws.com/excel_template/product_upload_format.xlsx"
                          download="qwikshop_product_upload_format"
                        >
                          <Button startIcon={<FileDownloadRoundedIcon />} variant="outlined" size="large">
                            Download Excel format
                          </Button>
                        </a>
                      </Stack>
                    </Card>
                  )}
                </div>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default BulkUploadProduct;
