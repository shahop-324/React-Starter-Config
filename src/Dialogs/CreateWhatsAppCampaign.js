/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import PhoneInput from 'react-phone-number-input';
import MUIStyled from 'styled-components';

// eslint-disable-next-line react/prop-types

// Phone Input
import 'react-phone-number-input/style.css';

// @mui
import {
  Box,
  Card,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  Autocomplete,
  Button,
  Divider,
  Typography,
  Checkbox,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CustomPhoneNumber from '../forms/PhoneNumber';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MessageBox = MUIStyled.div`
border: ${(props) => (props && props.active ? '1px solid #2065D1' : '1px solid #cecece')};
border-radius: 12px;
padding: 15px 12px;
margin-bottom: 15px;
`;

const PreviewCard = MUIStyled.div`
border: 1px solid #2065D1;
border-radius: 12px;
padding: 15px 12px;
margin-bottom: 15px;
`;

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['Enter Campaign Name', 'Select Message', 'Select Audience', 'Preview & Test Campaign', 'Pay and launch'];

const CreateWhatsAppCampaign = ({ open, handleClose }) => {
  const [campaignName, setCampaignName] = useState('');

  const [discountCode, setDiscountCode] = useState('');

  const [selectedMessage, setSelectedMessage] = useState(0);

  const [activeStep, setActiveStep] = useState(0);

  const [customerCategory, setCustomerCategory] = useState();

  const [customCustomers, setCustomCustomers] = useState();

  const [phone, setPhone] = useState('');

  const handleNext = () => {
    setActiveStep((prev) => {
      if (prev * 1 <= 3) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handlePrevious = () => {
    setActiveStep((prev) => {
      if (prev * 1 >= 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} className="pt-4 pb-5">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {(() => {
          switch (activeStep * 1) {
            case 0:
              return (
                <Grid className="px-4 py-3" container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                      <TextField
                        name="campaignName"
                        label="Campaign Name"
                        fullWidth
                        value={campaignName}
                        onChange={(e) => {
                          setCampaignName(e.target.value);
                        }}
                      />
                    </Card>
                  </Grid>
                </Grid>
              );

            case 1:
              return (
                <Grid className="px-4 py-3" container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                      <FormControl>
                        <FormLabel className="mb-4" id="demo-radio-buttons-group-label">
                          Select Message
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue={selectedMessage}
                          name="radio-buttons-group"
                        >
                          <MessageBox active={selectedMessage === 0}>
                            <FormControlLabel
                              value={0}
                              control={
                                <Radio
                                  onClick={() => {
                                    setSelectedMessage(0);
                                  }}
                                />
                              }
                              label={
                                <Typography variant="body2">
                                  Staying in? No problem. Get delicious fresh chicken, meats, and fish delivered to your
                                  doorstep. Order now at <a href="#">qwikshop.online/unclestore</a>
                                </Typography>
                              }
                            />
                          </MessageBox>
                          <MessageBox active={selectedMessage === 1}>
                            <FormControlLabel
                              value={1}
                              control={
                                <Radio
                                  onClick={() => {
                                    setSelectedMessage(1);
                                  }}
                                />
                              }
                              label={
                                <Typography variant="body2">
                                  Get 100% fresh and best quality meat at unbeliveable price right at your doorstep.
                                  Order now at <a href="#">qwikshop.online/unclestore</a>
                                </Typography>
                              }
                            />
                          </MessageBox>
                          <MessageBox active={selectedMessage === 2}>
                            <FormControlLabel
                              value={2}
                              control={
                                <Radio
                                  onClick={() => {
                                    setSelectedMessage(2);
                                  }}
                                />
                              }
                              label={
                                <Typography variant="body2">
                                  Our end of season sale starts today, Get 15% OFF on selected categories. Grab it
                                  before its gone at <a href="#">qwikshop.online/unclestore</a>
                                </Typography>
                              }
                            />
                          </MessageBox>
                          <MessageBox active={selectedMessage === 3}>
                            <FormControlLabel
                              value={3}
                              control={
                                <Radio
                                  onClick={() => {
                                    setSelectedMessage(3);
                                  }}
                                />
                              }
                              label={
                                <Typography variant="body2">
                                  Our end of season sale starts today, Get 15% OFF on selected categories. Grab it
                                  before its gone at <a href="#">qwikshop.online/unclestore</a>
                                </Typography>
                              }
                            />
                          </MessageBox>
                          <MessageBox active={selectedMessage === 4}>
                            <FormControlLabel
                              value={4}
                              control={
                                <Radio
                                  onClick={() => {
                                    setSelectedMessage(4);
                                  }}
                                />
                              }
                              label={
                                <Typography variant="body2">
                                  Our end of season sale starts today, Get 15% OFF on selected categories. Grab it
                                  before its gone at <a href="#">qwikshop.online/unclestore</a>
                                </Typography>
                              }
                            />
                          </MessageBox>
                          <MessageBox active={selectedMessage === 5}>
                            <FormControlLabel
                              value={5}
                              control={
                                <Radio
                                  onClick={() => {
                                    setSelectedMessage(5);
                                  }}
                                />
                              }
                              label={
                                <Typography variant="body2">
                                  Our end of season sale starts today, Get 15% OFF on selected categories. Grab it
                                  before its gone at <a href="#">qwikshop.online/unclestore</a>
                                </Typography>
                              }
                            />
                          </MessageBox>
                          <MessageBox active={selectedMessage === 6}>
                            <FormControlLabel
                              value={6}
                              control={
                                <Radio
                                  onClick={() => {
                                    setSelectedMessage(6);
                                  }}
                                />
                              }
                              label={
                                <Typography variant="body2">
                                  Our end of season sale starts today, Get 15% OFF on selected categories. Grab it
                                  before its gone at <a href="#">qwikshop.online/unclestore</a>
                                </Typography>
                              }
                            />
                          </MessageBox>
                          <MessageBox active={selectedMessage === 7}>
                            <FormControlLabel
                              value={7}
                              control={
                                <Radio
                                  onClick={() => {
                                    setSelectedMessage(7);
                                  }}
                                />
                              }
                              label={
                                <Typography variant="body2">
                                  Our end of season sale starts today, Get 15% OFF on selected categories. Grab it
                                  before its gone at <a href="#">qwikshop.online/unclestore</a>
                                </Typography>
                              }
                            />
                          </MessageBox>
                          <MessageBox active={selectedMessage === 8}>
                            <FormControlLabel
                              value={8}
                              control={
                                <Radio
                                  onClick={() => {
                                    setSelectedMessage(8);
                                  }}
                                />
                              }
                              label={
                                <Typography variant="body2">
                                  Our end of season sale starts today, Get 15% OFF on selected categories. Grab it
                                  before its gone at <a href="#">qwikshop.online/unclestore</a>
                                </Typography>
                              }
                            />
                          </MessageBox>
                          <MessageBox active={selectedMessage === 9}>
                            <FormControlLabel
                              value={9}
                              control={
                                <Radio
                                  onClick={() => {
                                    setSelectedMessage(9);
                                  }}
                                />
                              }
                              label={
                                <Typography variant="body2">
                                  Our end of season sale starts today, Get 15% OFF on selected categories. Grab it
                                  before its gone at <a href="#">qwikshop.online/unclestore</a>
                                </Typography>
                              }
                            />
                          </MessageBox>
                          <MessageBox active={selectedMessage === 10}>
                            <FormControlLabel
                              value={10}
                              control={
                                <Radio
                                  onClick={() => {
                                    setSelectedMessage(10);
                                  }}
                                />
                              }
                              label={
                                <Typography variant="body2">
                                  Our end of season sale starts today, Get 15% OFF on selected categories. Grab it
                                  before its gone at <a href="#">qwikshop.online/unclestore</a>
                                </Typography>
                              }
                            />
                          </MessageBox>
                          <MessageBox active={selectedMessage === 11}>
                            <FormControlLabel
                              value={11}
                              control={
                                <Radio
                                  onClick={() => {
                                    setSelectedMessage(11);
                                  }}
                                />
                              }
                              label={
                                <Typography variant="body2">
                                  Our end of season sale starts today, Get 15% OFF on selected categories. Grab it
                                  before its gone at <a href="#">qwikshop.online/unclestore</a>
                                </Typography>
                              }
                            />
                          </MessageBox>
                        </RadioGroup>
                      </FormControl>
                    </Card>
                  </Grid>
                </Grid>
              );

            case 2:
              return (
                <Grid className="px-4 py-3" container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: 'grid',
                          columnGap: 2,
                          rowGap: 3,
                          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                        }}
                      >
                        <Autocomplete
                          value={customerCategory}
                          onChange={(e, value) => {
                            setCustomerCategory(value);
                          }}
                          id=""
                          fullWidth
                          options={customerOptions}
                          autoHighlight
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Choose customers"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: '', // disable autocomplete and autofill
                              }}
                            />
                          )}
                        />
                        {customerCategory?.label === 'Custom customers' && (
                          <Autocomplete
                            multiple
                            value={customCustomers}
                            onChange={(e, value) => {
                              setCustomCustomers(value);
                            }}
                            id=""
                            fullWidth
                            options={customerList}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            renderOption={(props, option, { selected }) => (
                              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                <li {...props}>
                                  <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                  />
                                  <Stack direction={'column'} spacing={2}>
                                    <Typography variant="subtitle1">
                                      {option.label} ({option.mobile})
                                    </Typography>{' '}
                                    <Typography variant="subtitle2">
                                      {' '}
                                      Total orders:{'  '}
                                      {option.totalOrders}
                                    </Typography>{' '}
                                    <Typography variant="subtitle2">
                                      Total Sales(Rs.): {option.totalSales} <br />{' '}
                                    </Typography>
                                    <Typography variant="caption"> City: {option.city} </Typography>
                                  </Stack>
                                </li>
                              </Box>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Choose customers"
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: '', // disable autocomplete and autofill
                                }}
                              />
                            )}
                          />
                        )}
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              );

            case 3:
              return (
                <Grid className="px-4 py-3" container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                      <Typography variant="subtitle2" className="mb-4">
                        Campaign Preview
                      </Typography>
                      <PreviewCard className="mb-4">
                        <Typography variant="h6" className="mb-3">
                          Mega Sale
                        </Typography>
                        <Typography variant="body2">
                          Our end of season sale starts today, Get 15% OFF on selected categories. Grab it before its
                          gone at <a href="#">qwikshop.online/unclestore</a>
                        </Typography>
                      </PreviewCard>
                      <Typography variant="subtitle2" className="mb-3">
                        Test by sending message
                      </Typography>
                      <Box
                        sx={{
                          display: 'grid',
                          columnGap: 2,
                          rowGap: 3,
                          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '3fr 1fr' },
                        }}
                      >
                        <PhoneInput
                          name="phoneNumber"
                          placeholder="Test phone number"
                          value={phone}
                          onChange={setPhone}
                          inputComponent={CustomPhoneNumber}
                          defaultCountry="IN"
                        />
                        <Button size="small">Send Test Message</Button>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              );

            case 4:
              return (
                <Grid className="px-4 py-3" container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: 'grid',
                          columnGap: 2,
                          rowGap: 3,
                          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '3fr 1fr' },
                        }}
                      >
                        <TextField
                          name="discount"
                          label="Discount Code"
                          fullWidth
                          value={discountCode}
                          onChange={(e) => {
                            setDiscountCode(e.target.value);
                          }}
                        />
                        <Button size="small">Apply Discount</Button>
                      </Box>
                      <Divider className="my-4" />
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant="body2">Campaign Charges:</Typography>
                        <Typography variant="subtitle1">Rs. 435 /-</Typography>
                      </Stack>
                      <Divider className="my-4" />
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant="body2">Discount:</Typography>
                        <Typography variant="subtitle1">Rs. 45 /-</Typography>
                      </Stack>

                      <div
                        style={{ width: '100%', height: '10px', borderBottom: '1px dashed #212121' }}
                        className="my-4"
                      >
                        {' '}
                      </div>
                      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant="h6">Total Payable</Typography>
                        <Typography variant="subtitle1">Rs. 390 /-</Typography>
                      </Stack>
                    </Card>
                  </Grid>
                </Grid>
              );

            default:
              break;
          }
        })()}

        <Stack direction="row" spacing={3} justifyContent={'end'} alignItems={'center'} className="px-4 py-4">
          {activeStep * 1 !== 0 && (
            <Button
              onClick={() => {
                handlePrevious();
              }}
              variant="outlined"
            >
              Previous
            </Button>
          )}
          {activeStep * 1 !== 4 && (
            <Button
              onClick={() => {
                handleNext();
              }}
              variant="contained"
            >
              Next
            </Button>
          )}

          {activeStep * 1 === 4 && <Button variant="contained">Pay and Launch</Button>}

          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};

export default CreateWhatsAppCampaign;

const customerOptions = [
  { label: 'All customers' },
  { label: 'New customers' },
  { label: 'Returning Customers' },
  { label: 'Abondened customers' },
  { label: 'No sales customers' },
  { label: 'Imported customers' },
  { label: 'Custom customers' },
];

const customerList = [
  {
    label: 'Shreyansh shah',
    mobile: '+91 9770668454',
    city: 'Gwalior',
    totalOrders: 45,
    totalSales: 32889,
  },
  {
    label: 'Prabal Jain',
    mobile: '+91 8399339019',
    city: 'Gwalior',
    totalOrders: 39,
    totalSales: 45839,
  },
  {
    label: 'Harsh Mishra',
    mobile: '+91 8827919033',
    city: 'Gwalior',
    totalOrders: 300,
    totalSales: 489391,
  },
  {
    label: 'Dinesh shah',
    mobile: '+91 8103032829',
    city: 'Gwalior',
    totalOrders: 50,
    totalSales: 490450,
  },
  {
    label: 'Suresh shah',
    mobile: '+91 99199374891',
    city: 'Dubai',
    totalOrders: 45,
    totalSales: 389399,
  },
  {
    label: 'Jyoti shah',
    mobile: '+91 9929839290',
    city: 'Mumbai',
    totalOrders: 3992,
    totalSales: 39020019,
  },
];
