import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Box, Container, Typography, Stack } from '@mui/material';
// routes
import { AndroidRounded } from '@mui/icons-material';
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/Iconify';
import { MotionContainer, varFade } from '../../components/animate';
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#212121',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left',
  },
}));

const HeroImgStyle = styled(m.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    right: '8%',
    width: 'auto',
    height: '48vh',
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <MotionContainer>
      <RootStyle>
        {isDesktop && (
          <HeroImgStyle
            alt="hero"
            src={'https://qwikshop.s3.ap-south-1.amazonaws.com/images/hero.png'}
            variants={varFade().inUp}
          />
        )}

        <Container>
          <ContentStyle>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ color: '#FFFFFF' }}>
                Start selling online <br />
                for free in
                <Typography component="span" variant="h2" sx={{ color: 'primary.main' }}>
                  &nbsp;India
                </Typography>
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography sx={{ color: '#ffffff' }}>
                The starting point for your next online business, QwikShop allows you to run your online business
                without techincal knowledge.
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              {/* <a style={{textDecoration: 'none'}} download="qwikshop" href="https://qwikshop.s3.ap-south-1.amazonaws.com/AppRevision/Android/app.apk" >
              <Button
                startIcon={<AndroidRounded width={20} height={20} />}
                size="large"
                variant="contained"
                // component={RouterLink}
                // to={PATH_AUTH.register}
                color={'primary'}
                // startIcon={<Iconify icon={'eva:flash-fill'} width={20} height={20} />}
              >
                Download App
              </Button>
              </a> */}

              <div className={!isDesktop && 'd-flex flex-row align-items-center justify-content-center'}>
                <a href="https://play.google.com/store/apps/details?id=online.qwikshop.bluemeet">
                  <img
                    style={{ maxWidth: '200px' }}
                    alt="Get it on Google Play"
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  />
                </a>
              </div>
            </m.div>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </MotionContainer>
  );
}
