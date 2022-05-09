/* eslint-disable no-unused-vars */
import React from 'react';
// @mui
import { Box, Card, Grid, Dialog, DialogTitle, DialogActions, TextField, Autocomplete } from '@mui/material';

import CreditScoreRoundedIcon from '@mui/icons-material/CreditScoreRounded';
import ViewCarouselRoundedIcon from '@mui/icons-material/ViewCarouselRounded';
import WhatsappRoundedIcon from '@mui/icons-material/WhatsappRounded';
import { GeneralWidgetSummary } from '../sections/@dashboard/general/analytics';

// eslint-disable-next-line react/prop-types
const MarketingDesignOptions = ({ open, handleClose }) => {
  const redirectToBusinessCardDesign = () => {
    window.location.href = `/dashboard/design/business-card`;
  };

  const redirectToStoreBannerDesign = () => {
    window.location.href = `/dashboard/design/store-banner`;
  };

  const redirectToWhatsAppBusinessStoryDesign = () => {
    window.location.href = `/dashboard/design/whatsapp-story`;
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Select Design Category</DialogTitle>

        <Grid className="px-4 pt-3 mb-4" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                }}
              >
                <GeneralWidgetSummary
                  title="Create"
                  action={redirectToBusinessCardDesign}
                  total={'Business Card'}
                  icon={<CreditScoreRoundedIcon />}
                  color={'info'}
                />
                <GeneralWidgetSummary
                  title="Create"
                  action={redirectToStoreBannerDesign}
                  total={'Store Banners'}
                  icon={<ViewCarouselRoundedIcon />}
                  color={'error'}
                />
                <GeneralWidgetSummary
                  title="Create"
                  action={redirectToWhatsAppBusinessStoryDesign}
                  total={'WhatsApp Story'}
                  icon={<WhatsappRoundedIcon />}
                  color={'success'}
                />
                
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default MarketingDesignOptions;