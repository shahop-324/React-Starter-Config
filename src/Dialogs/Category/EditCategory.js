/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import * as Yup from 'yup';
import {useFormik} from 'formik';

import {
  Card,
  Grid,
  Dialog,
  DialogActions,
  TextField,
  Button,
  Typography,
  DialogTitle,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { UploadAvatar } from '../../components/upload';

// utils
import { fData } from '../../utils/formatNumber';
import { updateCategory } from '../../actions';

const EditCategory = ({ open, handleClose, id }) => {
  const { categories, isUpdating } = useSelector((state) => state.category);

  const category = categories.find((el) => el._id === id);

  const { name, image } = category;

  const formik = useFormik({
    initialValues: {
      categoryName: name,
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      categoryName: Yup.string().required('Category Name is required'),
    }),
    onSubmit: (values) => {
      dispatch(updateCategory(file.value, values.categoryName, id, handleClose));
    },
  });

  const dispatch = useDispatch();
  const [file, setFile] = useState({ error: false, message: 'Category Image is required', value: '' });
  const [fileToPreview, setFileToPreview] = useState(`https://qwikshop.s3.ap-south-1.amazonaws.com/${image}`);

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
        <DialogTitle>Edit Category</DialogTitle>
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
                  <TextField
                    value={formik.values.categoryName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    fullWidth
                    label="Category Name"
                    variant="outlined"
                    name="categoryName"
                    error={!!formik.touched.categoryName && !!formik.errors.categoryName}
                    helperText={formik.touched.categoryName && formik.errors.categoryName}
                    className="mt-4"
                  />
                </Card>
              </Grid>
            </Grid>
          </form>
        </div>
        <DialogActions>
          <LoadingButton
          onClick={()=> {
            if(formik.values.categoryName) {
              dispatch(updateCategory(file.value, formik.values.categoryName, id, handleClose));
            }
          }}
            disabled={!(formik.isValid)}
            type="submit"
            variant="contained"
            loading={isUpdating}
          >
            Update Category
          </LoadingButton>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditCategory;
