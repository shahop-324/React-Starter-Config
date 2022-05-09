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

const WhatsAppChat = ({ open, handleClose }) => {
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
        <DialogTitle>{'WhatsApp Chat'}</DialogTitle>
        <DialogContent>
          <img
            src={
              'https://phantom-marca.unidadeditorial.es/056bedb69c1666468ed3645bc6629ebb/resize/1320/f/jpg/assets/multimedia/imagenes/2021/12/26/16405530859485.jpg'
            }
            style={{ height: '270px', width: '100%', objectFit: 'contain' }}
            alt={'WhatsApp Chat'}
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
              WhatsApp chat support plugin that provides a quick and easy way to interact with your customers. This
              plugin will allow your customers to send WhatsApp messages directly to you. By installing this, you can
              just add a click-to-chat WhatsApp button to your QwikShop store.
              <Typography>Features</Typography>
              <ol>
                <li>Provide WhatsApp chat support to customers</li>
                <li>Chat with customers in real-time and increase conversions</li>
              </ol>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography>Here's how you can start using WhatsApp Chat Support on your QwikShop store:</Typography>
              <ol>
                <li>Click on Install</li>
                <li>If there’s no number added, verify your WhatsApp number</li>
                <li>
                  Once Installed, your customers can see the WhatsApp button at the bottom of your store page to reach
                  out to you
                </li>
              </ol>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Is this plugin free to use?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Yes, this is free to use.</Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography>Can I turn this off at any time?</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Yes. Simply uninstall the plugin if you don’t want to enable WhatsApp support on your store.
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

export default WhatsAppChat;
