/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// @mui
import { Box, Card, Grid, Dialog, DialogTitle, TextField, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { UploadAvatar } from '../components/upload';
// utils
import { fData } from '../utils/formatNumber';
import { updateStoreSEO } from '../actions';

const SEOSettings = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { store, isUpdatingStoreSEO } = useSelector((state) => state.store);

  const formik = useFormik({
    initialValues: {
      seoTitle: store.seoTitle,
      seoMetaDescription: store.seoMetaDescription,
      seoMetaKeywords: store.seoMetaKeywords,
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      seoTitle: Yup.string().required('SEO Title is required'),
      seoMetaDescription: Yup.string().required('Meta Description is required'),
      seoMetaKeywords: Yup.string().required('Meta Keywords is required'),
    }),
    onSubmit: (values) => {
      const formValues = {
        seoTitle: values.seoTitle,
        seoMetaDescription: values.seoMetaDescription,
        seoMetaKeywords: values.seoMetaKeywords,
      };

      dispatch(updateStoreSEO(formValues, file, handleClose));
    },
  });

  const [file, setFile] = useState('');
  const [fileToPreview, setFileToPreview] = useState(
    store.seoImagePreview && `https://qwikshop.s3.ap-south-1.amazonaws.com/${store.seoImagePreview}`
  );

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

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Store SEO</DialogTitle>

        <form onSubmit={formik.handleSubmit}>
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
                  <TextField
                    value={formik.values.seoTitle}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    fullWidth
                    label="Meta Title"
                    variant="outlined"
                    name="seoTitle"
                    error={!!formik.touched.seoTitle && !!formik.errors.seoTitle}
                    helperText={formik.touched.seoTitle && formik.errors.seoTitle}
                  />
                  <TextField
                    value={formik.values.seoMetaDescription}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    fullWidth
                    label="Meta Description"
                    variant="outlined"
                    name="seoMetaDescription"
                    error={!!formik.touched.seoMetaDescription && !!formik.errors.seoMetaDescription}
                    helperText={formik.touched.seoMetaDescription && formik.errors.seoMetaDescription}
                  />
                  <TextField
                    value={formik.values.seoMetaKeywords}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    fullWidth
                    label="Meta Keywords"
                    variant="outlined"
                    name="seoMetaKeywords"
                    error={!!formik.touched.seoMetaKeywords && !!formik.errors.seoMetaKeywords}
                    helperText={formik.touched.seoMetaKeywords && formik.errors.seoMetaKeywords}
                  />
                  <Typography>Social sharing image preview</Typography>

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
            <LoadingButton
              disabled={!(formik.isValid)}
              type="submit"
              loading={isUpdatingStoreSEO}
              variant="contained"
            >
              Save
            </LoadingButton>
            <Button onClick={handleClose} className="ms-3">
              Close
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default SEOSettings;
