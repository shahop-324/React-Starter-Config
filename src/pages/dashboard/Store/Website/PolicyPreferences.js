/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Typography, Switch, FormControlLabel, Stack, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FlashAutoRoundedIcon from '@mui/icons-material/FlashAutoRounded';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import {
  resetIsUpdatingPolicyPerefernce,
  resetIsGeneratingPolicy,
  autoGeneratePolicies,
  updatePolicyPreference,
} from '../../../../actions';

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
  ({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  })
);

const PolicyPreferences = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetIsUpdatingPolicyPerefernce());
    dispatch(resetIsGeneratingPolicy());
  }, []);

  const { store, isUpdatingPolicyPreference, isGeneratingPolicy } = useSelector((state) => state.store);

  const [showTerms, setShowTerms] = useState(store.showTerms);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(store.showPrivacyPolicy);
  const [showShippingPolicy, setShowShippingPolicy] = useState(store.showShippingPolicy);
  const [showReturnPolicy, setShowReturnPolicy] = useState(store.showReturnPolicy);
  const [showDisclaimerPolicy, setShowDisclaimerPolicy] = useState(store.showDisclaimerPolicy);

  return (
    <div>
      <div style={{ width: '100%' }} className="d-flex flex-row align-items-center justify-content-end mb-3">
      <LoadingButton
            loading={isGeneratingPolicy}
            onClick={() => {
              dispatch(autoGeneratePolicies());
            }}
            sx={{ mr: 2 }}
            variant="outlined"
            startIcon={<FlashAutoRoundedIcon />}
          >
            Auto generate policies
          </LoadingButton>
        <a
          style={{ textDecoration: 'none' }}
          href={`https://qwikshop.online/${store.subName}`}
          target="_blank"
          rel="noreferrer"
        >
          
          <Button variant="outlined" startIcon={<RemoveRedEyeIcon />}>
            Preview
          </Button>
        </a>
      </div>
      <Stack direction="row" alignItems="center" justifyContent="start">
        <Typography sx={{ mr: 36, fontSize: '15px' }} variant="subtitle2">
          Show Terms
        </Typography>
        <FormControlLabel
          control={
            <IOSSwitch
              checked={showTerms}
              onChange={(e) => {
                setShowTerms(e.target.checked);
              }}
            />
          }
          label=""
        />
      </Stack>
      <Divider sx={{ my: 3 }} />
      <Stack direction="row" alignItems="center" justifyContent="start">
        <Typography sx={{ mr: 30, fontSize: '15px' }} variant="subtitle2">
          Show Privacy Policy
        </Typography>

        <FormControlLabel
          control={
            <IOSSwitch
              checked={showPrivacyPolicy}
              onChange={(e) => {
                setShowPrivacyPolicy(e.target.checked);
              }}
            />
          }
          label=""
        />
      </Stack>
      <Divider sx={{ my: 3 }} />
      <Stack direction="row" alignItems="center" justifyContent="start">
        <Typography sx={{ mr: 22, fontSize: '15px' }} variant="subtitle2">
          Show Return & Refund Policy
        </Typography>

        <FormControlLabel
          control={
            <IOSSwitch
              checked={showReturnPolicy}
              onChange={(e) => {
                setShowReturnPolicy(e.target.checked);
              }}
            />
          }
          label=""
        />
      </Stack>
      <Divider sx={{ my: 3 }} />
      <Stack direction="row" alignItems="center" justifyContent="start">
        <Typography sx={{ mr: 29, fontSize: '15px' }} variant="subtitle2">
          Show Shipping policy
        </Typography>

        <FormControlLabel
          control={
            <IOSSwitch
              checked={showShippingPolicy}
              onChange={(e) => {
                setShowShippingPolicy(e.target.checked);
              }}
            />
          }
          label=""
        />
      </Stack>
      <Divider sx={{ my: 3 }} />
      <Stack direction="row" alignItems="center" justifyContent="start">
        <Typography sx={{ mr: 33, fontSize: '15px' }} variant="subtitle2">
          Disclaimer Policy
        </Typography>

        <FormControlLabel
          control={
            <IOSSwitch
              checked={showDisclaimerPolicy}
              onChange={(e) => {
                setShowDisclaimerPolicy(e.target.checked);
              }}
            />
          }
          label=""
        />
      </Stack>

      <Stack direction={'row'} alignItems="center" justifyContent={'end'}>
        <LoadingButton
          loading={isUpdatingPolicyPreference}
          onClick={() => {
            dispatch(
              updatePolicyPreference({
                showTerms,
                showDisclaimerPolicy,
                showPrivacyPolicy,
                showReturnPolicy,
                showShippingPolicy,
              })
            );
          }}
          variant="contained"
          sx={{ maxWidth: 'max-content' }}
        >
          Update Policy Preference
        </LoadingButton>
      </Stack>
    </div>
  );
};

export default PolicyPreferences;
