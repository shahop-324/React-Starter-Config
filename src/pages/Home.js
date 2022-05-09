// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Container, Stack } from '@mui/material';
import HomeTagLine from '../sections/home/HomeTagLine';
// components
import Page from '../components/Page';
// sections
import {
  HomeHero,
  HomeDarkMode,
  HomeColorPresets,
  HomeAdvertisement,
  HomeCleanInterfaces,
  HomeHugePackElements,
  Carousel,
  HomeMinimal,
} from '../sections/home';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="Enable users to find what they want in the most natural and efficient way">
      <RootStyle>
        <HomeHero />
        {/* <ContentStyle> */}
          {/* BRING ONLINE */}

          {/* // ? SHOW THEM MOBILE APP AND HOOK THEM HERE => CLEAR MSG TO INSTALL VIA LINK OR QR CODE => ASK FOR MOBILE NUMBER TO SEND APP LINK => Say, Manage your Business on Mobile */}

          {/* <HomeTagLine /> */}

          {/* START YOUR BUSINESS IN 3 EASY STEPS */}

          {/* STEP 1 => Sign up => CTA */}
          {/* <HomeHugePackElements /> */}

          {/* STEP 2 => Add Store Details => CTA */}
          {/* <HomeDarkMode /> */}

          {/* STEP 3 => Add Products & start selling => CTA */}
          {/* <HomeColorPresets /> */}

          {/* <HomeCleanInterfaces /> */}

          {/* <Box sx={{ my: 3 }}>
            <Container>
              <Stack direction="row" alignItems="center" justifyContent="center">
                <Typography variant="h3">Easiest and powerful way to sell online</Typography>
              </Stack>
            </Container>

            <Carousel />
          </Box> */}

          {/* <HomeMinimal id="features" /> */}

          {/* // TODO RUN ANY KIND OF BUSINESS => SLICK CAROUSEL => AUTO PLAY */}

          {/* // TODO EVERYTHING YOU NEED TO SCALE AND MAINTAIN => FEATURE CARDS => CTA */}

          {/* <HomePricingPlans /> */}

          {/* SIGN UP TODAY => CTA */}
          {/* <HomeAdvertisement /> */}
        {/* </ContentStyle> */}
        {/* FOOTER => DONE IN LAYOUT */}
      </RootStyle>
    </Page>
  );
}
