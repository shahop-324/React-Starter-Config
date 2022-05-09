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

const AdwordsInfo = ({ open, handleClose }) => {
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
        <DialogTitle>{'Adwords Conversion Tracking'}</DialogTitle>
        <DialogContent>
          <img
            src={'https://www.newbreedrevenue.com/hubfs/Google%20Adwords.png'}
            style={{ height: '270px', width: '100%', objectFit: 'contain' }}
            alt={'Adwords Conversion Tracking'}
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
              <Typography>Implementing Google Ads (Google AdWords) conversion pixel or tracking code is extremely important for running successful Google Ads campaigns. You can optimize your shopping, search or display campaigns only if you have the exact conversions data.</Typography>
              <Typography>Retarget your visitors and clients better within the Google Ad network using AdWords Conversion Tracking plugin. Send client data directly to Google Ads server from your QwikShop store. Run better ads campaigns by targeting the right users.</Typography>
              <Typography>Features</Typography>
              <ul>
                <li>Once click integration without involving developers</li>
                <li>
                Save time and money by using this FREE plugin
                </li>
                <li>
                Accurate reporting for conversion actions
                </li>
              </ul>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography>Here's how you can start tracking AdWords conversions on your QwikShop store:</Typography>
              <ol>
                <li>
                To start using Google Adwords Plugin, log in to your Google Ads Account
                </li>
                <li>
                In your Google Ads account, click the Tools and Settings menu
                </li>
                <li>
                Under Measurement, select Conversions
                </li>
                <li>
                Select the name of the conversion that you want to use from the Conversion action column
                </li>
                <li>
                Click on the Tag Setup section to expand it for details
                </li>
                <li>
                Select Use Google Tag Manager
                </li>
                <li>
                Copy the Conversion ID and Conversion Label
                </li>
                <li>
                Now, Install the Adwords Conversion Tracking plugin on QwikShop
                </li>
                <li>
                Click on Settings and it’ll ask for Conversion ID and Conversion Label
                </li>
                <li>
                Paste both of them in the respective fields to complete the installation
                </li>
              </ol>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Which networks I can track the conversions on?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    You can track e-commerce conversions across Google Display, Search and YouTube. Tracking is free for unlimited number of events.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography>Is this plugin free to use?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    Yes, this plugin is absolutely free of cost.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                    <Typography>Do I need Google Adwords account to use this?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    Yes, you need fully active AdWords account in order to obtain conversion code.
                    </Typography>
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

export default AdwordsInfo;