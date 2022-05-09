// @mui
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent, Button } from '@mui/material';
import { OrderCompleteIllustration } from '../../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------

ManageWelcome.propTypes = {

};

export default function ManageWelcome() {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800',
        }}
      >
        <Typography gutterBottom variant="h4">
          Manage your shop like pro dukaandar
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 880, mx: 'auto' }}>
          You can setup store timings, manage other charges on orders, create store QR, Easily generate and share invoice and also create eye-catching designs for marketing your online business.
        </Typography>
       
        <Button variant="contained" to="#">
          See how it works
        </Button>
      </CardContent>

      <OrderCompleteIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' },
        }}
      />
    </RootStyle>
  );
}