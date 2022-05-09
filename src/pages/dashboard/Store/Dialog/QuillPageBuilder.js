/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Dialog, DialogTitle, Stack, Grid, Card, Typography, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import Editor from '../../../../components/editor';
import { addStorePage, updateStorePage } from '../../../../actions';

const QuillPageBuilder = ({ open, handleClose, isEdit, id }) => {
  const dispatch = useDispatch();

  const { isCreatingPage, isUpdatingPage, pages } = useSelector((state) => state.page);

  const page = pages.find((el) => el._id === id);

  const [templateName, setTemplateName] = useState(isEdit && page.name);
  const [html, setHtml] = useState(isEdit && page.html.replace(/&lt;/g, '<').replace(/&gt;/g, '>'));

  const onSubmit = () => {
    const formValues = { name: templateName, html, type: 'quill' };

    if (isEdit) {
      dispatch(updateStorePage(formValues, id, handleClose));
    } else {
      dispatch(addStorePage(formValues, handleClose));
    }
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <DialogTitle>{isEdit ? 'Edit Page' : 'Create Page'}</DialogTitle>
        <Grid className="px-4 pt-3" container spacing={3} sx={{ mb: 2 }}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Typography className="mb-3" variant="subtitle1">
                Page Name
              </Typography>
              <TextField
                name="templateName"
                label="Template name"
                fullWidth
                value={templateName}
                onChange={(e) => {
                  setTemplateName(e.target.value);
                }}
              />
            </Card>
          </Grid>
        </Grid>
        <Grid className="px-4 pt-3" container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Typography className="mb-3" variant="subtitle1">
                Page Content
              </Typography>
              <Editor
                value={html}
                onChange={(value) => {
                  setHtml(value);
                }}
              />
            </Card>
          </Grid>
        </Grid>

        <Stack spacing={3} direction="row" alignItems="center" justifyContent="end" sx={{ px: 4, py: 3 }}>
        <LoadingButton onClick={handleClose} variant="outlined">
           Close
          </LoadingButton>
          <LoadingButton loading={isEdit ? isCreatingPage : isUpdatingPage} onClick={onSubmit} variant="contained">
            Save & Publish
          </LoadingButton>
        </Stack>
      </Dialog>
    </>
  );
};

export default QuillPageBuilder;