/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import {
  Box,
  Card,
  Grid,
  Dialog,
  Button,
  DialogTitle,
  Typography,
  DialogActions,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider } from '../components/hook-form';
// utils
import { fData } from '../utils/formatNumber';

// eslint-disable-next-line react/prop-types

// Phone Input
import 'react-phone-number-input/style.css';
import { UploadAvatar } from '../components/upload';

const StoreImage = ({ open, handleClose, handleOpenStoreCreated }) => {
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('country is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role Number is required'),
    avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
    phoneNumber: Yup.string().required('Phone number is required'),
    category: Yup.string().required('Category is required'),
    landmark: Yup.string().required('Landmark is required'),
    pincode: Yup.string().required('Pincode is required'),
  });

  const [image, setImage] = useState();
  const [fileToPreview, setFileToPreview] = useState();

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    const formValues = {
      image,
    };

    console.log(formValues);
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(file);
    setImage(file);
    try{
      setFileToPreview(URL.createObjectURL(file));
    }
    catch(error) {
      console.log(error);
    }
    
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Store Image</DialogTitle>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid className="px-4 pt-3" container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ py: 10, px: 3 }}>
                <Typography className="mb-4 text-center" variant="h6">
                  Image
                </Typography>
                <Box sx={{ mb: 5 }}>
                  <UploadAvatar
                    name="avatarUrl"
                    accept="image/*"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    file={fileToPreview}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.secondary',
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                        <br /> max size of {fData(3145728)}
                      </Typography>
                    }
                  />
                </Box>
              </Card>
            </Grid>
          </Grid>
          <DialogActions>
            <LoadingButton
              onClick={() => {
                onSubmit();
                handleClose();
                handleOpenStoreCreated();
              }}
              type="submit"
              variant="contained"
              loading={false}
            >
              Finish <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
            </LoadingButton>
            <Button
              onClick={() => {
                  handleClose();
                handleOpenStoreCreated();
              }}
            >
              Skip
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default StoreImage;
