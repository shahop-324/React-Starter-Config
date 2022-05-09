// @mui
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent, Button } from '@mui/material';
import { MotivationIllustration } from '../../../../assets';

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

MarketingWelcome.propTypes = {

};

export default function MarketingWelcome() {
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
          Grow your online shop with one click marketing campaign  
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 880, mx: 'auto' }}>
          Reach your customers where they are listening to you on SMS, WhatsApp, Google and Facebook. Promote your business and drive more traffic and orders for your online business with QwikShop.
        </Typography>
       
        <Button variant="contained" to="#">
          See how it works
        </Button>
      </CardContent>

      <MotivationIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' },
        }}
      />
    </RootStyle>
  );
}