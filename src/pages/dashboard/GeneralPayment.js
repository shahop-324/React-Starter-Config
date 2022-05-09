import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Grid,
  Container,
  Box,
  Card,
  TextField,
  Autocomplete,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';

import Switch from '@mui/material/Switch';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { PaymentsLessons, PaymentsWelcome } from '../../sections/@dashboard/general/payments/index';
// sections
// @mui
import { updatePaymentSettings } from '../../actions';
import GeneralTransaction from './GeneralTransaction';
import GeneralPayouts from './GeneralPayouts';
import GeneralRefunds from './GeneralRefunds';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function GeneralPayment() {
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();

  const { isUpdatingPaymentSettings, store } = useSelector((state) => state.store);

  const [upiId, setUpiId] = useState(store.upiId);
  const [paymentMode, setPaymentMode] = useState(store.paymentMode);
  const [accountHolderName, setAccountHolderName] = useState(store.accountHolderName);
  const [bank, setBank] = useState(store.bank);
  const [accountNumber, setAccountNumber] = useState(store.accountNumber);
  const [IFSCCode, setIFSCCode] = useState(store.IFSCCode);

  const [enableCOD, setEnableCOD] = useState(store.enableCOD);
  const [enablePartialCOD, ] = useState(store.enablePartialCOD);
  const [partialCODPercentage, ] = useState(store.partialCODPercentage);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmit = () => {
    const formValues = {
      enableCOD,
      enablePartialCOD,
      partialCODPercentage,
      paymentMode,
      upiId,
      bank,
      accountNumber,
      accountHolderName,
      IFSCCode,
    };
    dispatch(updatePaymentSettings(formValues));
  };

  return (
    <Page title="Payments">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <PaymentsWelcome />
          </Grid>
          <Grid item xs={12} md={4}>
            <PaymentsLessons />
          </Grid>

          <Grid item xs={12} md={12}>
            <Grid className="pt-3" container spacing={3}>
              <Grid item xs={12} md={12}>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="Transactions" {...a11yProps(0)} />
                      <Tab label="Payouts" {...a11yProps(1)} />
                      <Tab label="Refunds" {...a11yProps(2)} />
                      <Tab label="Payout settings" {...a11yProps(3)} />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <GeneralTransaction />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <GeneralPayouts />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <GeneralRefunds />
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <Grid item xs={12} md={12}>
                      <Card sx={{ p: 3, mb: 3 }}>
                        <Box
                          sx={{
                            display: 'grid',
                            mb: 3,
                            columnGap: 2,
                            rowGap: 4,
                            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                          }}
                        >
                          <FormGroup className="">
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={enableCOD}
                                  onChange={(e) => {
                                    setEnableCOD(e.target.checked);
                                  }}
                                />
                              }
                              label="Accept Cash on delivery"
                            />
                          </FormGroup>

                        

                         
                        </Box>
                      </Card>
                      <Card sx={{ p: 3 }}>
                        <FormControl component="fieldset" className="mb-3">
                          <FormLabel component="legend">Accept Payments via</FormLabel>
                          <RadioGroup
                            defaultValue={paymentMode}
                            row
                            aria-label="payment mode"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="upi"
                              control={
                                <Radio
                                  onClick={() => {
                                    setPaymentMode('upi');
                                  }}
                                />
                              }
                              label="UPI"
                            />
                            <FormControlLabel
                              value="bank"
                              control={
                                <Radio
                                  onClick={() => {
                                    setPaymentMode('bank');
                                  }}
                                />
                              }
                              label="Bank"
                            />
                          </RadioGroup>
                        </FormControl>
                        <Box
                          sx={{
                            display: 'grid',
                            columnGap: 2,
                            rowGap: 3,
                            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                          }}
                        >
                          {paymentMode === 'upi' ? (
                            <TextField
                              name="upiId"
                              label="UPI Id"
                              fullWidth
                              value={upiId}
                              onChange={(e) => {
                                setUpiId(e.target.value);
                              }}
                            />
                          ) : (
                            <>
                              <Autocomplete
                                value={bank}
                                onChange={(e, value) => {
                                  setBank(value);
                                }}
                                id="bank"
                                fullWidth
                                options={banksOption}
                                autoHighlight
                                getOptionLabel={(option) => option.label}
                                renderOption={(props, option) => (
                                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                    <img
                                      loading="lazy"
                                      width="20"
                                      src={`${option.image}`}
                                      srcSet={`${option.image} 2x`}
                                      alt=""
                                    />
                                    {option.label}
                                  </Box>
                                )}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Select your bank"
                                    inputProps={{
                                      ...params.inputProps,
                                      autoComplete: '', // disable autocomplete and autofill
                                    }}
                                  />
                                )}
                              />
                              <TextField
                                name="accountHolderName"
                                label="Account Holder Name"
                                fullWidth
                                value={accountHolderName}
                                onChange={(e) => {
                                  setAccountHolderName(e.target.value);
                                }}
                              />
                              <TextField
                                name="accountNumber"
                                label="Account Number"
                                fullWidth
                                value={accountNumber}
                                onChange={(e) => {
                                  setAccountNumber(e.target.value);
                                }}
                              />
                              <TextField
                                name="ifscCode"
                                label="IFSC Code"
                                fullWidth
                                value={IFSCCode}
                                onChange={(e) => {
                                  setIFSCCode(e.target.value);
                                }}
                              />
                            </>
                          )}
                        </Box>
                        <FormGroup className="mt-3">
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label={
                              <span>
                                {' '}
                                I hereby confirm that above information is absolutely correct and I agree to QwikShop{' '}
                                <a href="#">Terms of service. </a>{' '}
                              </span>
                            }
                          />
                        </FormGroup>
                      </Card>
                      <div className="d-flex flex-row align-items-center justify-content-end mt-4">
                        <LoadingButton
                          onClick={() => {
                            onSubmit();
                          }}
                          type="submit"
                          variant="contained"
                          loading={isUpdatingPaymentSettings}
                        >
                          Save
                        </LoadingButton>
                      </div>
                    </Grid>
                  </TabPanel>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

const banksOption = [
  {
    label: 'Bank of Baroda',
    image: 'https://www.hrkatha.com/wp-content/uploads/2017/08/f1b8aeeb90e87d86cd6bf72988291f00.jpg',
  },
  {
    label: 'Bank of India',
    image: 'https://www.mockbank.com/bulletin/wp-content/uploads/2016/06/BANK-OF-INDIA-LOGO.png',
  },
  {
    label: 'Bank of Maharashtra',
    image:
      'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/enmg2d8ynjszyh6qc3qa',
  },
  {
    label: 'Canara Bank',
    image: 'https://static.toiimg.com/thumb/msid-79335059,width-1200,height-900,resizemode-4/.jpg',
  },
  {
    label: 'Central Bank of India',
    image:
      'https://bsmedia.business-standard.com/media-handler.php?mediaPath=http://bsmedia.business-standard.com/_media/bs/img/article/2016-08/12/full/1470993883-0352.jpg&width=1200',
  },
  {
    label: 'Indian Bank',
    image: 'https://www.deccanherald.com/sites/dh/files/article_images/2020/04/25/indian%20bank-1585665818.jpg',
  },
  {
    label: 'Indian Overseas Bank',
    image: 'https://www.deccanherald.com/sites/dh/files/article_images/2020/05/19/uciMr62n-1522282384-1581451263.jpg',
  },
  {
    label: 'Punjab & Sind Bank',
    image: 'https://pbs.twimg.com/profile_images/1362663471737790467/aBv5j51X_400x400.png',
  },
  {
    label: 'Punjab National Bank',
    image: 'https://static.toiimg.com/thumb/msid-74887573,width-1200,height-900,resizemode-4/.jpg',
  },
  {
    label: 'State Bank of India',
    image:
      'https://yt3.ggpht.com/IM6lirUA0zm-Jo4JWAAODD_berKFWAl3YsUjVK2NU2-jFfJOaAU0iojRCVI0kczD-wWnV1Bo=s900-c-k-c0x00ffffff-no-rj',
  },
  { label: 'UCO Bank', image: 'https://www.enggrecruit.com/wp-content/uploads/2020/10/UCO-Bank-LOGO.png' },
  {
    label: 'Union Bank of India',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWTYFheKnfV62KwAWO7hSO7GJeJw8Guar9ys11nCO4Mi1-VPZu9xOq8OwiAtyCUa4p6MA&usqp=CAU',
  },
  { label: 'Axis Bank Ltd.', image: 'https://www.nfcw.com/wp-content/uploads/2020/06/axis-bank-logo.jpg' },
  { label: 'Bandhan Bank Ltd.', image: 'https://images.indianexpress.com/2020/02/bandhan-bank-759.jpg' },
  {
    label: 'CSB Bank Ltd.',
    image: 'https://img.theweek.in/content/dam/week/news/biz-tech/images/2019/11/19/CSB-Bank-logo.jpg',
  },
  {
    label: 'City Union Bank Ltd.',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/21/City_Union_Bank.svg/1200px-City_Union_Bank.svg.png',
  },
  { label: 'DCB Bank Ltd.', image: 'https://contactworlds.com/wp-content/uploads/2021/06/DCB-Bank.jpg' },
  {
    label: 'Dhanlaxmi Bank Ltd.',
    image: 'https://play-lh.googleusercontent.com/KiikErActK_AzBRWeHqgVffNXBSoFrmyxrHglaZusbeLXDIh9JPN8F6A3q1DAYh61VNh',
  },
  {
    label: 'Federal Bank Ltd.',
    image: 'https://pbs.twimg.com/profile_images/1383092873520816129/bSk9I8CF_400x400.jpg',
  },
  { label: 'HDFC Bank Ltd.', image: 'https://1000logos.net/wp-content/uploads/2021/06/HDFC-Bank-emblem.png' },
  {
    label: 'ICICI Bank Ltd.',
    image:
      'https://yt3.ggpht.com/vPPqGWRhlGmEBvp3Xj8XxTpHlfRF6-VhqJnfdLyxpdDyAcnsYTsXSrcpZnQvQbg7a54g7xpj=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    label: 'Induslnd Bank Ltd',
    image: 'https://pennydia.com/attachments/communityimages/573eadb56baab8710895841a8576a50f.png',
  },
  {
    label: 'IDFC First Bank Ltd.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-MPekMQHDiH1Pmprb1UwyPJpKA-ixuVa3QoxUogbBzIPHL6heMn0Lfz-Wz1fxtvyzLXk&usqp=CAU',
  },
  {
    label: 'Jammu & Kashmir Bank Ltd.',
    image: 'https://pbs.twimg.com/profile_images/940840903081693184/WoqDjH-v_400x400.jpg',
  },
  {
    label: 'Karnataka Bank Ltd.',
    image: 'https://pbs.twimg.com/profile_images/862616785467523072/z_MkrNcf_400x400.jpg',
  },
  { label: 'Karur Vysya Bank Ltd.', image: 'https://csrbox.org/company/cmp_logo/1495690784kvb_bank_logo_6815672.jpg' },
  {
    label: 'Kotak Mahindra Bank Ltd',
    image: 'https://pbs.twimg.com/profile_images/1110433478343053314/J_fxuytW_400x400.png',
  },
  {
    label: 'Lakshmi Vilas Bank Ltd.',
    image:
      'https://www.deccanherald.com/sites/dh/files/articleimages/2020/11/18/download-2020-11-17t191926807-916696-1605665269-917036-1605684287.png',
  },
  {
    label: 'Nainital Bank Ltd.',
    image:
      'https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Nainitalbank_Logo.svg/1200px-Nainitalbank_Logo.svg.png',
  },
  {
    label: 'RBL Bank Ltd.',
    image: 'https://images.livemint.com/img/2020/06/29/1600x900/mint_(2)_1593421687552_1593421693510.jpg',
  },
  {
    label: 'South Indian Bank Ltd.',
    image:
      'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1500314538/czwq02xrytep28kafssh.png',
  },
  {
    label: 'Tamilnad Mercantile Bank Ltd.',
    image:
      'https://m.economictimes.com/thumb/msid-71792178,width-1200,height-900,resizemode-4,imgsize-44354/untitled-design-2019-10-28t154347-727.jpg',
  },
  {
    label: 'YES Bank Ltd.',
    image: 'https://yt3.ggpht.com/ytc/AKedOLReDiaxDmwXKqYwmx-y8UYbgVYBJJqW8zmF2rl9=s900-c-k-c0x00ffffff-no-rj',
  },
  { label: 'IDBI Bank Ltd.', image: 'https://1000logos.net/wp-content/uploads/2021/05/IDBI-Bank-emblem.png' },
];
