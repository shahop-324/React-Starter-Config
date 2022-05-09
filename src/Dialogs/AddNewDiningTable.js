import React, { useState } from 'react';
import { Box, Card, Grid, Dialog, DialogTitle, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// @mui
// Phone Input
import 'react-phone-number-input/style.css';

// eslint-disable-next-line react/prop-types
const AddNewDiningTable = ({ open, handleClose }) => {
  const [tableNum, setTableNum] = useState(1);

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Add Dining Table</DialogTitle>
        <Grid className="px-4 py-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                }}
              >
                <TextField
                  name="tableNum"
                  label="Table Number"
                  fullWidth
                  value={tableNum}
                  onChange={(e) => {
                    setTableNum(e.target.value);
                  }}
                />
              </Box>
              <div className="d-flex flex-row align-items-center justify-content-end  mt-4">
                <LoadingButton onClick={() => {}} type="submit" variant="contained" loading={false}>
                  Create Table
                </LoadingButton>
                <Button
                  className="ms-3"
                  size="small"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default AddNewDiningTable;
