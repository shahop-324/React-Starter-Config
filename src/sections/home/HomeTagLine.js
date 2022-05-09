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
          Enable users to find what they want in the most natural and efficient way
          </Typography>
        </Card>
      </Box>
    </Container>
  </>
);

export default HomeTagLine;
