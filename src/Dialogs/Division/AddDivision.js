/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import {
  Box,
  Card,
  Grid,
  Dialog,
  DialogActions,
  TextField,
  Autocomplete,
  Button,
  Typography,
  DialogTitle,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { UploadAvatar } from '../../components/upload';

// utils
import { fData } from '../../utils/formatNumber';
import { createDivision, fetchSubCategory } from '../../actions';

const AddDivision = ({ open, handleClose }) => {
  useEffect(() => {
    dispatch(fetchSubCategory());
  }, []);

  const formik = useFormik({
    initialValues: {
      divisionName: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      divisionName: Yup.string().required('Division Name is required'),
    }),
    onSubmit: (values) => {
      dispatch(createDivision(file.value, values.divisionName, subCategory, handleClose));
    },
  });

  const { subCategories } = useSelector((state) => state.subCategory);
  const dispatch = useDispatch();
  const { isCreating } = useSelector((state) => state.division);
  const [file, setFile] = useState({ error: false, message: 'Division Image is required', value: '' });
  const [fileToPreview, setFileToPreview] = useState();
  const [subCategory, setSubCategory] = useState();

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    console.log(file);
    setFile((prev) => {
      prev.value = file;
      return prev;
    });
    try{
      setFileToPreview(URL.createObjectURL(file));
    }
    catch(error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <DialogTitle>Add Division</DialogTitle>
        <div className="p-4">
          <form onSubmit={formik.handleSubmit}>
            <Grid className="px-4 pt-3" container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <UploadAvatar
                    required
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
                  <Autocomplete
                    required
                    sx={{ mt: 3 }}
                    value={subCategory}
                    onChange={(e, value) => {
                      setSubCategory(value);
                    }}
                    id=""
                    fullWidth
                    options={subCategories.map((el) => ({
                      label: el.name,
                      image: el.image,
                      value: el._id,
                    }))}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                          loading="lazy"
                          width="20"
                          src={`https://qwikshop.s3.ap-south-1.amazonaws.com/${option.image}`}
                          srcSet={`https://qwikshop.s3.ap-south-1.amazonaws.com/${option.image} 2x`}
                          alt=""
                        />
                        {option.label}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...params}
                        label="Choose a Sub Category"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: '', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                  <TextField
                    value={formik.values.divisionName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    fullWidth
                    label="Division Name"
                    variant="outlined"
                    name="divisionName"
                    error={!!formik.touched.divisionName && !!formik.errors.divisionName}
                    helperText={formik.touched.divisionName && formik.errors.divisionName}
                    className="mt-4"
                  />
                </Card>
              </Grid>
            </Grid>
            <DialogActions>
              <LoadingButton
                disabled={!(formik.isValid)}
                type="submit"
                variant="contained"
                loading={isCreating}
              >
                Create Division
              </LoadingButton>
              <Button
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default AddDivision;
