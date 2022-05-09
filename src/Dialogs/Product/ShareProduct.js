/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogTitle, IconButton, Stack, Button, DialogActions, Tooltip } from '@mui/material';

import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { showSnackbar } from '../../actions';

const ShareProduct = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const product = products.find((el) => el._id === id);

  const { productName, _id } = product;

  const { store } = useSelector((state) => state.store);

  const link = `qwikshop.online/${store.subName}/product/${_id}`;

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Share product</DialogTitle>

        <Stack direction={'row'} alignItems="center" justifyContent="center" spacing={2}>
          <Tooltip title="WhatsApp">
            <WhatsappShareButton
              url={link}
              title={
                store.shareProductMessage
                  ? store.shareProductMessage
                      .replace(/{{storeName}}/g, store.storeName)
                      .replace(/{{storeLink}}/g, `qwikshop.online/${store.subName}`)
                      .replace(/{{productName}}/g, productName)
                      .replace(/{{productLink}}/g, link)
                  : productName
              }
              separator=":"
            >
              {' '}
              <WhatsappIcon round size={35} />{' '}
            </WhatsappShareButton>
          </Tooltip>
          <Tooltip title="Facebook">
            <FacebookShareButton
              url={link}
              quote={
                store.shareProductMessage
                  ? store.shareProductMessage
                      .replace(/{{storeName}}/g, store.storeName)
                      .replace(/{{storeLink}}/g, `qwikshop.online/${store.subName}`)
                      .replace(/{{productName}}/g, productName)
                      .replace(/{{productLink}}/g, link)
                  : productName
              }
            >
              <FacebookIcon round size={35} />
            </FacebookShareButton>
          </Tooltip>
          <Tooltip title="Telegram">
            <TelegramShareButton
              url={link}
              title={
                store.shareProductMessage
                  ? store.shareProductMessage
                      .replace(/{{storeName}}/g, store.storeName)
                      .replace(/{{storeLink}}/g, `qwikshop.online/${store.subName}`)
                      .replace(/{{productName}}/g, productName)
                      .replace(/{{productLink}}/g, link)
                  : productName
              }
            >
              <TelegramIcon round size={35} />
            </TelegramShareButton>
          </Tooltip>
          <Tooltip title="Twitter">
            <TwitterShareButton
              url={link}
              title={
                store.shareProductMessage
                  ? store.shareProductMessage
                      .replace(/{{storeName}}/g, store.storeName)
                      .replace(/{{storeLink}}/g, `qwikshop.online/${store.subName}`)
                      .replace(/{{productName}}/g, productName)
                      .replace(/{{productLink}}/g, link)
                  : productName
              }
            >
              <TwitterIcon round size={35} />
            </TwitterShareButton>
          </Tooltip>
          <Tooltip title="Copy Link">
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(link).then(
                  () => {
                    console.log('Async: Copying to clipboard was successful!');
                    dispatch(showSnackbar('success', 'Copied to clipboard!'));
                  },
                  (err) => {
                    console.error('Async: Could not copy text: ', err);
                    dispatch(showSnackbar('error', 'Failed to copy to clipboard!'));
                  }
                );
              }}
            >
              <ContentCopy />
            </IconButton>
          </Tooltip>
        </Stack>

        <DialogActions>
          <Button
            variant="outlined"
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

export default ShareProduct;
