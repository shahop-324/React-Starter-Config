/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Dialog, DialogTitle, Grid, Card, Typography, Box } from '@mui/material';
import QuillPageBuilder from './QuillPageBuilder';
import DnDPageBuilder from './DnDPageBuilder';

const SelectPageBuilder = ({ open, handleClose }) => {
  const [openRTE, setOpenRTE] = useState(false);

  const [openDnD, setOpenDnD] = useState(false);

  const handleOpenRTE = () => {
    setOpenRTE(true);
  };

  const handleOpenDnD = () => {
    setOpenDnD(true);

  };

  const handleCloseDnD = () => {
    setOpenDnD(false);
  };

  const handleCloseRTE = () => {
    setOpenRTE(false);
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Select Page Builder</DialogTitle>
        <Grid className="px-4 pt-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Card onClick={handleOpenRTE} sx={{ p: 3, height: '300px' }}>
                <img
                  src={
                    'https://raw.githubusercontent.com/niuware/niuware.github.io/master/public/assets/mui-rte/async-upload-demo.gif'
                  }
                  alt="Rich text editor"
                />
                <Typography variant="h6">Rich Text Editor</Typography>
              </Card>

              <Card onClick={handleOpenDnD} sx={{ p: 3, height: '300px' }}>
                <img
                  src="https://neilpatel.com/wp-content/uploads/2021/09/bigcommerce-Best-Ecommerce-Website-Builders.png"
                  alt="Drag and Drop Builder"
                />
                <Typography variant="h6">Drag & Drop Builder</Typography>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Dialog>
      {openRTE && <QuillPageBuilder open={openRTE} handleClose={handleCloseRTE} />}
      {openDnD && <DnDPageBuilder open={openDnD} handleClose={handleCloseDnD} />}
    </>
  );
};

export default SelectPageBuilder;
