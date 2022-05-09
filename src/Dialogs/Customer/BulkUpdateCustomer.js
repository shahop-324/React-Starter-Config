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
import { bulkUpdateCustomers, resetIsBulkUpdatingCustomer } from '../../actions';

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    description: 'Name of customer',
    width: 250,
    editable: true,
    sortable: true,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    description: 'Mobile No. of customer',
    width: 150,
    editable: true,
    sortable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    description: 'Email address of customer',
    width: 250,
    editable: true,
    sortable: true,
  },
  {
    field: 'pincode',
    headerName: 'Pincode',
    description: 'Pincode of customer',
    type: 'number',
    width: 200,
    editable: true,
    sortable: true,
  },
  {
    field: 'city',
    headerName: 'City',
    description: 'City of customer',
    type: 'number',
    width: 200,
    editable: true,
    sortable: true,
  },
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const allowed = ['_id', 'name', 'phone', 'email', 'pincode', 'city'];

const BulkUpdateCustomers = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(resetIsBulkUpdatingCustomer());
  }, []);

  const { customers, isBulkUpdating } = useSelector((state) => state.customer);

  useEffect(() => {
    const mRows = customers
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

  return (
    <>
      <Dialog fullWidth maxWidth="lg" open={open}>
        <DialogTitle>Bulk Update Customer</DialogTitle>
        <Stack sx={{ p: 3 }} direction="row" alignItems="center" justifyContent="space-between">
          <LabelStyle>Double click & update</LabelStyle>
          <div className="d-flex flex-row align-items-center justify-content-end">
            <LoadingButton
              loading={isBulkUpdating}
              disabled={!(rows !== undefined && rows.length > 0)}
              startIcon={<UpdateRoundedIcon />}
              onClick={() => {
                dispatch(bulkUpdateCustomers(rows, handleClose));
              }}
              type="button"
              variant="contained"
            >
              Update customers
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
                    pageSize={25}
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

export default BulkUpdateCustomers;
