// @mui
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent, Button } from '@mui/material';
import IllustrationDiscount from '../../../../assets/discount.png';

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

export default function DiscountWelcome() {
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
         Offer Lucrative
          <br /> Discounts with QwikShop!
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          You can easily boost your sales and get long term customers by providing valuable discounts on your offerings.
        </Typography>

        <Button variant="contained" to="#">
          See how this works
        </Button>
      </CardContent>

      <img style={{ maxWidth: '320px' }} src={IllustrationDiscount} alt={'Qwikshop illustration'} />
    </RootStyle>
  );
}
