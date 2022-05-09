/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
// @mui
import { Container, Grid, Stack } from '@mui/material';
// hooks
import { useDispatch, useSelector } from 'react-redux';
import StoreMallDirectoryRoundedIcon from '@mui/icons-material/StoreMallDirectoryRounded';
import StoreSetup from '../../Dialogs/StoreSetup';
import StoreImage from '../../Dialogs/StoreImage';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { AppWelcome, AppFeatured } from '../../sections/@dashboard/general/home';

// sections
import { BankingInviteFriends, BankingRecentTransitions } from '../../sections/@dashboard/general/banking';

import { EcommerceWidgetSummary } from '../../sections/@dashboard/general/orders';
import { fetchCustomers, fetchRecentOrder, stopLoginBtnLoader } from '../../actions';
import StoreCreated from '../../Dialogs/StoreCreated';

import AmountOnHold from '../../assets/deposit-box.png';
import Customer from '../../assets/customer.png';
import AmountPaid from '../../assets/money-bag.png';
import Product from '../../assets/product.png';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { store } = useSelector((state) => state.store);

  const { amountOnHold, amountPaid, productsSold, storeViews } = store;

  const { customers } = useSelector((state) => state.customer);

  const [openStoreSetup, setOpenStoreSetup] = useState(store ? !store?.setupCompleted : false);

  const [openStoreImage, setOpenStoreImage] = useState(false);

  const [openStoreCreated, setOpenStoreCreated] = useState(false);

  const handleOpenStoreCreated = () => {
    setOpenStoreCreated(true);
  };

  const handleCloseStoreCreated = () => {
    setOpenStoreCreated(false);
  };

  const handleOpenStoreImage = () => {
    setOpenStoreImage(true);
  };

  const handleCloseStoreImage = () => {
    setOpenStoreImage(false);
  };

  const handleCloseStoreSetup = () => {
    setOpenStoreSetup(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stopLoginBtnLoader());
    dispatch(fetchCustomers());
    dispatch(fetchRecentOrder());
  }, []);

  const { user } = useSelector((state) => state.user);

  const { themeStretch } = useSettings();

  return (
    <>
      <Page title="General: App">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <AppWelcome
                storeName={
                  store.shareStoreMessage
                    ? store.shareStoreMessage
                        .replace(/{{storeName}}/g, store.storeName)
                        .replace(/{{storeLink}}/g, `qwikshop.online/${store.subName}`)
                    : store.name
                }
                displayName={`${user?.firstName} ${user?.lastName}`}
                link={`qwikshop.online/${store.subName}`}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <AppFeatured />
            </Grid>

            <Grid item xs={12} md={4}>
              <EcommerceWidgetSummary
                title="Product Sold"
                total={productsSold}
                widget={<img src={Product} alt="customer" style={{ height: '100px', width: '100px' }} />}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <EcommerceWidgetSummary
                title="Total customers"
                total={customers.length}
                widget={<img src={Customer} alt="customer" style={{ height: '100px', width: '100px' }} />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <EcommerceWidgetSummary
                title="Store views"
                total={storeViews}
                widget={<StoreMallDirectoryRoundedIcon style={{ fontSize: '100px', color: '#538BF7' }} />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <EcommerceWidgetSummary
                title="Amount on hold"
                total={amountOnHold}
                widget={<img src={AmountOnHold} alt="amount on hold" style={{ height: '100px', width: '100px' }} />}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <EcommerceWidgetSummary
                title="Amount paid"
                total={amountPaid}
                widget={<img src={AmountPaid} alt="amount paid" style={{ height: '100px', width: '100px' }} />}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                <BankingRecentTransitions storeName={store.name} link={`qwikshop.online/${store.subName}`} />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <BankingInviteFriends />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Page>
      {openStoreSetup && (
        <StoreSetup
          open={openStoreSetup}
          handleClose={handleCloseStoreSetup}
          handleOpenStoreImage={handleOpenStoreImage}
        />
      )}
      {openStoreImage && (
        <StoreImage
          open={openStoreImage}
          handleClose={handleCloseStoreImage}
          handleOpenStoreCreated={handleOpenStoreCreated}
        />
      )}
      {openStoreCreated && <StoreCreated open={openStoreCreated} handleClose={handleCloseStoreCreated} />}
    </>
  );
}
