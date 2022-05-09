/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import EmailEditor from 'react-email-editor';
import { Dialog, AppBar, Toolbar, Typography, Slide, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
import template from '../../design.json';
import { updateEmailCampaign } from '../../actions';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const DesignEmailCampaign = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const { campaigns } = useSelector((state) => state.marketing);

  const campaign = campaigns.find((el) => el._id === id);

  let stringified = JSON.stringify(campaign.design);
  if (stringified) {
    stringified = stringified?.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  }

  let design;

  if (stringified) {
    design = JSON.parse(stringified);
  }

  const emailEditorRef = useRef(null);

  const [campaignName] = useState(campaign?.name);

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

      const formValues = { html, design };

      dispatch(updateEmailCampaign(formValues, id, handleClose));
    });
  };

  return (
    <>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative', backgroundColor: '#212121' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {campaignName}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={3}>
              <LoadingButton onClick={onSubmit} variant="contained" color="primary">
                Save
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

export default DesignEmailCampaign;
