// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography, } from '@mui/material';

// components
import Page from '../components/Page';
// sections
import { PricingPlanCard } from '../sections/pricing';

import Monthly from "../assets/Monthly.png";
import Yearly from "../assets/Yearly.png";
import Lifetime from "../assets/Lifetime.png";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

const _pricingPlans = [
  {
    // plan_id: 'plan_IuHueHvdocQGNB',
    plan_id: 'plan_IuNPJh0qpUQ1G8',
    cycle: 'forever',
    subscription: 'Free',
    img: Monthly,
    price: 0,
    caption: 'Forever',
    lists: [
      { text: '4% Transaction Charge', isAvailable: true },
      { text: '10 Stores', isAvailable: true },
      { text: '15 Staff Member / Store', isAvailable: true },
      { text: 'Custom Domain & Email', isAvailable: true },
      { text: 'All Premium Themes', isAvailable: true },
      { text: 'Custom Marketing Messages', isAvailable: true },
      { text: 'Unlimited Discounts', isAvailable: true },
      { text: 'Customer Reviews', isAvailable: true },
      { text: 'Customer Questions', isAvailable: true },
      { text: 'Custom pages & Menus', isAvailable: true },
      { text: 'Super coins', isAvailable: true },
      { text: 'Unlimited Referrals', isAvailable: true },
      { text: 'Store Management', isAvailable: true },
      { text: 'Customer Management', isAvailable: true },
      { text: 'Unlimited Variants', isAvailable: true },
      { text: 'Wholesale pricing', isAvailable: true },
      { text: 'Unlimited Order', isAvailable: true },
      { text: 'Catalouge (Product, Category)', isAvailable: true },
      { text: 'Catalouge (Sub category, Division)', isAvailable: true },
      { text: 'Unlimited Products', isAvailable: true },
      { text: 'Delivery', isAvailable: true },
      { text: 'All Integrations', isAvailable: true },
      { text: 'Chat, Email & Call Support', isAvailable: true },
      
      
    ],
    labelAction: 'Choose Freemium',
  },
  {
    plan_id: 'plan_IuHvbpfEipw5i6',
    cycle: 'month',
    subscription: 'Monthly',
    img: Yearly,
    price: 450,
    caption: 'saving Rs. 1200 a year',
    lists: [
      { text: '2% Transaction Charge', isAvailable: true },
      { text: '10 Stores', isAvailable: true },
      { text: '15 Staff Member / Store', isAvailable: true },
      { text: 'Custom Domain & Email', isAvailable: true },
      { text: 'All Premium Themes', isAvailable: true },
      { text: 'Custom Marketing Messages', isAvailable: true },
      { text: 'Unlimited Discounts', isAvailable: true },
      { text: 'Customer Reviews', isAvailable: true },
      { text: 'Customer Questions', isAvailable: true },
      { text: 'Custom pages & Menus', isAvailable: true },
      { text: 'Super coins', isAvailable: true },
      { text: 'Unlimited Referrals', isAvailable: true },
      { text: 'Store Management', isAvailable: true },
      { text: 'Customer Management', isAvailable: true },
      { text: 'Unlimited Variants', isAvailable: true },
      { text: 'Wholesale pricing', isAvailable: true },
      { text: 'Unlimited Order', isAvailable: true },
      { text: 'Catalouge (Product, Category)', isAvailable: true },
      { text: 'Catalouge (Sub category, Division)', isAvailable: true },
      { text: 'Unlimited Products', isAvailable: true },
      { text: 'Delivery', isAvailable: true },
      { text: 'All Integrations', isAvailable: true },
      { text: 'Chat, Email & Call Support', isAvailable: true },
     
    ],
    labelAction: 'choose monthly',
  },
  {
    plan_id: 'plan_IuHx2o2i0gKaUJ',
    cycle: 'yearly',
    subscription: 'YEARLY',
    img: Lifetime,
    price: 4500,
    caption: '(Save Rs. 900 / year)',
    lists: [
      { text: '1% Transaction Charge', isAvailable: true },
      { text: '10 Stores', isAvailable: true },
      { text: '15 Staff Member / Store', isAvailable: true },
      { text: 'Custom Domain & Email', isAvailable: true },
      { text: 'All Premium Themes', isAvailable: true },
      { text: 'Custom Marketing Messages', isAvailable: true },
      { text: 'Unlimited Discounts', isAvailable: true },
      { text: 'Customer Reviews', isAvailable: true },
      { text: 'Customer Questions', isAvailable: true },
      { text: 'Custom pages & Menus', isAvailable: true },
      { text: 'Super coins', isAvailable: true },
      { text: 'Unlimited Referrals', isAvailable: true },
      { text: 'Store Management', isAvailable: true },
      { text: 'Customer Management', isAvailable: true },
      { text: 'Unlimited Variants', isAvailable: true },
      { text: 'Wholesale pricing', isAvailable: true },
      { text: 'Unlimited Order', isAvailable: true },
      { text: 'Catalouge (Product, Category)', isAvailable: true },
      { text: 'Catalouge (Sub category, Division)', isAvailable: true },
      { text: 'Unlimited Products', isAvailable: true },
      { text: 'Delivery', isAvailable: true },
      { text: 'All Integrations', isAvailable: true },
      { text: 'Chat, Email & Call Support', isAvailable: true },
      
    ],
    labelAction: 'choose yearly',
  },
];

// ----------------------------------------------------------------------

export default function Pricing() {
  return (
    <Page title="Pricing">
      <RootStyle>
        <Container>
          <Typography variant="h3" align="center" paragraph>
            Flexible plans for your
            <br /> Business&apos;s size and needs
          </Typography>
          <Typography align="center" sx={{ color: 'text.secondary' }}>
            Choose your plan and experience modern online Ecommerce 
          </Typography>

          <Box sx={{ my: 5 }}>
            {/* {} */}
          </Box>

          <Grid container spacing={3} sx={{my:5}}>
            {_pricingPlans.map((card, index) => {
              console.log(card);
              return (
              <Grid item xs={12} md={4} key={card.subscription}>
                <PricingPlanCard isHome card={card} index={index} />
              </Grid>
            )})}
          </Grid>
          
        </Container>
       
      </RootStyle>
    </Page>
  );
}
