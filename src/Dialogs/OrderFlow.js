/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
// @mui
import {
  Card,
  Grid,
  Dialog,
  DialogTitle,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  DialogActions,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import FilterFramesRoundedIcon from '@mui/icons-material/FilterFramesRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import { DeliveryDiningRounded, DiningRounded, } from '@mui/icons-material';
import { updateOrderFlow } from '../actions';

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

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

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
    1: <FilterFramesRoundedIcon />,
    2: <ScheduleRoundedIcon />,
    3: <LocalShippingRoundedIcon />,
    4: <DeliveryDiningRounded />,
    5: <CheckCircleRoundedIcon />,
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

function RestaurantColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <FilterFramesRoundedIcon />,
    2: <DiningRounded />,
    3: <DeliveryDiningRounded />,
    4: <CheckCircleRoundedIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

RestaurantColorlibStepIcon.propTypes = {
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

const steps = ['Waiting for acceptance', 'Preparing for shipment', 'Shipped', 'Out for Delivery', 'Delivered'];

const restaurantSteps = ['Waiting for acceptance', 'Accepted & Preparing', 'Out for Delivery', 'Delivered'];

const OrderFlow = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { store, isUpadtingOrderFlow } = useSelector((state) => state.store);
  const [orderFlow, setOrderFlow] = useState(store.orderFlow);

  const onSubmit = () => {
    dispatch(updateOrderFlow(orderFlow, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <div className="d-flex flex-row align-items-center justify-content-between mx-3">
          <DialogTitle className="me-3">Choose Order Flow</DialogTitle>
        </div>
        <Grid className="px-4 pt-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <FormControl sx={{ width: '100%' }}>
              <RadioGroup
                sx={{ width: '100%' }}
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                <Card sx={{ p: 3, width: '100%' }} className="mb-4">
                  <FormControlLabel
                    value="regular"
                    control={
                      <Radio
                        onClick={() => {
                          setOrderFlow('regular');
                        }}
                        checked={orderFlow === 'regular'}
                      />
                    }
                    label="Regular"
                  />
                  <Stepper alternativeLabel activeStep={2} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Card>

                <Card sx={{ p: 3, width: '100%' }} className="mb-4">
                  <FormControlLabel
                    value="restaurant"
                    control={
                      <Radio
                        onClick={() => {
                          setOrderFlow('restaurant');
                        }}
                        checked={orderFlow === 'restaurant'}
                      />
                    }
                    label="Restaurant"
                  />
                  <Stepper alternativeLabel activeStep={2} connector={<ColorlibConnector />}>
                    {restaurantSteps.map((label) => (
                      <Step key={label}>
                        <StepLabel StepIconComponent={RestaurantColorlibStepIcon}>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Card>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <DialogActions>
          <LoadingButton onClick={onSubmit} loading={isUpadtingOrderFlow} variant="contained" className="me-3">
            Save
          </LoadingButton>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderFlow;
