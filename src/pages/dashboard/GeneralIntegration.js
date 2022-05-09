/* eslint-disable no-unused-vars */
// @mui
import { Container, Grid, Typography, Button, Chip } from '@mui/material';
import styled from 'styled-components';
// Hooks
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import {
  updateGA,
  updateGMC,
  updateGSC,
  updatePixel,
  updateAdwords,
  updateIntercom,
  updateWhatsAppNumber,
  uninstallMailchimp,
} from '../../actions';
import AdwordsInfo from '../../Dialogs/Integration/AdwordsConversionTracking';
import FacebookPixelInfo from '../../Dialogs/Integration/FacebookPixel';
import FacebookDomainVerificationInfo from '../../Dialogs/Integration/FacebookDomainVerification';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import GoogleAnalytics from '../../Dialogs/Integration/GoogleAnalytics';
import GoogleMerchantCenter from '../../Dialogs/Integration/GoogleMerchantCenter';
import GoogleSearchConsoleInfo from '../../Dialogs/Integration/GoogleSearchConsole';
import WhatsAppChat from '../../Dialogs/Integration/WhatsAppChatSupport';
import MailchimpInfo from '../../Dialogs/Integration/Mailchimp';
import Intercom from '../../Dialogs/Integration/IntercomChat';
import ZapierInfo from '../../Dialogs/Integration/Zapier';
import AmazonPayInfo from '../../Dialogs/Integration/AmazonPay';
import MobiKwikInfo from '../../Dialogs/Integration/MobiKwik';
import GooglePayInfo from '../../Dialogs/Integration/GooglePay';
import PhonePeInfo from '../../Dialogs/Integration/PhonePe';
import PaytmInfo from '../../Dialogs/Integration/Paytm';
import HubSpotInfo from '../../Dialogs/Integration/Hubspot';
import QuickBooksInfo from '../../Dialogs/Integration/QuickBooks';
import DunzoInfo from '../../Dialogs/Integration/Dunzo';
import ZohoBooksInfo from '../../Dialogs/Integration/ZohoBooks';
import Adwords from '../../Dialogs/Integration/Drawer/Adwords';
import GoogleAnalyticsConnect from '../../Dialogs/Integration/Drawer/GoogleAnalyticsConnect';
import GoogleMerchantCentre from '../../Dialogs/Integration/Drawer/GoogleMerchantCentre';
import GoogleSearchConsole from '../../Dialogs/Integration/Drawer/GoogleSearchConsole';
import WhatsAppBusinessChat from '../../Dialogs/Integration/Drawer/WhatsAppChat';
import MailchimpConnect from '../../Dialogs/Integration/Drawer/Mailchimp';
import IntercomConnect from '../../Dialogs/Integration/Drawer/Intercom';
import FBPixelConnect from '../../Dialogs/Integration/Drawer/FBPixel';
import FacebookDomainVerification from '../../Dialogs/Integration/Drawer/FBDomain';
// StyledComponent
const Card = styled.div`
  width: 100%;
  border-radius: 20px;
  border: 1px solid #21212126;
`;

const Logo = styled.img`
  height: 100px;
  border-radius: 20px;
`;

export default function GeneralIntegration() {

  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);


  const { store } = useSelector((state) => state.store);

  const dispatch = useDispatch();

  const { themeStretch } = useSettings();

  const [openGA, setOpenGA] = useState(false);
  const [openGAInfo, setOpenGAInfo] = useState(false);

  const handleCloseGAInfo = () => {
    setOpenGAInfo(false);
  };

  const handleCloseGA = () => {
    setOpenGA(false);
  };

  //  Google merchant center

  const [openGMC, setOpenGMC] = useState(false);
  const [openGMCInfo, setOpenGMCInfo] = useState(false);

  const handleCloseGMCInfo = () => {
    setOpenGMCInfo(false);
  };

  const handleCloseGMC = () => {
    setOpenGMC(false);
  };

  //  Google search console

  const [openGSC, setOpenGSC] = useState(false);
  const [openGSCInfo, setOpenGSCInfo] = useState(false);

  const handleCloseGSCInfo = () => {
    setOpenGSCInfo(false);
  };

  const handleCloseGSC = () => {
    setOpenGSC(false);
  };

  //  Adwords

  const [openAdwords, setOpenAdwords] = useState(false);
  const [openAdwordsInfo, setOpenAdwordsInfo] = useState(false);

  const handleCloseAdwordsInfo = () => {
    setOpenAdwordsInfo(false);
  };

  const handleCloseAdwords = () => {
    setOpenAdwords(false);
  };
  //  FB Pixel

  const [openFBPixel, setOpenFBPixel] = useState(false);
  const [openFBPixelInfo, setOpenFBPixelInfo] = useState(false);

  const handleCloseFBPixelInfo = () => {
    setOpenFBPixelInfo(false);
  };

  const handleCloseFBPixel = () => {
    setOpenFBPixel(false);
  };
  //  FB Domain

  const [openFBDomain, setOpenFBDomain] = useState(false);
  const [openFBDomainInfo, setOpenFBDomainInfo] = useState(false);

  const handleCloseFBDomainInfo = () => {
    setOpenFBDomainInfo(false);
  };

  const handleCloseFBDomain = () => {
    setOpenFBDomain(false);
  };
  // Mailchimp
  const [openMailchimp, setOpenMailchimp] = useState(false);
  const [openMailchimpInfo, setOpenMailchimpInfo] = useState(false);

  const handleCloseMailchimpInfo = () => {
    setOpenMailchimpInfo(false);
  };

  const handleClosenMailchimp = () => {
    setOpenMailchimp(false);
  };
  //  WhatsApp Chat Support
  const [openWhatsApp, setOpenWhatsApp] = useState(false);
  const [openWhatsAppInfo, setOpenWhatsAppInfo] = useState(false);

  const handleCloseWhatsAppInfo = () => {
    setOpenWhatsAppInfo(false);
  };

  const handleCloseWhatsApp = () => {
    setOpenWhatsApp(false);
  };
  //  Intercom

  const [openIntercom, setOpenIntercom] = useState(false);
  const [openIntercomInfo, setOpenIntercomInfo] = useState(false);

  const handleCloseIntercomInfo = () => {
    setOpenIntercomInfo(false);
  };

  const handleCloseIntercom = () => {
    setOpenIntercom(false);
  };
  //  Zoho Books

  const [openZohoBookInfo, setOpenZohoBookInfo] = useState(false);
  const [openZohoBook, setOpenZohoBook] = useState(false);

  const handleCloseZohoBookInfo = () => {
    setOpenZohoBookInfo(false);
  };

  const handleCloseZohoBook = () => {
    setOpenZohoBook(false);
  };
  //  Dunzo

  const [openDunzo, setOpenDunzo] = useState(false);
  const [openDunzoInfo, setOpenDunzoInfo] = useState(false);

  const handleCloseDunzoInfo = () => {
    setOpenDunzoInfo(false);
  };

  const handleCloseDunzo = () => {
    setOpenDunzo(false);
  };
  //  Quickbooks

  const [openQuickBooks, setOpenQuickBooks] = useState(false);
  const [openQuickBooksInfo, setOpenQuickBooksInfo] = useState(false);

  const handleCloseQuickBooksInfo = () => {
    setOpenQuickBooksInfo(false);
  };

  const handleCloseQuickBooks = () => {
    setOpenQuickBooks(false);
  };

  //  Hubspot

  const [openHubspot, setOpenHubspot] = useState(false);
  const [openHubspotInfo, setOpenHubspotInfo] = useState(false);

  const handleCloseHubspotInfo = () => {
    setOpenHubspotInfo(false);
  };

  const handleCloseHubspot = () => {
    setOpenHubspotInfo(false);
  };
  //  Paytm

  const [openPaytm, setOpenPaytm] = useState(false);
  const [openPaytmInfo, setOpenPaytmInfo] = useState(false);

  const handleClosePaytmInfo = () => {
    setOpenPaytmInfo(false);
  };

  const handleClosePaytm = () => {
    setOpenPaytm(false);
  };
  //  PhonePe

  const [openPhonePe, setOpenPhonePe] = useState(false);
  const [openPhonePeInfo, setOpenPhonePeInfo] = useState(false);

  const handleClosePhonePeInfo = () => {
    setOpenPhonePeInfo(false);
  };

  const handleOpenPhonePe = () => {
    setOpenPhonePe(false);
  };
  //  Google Pay

  const [openGooglePay, setOpenGooglePay] = useState(false);
  const [openGooglePayInfo, setOpenGooglePayInfo] = useState(false);

  const handleCloseGooglePayInfo = () => {
    setOpenGooglePayInfo(false);
  };

  const handleCloseGooglePay = () => {
    setOpenGooglePay(false);
  };
  //  Mobikwik

  const [openMobikwik, setOpenMobikwik] = useState(false);
  const [openMobikwikInfo, setOpenMobikwikInfo] = useState(false);

  const handleCloseMobikwikInfo = () => {
    setOpenMobikwikInfo(false);
  };

  const handleCloseMobikwik = () => {
    setOpenMobikwik(false);
  };
  //  Amazon Pay

  const [openAmazonPay, setOpenAmazonPay] = useState(false);
  const [openAmazonPayInfo, setOpenAmazonPayInfo] = useState(false);

  const handleCloseAmazonPayInfo = () => {
    setOpenAmazonPayInfo(false);
  };

  const handleCloseAmazonPay = () => {
    setOpenAmazonPay(false);
  };

  //  Zapier

  const [openZapier, setOpenZapier] = useState(false);
  const [openZapierInfo, setOpenZapierInfo] = useState(false);

  const handleCloseZapierInfo = () => {
    setOpenZapierInfo(false);
  };

  const handleCloseZapier = () => {
    setOpenZapier(false);
  };

  return (
    <>
      <Page title="Integration">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              {/* Google analytics */}
              <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo
                      className="me-3"
                      src={
                        'https://developers.google.com/analytics/images/terms/logo_lockup_analytics_icon_vertical_black_2x.png'
                      }
                    />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">Google Analytics</Typography>
                      <Typography variant="p1">
                        Track your store visitors and improve your google ads conversion rate by targeting right
                        customers
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    <Button
                      onClick={() => {
                        setOpenGAInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button>

                    {!store.GAInstalled ? (
                      <Button
                        onClick={() => {
                          setOpenGA(true);
                        }}
                        variant="contained"
                      >
                        Install
                      </Button>
                    ) : (
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          dispatch(updateGA(undefined, () => {}, true));
                        }}
                      >
                        Uninstall
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Card>
              {/* Google Merchant Center */}
              <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo className="me-3" src={'https://cdn.worldvectorlogo.com/logos/google-merchant-center.svg'} />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">Google Merchant Center</Typography>
                      <Typography variant="p1">
                        Track your store visitors and improve your google ads conversion rate by targeting right
                        customers
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    <Button
                      onClick={() => {
                        setOpenGMCInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button>

                    {!store.GMCInstalled ? (
                      <Button
                        onClick={() => {
                          setOpenGMC(true);
                        }}
                        variant="contained"
                      >
                        Install
                      </Button>
                    ) : (
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          dispatch(updateGMC(undefined, () => {}, true));
                        }}
                      >
                        Uninstall
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Card>
              {/* Google Search Console */}
              <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo className="me-3" src={'https://cdn.worldvectorlogo.com/logos/google-search-console.svg'} />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">Google Search Console</Typography>
                      <Typography variant="p1">
                        Track your store visitors and improve your google ads conversion rate by targeting right
                        customers
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    <Button
                      onClick={() => {
                        setOpenGSCInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button>
                    {!store.GSCInstalled ? (
                      <Button
                        onClick={() => {
                          setOpenGSC(true);
                        }}
                        variant="contained"
                      >
                        Install
                      </Button>
                    ) : (
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          dispatch(updateGSC(undefined, () => {}, true));
                        }}
                      >
                        Uninstall
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Card>
              {/* WhatsApp Chat Support */}
              <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo
                      className="me-3"
                      src={
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/WhatsApp_logo-color-vertical.svg/2048px-WhatsApp_logo-color-vertical.svg.png'
                      }
                    />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">WhatsApp Chat Support</Typography>
                      <Typography variant="p1">
                        Allow your customers to talk to you directly through WhatsApp
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    <Button
                      onClick={() => {
                        setOpenWhatsAppInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button>
                    {!store.WAVerified ? (
                      <Button
                        onClick={() => {
                          setOpenWhatsApp(true);
                        }}
                        variant="contained"
                      >
                        Install
                      </Button>
                    ) : (
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          dispatch(updateWhatsAppNumber(undefined, true, () => {}));
                        }}
                      >
                        Uninstall
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Card>

              {/* Intercom */}
              <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo className="me-3" src={'https://avatars.githubusercontent.com/u/6585?s=280&v=4'} />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">Intercom</Typography>
                      <Typography variant="p1">Simple messenger for your online business</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    <Button
                      onClick={() => {
                        setOpenIntercomInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button>

                    {!store.IntercomInstalled ? (
                      <Button
                        onClick={() => {
                          setOpenIntercom(true);
                        }}
                        variant="contained"
                      >
                        Install
                      </Button>
                    ) : (
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          dispatch(updateIntercom(undefined, () => {}, true));
                        }}
                      >
                        Uninstall
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Card>
              {/* Google Adwords Conversion Tracking */}
              <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo
                      className="me-3"
                      src={
                        'https://lh3.googleusercontent.com/nupo3HWMIUeuul9r2IBSfpBo568bL-STG9nA71dUuW97DnhAXFgm2WWjczhTFqRHQZRf5VA-_PmxIZaIAXhOUrzfr5unPjFuW9za=w0'
                      }
                    />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">Google Adwords</Typography>
                      <Typography variant="p1">
                        Get in front of customers when they're searching for businesses like yours on Google everywhere.
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    <Button
                      onClick={() => {
                        setOpenAdwordsInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button>
                    {!store.adWordsInstalled ? (
                      <Button
                        onClick={() => {
                          setOpenAdwords(true);
                        }}
                        variant="contained"
                      >
                        Install
                      </Button>
                    ) : (
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          dispatch(updateAdwords(undefined, () => {}, true));
                        }}
                      >
                        Uninstall
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Card>
              {/* Facebook Pixel */}
              <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo
                      className="me-3"
                      src={'https://www.nopcommerce.com/images/thumbs/0015917_facebook-pixel-by-nopcommerce-team.png'}
                    />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">Facebook Pixel</Typography>
                      <Typography variant="p1">Reach your target audience on Facebook and Instagram</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    <Button
                      onClick={() => {
                        setOpenFBPixelInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button>
                    {!store.PixelInstalled ? (
                      <Button
                        onClick={() => {
                          setOpenFBPixel(true);
                        }}
                        variant="contained"
                      >
                        Install
                      </Button>
                    ) : (
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          dispatch(updatePixel(undefined, () => {}, true));
                        }}
                      >
                        Uninstall
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Card>

              {/* Mailchimp */}
              <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo className="me-3" src={'https://www.drupal.org/files/project-images/MC_Logo.jpg'} />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">Mailchmip</Typography>
                      <Typography variant="p1">
                        All-In-One integrated marketing platform for small businesses, to grow your business on your
                        terms
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    <Chip variant="outlined" color="primary" label="Coming Soon" />
                    {/* <Button
                      onClick={() => {
                        setOpenMailchimpInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button>
                    {!store.mailchimpInstalled ? (
                      <Button
                        onClick={() => {
                          setOpenMailchimp(true);
                        }}
                        variant="contained"
                      >
                        Install
                      </Button>
                    ) : (
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          dispatch(uninstallMailchimp());
                        }}
                      >
                        Uninstall
                      </Button>
                    )} */}
                  </Grid>
                </Grid>
              </Card>

              {/* Zoho Books */}
              <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo
                      className="me-3"
                      src={'https://avatars.slack-edge.com/2019-08-29/730880231907_caa71cf812305a064114_512.png'}
                    />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">Zoho Books</Typography>
                      <Typography variant="p1">
                        Online accounting software that manages your finances, keeps you GST Compliant and automates
                        business workflows.
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    {/* <Button
                      onClick={() => {
                        setOpenZohoBookInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button> */}
                    {/* <Button variant="contained">Install</Button> */}
                    <Chip variant="outlined" color="primary" label="Coming Soon" />
                  </Grid>
                </Grid>
              </Card>
              {/* Dunzo Hyperlocal delivery */}
              <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo className="me-3" src={'https://assets.dunzo.com/images/logo-512.png'} />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">Dunzo Hyperlocal delivery</Typography>
                      <Typography variant="p1">Ship your orders in your city without hassle with Dunzo</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    {/* <Button
                      onClick={() => {
                        setOpenDunzoInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button> */}
                    {/* <Button variant="contained">Install</Button> */}
                    <Chip variant="outlined" color="primary" label="Coming Soon" />
                  </Grid>
                </Grid>
              </Card>
              {/* Quickbooks */}
              <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo
                      className="me-3"
                      src={'https://seeklogo.com/images/Q/quick-books-logo-D276A46B9F-seeklogo.com.png'}
                    />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">Quickbooks</Typography>
                      <Typography variant="p1">Run Your Business with QuickBooks Accounting Software</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    {/* <Button
                      onClick={() => {
                        setOpenQuickBooksInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button> */}
                    {/* <Button variant="contained">Install</Button> */}
                    <Chip variant="outlined" color="primary" label="Coming Soon" />
                  </Grid>
                </Grid>
              </Card>
              {/* Quickbooks */}
              <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo
                      className="me-3"
                      src={'https://pbs.twimg.com/profile_images/1329180456286294018/DSFK8Mc0_400x400.png'}
                    />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">Hubspot</Typography>
                      <Typography variant="p1">
                        HubSpot offers a full platform of marketing, sales, customer service, and CRM software
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    {/* <Button
                      onClick={() => {
                        setOpenHubspotInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button> */}
                    {/* <Button variant="contained">Install</Button> */}
                    <Chip variant="outlined" color="primary" label="Coming Soon" />
                  </Grid>
                </Grid>
              </Card>
              {/* Quickbooks */}
              <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo className="me-3" src={'https://thenfapost.com/wp-content/uploads/2020/07/Paytm222.jpg'} />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">Paytm</Typography>
                      <Typography variant="p1">
                        Use Paytm for safe & secure money transfer via UPI using any bank account or Paytm Wallet.
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    {/* <Button
                      onClick={() => {
                        setOpenPaytmInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button> */}
                    {/* <Button variant="contained">Install</Button> */}
                    <Chip variant="outlined" color="primary" label="Coming Soon" />
                  </Grid>
                </Grid>
              </Card>
              {/* Quickbooks */}
              <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo
                      className="me-3"
                      src={'https://pbs.twimg.com/profile_images/1228394203421372416/4X3QZazb_400x400.jpg'}
                    />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">PhonePe</Typography>
                      <Typography variant="p1">
                        PhonePe is a payments app that allows you to use BHIM UPI, your credit card and debit card or
                        wallet
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    {/* <Button
                      onClick={() => {
                        setOpenPhonePeInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button> */}
                    {/* <Button variant="contained">Install</Button> */}
                    <Chip variant="outlined" color="primary" label="Coming Soon" />
                  </Grid>
                </Grid>
              </Card>
              {/* Quickbooks */}
              <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo className="me-3" src={'https://etimg.etb2bimg.com/photo/86698389.cms'} />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">Google Pay</Typography>
                      <Typography variant="p1">
                        Google Pay is a safe, simple, and helpful way to manage your money, giving you a clearer picture
                        of your spending and savings
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    {/* <Button
                      onClick={() => {
                        setOpenGooglePayInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button> */}
                    {/* <Button variant="contained">Install</Button> */}
                    <Chip variant="outlined" color="primary" label="Coming Soon" />
                  </Grid>
                </Grid>
              </Card>
              {/* Quickbooks */}
              <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo
                      className="me-3"
                      src={'https://pbs.twimg.com/profile_images/1477983040114606080/7Qi5Y82E_400x400.jpg'}
                    />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">Mobikwik</Typography>
                      <Typography variant="p1">
                        MobiKwik is a payment app that caters to all your day-to-day payment needs.
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    {/* <Button
                      onClick={() => {
                        setOpenMobikwikInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button> */}
                    {/* <Button variant="contained">Install</Button> */}
                    <Chip variant="outlined" color="primary" label="Coming Soon" />
                  </Grid>
                </Grid>
              </Card>
              {/* Quickbooks */}
              <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo
                      className="me-3"
                      src={'https://static.amazon.jobs/teams/378/thumbnails/AmazonPayLogo-543.jpg?1508227956'}
                    />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">Amazon Pay</Typography>
                      <Typography variant="p1">
                        Amazon Pay is an online payments processing service by Amazon.
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    {/* <Button
                      onClick={() => {
                        setOpenAmazonPayInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button> */}
                    {/* <Button variant="contained">Install</Button> */}
                    <Chip variant="outlined" color="primary" label="Coming Soon" />
                  </Grid>
                </Grid>
              </Card>
              {/* Zapier */}

              {isMobile ? <Card className="p-2 mb-4">
                <Grid sx={{ p: 3 }} container>
                  <Grid item className="d-flex flex-column justify-content-center align-items-center">
                    {/*  */}
                    <Logo
                      className="me-3"
                      src={
                        'https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2017-06-20/200850512066_2d5e268a3b71c87f969c_512.png'
                      }
                    />
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <Typography variant="h6" sx={{ my: 2 }}>
                        Zapier
                      </Typography>
                      <Typography variant="p1">
                        Easy automation for busy people. Zapier moves info between your web apps automatically
                      </Typography>
                    </div>
                  </Grid>

                  <Grid
                    item
                    sx={{ width: '100%', mt: 3 }}
                    className="d-flex flex-row align-items-center justify-content-center"
                  >
                    {/* <Button
                      onClick={() => {
                        setOpenZapierInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button> */}
                    {/* <Button variant="contained">Install</Button> */}
                    <Chip variant="outlined" color="primary" label="Coming Soon" />
                  </Grid>
                </Grid>
              </Card> :  <Card className="p-2 mb-4">
                <Grid container>
                  <Grid item xs={9} md={9} className="d-flex flex-row align-items-center">
                    <Logo
                      className="me-3"
                      src={
                        'https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2017-06-20/200850512066_2d5e268a3b71c87f969c_512.png'
                      }
                    />
                    <div className="d-flex flex-column justify-content-center">
                      <Typography variant="h6">Zapier</Typography>
                      <Typography variant="p1">
                        Easy automation for busy people. Zapier moves info between your web apps automatically
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={3} md={3} className="d-flex flex-row align-items-center justify-content-end">
                    {/* <Button
                      onClick={() => {
                        setOpenZapierInfo(true);
                      }}
                      variant="outlined"
                      className="me-3"
                    >
                      Learn more
                    </Button> */}
                    {/* <Button variant="contained">Install</Button> */}
                    <Chip variant="outlined" color="primary" label="Coming Soon" />
                  </Grid>
                </Grid>
              </Card> }

              

             
            </Grid>
          </Grid>
        </Container>
      </Page>

      {/* Integrations Learn more Dialog */}

      {openGAInfo && <GoogleAnalytics open={openGAInfo} handleClose={handleCloseGAInfo} />}
      {openGMCInfo && <GoogleMerchantCenter open={openGMCInfo} handleClose={handleCloseGMCInfo} />}
      {openGSCInfo && <GoogleSearchConsoleInfo open={openGSCInfo} handleClose={handleCloseGSCInfo} />}
      {openWhatsAppInfo && <WhatsAppChat open={openWhatsAppInfo} handleClose={handleCloseWhatsAppInfo} />}
      {openMailchimpInfo && <MailchimpInfo open={openMailchimpInfo} handleClose={handleCloseMailchimpInfo} />}
      {openIntercomInfo && <Intercom open={openIntercomInfo} handleClose={handleCloseIntercomInfo} />}
      {openAdwordsInfo && <AdwordsInfo open={openAdwordsInfo} handleClose={handleCloseAdwordsInfo} />}
      {openFBPixelInfo && <FacebookPixelInfo open={openFBPixelInfo} handleClose={handleCloseFBPixelInfo} />}
      {openFBDomainInfo && (
        <FacebookDomainVerificationInfo open={openFBDomainInfo} handleClose={handleCloseFBDomainInfo} />
      )}
      {openZapierInfo && <ZapierInfo open={openZapierInfo} handleClose={handleCloseZapierInfo} />}
      {openAmazonPayInfo && <AmazonPayInfo open={openAmazonPayInfo} handleClose={handleCloseAmazonPayInfo} />}
      {openMobikwikInfo && <MobiKwikInfo open={openMobikwikInfo} handleClose={handleCloseMobikwikInfo} />}
      {openGooglePayInfo && <GooglePayInfo open={openGooglePayInfo} handleClose={handleCloseGooglePayInfo} />}
      {openPhonePeInfo && <PhonePeInfo open={openPhonePeInfo} handleClose={handleClosePhonePeInfo} />}
      {openPaytmInfo && <PaytmInfo open={openPaytmInfo} handleClose={handleClosePaytmInfo} />}
      {openHubspotInfo && <HubSpotInfo open={openHubspotInfo} handleClose={handleCloseHubspotInfo} />}
      {openQuickBooksInfo && <QuickBooksInfo open={openQuickBooksInfo} handleClose={handleCloseQuickBooksInfo} />}
      {openDunzoInfo && <DunzoInfo open={openDunzoInfo} handleClose={handleCloseDunzoInfo} />}
      {openZohoBookInfo && <ZohoBooksInfo open={openZohoBookInfo} handleClose={handleCloseZohoBookInfo} />}

      {/* Integrations Setting Drawer */}

      {openAdwords && <Adwords open={openAdwords} handleClose={handleCloseAdwords} />}
      {openGA && <GoogleAnalyticsConnect open={openGA} handleClose={handleCloseGA} />}
      {openGMC && <GoogleMerchantCentre open={openGMC} handleClose={handleCloseGMC} />}
      {openGSC && <GoogleSearchConsole open={openGSC} handleClose={handleCloseGSC} />}
      {openWhatsApp && <WhatsAppBusinessChat open={openWhatsApp} handleClose={handleCloseWhatsApp} />}
      {openMailchimp && <MailchimpConnect open={openMailchimp} handleClose={handleClosenMailchimp} />}
      {openIntercom && <IntercomConnect open={openIntercom} handleClose={handleCloseIntercom} />}
      {openFBPixel && <FBPixelConnect open={openFBPixel} handleClose={handleCloseFBPixel} />}
      {openFBDomain && <FacebookDomainVerification open={openFBDomain} handleClose={handleCloseFBDomain} />}
    </>
  );
}
