// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography, } from '@mui/material';

// components
import Page from '../components/Page';
// sections

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));


// ----------------------------------------------------------------------

export default function Pricing() {
  return (
    <Page title="Pricing">
      <RootStyle>
        <Container>
          <Typography variant="h3" align="center" paragraph>
            Flexible plans for your
            <br /> Business&apos;s size and needs
          </Typography>
          <Typography align="center" sx={{ color: 'text.secondary' }}>
            Choose your plan and experience modern online Ecommerce 
          </Typography>

          <Box sx={{ my: 5 }}>
            {/* {} */}
          </Box>

          <Grid container spacing={3} sx={{my:5}}>
           
          </Grid>
          
        </Container>
       
      </RootStyle>
    </Page>
  );
}
