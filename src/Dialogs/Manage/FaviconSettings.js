/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { Box, Card, Grid, Dialog, DialogTitle, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showSnackbar, updateStoreFavicon } from '../../actions';
import { FormProvider } from '../../components/hook-form';
import { UploadAvatar } from '../../components/upload';
// utils
import { fData } from '../../utils/formatNumber';

const FaviconSettings = ({ open, handleClose }) => {
  const { store } = useSelector((state) => state.store);
  const { isUpadtingFavicon } = useSelector((state) => state.store);
  const dispatch = useDispatch();
  const SEOSchema = Yup.object().shape({
    image: Yup.string().required('Image is required'),
  });

  const [file, setFile] = useState('');
  const [fileToPreview, setFileToPreview] = useState(store.favicon && `https://qwikshop.s3.ap-south-1.amazonaws.com/${store.favicon}`);

  const methods = useForm({
    resolver: yupResolver(SEOSchema),
  });

  const { handleSubmit } = methods;

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    setFile(file);
    try{
      setFileToPreview(URL.createObjectURL(file));
    }
    catch(error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    const formValues = {
      file,
    };

    if (!file) {
      dispatch(showSnackbar('warning', 'Please select an image to upload.'));
    } else {
      dispatch(updateStoreFavicon(file, handleClose));
    }

    console.log(formValues);
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Store Favicon</DialogTitle>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid className="px-4 pt-3" container spacing={3}>
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
                </Box>
              </Card>
            </Grid>
          </Grid>
          <div className="d-flex flex-row align-items-center justify-content-end py-3 px-4">
            <LoadingButton onClick={onSubmit} variant="contained" loading={isUpadtingFavicon}>
              Save
            </LoadingButton>
            <Button onClick={handleClose} className="ms-3">
              Close
            </Button>
          </div>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default FaviconSettings;
