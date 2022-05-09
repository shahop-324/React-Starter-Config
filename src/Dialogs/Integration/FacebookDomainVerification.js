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

const FacebookDomainVerificationInfo = ({ open, handleClose }) => {
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
        <DialogTitle>{'Facebook Domain Verification'}</DialogTitle>
        <DialogContent>
          <img
            src={'https://cloudfront-us-east-1.images.arcpublishing.com/gray/JAFYWIBSNJC4PNGYCNQHOZFJQQ.png'}
            style={{ height: '270px', width: '100%', objectFit: 'contain' }}
            alt={'Facebook Domain Verification'}
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
                Domain Verification is the process of telling Facebook that you own the website. You just need to enter
                the code to your website and Facebook will use that to verify. Once it’s verified, you can associate
                your Facebook page with your verified domain so that Facebook knows it’s okay for that page to edit link
                previews from that website.
              </Typography>
              <Typography>Features</Typography>
              <ol>
                <li>Manage ad links edit permissions</li>
                <li>Manage organic link editing permissions</li>
                <li>Sell on Facebook Commerce surfaces as a business</li>
              </ol>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography>Here's how you can start using Facebook Domain Verification:</Typography>
              <ol>
                <li>Log in to your Facebook Business Manager Account</li>
                <li>Click on Setting</li>
                <li>Click on Brand Safety and then select Domains</li>
                <li>Now click on Add and paste your website address</li>
                <li>Copy the meta tag</li>
                <li>Install the plugin and paste the meta tag. Click on Connect to finish.</li>
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
                      Domain Verification is important for anyone who owns a website and wants to control the appearance
                      of their link previews when they publish to Facebook. If not done, you won’t be able to customize
                      the thumbnail image, or edit the title or link description when sharing links from your own
                      website.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography>Is this plugin free to use?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Yes, this is a completely free plugin.</Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                    <Typography>Do I need a Facebook Business Manager account to use this?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Yes, you will need a Facebook Business Manager account to verify your website.
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

export default FacebookDomainVerificationInfo;
