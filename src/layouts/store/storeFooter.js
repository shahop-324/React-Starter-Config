import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Link, Divider, Container, Typography, Stack } from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
// components
import Logo from '../../assets/QwikShop_logo.png';
import SocialsButton from '../../components/SocialsButton';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Platform',
    children: [
      { name: 'Business Tools', href: '#' },
      { name: 'QwikSpots', href: '#' },
      { name: 'QwikShop for PC', href: '#' },
      { name: 'QwikShop Mobile', href: '#' },
      { name: 'QwikSeller', href: '#' },
      { name: 'QwikShop Integrations', href: '#' },
    ],
  },
  {
    headline: 'Company',
    children: [
      { name: 'About us', href: PATH_PAGE.about },
      { name: 'Contact us', href: PATH_PAGE.contact },
      { name: 'FAQs', href: PATH_PAGE.faqs },
      { name: 'Blog', href: PATH_PAGE.faqs },
      { name: 'Help Center', href: PATH_PAGE.faqs },
      { name: 'Careers', href: PATH_PAGE.faqs },
      { name: 'Media & Press', href: PATH_PAGE.faqs },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Return & Refund Policy', href: '#' },
    ],
  },
  
  {
    headline: 'Contact',
    children: [
      { name: 'support@qwikshop.online', href: '#' },
      { name: 'EE 738 DEEN DAYAL NAGAR, GWALIOR, MP, 474020', href: '#' },
    ],
  },
  
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function StoreFooter() {
  return (
    <RootStyle>
      <Divider />
      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={12} sx={{ mb: 3, alignItems: { sx: 'center', md: 'left' }, justifyContent: {sx: "center", md: "left"} }}>
            <img src={Logo} alt="brand" style={{ height: '80px' }} />
          </Grid>
          <Grid item xs={8} md={3}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              Place where commerce happens and Businesses turns global with minimal efforts and absolutely zero charges.
              If you haven't already then take your business online today with QwikShop.
            </Typography>
            <Stack
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
            >
              <SocialsButton sx={{ mx: 0.5 }} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack spacing={5} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between">
              {LINKS.map((list) => (
                <Stack key={list.headline} spacing={2}>
                  <Typography component="p" variant="overline">
                    {list.headline}
                  </Typography>
                  {list.children.map((link) => (
                    <Link
                      to={link.href}
                      key={link.name}
                      color="inherit"
                      variant="body2"
                      component={RouterLink}
                      sx={{ display: 'block' }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          component="p"
          variant="body2"
          sx={{
            mt: 10,
            pb: 5,
            fontSize: 13,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          © 2022. All rights reserved
        </Typography>
      </Container>
    </RootStyle>
  );
}
