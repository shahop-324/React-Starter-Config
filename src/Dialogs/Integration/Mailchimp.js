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

const MailchimpInfo = ({ open, handleClose }) => {
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
        <DialogTitle>{'Mailchimp'}</DialogTitle>
        <DialogContent>
          <img
            src={'https://mailchimp.com//email-design-guide/images/share-1a1fdf04.png'}
            style={{ height: '270px', width: '100%', objectFit: 'contain' }}
            alt={'Mailchimp'}
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
              <Typography>Mailchimp is a newsletter service that allows you to send out email campaigns to a list of email subscribers. This plugin helps you grow your Mailchimp lists and write better newsletters through various methods. You can create good-looking opt-in forms or integrate them with any existing form on your website.</Typography>
              <Typography>This plugin allows you to integrate Mailchimp with your QwikShop store. Please note this plugin can only be used on the Oxford Pro theme.</Typography>
              <Typography>Features</Typography>
              <ul>
                <li>Manage contacts and grow your contact list without hassle</li>
                <li>Drag and drop editor to set up your own campaigns with 1000+ creative templates</li>
                <li>Campaign builder and reporting with powerful analytics</li>
                <li>Email automation on predefined user behavior</li>
                <li>Advanced segmentation to filter out and communicate with the target audience</li>
                <li>A/B split testing to learn what’s working with customers</li>
                <li>Spam analysis to prevent emails from landing in spam folders</li>
              </ul>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <Typography>Here's how you can start using Mailchimp:</Typography> 
            <ol>
              <li>Install the Mailchimp plugin.</li>
              <li>Once installed, click on Connect button.</li>
              <li>Login with your Mailchimp username and password</li>
              <li>Click on Allow to authorize the access</li>
            </ol>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>What benefit do I get from this?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    Mailchimp can help you communicate with and grow your audience. You can send emails to customers, do segmentation, easy automation, and much more.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography>Is this plugin free to use?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    Yes, this is a completely free plugin.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                    <Typography>Do I need a Mailchimp account to use this?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    Yes, you will need a Mailchimp account to connect the plugin with your website.
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

export default MailchimpInfo;
