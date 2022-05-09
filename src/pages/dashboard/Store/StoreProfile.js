import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const StoreProfile = () => {
  const [state, setState] = useState('');

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Store Details" value="1" />
              <Tab label="Subscription" value="2" />
              <Tab label="Staff account" value="3" />
              <Tab label="Checkout form" value="4" />
              <Tab label="Domains" value="5" />
              <Tab label="Policies" value="6" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box sx={{ padding: '20px' }}>Item one</Box>
          </TabPanel>
          <TabPanel value="2">
            <Box sx={{ padding: '20px' }}>Item Two</Box>
          </TabPanel>
          <TabPanel value="3">
            <Box sx={{ padding: '20px' }}>Item Three</Box>
          </TabPanel>
          <TabPanel value="4">
            <Box sx={{ padding: '20px' }}>Item four</Box>
          </TabPanel>
          <TabPanel value="5">
            <Box sx={{ padding: '20px' }}>Item five</Box>
          </TabPanel>
          <TabPanel value="6">
            <Box sx={{ padding: '20px' }}>Item six</Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default StoreProfile;
