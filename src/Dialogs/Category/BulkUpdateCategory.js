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
import { bulkUpdateCategories, resetIsBulkUpdatingCategories } from '../../actions';

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 550,
    editable: true,
    sortable: true,
  },
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const allowed = ['_id', 'name'];

const BulkUpdateCategory = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(resetIsBulkUpdatingCategories());
  }, []);

  const { categories, isBulkUpdating } = useSelector((state) => state.category);

  useEffect(() => {
    const mRows = categories
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
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Bulk Update Category</DialogTitle>
        <Stack sx={{ p: 3 }} direction="row" alignItems="center" justifyContent="space-between">
          <LabelStyle>Double click & update</LabelStyle>
          <div className="d-flex flex-row align-items-center justify-content-end">
            <LoadingButton
              loading={isBulkUpdating}
              disabled={!(rows !== undefined && rows.length > 0)}
              startIcon={<UpdateRoundedIcon />}
              onClick={() => {
                dispatch(bulkUpdateCategories(rows, handleClose));
              }}
              type="button"
              variant="contained"
            >
              Update categories
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

export default BulkUpdateCategory;
