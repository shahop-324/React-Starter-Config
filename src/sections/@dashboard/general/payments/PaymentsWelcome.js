// @mui
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent, Button } from '@mui/material';
import IllustrationPayments from '../../../../assets/illustration_payments.png';

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
         Hassle free 1 day money settlement to your Bank Account
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 880, mx: 'auto' }}>
          Get your payments transferred directly to your bank account after 24 hours of Refund period or delivery.
        </Typography>
       
        <Button variant="contained" to="#">
          See how it works
        </Button>
      </CardContent>
      <img style={{ maxWidth: '320px' }} src={IllustrationPayments} alt={'Payments illustration'} />
    </RootStyle>
  );
}