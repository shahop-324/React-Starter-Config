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

const GMCInfo = ({ open, handleClose }) => {
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
        <DialogTitle>{'Google Merchant Center'}</DialogTitle>
        <DialogContent>
          <img
            src={'https://magecomp.com/blog/wp-content/uploads/2021/07/Google-Merchant-Center-Everything-You-Need-to-Know-950x500.png'}
            style={{ height: '270px', width: '100%', objectFit: 'contain' }}
            alt={'Google Merchant Center'}
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
            Now link your store directly to your Google Merchant Center account. Once this is done, you can start uploading product data and creating product feeds that can be linked to your Google Ads account for marketing with Google Shopping Ads.
<Typography>Features</Typography>

<ul>
  <li>Manage your business information and details like website details and store logo</li>
  <li>Manage your product feed, review feed data quality, and view a detailed list of your products</li>
  <li>Link your Google Ads, Display Video 360, and supported e-commerce platforms to Merchant Center</li>
  <li>Explore programs in Merchant Center that may help you advertise your products</li>
</ul>
            
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography>Step 1: Add your website address</Typography>
              <ol>
                <li>Sign in to your Google Merchant Center account.</li>
                <li>From the navigation menu, click the tools icon Merchant Center Settings [icon].</li>
                <li>Select Business information under “Tools”.</li>
                <li>Click the Website tab.</li>
                <li>Enter the URL for your online store, starting with http:// or https://. Use a domain that you own and maintain.</li>
                <li>Click Continue.</li>
              </ol>
              <Typography>Step 2: Verify your website</Typography>
              <Typography>After you have added your website URL in GMC, you need to verify your website by clicking on "Add an HTML tag".</Typography>
              <ol>
                <li>Copy and paste the HTML tag generated for your website in the above plugin section. It should look like this "<meta name="google-site-verification" content="_pbVlkdjjsTgDFMeQqTsZslmF_2-mN4-wY33rcA9ek" />"</li>
                <li>After the above step is done, wait for 5 mins and then click the "Verify Website" button at the bottom right to submit your website for verification.</li>
                <li>After verification, you can claim your website directly by clicking on it.</li>
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
                    GMC setup is a must to start with product promotions with Google Shopping Ads and other Google product listing platforms.
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
                    <Typography>Do I need a GMC account to use this?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    Yes, you will need a GMC account to set up the product feed. If you want to start promoting these products, you'll also need to have a Google Ads account.
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

export default GMCInfo;
