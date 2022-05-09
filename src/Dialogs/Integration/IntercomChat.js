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

const Intercom = ({ open, handleClose }) => {
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
        <DialogTitle>{'Intercom'}</DialogTitle>
        <DialogContent>
          <img
            src={
              'https://4du8xa2mi3h47hddn434ubtx-wpengine.netdna-ssl.com/wp-content/uploads/2021/02/51129373-0-intercom-vector-logo.png'
            }
            style={{ height: '270px', width: '100%', objectFit: 'contain' }}
            alt={'Intercom'}
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
              <Typography>
                Intercom is a fundamentally new way for internet businesses to communicate with customers, personally,
                at scale. It’s a customer communication platform with a suite of integrated products for every team –
                including sales, marketing, product, and support.
              </Typography>
              <Typography>
                With this plugin, you can add the Intercom Messenger to your QwikShop store in just a few clicks and start
                chatting to customers and visitors to your website right away.
              </Typography>

              <Typography>Features</Typography>
              <ol>
                <li>
                  Team Inbox to answer customer questions through a collaborative, shared, and highly customizable
                  Inbox.{' '}
                </li>
                <li>
                  Outbound Messages like targeted email, mobile push, and in-app messages to encourage customers to take
                  action, or convert visitors to loyal customers.{' '}
                </li>
                <li>
                  Help Center Articles to create a knowledge base to provide your customers with self-serve support.{' '}
                </li>
                <li>
                  Product Tours to onboard and support customers and highlight new features with guided,
                  adoption-driving tours.
                </li>
                <li>
                  Custom Bots to create customized, conversational bots to qualify leads, triage support inquiries, and
                  more.
                </li>
                <li>
                  Resolution Bot to automatically answer customer questions and resolve simple issues so your team has
                  more time for personalized customer interactions.
                </li>
              </ol>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography>Here's how you can start using Intercom:</Typography>
              <ol>
                <li>To start using Intercom, create an account on Intercom or log in (if you have one)</li>
                <li>Click on your profile icon and select Settings</li>
                <li>Now under settings, click Installation and select Web</li>
                <li>Under the “Install Chat for Visitors” section, click on With Code</li>
                <li>Copy the app_id</li>
                <li>Now, Install the Intercom plugin on QwikShop</li>
                <li>Click on Settings and it’ll ask for Intercom App ID</li>
                <li>Paste your App ID here to complete the installation</li>
              </ol>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>What is Intercom?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Intercom is a messaging platform that allows businesses to communicate with prospective and
                      existing customers within their app, on their website, through social media, or via email.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography>What are the benefits of using Intercom?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>There are numerous benefits of using Intercom. Some of the benefits are:</Typography>
                    <ol>
                      <li>See who your customers are and what they do</li>
                      <li>Get more leads for your business</li>
                      <li>Get quick responses from your customers via chat and email and increase sales</li>
                      <li>Create and share content to help people better understand your products and services</li>
                    </ol>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                    <Typography>How to install the Intercom plugin?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>To install Intercom on your QwikShop store, follow the below steps.</Typography>
                    <ol>
                      <li>Log in to QwikShop Store</li>
                      <li>Click on Plugins and look for the Intercom plugin</li>
                      <li>Click on Install</li>
                      <li>
                        Once you click on install, it’ll ask for the Intercom App ID. Paste the pixel ID and complete
                        the installation.
                      </li>
                    </ol>
                    <Typography>To learn how to find your app id, refer to this.</Typography>
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

export default Intercom;
