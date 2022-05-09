import React, { useState } from 'react';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// @mui
import { Grid, Container } from '@mui/material';
// hooks
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import {
  Message,
  ReceiptLongRounded,
  ShoppingCartCheckoutSharp,
  Store,
  ViewCarouselRounded,
  WhatsApp,
  Twitter,
  Instagram,
  InfoRounded,
  FileOpenRounded,
  AccountBalanceRounded,
  CardGiftcardRounded,
  DraftsRounded,
} from '@mui/icons-material';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { ManageWelcome, ManageLessons } from '../../sections/@dashboard/general/manage/index';
// sections
import { GeneralWidgetSummary } from '../../sections/@dashboard/general/analytics';
import StoreTimings from '../../Dialogs/StoreTimings';
import StoreQRCode from '../../Dialogs/StoreQRCode';
import ManageCharges from '../../Dialogs/ManageCharges';
import DeliveryZones from '../../Dialogs/DeliveryZones';
import SEOSettings from '../../Dialogs/SEOSettings';
import CreateInvoice from '../../Dialogs/CreateInvoice';
import MarketingDesignOptions from '../../Dialogs/MarketingDesignOptions';
import FaviconSettings from '../../Dialogs/Manage/FaviconSettings';
import StoreBanners from '../../Dialogs/StoreBanners';
import ShareMessage from '../../Dialogs/ShareMessage';
import OrderFlow from '../../Dialogs/OrderFlow';

export default function GeneralManage() {
  const { themeStretch } = useSettings();

  const [openStoreTimings, setOpenStoreTimings] = useState(false);

  const [openQRCode, setOpenQRCode] = useState(false);

  const [openManageCharges, setOpenManageCharges] = useState(false);

  const [openDeliveryZones, setOpenDeliveryZones] = useState(false);

  const [openSEOSettings, setOpenSEOSettings] = useState(false);

  const [openCreateInvoice, setOpenCreateInvoice] = useState(false);

  const [openMarketingDesignOptions, setOpenMarketingDesignOptions] = useState(false);

  const [openFaviconSetting, setOpenFaviconSetting] = useState(false);

  const [openBanners, setOpenBanners] = useState(false);

  const [openShareMessage, setOpenShareMessage] = useState(false);

  const [openCheckoutFlow, setOpenCheckoutFlow] = useState(false);

  const handleOpenShareMessage = () => {
    setOpenShareMessage(true);
  };

  const handleOpenCheckoutFlow = () => {
    setOpenCheckoutFlow(true);
  };

  const handleCloseShareMessage = () => {
    setOpenShareMessage(false);
  };

  const handleCloseCheckoutFlow = () => {
    setOpenCheckoutFlow(false);
  };

  const handleOpenBanners = () => {
    setOpenBanners(true);
  };

  const handleCloseBanners = () => {
    setOpenBanners(false);
  };

  const handleCloseStoreTimings = () => {
    setOpenStoreTimings(false);
  };

  const handleOpenQRCode = () => {
    setOpenQRCode(true);
  };

  const handleCloseQRCode = () => {
    setOpenQRCode(false);
  };

  const handleOpenManageCharges = () => {
    setOpenManageCharges(true);
  };

  const handleCloseManageCharges = () => {
    setOpenManageCharges(false);
  };

  const handleOpenDeliveryZones = () => {
    setOpenDeliveryZones(true);
  };

  const handleCloseDeliveryZones = () => {
    setOpenDeliveryZones(false);
  };

  const handleCloseSEOSettings = () => {
    setOpenSEOSettings(false);
  };

  const handleOpenSEOSettings = () => {
    setOpenSEOSettings(true);
  };

  // const handleOpenCreateInvoice = () => {
  //   setOpenCreateInvoice(true);
  // }

  const handleCloseCreateInvoice = () => {
    setOpenCreateInvoice(false);
  };

  const handleCloseFaviconSetting = () => {
    setOpenFaviconSetting(false);
  };

  const handleOpenFaviconSettings = () => {
    setOpenFaviconSetting(true);
  };

  const handleCloseMarketingDesignOptions = () => {
    setOpenMarketingDesignOptions(false);
  };

  return (
    <>
      <Page title="Manage store">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <ManageWelcome />
            </Grid>
            <Grid item xs={12} md={4}>
              <ManageLessons />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                title="View QR Code"
                action={handleOpenQRCode}
                total={'Store QR Code'}
                icon={<QrCode2RoundedIcon />}
                color={'error'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                title="Edit Charges"
                action={handleOpenManageCharges}
                total={'Manage Charges'}
                icon={<PointOfSaleRoundedIcon />}
                color={'success'}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                title="Edit"
                action={handleOpenSEOSettings}
                total={'SEO'}
                icon={<TravelExploreRoundedIcon />}
                color={'error'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                title="Edit"
                action={handleOpenFaviconSettings}
                total={'Store Favicon'}
                icon={<WebAssetIcon />}
                color={'warning'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                // comingSoon
                title="Edit"
                action={handleOpenDeliveryZones}
                total={'Delivery Pricing'}
                icon={<LocalShippingIcon />}
                color={'success'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                title="Update"
                action={handleOpenBanners}
                total={'Store Banners'}
                icon={<ViewCarouselRounded />}
                color={'info'}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                // comingSoon
                title="Customise"
                action={handleOpenShareMessage}
                total={'Share Message'}
                icon={<Message />}
                color={'warning'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                // comingSoon
                title="Customise"
                action={handleOpenCheckoutFlow}
                total={'Order Flow'}
                icon={<ShoppingCartCheckoutSharp />}
                color={'error'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                comingSoon
                title="Coming soon"
                // action={handleOpenCreateInvoice}
                total={'Newsletter Subscribers'}
                icon={<DraftsRounded />}
                color={'warning'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                comingSoon
                title="Get Mobile App"
                action={handleOpenSEOSettings}
                total={'Android App'}
                icon={<PhoneAndroidRoundedIcon />}
                color={'success'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                comingSoon
                title="Coming soon"
                // action={handleOpenCreateInvoice}
                total={'Business cards'}
                icon={<Store />}
                color={'warning'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                comingSoon
                title="Get Mobile App"
                action={handleOpenSEOSettings}
                total={'WhatsApp Story'}
                icon={<WhatsApp />}
                color={'success'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                title="Manage"
                action={handleOpenSEOSettings}
                total={'Gift Cards'}
                icon={<CardGiftcardRounded />}
                color={'success'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                title="Manage"
                action={handleOpenSEOSettings}
                total={'Payment Gateway'}
                icon={<AccountBalanceRounded />}
                color={'success'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                title="Manage"
                action={handleOpenSEOSettings}
                total={'Digital Services'}
                icon={<FileOpenRounded />}
                color={'success'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                title="Edit"
                action={handleOpenSEOSettings}
                total={'About Us'}
                icon={<InfoRounded />}
                color={'success'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                title="Edit"
                action={handleOpenSEOSettings}
                total={'Instagram Feed'}
                icon={<Instagram />}
                color={'success'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <GeneralWidgetSummary
                title="Edit"
                action={handleOpenSEOSettings}
                total={'Twitter Feed'}
                icon={<Twitter />}
                color={'success'}
              />
            </Grid>
          </Grid>
        </Container>
      </Page>
      {openStoreTimings && <StoreTimings open={openStoreTimings} handleClose={handleCloseStoreTimings} />}
      {openQRCode && <StoreQRCode open={openQRCode} handleClose={handleCloseQRCode} />}
      {openManageCharges && <ManageCharges open={openManageCharges} handleClose={handleCloseManageCharges} />}
      {openDeliveryZones && <DeliveryZones open={openDeliveryZones} handleClose={handleCloseDeliveryZones} />}
      {openSEOSettings && <SEOSettings open={openSEOSettings} handleClose={handleCloseSEOSettings} />}
      {openCreateInvoice && <CreateInvoice open={openCreateInvoice} handleClose={handleCloseCreateInvoice} />}
      {openMarketingDesignOptions && (
        <MarketingDesignOptions open={openMarketingDesignOptions} handleClose={handleCloseMarketingDesignOptions} />
      )}
      {openFaviconSetting && <FaviconSettings open={openFaviconSetting} handleClose={handleCloseFaviconSetting} />}
      {openBanners && <StoreBanners open={openBanners} handleClose={handleCloseBanners} />}
      {openShareMessage && <ShareMessage open={openShareMessage} handleClose={handleCloseShareMessage} />}
      {openCheckoutFlow && <OrderFlow open={openCheckoutFlow} handleClose={handleCloseCheckoutFlow} />}
    </>
  );
}
