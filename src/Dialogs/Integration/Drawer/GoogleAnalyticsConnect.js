/* eslint-disable react/prop-types */
import CloseRounded from '@mui/icons-material/CloseRounded';
import { IconButton, Drawer, Stack, Box, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateGA} from '../../../actions';

const GoogleAnalyticsConnect = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { store } = useSelector((state) => state.store);

  const [propertyId, setPropertyId] = useState(store.GAPropertyId);

  return (
    <>
      <React.Fragment key={'right'}>
        <Drawer anchor={'right'} open={open} onClose={handleClose}>
          <Box sx={{ my: 3, mx: 4, width: '400px' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Google Analytics</Typography>

              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseRounded />
              </IconButton>
            </Stack>
            <Box sx={{ my: 4 }}>
              <Box
                className="mb-3"
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)' },
                }}
              >
                <TextField
                  required
                  name="propertyId"
                  label="Property ID"
                  fullWidth
                  value={propertyId}
                  onChange={(e) => {
                    setPropertyId(e.target.value);
                  }}
                />
              </Box>

              <Button
                onClick={() => {
                  dispatch(updateGA(propertyId, handleClose, false));
                }}
                sx={{ my: 2 }}
                variant="contained"
                fullWidth
              >
                Connect
              </Button>
              {/* <Typography sx={{ my: 3 }} variant="subtitle2">
                Need Help?
              </Typography>
              <PlayCircleRoundedIcon sx={{ mr: 1 }} />
              <Link to="/">
                <Typography variant="caption">See How to obtain Property ID</Typography>
              </Link> */}
            </Box>
          </Box>
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default GoogleAnalyticsConnect;
