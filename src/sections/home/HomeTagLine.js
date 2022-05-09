import React from 'react';
import { Card, Container, Box, Typography } from '@mui/material';

const HomeTagLine = () => (
  <>
    <Container>
      <Box
        sx={{
          textAlign: 'center',
          mt: 10,
        }}
      >
        <Card sx={{ p: 4 }}>
          {/*  */}
          <Typography variant="h4" sx={{ mb: 4 }}>
           Just follow 3 easy Steps
          </Typography>
          <Typography variant="subtitle1" color="primary">
            QwikShop is very easy to setup and start your online business
          </Typography>
        </Card>
      </Box>
    </Container>
  </>
);

export default HomeTagLine;
