// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography } from '@mui/material';
// components
import LanguageIcon from '@mui/icons-material/Language';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import BoltIcon from '@mui/icons-material/Bolt';
import CategoryIcon from '@mui/icons-material/Category';
import LocalShippingRounded from '@mui/icons-material/LocalShippingRounded';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneAndroidRounded from '@mui/icons-material/PhoneAndroidRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';
import { MotionInView, varFade } from '../../components/animate';
import Image from '../../components/Image';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_design.svg',
    title: 'Custom Marketing',
    description:
      'Using Qwikshop you can send custom marketing SMS and emails to your customers, which is a proven way to increase your sales by 65%.',
  },
  {
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_code.svg',
    title: 'Unique Themes',
    description:
      'Get your Business a theme which suits it Best. Zevi Gives you the power to choose your theme based on your type of Business.',
  },
  {
    isIcon: true,
    icon: (
      <LanguageIcon
        sx={{
          mb: 10,
          mx: 'auto',
          width: 40,
          height: 40,
          color: "#C661CA"
        }}
      />
    ),
    title: 'Custom Domain & Email',
    description: 'Get your own Custom domain and Business Email for free when you upgrade to Zevi Premium.',
  },
  {
    isIcon: true,
    icon: (
      <CurrencyRupeeIcon
        sx={{
          mb: 10,
          mx: 'auto',
          width: 40,
          height: 40,
          color: "#7961CA"
        }}
      />
    ),
    title: 'Online Payments',
    description: 'You can accept payments online using Upi, Wallet, Debit/Credit card and Netbanking on Zevi. Zevi Supports 100+ Payment methods so you cannot missout on any possible order.',
  },
  {

    isIcon: true,
    icon: (
      <BoltIcon
        sx={{
          mb: 10,
          mx: 'auto',
          width: 40,
          height: 40,
          color: "#BE6817"
        }}
      />
    ),
    title: 'Integrations',
    description: 'You can use various plugins which are available to you on Zevi that will enable you to run efficient marketing campaigns and derive more sales for your business.',
  },
  {
    isIcon: true,
    icon: (
      <CategoryIcon sx={{
        mb: 10,
        mx: 'auto',
        width: 40,
        height: 40,
        color: "#74A12C"
      }} />
    ),
    title: 'Product Catalouge',
    description: 'Create, Update, Share and manage Unlimited products with High Quality Product Graphics, Variants and much more.',
  },
  {
    isIcon: true,
    icon: (
      <LocalShippingRounded sx={{
        mb: 10,
        mx: 'auto',
        width: 40,
        height: 40,
        color: "#212EDF"
      }} />
    ),
    title: 'Delivery',
    description: 'You can make use of Delivery service provided by Zevi for shipping your orders or you can also ship them on your own and manage from dashboard.',
  },
  {
    isIcon: true,
    icon: (
      <MonetizationOnIcon sx={{
        mb: 10,
        mx: 'auto',
        width: 40,
        height: 40,
        color: "#07B42D"
      }} />
    ),
    title: 'Super cash',
    description: 'Reward your customers for making purchase from you by giving them Super cash which can be redeemed to place further orders.',
  },
  {
    
    isIcon: true,
    icon: (
      <LocalOfferIcon sx={{
        mb: 10,
        mx: 'auto',
        width: 40,
        height: 40,
        color: "#D3D03D"
      }} />
    ),
    title: 'Discount Coupons',
    description: 'Create and manage Discount Coupons based on your business Requirement and control them at your will on a simple tap',
  },
  {
    isIcon: true,
    icon: (
      <PeopleIcon sx={{
        mb: 10,
        mx: 'auto',
        width: 40,
        height: 40,
        color: "#007B86"
      }} />
    ),
    title: 'Referral',
    description: 'You can assign people to bring more customers to your site and give them comissions, this can be easily done from Zevi Dashboard.',
  },
  {
    icon: (
      <RateReviewIcon sx={{
        mb: 10,
        mx: 'auto',
        width: 40,
        height: 40,
        color: "#A961CA"
      }} />
    ),
    isIcon: true,
    title: 'Reviews & Questions',
    description: 'Allow your customers to tell what they like, dislike or what you can improve upon. Your customers can also ask questions before making a purchase.',
  },
  {
    isIcon: true,
    icon: (
      <ShoppingCartIcon sx={{mb: 10, mx: 'auto', width: 40, height: 40, color: "#CAC361"}} />
    ),
    title: 'Variant Based Pricing',
    description: 'You can sell various products based on Variants and quantity. You can create your pricing structure easily from Zevi Dashboard.',
  },
  {
    isIcon: true,
    icon: (
      <WebRoundedIcon sx={{mb: 10, mx: 'auto', width: 40, height: 40, color: "#CA6161"}} />
    ),
    title: 'Website Builder',
    description: 'Build your own custom pages based on season, your business type and needs using simple and powerful drag and drop builder.',
  },
  {
    isIcon: true,
    icon: (
      <RemoveShoppingCartRoundedIcon sx={{mb: 10, mx: 'auto', width: 40, height: 40, color: "#20278B"}} />
    ),
    title: 'Abandoned Cart',
    description: 'You can send your customers offers to place an order by checking abondoned carts and can recover lot of hidden revenue fro your business.',
  },
  {
    isIcon: true,
    icon: (
      <PhoneAndroidRounded sx={{mb: 10, mx: 'auto', width: 40, height: 40, color: "#8BCA61"}} />
    ),
    title: 'Mobile APK',
    description: 'Get your personlaised Android Mobile App And get it hosted on Google play Store for free.',
  },
];

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15),
  },
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    border: 0,
    maxWidth: 380,
    minHeight: 440,
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(10, 5, 0),
    boxShadow: theme.customShadows.z12,
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    '&.cardLeft': {
      [theme.breakpoints.up('md')]: { marginTop: -40 },
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: Number(theme.shape.borderRadius) * 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`,
        },
      },
    },
  };
});

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle id="features" className='fatures'>
      <Container>
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 10, md: 25 },
          }}
        >
          <MotionInView variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
              Zevi
            </Typography>
          </MotionInView>
          <MotionInView variants={varFade().inDown}>
            <Typography variant="h2">Features to fuel your Business</Typography>
          </MotionInView>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 5, lg: 10 },
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          {CARDS.map((card, index) => (
            <MotionInView variants={varFade().inUp} key={card.title}>
              <CardStyle className={(index === 0 && 'cardLeft') || (index === 1 && 'cardCenter') || ''}>
                {card.isIcon ? (
                  card.icon
                ) : (
                  <Image
                    src={card.icon}
                    alt={card.title}
                    sx={{
                      mb: 10,
                      mx: 'auto',
                      width: 40,
                      height: 40,
                      filter: (theme) => shadowIcon(theme.palette.primary.main),
                      ...(index === 0 && {
                        filter: (theme) => shadowIcon(theme.palette.info.main),
                      }),
                      ...(index === 1 && {
                        filter: (theme) => shadowIcon(theme.palette.error.main),
                      }),
                    }}
                  />
                )}

                <Typography variant="h5" paragraph>
                  {card.title}
                </Typography>
                <Typography sx={{ color: isLight ? 'text.secondary' : 'common.white' }}>{card.description}</Typography>
              </CardStyle>
            </MotionInView>
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
