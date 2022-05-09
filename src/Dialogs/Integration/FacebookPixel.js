/* eslint-disable react/prop-types */
import React from 'react';
import {
  Dialog,
  DialogActions,
  Slide,
  Button,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tab,
  Tabs,
} from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const FacebookPixelInfo = ({ open, handleClose }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Dialog
        maxWidth={'lg'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Facebook Pixel'}</DialogTitle>
        <DialogContent>
          <img
            src={'https://www.portent.com/images/2018/03/Facebook-Pixel-Helper-Portent.png'}
            style={{ height: '270px', width: '100%', objectFit: 'contain' }}
            alt={'Facebook Pixel Info'}
          />

          <Box sx={{ width: '800px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Intro" {...a11yProps(0)} />
                <Tab label="Instructions" {...a11yProps(1)} />
                <Tab label="FAQ" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
            Facebook pixel is a piece of code that you put on your website that allows you to measure the effectiveness of your advertising by understanding the actions people take on your website. Examples of actions include adding an item to their shopping basket or making a purchase. You can then reach out to those customers again in the future through Facebook ads.

            <Typography>Features</Typography>
            <ol>
              <li>Make sure that your ads are shown to the right people. Find new customers or people who have visited a specific page or taken a desired action on your website.</li>
              <li>Drive more sales. Set up automatic bidding to reach people who are more likely to take any action that you care about, such as making a purchase.</li>
              <li>Measure the results of your ads. Better understand the impact of your ads by measuring what happens when people see them.</li>
            </ol>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography>In order to start capturing audience data through Link Manager, you need to setup pixels for each of your advertising platforms. In order to find your Pixel ID for Facebook, follow the instructions below:</Typography>
              <ol>
                <li>To start using Facebook Pixel, log in to your Facebook Ads Manager</li>
                <li>Once logged in, click on All Tools located in the left navigation bar</li>
                <li>Select Events Manager</li>
                <li>Copy the Pixel ID from the dashboard</li>
                <li>Now, Install the Facebook Pixel plugin on QwikShop</li>
                <li>Click on Settings and it’ll ask for Facebook Analytics Pixel ID</li>
                <li>Paste the Pixel ID here to complete the installation</li>
              </ol>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>What is Facebook Pixel?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    The Facebook pixel is an analytics tool that allows you to measure the effectiveness of your advertising by understanding the actions people take on your website. You can use the pixel to - make sure that your ads are shown to the right people, drive more sales, and measure the results of ads.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography>What are standard and custom events?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    When an action occurs on your website (for example, when someone adds an item to their basket), your Facebook pixel fires and logs it as an event. There are two categories of events: standard and custom.
                    </Typography>
                    <Typography>
                    Standard events are predefined actions that we recognize and support across ad products. Custom events are actions that fall outside those covered by our standard events, and you can give them a unique name to represent the action taking place.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                    <Typography>How to install Facebook Pixel to my online store?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    To install Facebook Pixel on your QwikShop store, follow the below steps.
                    </Typography>
                    <ol>
                      <li>Log in to QwikShop Store</li>
                      <li>Click on Plugins and look for the Facebook Analytics plugin</li>
                      <li>Click on Install</li>
                      <li>Once you click on install, it’ll ask for Facebook Pixel ID. Paste the pixel ID and complete the installation.</li>
                    </ol>
                    <Typography>
                    To know more about how to create Facebook Pixel for your store, refer this.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                    <Typography>How to change or remove the Facebook Pixel?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    To change your Facebook Pixel ID connect to your QwikShop store, follow the below steps.

                    </Typography>
                    <ol>
                      <li>Log in to QwikShop Store</li>
                      <li>Click on Plugins and look for the Facebook Analytics plugin</li>
                      <li>Click on Install</li>
                      <li>Once you click on settings, it’ll show your existing Pixel ID linked to your store. Replace it with the new ID and complete the change.</li>
                    </ol>
                    
                  </AccordionDetails>
                </Accordion>
              </div>
            </TabPanel>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Install
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FacebookPixelInfo;
