/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
// @mui
import {
  Card,
  Grid,
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Typography,
  DialogActions,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateShareMessages } from '../actions';

const ShareMessage = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { store, isUpadtingShareMessage } = useSelector((state) => state.store);
  const [shareStoreMessage, setShareStoreMessage] = useState(store.shareStoreMessage);
  const [shareProductMessage, setShareProductMessage] = useState(store.shareProductMessage);
  const [shareCategoryMessage, setShareCategoryMessage] = useState(store.shareCategoryMessage);
  const [shareSubCategoryMessage, setShareSubCategoryMessage] = useState(store.shareSubCategoryMessage);

  const onSubmit = () => {
    const formValues = {
      shareStoreMessage,
      shareProductMessage,
      shareCategoryMessage,
      shareSubCategoryMessage,
    };

    dispatch(updateShareMessages(formValues, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <div className="d-flex flex-row align-items-center justify-content-between mx-3">
          <DialogTitle className="me-3">Customise Share Message</DialogTitle>
        </div>
        <Grid className="px-4 pt-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }} className="mb-4">
              <Typography variant="subtitle2" className="mb-3">
                Share Store Message
              </Typography>

              <TextField
                sx={{ my: 4 }}
                multiline
                helperText={
                  'Please use these legends for customization: {{storeName}} = Name of your store, {{storeLink}} = Link of your store'
                }
                name="shareStoreMessage"
                label="Share Store Message"
                fullWidth
                value={shareStoreMessage}
                onChange={(e) => {
                  setShareStoreMessage(e.target.value);
                }}
              />

              <Typography variant="subtitle1">Examples:</Typography>

              <Typography sx={{ my: 2 }} variant="body2">
                Check our online store at {'{{storeLink}}'}. Browse our products and place your first order Today -{' '}
                {'{{storeLink}}'}.
              </Typography>

              <Typography sx={{ my: 2 }} variant="body2">
                Our Sstore {'{{storeName}}'} is now available online. Visit us at {'{{storeLink}}'}. Place your first
                order today.
              </Typography>

              <Typography sx={{ my: 2 }} variant="body2">
                Your favourite store {'{{storeName}}'} is now available online. Visit our digital store at{' '}
                {'{{storeLink}}'} and order your favourite products. Hurry Up!
              </Typography>
            </Card>

            <Card sx={{ p: 3 }} className="mb-4">
              <Typography variant="subtitle2" className="mb-3">
                Share Product Message
              </Typography>

              <TextField
                sx={{ my: 4 }}
                multiline
                helperText={
                  'Please use these legends for customization: {{storeName}} = Name of your store, {{storeLink}} = Link of your store, {{productName}} = Name of product, {{productLink}} = Link to shared product'
                }
                name="shareProductMessage"
                label="Share Product Message"
                fullWidth
                value={shareProductMessage}
                onChange={(e) => {
                  setShareProductMessage(e.target.value);
                }}
              />

              <Typography variant="subtitle1">Examples:</Typography>

              <Typography sx={{ my: 2 }} variant="body2">
                Order {'{{productName}}'} from our store {'{{storeName}}'} and enjoy discounts, hassle free delivery and
                quality assured products. Visit {'{{productLink}}'}
              </Typography>

              <Typography sx={{ my: 2 }} variant="body2">
                You can now order {'{{productName}}'} from our store {'{{storeName}}'} online. Enjoy ordering from
                comfort of your home. Order Today at {'{{productLink}}'}
              </Typography>
              <Typography sx={{ my: 2 }} variant="body2">
                Have you seen this new product {'{{productName}}'} in our online store. Order Today before it goes out
                of stock. Place your order by Visiting {'{{productLink}}'}
              </Typography>
            </Card>

            <Card sx={{ p: 3 }} className="mb-4">
              <Typography variant="subtitle2" className="mb-3">
                Share Category Message
              </Typography>

              <TextField
                sx={{ my: 4 }}
                multiline
                helperText={
                  'Please use these legends for customization: {{storeName}} = Name of your store, {{storeLink}} = Link of your store, {{categoryName}} = Name of shared category, {{categoryLink}} = Link to shared category'
                }
                name="shareCategoryMessage"
                label="Your Custom Message"
                fullWidth
                value={shareCategoryMessage}
                onChange={(e) => {
                  setShareCategoryMessage(e.target.value);
                }}
              />

              <Typography variant="subtitle1">Examples:</Typography>

              <Typography sx={{ my: 2 }} variant="body2">
                Browse products in {'{{categoryName}}'} at our online store {'{{storeName}}'} and place your order
                Today. Visit {'{{storeLink}}'} to place your order.
              </Typography>

              <Typography sx={{ my: 2 }} variant="body2">
                Just opened a super deal on {'{{categoryName}}'} at Our online store {'{{storeName}}'}. Visit{' '}
                {'{{storeLink}}'} and place your order before this deal goes out.
              </Typography>
              <Typography sx={{ my: 2 }} variant="body2">
                Visit our online store {'{{storeName}}'} to view all of your favourite products in {'{{categoryName}}'}.
                Don't wait anymore, Visit {'{{storeLink}}'} and place your first order Today.
              </Typography>
            </Card>

            <Card sx={{ p: 3 }} className="mb-4">
              <Typography variant="subtitle2" className="mb-3">
                Share Sub Category Message
              </Typography>

              <TextField
                sx={{ my: 4 }}
                multiline
                helperText={
                  'Please use these legends for customization: {{storeName}} = Name of your store, {{storeLink}} = Link of your store, {{subCategoryName}} = Name of shared Sub Category, {{subCategoryLink}} = Link to shared Sub Category'
                }
                name="shareCategoryMessage"
                label="Your Custom Message"
                fullWidth
                value={shareSubCategoryMessage}
                onChange={(e) => {
                  setShareSubCategoryMessage(e.target.value);
                }}
              />

              <Typography variant="subtitle1">Examples:</Typography>

              <Typography sx={{ my: 2 }} variant="body2">
                Browse products in {'{{subCategoryName}}'} at our online store {'{{storeName}}'} and place your order
                Today. Visit {'{{storeLink}}'} to place your order.
              </Typography>

              <Typography sx={{ my: 2 }} variant="body2">
                Just opened a super deal on {'{{subCategoryName}}'} at Our online store {'{{storeName}}'}. Visit{' '}
                {'{{storeLink}}'} and place your order before this deal goes out.
              </Typography>
              <Typography sx={{ my: 2 }} variant="body2">
                Visit our online store {'{{storeName}}'} to view all of your favourite products in{' '}
                {'{{subCategoryName}}'}. Don't wait anymore, Visit {'{{storeLink}}'} and place your first order Today.
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <DialogActions>
          <LoadingButton onClick={onSubmit} loading={isUpadtingShareMessage} variant="contained" className="me-3">
            Save
          </LoadingButton>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShareMessage;
