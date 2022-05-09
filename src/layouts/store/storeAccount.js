import React from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

const StoreAccount = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="container mt-5">
        <Box sx={{ flexGrow: 1,  display: 'flex', height: '100%' }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="My Orders" {...a11yProps(0)} />
            <Tab label="My Reviews" {...a11yProps(1)} />
            <Tab label="My Addresses" {...a11yProps(2)} />
            <Tab label="Sign out" {...a11yProps(3)} />
            <Tab label="" {...a11yProps(4)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            My orders
          </TabPanel>
          <TabPanel value={value} index={1}>
            My Reviews
          </TabPanel>
          <TabPanel value={value} index={2}>
            My Addresses
          </TabPanel>
          <TabPanel value={value} index={3}>
            Sign out
          </TabPanel>
          <TabPanel value={value} index={4}>
            {' '}
          </TabPanel>
        </Box>
      </div>
    </>
  );
};

export default StoreAccount;
