/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import EmailEditor from 'react-email-editor';
import { Dialog, AppBar, Toolbar, Typography, Slide, TextField, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
import template from '../../../../design.json';
import { addStorePage, updateStorePage } from '../../../../actions';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const DnDPageBuilder = ({ open, handleClose, isEdit, id }) => {
  const dispatch = useDispatch();

  const { pages } = useSelector((state) => state.page);

  let design;
  let page;

  if (isEdit) {
    page = pages.find((el) => el._id === id);

   let stringified = JSON.stringify(page.designJSON);
   stringified = stringified.replace(/&lt;/g, '<').replace(/&gt;/g, '>')

    design = JSON.parse(stringified);
    console.log(design);
  }

  const { isCreating, isUpdating } = useSelector((state) => state.page);

  const emailEditorRef = useRef(null);

  const [templateName, setTemplateName] = useState(isEdit && page?.name);

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;

    setTimeout(() => {
      const templateJson = template;
      if (design) {
        emailEditorRef.current.editor.loadDesign(design);
      } else {
        emailEditorRef.current.editor.loadDesign(templateJson);
      }
    }, 2000);
  };

  const onReady = () => {
    // editor is ready
    console.log('onReady');
  };

  const onSubmit = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { html, design } = data;

      const formValues = { name: templateName, html, type: 'dnd', designJSON: design, };

      if (isEdit) {
        dispatch(updateStorePage(formValues, id, handleClose));
      } else {
        dispatch(addStorePage(formValues, handleClose));
      }
    });
  };

  return (
    <>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative', backgroundColor: '#B4B4B4' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1, color: '#212121' }} variant="h6" component="div">
              {isEdit ? 'Edit Page' : 'Create Page'}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={3}>
              <TextField
                name="templateName"
                label="Template Name"
                sx={{ width: '250px' }}
                value={templateName}
                onChange={(e) => {
                  setTemplateName(e.target.value);
                }}
              />

<LoadingButton
                
                onClick={handleClose}
                variant="outlined"
                color="primary"
              >
                Close
              </LoadingButton>

              <LoadingButton
                loading={isEdit ? isUpdating : isCreating}
                onClick={onSubmit}
                variant="contained"
                color="primary"
              >
                Save as draft
              </LoadingButton>
            </Stack>
          </Toolbar>
        </AppBar>
        <div style={{ height: '80vh' }}>
          <EmailEditor
            projectId="47137"
            style={{ height: '93.2vh' }}
            ref={emailEditorRef}
            onLoad={onLoad}
            onReady={onReady}
          />
        </div>
      </Dialog>
    </>
  );
};

export default DnDPageBuilder;