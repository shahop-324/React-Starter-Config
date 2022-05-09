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
import { fetchCategory, updateSubCategory } from '../../actions';

const EditSubCategory = ({ open, handleClose, id }) => {
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  const { subCategories, isUpdating } = useSelector((state) => state.subCategory);
  const { categories } = useSelector((state) => state.category);

  const subCategory = subCategories.find((el) => el._id === id);

  const { name, image } = subCategory;

  const formik = useFormik({
    initialValues: {
      subCategoryName: name,
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      subCategoryName: Yup.string().required('Sub Category Name is required'),
    }),
    onSubmit: (values) => {
      dispatch(updateSubCategory(file.value, values.subCategoryName, category, id, handleClose));
    },
  });

  const dispatch = useDispatch();
  const [file, setFile] = useState({ error: false, message: 'Sub Category Image is required', value: '' });
  const [fileToPreview, setFileToPreview] = useState(`https://qwikshop.s3.ap-south-1.amazonaws.com/${image}`);
  const [category, setCategory] = useState(subCategory.category);

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
        <DialogTitle>Edit Sub Category</DialogTitle>
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
                    value={category}
                    onChange={(e, value) => {
                      setCategory(value);
                    }}
                    id=""
                    fullWidth
                    options={categories.map((el) => ({
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
                        label="Choose a Category"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: '', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                  <TextField
                    value={formik.values.subCategoryName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    fullWidth
                    label="Sub Category Name"
                    variant="outlined"
                    name="subCategoryName"
                    error={!!formik.touched.subCategoryName && !!formik.errors.subCategoryName}
                    helperText={formik.touched.subCategoryName && formik.errors.subCategoryName}
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
                loading={isUpdating}
              >
                Update Sub Category
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

export default EditSubCategory;
