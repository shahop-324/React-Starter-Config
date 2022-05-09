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

const GoogleSearchConsoleInfo = ({ open, handleClose }) => {
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
        <DialogTitle>{'Google Search Console'}</DialogTitle>
        <DialogContent>
          <img
            src={'https://www.captivatedesigns.com/wp-content/uploads/2020/08/google-search-console-guide-01.jpg'}
            style={{ height: '270px', width: '100%', objectFit: 'contain' }}
            alt={'Google Search Console'}
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
            Google Search Console (previously known as Google Webmaster Tools) is a free service provided by Google. It allows you to monitor your site’s Google search presence. By using Google Search Console, you can gain insights into why your site is performing well (or poorly) in Google’s eyes.  

<Typography>Features</Typography>
<ul>
  <li>Learn about the keywords that your website and its pages rank for</li>
  <li>Measure total clicks, total impressions, average CTR (click-through rate), and average position of pages</li>
  <li>See where each page of your site ranks for specific keywords on Google</li>
  <li>Submit pages that haven’t yet been indexed by Google</li>
  <li>Links report shows you which sites have linked back to yours</li>
</ul>

            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography>Step 1: Add your website address</Typography>
              <ol>
                <li>Sign in to your Google Search Console account.</li>
                <li>Click on the Menu icon and then click on Add Property.</li>
                <li>Under the Domain section, enter your website address and click on Continue.</li>
                <li>Now, click on the COPY button to copy the copy for verification.</li>
              </ol>
              <Typography>Step 2: Verify your website</Typography>
              After you’ve copied the code, follow the next steps:
              <ol>
                <li>Install the Plugin and paste the code.</li>
                <li>Click the Connect button to finish the verification.</li>
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
                    Google Search Console is a free service offered by Google that helps you monitor, maintain, and troubleshoot your site's presence in Google Search results.
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
                    <Typography>Do I need a Google Search Console account to use this?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    Yes, you will need a Google Search Console account to verify your website.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                    <Typography>Who should use Google Search Console?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                    Anyone with a website should use Google Search Console. If you’re a business owner, SEO specialist, Site administrator, or web developer, Google Search Console helps you optimize your website for search engines.
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

export default GoogleSearchConsoleInfo;
