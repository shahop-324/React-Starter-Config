import React from 'react';
import styled from 'styled-components';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

// @mui
import {
  Box,
  Card,
  Grid,
  Button,
  IconButton,
  Typography,
} from '@mui/material';

const CardSelector = styled.div`
  height: 210px;
  border: 1px solid #212121;
  border-radius: 20px;
`;

const CardPreview = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid #212121;
  border-radius: 20px;
`;

const GeneralWhatsAppStoryCardDesign = () => (
    <>
      <div>
        <Grid className="px-4" container spacing={3}>
          <Grid item xs={12} md={5}>
            <Typography variant="h6" className="mb-3">
              WhatsApp Story
            </Typography>
            <Card style={{ height: '74vh' }} sx={{ p: 3 }}>
              <Box
                style={{ overflowY: 'auto', height: '74vh', paddingBottom: '50px' }}
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                }}
              >
                <CardSelector />
                <CardSelector />
                <CardSelector />
                <CardSelector />
                <CardSelector />
                <CardSelector />
                <CardSelector />
                <CardSelector />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={7} className="d-flex flex-column align-items-center justify-content-center">
            <Card style={{ height: '60vh', width: '40vh' }} sx={{ p: 3 }}>
              {' '}
              <CardPreview />
            </Card>
            <div className="d-flex flex-row align-items-center justify-content-between my-3" style={{ width: '100%' }}>
              <IconButton>
                <ArrowBackIosNewRoundedIcon style={{ fontSize: '18px' }} />
              </IconButton>
              <Button variant="contained">Download</Button>
              <IconButton>
                <ArrowForwardIosRoundedIcon style={{ fontSize: '18px' }} />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );

export default GeneralWhatsAppStoryCardDesign;