// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function Problem2() {
  return (
    <Page title="Problem 2">
      <RootStyle >
        
{/* Header */}
{/* Image Results */}

</RootStyle>
       
    </Page>
  );
}
