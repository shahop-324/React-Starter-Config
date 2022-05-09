/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';

// @mui
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent, IconButton } from '@mui/material';
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

import { SeoIllustration } from '../../../../assets';

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

AppWelcome.propTypes = {
  displayName: PropTypes.string,
};

export default function AppWelcome({ displayName, link, storeName }) {
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
          Welcome back,
          <br /> {!displayName ? '...' : displayName}!
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          Here's your store link, <br />{' '}
          <a target={'_blank'} rel="noreferrer" href={`//${link}`}>
            {link}
          </a>
        </Typography>

        

        <span>Share via</span>

        <Stack direction="row" spacing={2}>
          <WhatsappShareButton url={link} title={storeName} separator=":">
            {' '}
            <WhatsappIcon round size={35} />{' '}
          </WhatsappShareButton>

          <FacebookShareButton url={link} quote={storeName}>
            <FacebookIcon round size={35} />
          </FacebookShareButton>

          <TelegramShareButton url={link} title={storeName}>
            <TelegramIcon round size={35} />
          </TelegramShareButton>

          <TwitterShareButton url={link} title={storeName}>
            <TwitterIcon round size={35} />
          </TwitterShareButton>
        </Stack>

        {/* <Button variant="contained" to="#" component={RouterLink}>
          Go Now
        </Button> */}
      </CardContent>

      <SeoIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' },
        }}
      />
    </RootStyle>
  );
}
