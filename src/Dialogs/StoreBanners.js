/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { Box, Card, Grid, Dialog, DialogTitle, TextField, Typography, Button, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import AddIcon from '@mui/icons-material/Add';
import { UploadBanner } from '../components/upload';
import { fData } from '../utils/formatNumber';

import { updateStoreBanners } from '../actions';

const StoreBanners = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const { store } = useSelector((state) => state.store);

  const writeableBanners = store.banners.map((el) => ({ ...el }));

  const [banners, setBanners] = useState(store && writeableBanners ? writeableBanners : []);

  const addBanner = () => {
    setBanners((prev) => [
      ...prev,
      {
        index: uuidv4(),
        file: null,
        preview: null,
        link: null,
      },
    ]);
  };

  const removeBanner = (index) => {
    setBanners((prev) => prev.filter((el) => el.index !== index));
  };

  const updateBanner = (index, value, field) => {
    setBanners((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el[field] = value;
        return el;
      })
    );
  };

  const handleDropBanner = (acceptedFiles, index) => {
    const file = acceptedFiles[0];

    console.log(file);

    try {
      setBanners((prev) =>
        prev.map((el) => {
          if (el.index !== index) {
            return el;
          }
          el.file = file;
          el.preview = URL.createObjectURL(file);
          return el;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <div className="d-flex flex-row align-items-center justify-content-between">
          <DialogTitle>Store Banners</DialogTitle>
          <Stack sx={{ mr: 4 }} direction="row" alignItems="center">
            <LoadingButton
              loading={false}
              onClick={() => {
                dispatch(updateStoreBanners(banners, handleClose));
              }}
              variant="contained"
              className="me-4"
            >
              Save
            </LoadingButton>
            <Button onClick={handleClose} variant="outlined">
              Close
            </Button>
          </Stack>
        </div>
        <Box sx={{ p: 3 }}>
          {banners.map((el) => (
            <div key={el.index}>
              <Grid className="px-4 pt-3" container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Card sx={{ p: 3, mb: 2 }}>
                    <UploadBanner
                      required
                      name="avatarUrl"
                      accept="image/*"
                      maxSize={3145728}
                      onDrop={(files) => {
                        handleDropBanner(files, el.index);
                      }}
                      file={el.preview}
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
                          <br />
                          Preferred Resolution is 600 X 300 Px
                        </Typography>
                      }
                    />
                  </Card>
                </Grid>
              </Grid>
              <TextField
                sx={{ mb: 2 }}
                name="link"
                label="Link (OPTIONAL)"
                fullWidth
                value={el.link}
                onChange={(e) => {
                  updateBanner(el.index, e.target.value, 'link');
                }}
              />
              <Stack sx={{ px: 4 }} direction={'row'} alignItems="center" justifyContent={'end'}>
                <Button
                  size="small"
                  color="error"
                  onClick={() => {
                    removeBanner(el.index);
                  }}
                >
                  Remove
                </Button>
              </Stack>
            </div>
          ))}

          <Stack sx={{ mb: 3, mt: 2 }} direction={'row'} alignItems="center" justifyContent={'center'}>
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => {
                addBanner();
              }}
            >
              Add Banner
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
};

export default StoreBanners;
