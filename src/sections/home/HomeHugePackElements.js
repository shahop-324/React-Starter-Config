import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Button, Container, Typography } from '@mui/material';
// routes
// components
import Image from '../../components/Image';
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0,
  },
}));






// ----------------------------------------------------------------------

export default function HomeHugePackElements() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const isDesktop = useResponsive('up', 'md');

  return (
    <RootStyle>
      <Container>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <ContentStyle>
              <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
                STEP 1
              </Typography>

              <Typography variant="h2" sx={{ mb: 3 }}>
                Launch your <br />
               Store 
              </Typography>

              <Typography
                sx={{
                  mb: 5,
                  color: isLight ? 'text.secondary' : 'common.white',
                }}
              >
                Zevi has everything you need to create, manage and run your online business smoothly and
                effortlessly.
              </Typography>

              <Button size="large" color="primary" variant="contained" component={RouterLink} to={'/auth/register'}>
                Start My Business Today
              </Button>
            </ContentStyle>
          </Grid>

          <Grid item xs={12} md={8} dir="ltr">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                justifyContent: 'center',
              }}
            >
              <Image sx={{ height: isDesktop ? '400px' : '200px' }} disabledEffect alt={`screen ${0 + 1}`} src={'https://qwikshop.s3.ap-south-1.amazonaws.com/images/create-store.png'} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
