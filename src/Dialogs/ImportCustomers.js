/* eslint-disable react/prop-types */
import React from 'react';
import {
  Card,
  Grid,
  Dialog,
  Button,
  Typography,
} from '@mui/material';

import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { styled } from '@mui/material/styles';
// routes
// components
import {  FormProvider,  RHFUploadSingleFile } from '../components/hook-form';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const ImportCustomers = ({ open, handleClose }) => {
 

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().min(1000).required('Content is required'),
    cover: Yup.mixed().required('Cover is required'),
  });

  const defaultValues = {
    title: '',
    description: '',
    content: '',
    cover: null,
    tags: ['Logan'],
    publish: true,
    comments: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ['Logan'],
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
   
  
   
    handleSubmit,
    
  } = methods;

  

  const onSubmit = async () => {};

  const handleDrop = () => {
    
  };
  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                <div>
                  <LabelStyle>Import Customer via Excel / CSV</LabelStyle>
                  <RHFUploadSingleFile name="cover" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
                  <div className='my-3'>
                  <Typography  variant='p1'>Note: Download File format (<a href='#'>Click here</a>)</Typography>
                  </div>

                  <div className='d-flex flex-row align-items-center justify-content-end'>
                      <Button variant='contained'>Add customers</Button>
                      <Button onClick={() => {handleClose()}} className='ms-3'>Cancel</Button>
                  </div>
                  
                </div>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default ImportCustomers;
