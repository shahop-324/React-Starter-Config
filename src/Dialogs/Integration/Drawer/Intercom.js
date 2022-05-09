/* eslint-disable react/prop-types */
import CloseRounded from '@mui/icons-material/CloseRounded';
import { IconButton, Drawer, Stack, Box, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateIntercom} from "../../../actions";

const IntercomConnect = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { store } = useSelector((state) => state.store);

  const [appId, setAppId] = useState(store.IntercomAppId);

  return (
    <>
      <React.Fragment key={'right'}>
        <Drawer anchor={'right'} open={open} onClose={handleClose}>
          <Box sx={{ my: 3, mx: 4, width: '400px' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Intercom</Typography>

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
                  name="appId"
                  label="App ID"
                  fullWidth
                  value={appId}
                  onChange={(e) => {
                    setAppId(e.target.value);
                  }}
                />
              </Box>

              <Button onClick={() => {
                dispatch(updateIntercom(appId, handleClose, false))
              }} sx={{ my: 2 }} variant="contained" fullWidth>
                Connect
              </Button>
              {/* <Typography sx={{ my: 3 }} variant="subtitle2">
                Need Help?
              </Typography>
              <PlayCircleRoundedIcon sx={{ mr: 1 }} />
              <Link to="/">
                <Typography variant="caption">See How to obtain Intercom App ID</Typography>
              </Link> */}
            </Box>
          </Box>
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default IntercomConnect;
