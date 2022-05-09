import LocalShippingRounded from '@mui/icons-material/LocalShippingRounded';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';

import LocationOnIcon from '@mui/icons-material/LocationOn';

// @mui
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent, Button } from '@mui/material';
import IllustrationDelivery from '../../../../assets/illustration_delivery.svg';

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

export default function DeliveryOverview() {
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
          Deliver with
          <br /> QwikShop!
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          Deliver all over India and International with QwikShop delivery!
        </Typography>

       

        <div className="d-flex flex-row align-items-center mb-3">
          <div className="d-flex flex-row align-items-center">
            <LocationOnIcon />
            <div className="ms-3">
              {' '}
              <b>29,000+</b> <br /> Pincodes{' '}
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mx-5">
            <LocalShippingRounded />
            <div className="ms-3">
              {' '}
              <b>Starting from</b> <br /> Rs. 29{' '}
            </div>
          </div>

          <div className="d-flex flex-row align-items-center">
            <BoltOutlinedIcon />
            <div className="ms-3">
              {' '}
              <b>1 day</b> <br /> Payout{' '}
            </div>
          </div>
        </div>

       

        <Button variant="contained" to="#">
          Know more
        </Button>
      </CardContent>

      <img style={{ maxWidth: '320px' }} src={IllustrationDelivery} alt={'Qwikshop illustration'} />
    </RootStyle>
  );
}
