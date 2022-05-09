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

const GoogleAnalyticsInfo = ({ open, handleClose }) => {


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
        <DialogTitle>{'Google Analytics'}</DialogTitle>
        <DialogContent>
          <img
            src={'https://marketing4ecommerce.net/wp-content/uploads/2020/10/nueva-portada-enero-1-8-1280x720.jpg'}
            style={{ height: '270px', width: '100%', objectFit: 'contain' }}
            alt={'Google Analytics'}
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
                Google Analytics is a website traffic analysis application that provides real-time statistics and
                analysis of user interaction with the website.
              </Typography>

              <Typography>
                Google Analytics enables website owners to analyze their visitors, with the objective of interpreting
                and optimizing the website’s performance to improve sales and performance.
              </Typography>

              <Typography>Features</Typography>

              <ul>
                <li>Easy to set up with this plugin</li>
                <li>
                  Full access to the most important Google Analytics metrics ( Sessions, Users, Page views, % New
                  Sessions, Bounce Rate, avg. Session Duration, Pageviews/Session)
                </li>
                <li>Real-Time monitor of your shop's visitors</li>
                <li>Keywords used to find your shop on Google search ( provided by Google Search Console).</li>
                <li>Traffic sources</li>
                <li>Most visited pages</li>
                <li>Countries of your shop visitors</li>
                <li>Browsers and their versions</li>
                <li>Languages</li>
                <li>Operating Systems and their versions</li>
              </ul>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography>Here's how you can start using Google Analytics:</Typography>
              <ol>
                <li>To start using Google Analytics, create an account on it or log in (if you have one)</li>
                <li>Once logged in, click on Admin</li>
                <li>Select the account from the menu in the ACCOUNT column.</li>
                <li>Select the property from the menu in the PROPERTY column.</li>
                <li>Under PROPERTY, click Tracking Info and then select Tracking Code</li>
                <li>Copy the Tracking ID displayed at the top of the page</li>
                <li>Now, Install the Google Analytics plugin on QwikShop</li>
                <li>Click on Settings and it’ll ask for Analytics Property ID</li>
                <li>Paste the Tracking ID here to complete the installation</li>
              </ol>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>What is Google Analytics?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Google Analytics is the most popular web analytics tool used today. At a very basic level, it
                      provides a lot of information about your website visitors and users, their origin, and their
                      behavior so you can monitor, measure, and improve your online business.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography>What are the benefits of Google Analytics?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Google Analytics has numerous benefits for your online business. It helps you measure key
                      performance indicators of your business, see which channels are working and bringing revenue, most
                      popular products, categories of your store, etc.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                    <Typography>How to install the Google Analytics plugin?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>To install Google Analytics on your QwikShop store, follow the below steps.</Typography>
                    <ol>
                      <li>Log in to QwikShop Store</li>
                      <li>Click on Plugins and look for the Google Analytics plugin</li>
                      <li>Click on Install</li>
                      <li>
                        Once you click on install, it’ll ask for the tracking code. Paste the tracking code and complete
                        the installation.
                      </li>
                    </ol>

                    <Typography>To find your Google Analytics tracking code, refer to this article.</Typography>
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
          
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GoogleAnalyticsInfo;
