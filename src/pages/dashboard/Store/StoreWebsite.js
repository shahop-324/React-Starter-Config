import { capitalCase } from 'change-case';
import { useState } from 'react';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';

// sections

// Icons
import FormatColorFillRoundedIcon from '@mui/icons-material/FormatColorFillRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BatchPredictionRoundedIcon from '@mui/icons-material/BatchPredictionRounded';

// components
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import Page from '../../../components/Page';
import useSettings from '../../../hooks/useSettings';
import StoreAppearance from './Website/Appearance';
import StoreOtherInfo from './Website/OtherInfo';
import StoreAmbience from "./Website/Ambience";
import StorePreferences from './Website/StorePreferences';
import PolicyPreferences from './Website/PolicyPreferences';

// ----------------------------------------------------------------------

export default function StoreWebsite() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('Appearance');

  const ACCOUNT_TABS = [
    {
      value: 'Appearance',
      icon: <FormatColorFillRoundedIcon width={20} height={20} />,
      component: <StoreAppearance />,
    },
    {
      value: 'Ambience',
      icon: <LightModeRoundedIcon width={20} height={20} />,
      component: <StoreAmbience />,
    },
    {
      value: 'Other Info',
      icon: <InfoRoundedIcon width={20} height={20} />,
      component: <StoreOtherInfo />,
    },
    {
      value: 'Preferences',
      icon: <BatchPredictionRoundedIcon width={20} height={20} />,
      component: <StorePreferences />,
    },
    {
      value: 'Policy Preferences',
      icon: <ArticleRoundedIcon width={20} height={20} />,
      component: <PolicyPreferences />,
    },
  ];

  return (
    <Page title="Store Theme">
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
