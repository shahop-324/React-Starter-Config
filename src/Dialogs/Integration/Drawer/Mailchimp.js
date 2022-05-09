/* eslint-disable react/prop-types */
import CloseRounded from '@mui/icons-material/CloseRounded';
import { IconButton, Drawer, Stack, Box, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStore } from '../../../actions';

const BaseURL = 'https://api.app.qwikshop.online/v1/';

const MailchimpConnect = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { store } = useSelector((state) => state.store);
  const [apiKey, setApiKey] = useState(store.mailchimpKey);

  return (
    <>
      <React.Fragment key={'right'}>
        <Drawer anchor={'right'} open={open} onClose={handleClose}>
          <Box sx={{ my: 3, mx: 4, width: '400px' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Mailchimp</Typography>

              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseRounded />
              </IconButton>
            </Stack>
            <Box sx={{ my: 4 }}>
              <TextField
                required
                name="apiKey"
                label="Api Key"
                fullWidth
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                }}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch(updateStore({ mailchimpKey: apiKey }));
                }}
                sx={{ my: 2 }}
                fullWidth
              >
                Update API Key
              </Button>
              {store.mailchimpKey && (
                <a href={`${BaseURL}auth/mailChimp`} style={{ textDecoration: 'none', width: '100%' }}>
                  <Button sx={{ my: 2 }} variant="contained" fullWidth>
                    Authorize using Mailchimp
                  </Button>
                </a>
              )}

              {/* <Typography sx={{ my: 3 }} variant="subtitle2">
                Need Help?
              </Typography>
              <PlayCircleRoundedIcon sx={{ mr: 1 }} />
              <Link to="/">
                <Typography variant="caption">See How to connect Mailchimp with QwikShop</Typography>
              </Link> */}
            </Box>
          </Box>
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default MailchimpConnect;
