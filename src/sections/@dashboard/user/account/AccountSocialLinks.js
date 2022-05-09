/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { FormProvider } from '../../../../components/hook-form';
import { updateSocialLinks } from '../../../../actions';

AccountSocialLinks.propTypes = {
  myProfile: PropTypes.shape({
    facebookLink: PropTypes.string,
    instagramLink: PropTypes.string,
    linkedinLink: PropTypes.string,
    twitterLink: PropTypes.string,
  }),
};

export default function AccountSocialLinks() {
  const dispatch = useDispatch();
  const { store, isUpdatingSocialLinks } = useSelector((state) => state.store);
  const { user } = useSelector((state) => state.user);

  const defaultValues = {
    facebookLink: user.facebookLink,
    instagramLink: user.instagramLink,
    twitterLink: user.twitterLink,
  };

  const [facebookLink, setFacebookLink] = useState(store.facebookLink);
  const [instagramLink, setInstagramLink] = useState(store.instagramLink);
  const [twitterLink, setTwitterLink] = useState(store.twitterLink);
  const [youtubeLink, setYoutubeLink] = useState(store.youtubeLink);

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    console.log(facebookLink, instagramLink, twitterLink);
    dispatch(updateSocialLinks({ facebookLink, instagramLink, twitterLink, youtubeLink }));
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <TextField
            name="facebook"
            label="Facebook"
            fullWidth
            value={facebookLink}
            onChange={(e) => {
              setFacebookLink(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <FacebookOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="instagram"
            label="Instagram"
            fullWidth
            value={instagramLink}
            onChange={(e) => {
              setInstagramLink(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <InstagramIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="twitter"
            label="Twitter"
            fullWidth
            value={twitterLink}
            onChange={(e) => {
              setTwitterLink(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <TwitterIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="youtube"
            label="Youtube"
            fullWidth
            value={youtubeLink}
            onChange={(e) => {
              setYoutubeLink(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <YouTubeIcon />
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton type="submit" variant="contained" loading={isUpdatingSocialLinks}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
