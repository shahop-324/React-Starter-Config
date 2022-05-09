// @mui
import { Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';
// _mock_
// import { _faqs } from '../../_mock';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const FAQS = [
  {
    value: 'op',
    heading: 'What are the fetures available on QwikShop',
    detail: 'QwikShop Offers many features like Website Builder, Product Catalouge, Variant Based Pricing, Online payments, Delivery, E commerce Site, Staff, Multiple stores, Order management, Customer management, Marketing, Referral, Discounts and much more',
    id: '123',
  },
  {
    value: 'op',
    heading: 'What are the pricing plans available on QwikShop',
    detail: 'QwikShop offers most affordable pricing starting from Rs. 300 Per month to Rs. 2400 Per Year and Rs. 15000 for Lifetime License. For More info Please see Pricing page.',
    id: '123',
  },
  {
    value: 'op',
    heading: 'Is there any Free trial available',
    detail: 'Yes, You can get a 14 Days free trial by creating your account today on QwikShop',
    id: '123',
  },
  {
    value: 'op',
    heading: 'Can I have a team on QwikShop',
    detail: 'Yes, Each store on QwikShop can have upto 25 staff members other than Store Owner.',
    id: '123',
  },
  {
    value: 'op',
    heading: 'Can I manage multiple stores',
    detail: 'Yes, You can manage upto 35 Store from your QwikShop Account.',
    id: '123',
  },
  {
    value: 'op',
    heading: 'Is there any volume discount for enterprises and NGOs.',
    detail: 'Yes, We do offer 0.5% transaction charges for Enterprises and NGOs.',
    id: '123',
  },
  {
    value: 'op',
    heading: 'Is there any speacial program for D2C Startups',
    detail: 'We are working to start our startup program. Please subscribe to our newsletter and follow us on social media to remain in touch.',
    id: '123',
  },
  {
    value: 'op',
    heading: 'How can I ask for a custom feature',
    detail: 'You can submit your demand through contact us page on our website or you can write to us at support@qwikshop.online',
    id: '123',
  },
  {
    value: 'op',
    heading: 'How can I ask for refund',
    detail: 'You can mail us your query at refund@qwikshop.online and we will be happy to assist you further.',
    id: '123',
  },
  {
    value: 'op',
    heading: 'Can I upgrade or downgrade my account anytime',
    detail: 'You can upgrade your QwikShop account anytime by logging in and then navigating to Store > Profile >Billing.',
    id: '123',
  },
];

export default function FaqsList() {
  return (
    <>
      {FAQS.map((accordion) => (
        <Accordion key={accordion.id}>
          <AccordionSummary expandIcon={<Iconify icon={'eva:arrow-ios-downward-fill'} width={20} height={20} />}>
            <Typography variant="subtitle1">{accordion.heading}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{accordion.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
