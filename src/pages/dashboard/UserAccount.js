import { capitalCase } from 'change-case';
import { useState } from 'react';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// hooks
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../_mock';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import {
  AccountGeneral,
  // AccountBilling,
  AccountSocialLinks,
  AccountNotifications,
  AccountPolicies,
  AccountDomain,
  AccountCheckout,
} from '../../sections/@dashboard/user/account';

import { StaffDetails } from '../../sections/@dashboard/general/booking';


// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('general');

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <AccountGeneral />,
    },
    // {
    //   value: 'billing',
    //   icon: <Iconify icon={'ic:round-receipt'} width={20} height={20} />,
    //   component: <AccountBilling cards={_userPayment} addressBook={_userAddressBook} invoices={_userInvoices} />,
    // },
    {
      value: 'notifications',
      icon: <Iconify icon={'eva:bell-fill'} width={20} height={20} />,
      component: <AccountNotifications />,
    },
    {
      value: 'social_links',
      icon: <Iconify icon={'eva:share-fill'} width={20} height={20} />,
      component: <AccountSocialLinks myProfile={_userAbout} />,
    },
    {
      value: 'staff_account',
      icon: <PeopleIcon width={20} height={20} />,
      component: <StaffDetails myProfile={_userAbout} />,
    },
    {
      value: 'checkout',
      icon: <ShoppingCartRoundedIcon icon={'eva:share-fill'} width={20} height={20} />,
      component: <AccountCheckout myProfile={_userAbout} />,
    },
    {
      value: 'Domain',
      icon: <LanguageRoundedIcon icon={'eva:share-fill'} width={20} height={20} />,
      component: <AccountDomain myProfile={_userAbout} />,
    },
    {
      value: 'policies',
      icon: <ArticleRoundedIcon  icon={'eva:share-fill'} width={20} height={20} />,
      component: <AccountPolicies myProfile={_userAbout} />,
    },
  ];

  return (
    <Page title="User: Account Settings">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
