/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Typography, Box, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '../../../../components/editor';
import { updatePolicy } from '../../../../actions';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const AccountPolicies = () => {
  const dispatch = useDispatch();
  const { store, isUpdatingPolicy } = useSelector((state) => state.store);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [terms, setTerms] = useState(store?.termsOfService?.replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
  const [privacyPolicy, setPrivacyPolicy] = useState(store?.privacyPolicy?.replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
  const [refundPolicy, setRefundPolicy] = useState(store?.refundPolicy?.replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
  const [shippingPolicy, setShippingPolicy] = useState(
    store?.shippingPolicy?.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  );
  const [disclaimerPolicy, setDisclaimerPolicy] = useState(
    store?.disclaimerPolicy?.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  );

  const onSubmitTerms = () => {
    dispatch(updatePolicy({ termsOfService: terms }));
  };
  const onSubmitPrivacyPolicy = () => {
    dispatch(updatePolicy({ privacyPolicy }));
  };
  const onSubmitRefundPolicy = () => {
    dispatch(updatePolicy({ refundPolicy }));
  };
  const onSubmitShippingPolicy = () => {
    dispatch(updatePolicy({ shippingPolicy }));
  };
  const onSubmitDisclaimerPolicy = () => {
    dispatch(updatePolicy({ disclaimerPolicy }));
  };

  return (
    <>
      <Grid className="px-4 pt-3" container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, position: 'relative' }}>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', width: '150px' }}
              >
                <Tab label="Terms" {...a11yProps(0)} />
                <Tab label="Privacy Policy" {...a11yProps(1)} />
                <Tab label="Refund Policy" {...a11yProps(2)} />
                <Tab label="Shipping Policy" {...a11yProps(3)} />
                <Tab label="Disclaimer Policy" {...a11yProps(4)} />
                <Tab label="" {...a11yProps(4)} />
              </Tabs>
              <TabPanel value={value} index={0} sx={{ width: '600px' }}>
                <Box className="mb-3">
                  <Typography id="list-item-1" variant="subtitle1" className="my-2">
                    Terms of service
                  </Typography>
                  <Editor sx={{ width: '740px' }} value={terms} onChange={(html) => setTerms(html)} />
                  <Stack className="my-2" direction={'row'} justifyContent={'end'} spacing={3}>
                    {' '}
                    <LoadingButton loading={isUpdatingPolicy} variant="contained" onClick={onSubmitTerms}>
                      Save & Publish
                    </LoadingButton>{' '}
                  </Stack>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Box className="mb-3">
                  <Typography id="list-item-2" variant="subtitle1" className="my-2">
                    Privacy Policy
                  </Typography>
                  <Editor sx={{ width: '740px' }} value={privacyPolicy} onChange={(html) => setPrivacyPolicy(html)} />
                  <Stack className="my-2" direction={'row'} justifyContent={'end'} spacing={3}>
                    {' '}
                    <LoadingButton loading={isUpdatingPolicy} variant="contained" onClick={onSubmitPrivacyPolicy}>
                      Save & Publish
                    </LoadingButton>
                  </Stack>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Box className="mb-3">
                  <Typography id="list-item-3" variant="subtitle1" className="my-2">
                    Refund Policy
                  </Typography>
                  <Editor sx={{ width: '740px' }} value={refundPolicy} onChange={(html) => setRefundPolicy(html)} />
                  <Stack className="my-2" direction={'row'} justifyContent={'end'} spacing={3}>
                    {' '}
                    <LoadingButton
                      loading={isUpdatingPolicy}
                      onClick={() => {
                        onSubmitRefundPolicy();
                      }}
                      variant="contained"
                    >
                      Save & Publish
                    </LoadingButton>
                  </Stack>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Box className="mb-3">
                  <Typography id="list-item-3" variant="subtitle1" className="my-2">
                    Shipping Policy
                  </Typography>
                  <Editor sx={{ width: '740px' }} value={shippingPolicy} onChange={(html) => setShippingPolicy(html)} />
                  <Stack className="my-2" direction={'row'} justifyContent={'end'} spacing={3}>
                    {' '}
                    <LoadingButton loading={isUpdatingPolicy} onClick={onSubmitShippingPolicy} variant="contained">
                      Save & Publish
                    </LoadingButton>
                  </Stack>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <Box className="mb-3">
                  <Typography id="list-item-3" variant="subtitle1" className="my-2">
                    Disclaimer Policy
                  </Typography>
                  <Editor
                    sx={{ width: '740px' }}
                    value={disclaimerPolicy}
                    onChange={(html) => setDisclaimerPolicy(html)}
                  />
                  <Stack className="my-2" direction={'row'} justifyContent={'end'} spacing={3}>
                    {' '}
                    <LoadingButton loading={isUpdatingPolicy} onClick={onSubmitDisclaimerPolicy} variant="contained">
                      Save & Publish
                    </LoadingButton>
                  </Stack>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={5}>
                {' '}
              </TabPanel>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AccountPolicies;
