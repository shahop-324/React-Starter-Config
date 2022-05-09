/* eslint-disable react-hooks/exhaustive-deps */
// React select
import React, { useEffect } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import { Container, Grid, Typography, Card } from '@mui/material';
// hooks
import { useDispatch, useSelector } from 'react-redux';
import CsvDownload from 'react-json-to-csv';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { AbondonedCartDetails } from '../../sections/@dashboard/general/booking';
import { fetchAbondonedCarts } from '../../actions';
import NoAbondonedCart from '../../assets/empty-cart.png';

const allowed = ['name', 'contact', 'amount', 'updatedAt'];

export default function GeneralOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAbondonedCarts());
  }, []);

  const { store } = useSelector((state) => state.store);
  const { abondonedCarts } = useSelector((state) => state.order);

  const { themeStretch } = useSettings();

  return (
    <Page title="Abandoned cart List">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" className="mb-4 d-flex flex-row align-items-center justify-content-between">
              <Typography variant="h6">Abandoned Carts</Typography>
              <CsvDownload
                data={abondonedCarts.map((el) =>
                  Object.keys(el)
                    .filter((key) => allowed.includes(key))
                    .reduce((obj, key) => {
                      obj[key] = el[key];
                      return obj;
                    }, {})
                )}
                filename={`products_list_${store.storeName}.csv`}
                style={{
                  boxShadow: 'inset 0px 1px 0px 0px #00AB55',
                  background: 'linear-gradient(to bottom, #00AB55 5%, #13C06A 100%)',
                  backgroundColor: '#08BD62',
                  borderRadius: '6px',
                  border: '1px solid #00AB55',
                  display: 'inline-block',
                  cursor: 'pointer',
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  padding: '6px 24px',
                  textDecoration: 'none',
                  textShadow: '0px 1px 0px #0C8F4D',
                }}
              >
                Export
              </CsvDownload>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            {!(typeof abondonedCarts !== 'undefined' && abondonedCarts.length > 0) ? (
              <Stack sx={{ width: '100%' }} direction="column" alignItems="center" justifyContent="center">
                <Card sx={{ p: 3, my: 3 }}>
                  <img style={{ height: '150px', width: '150px' }} src={NoAbondonedCart} alt="no abondoned cart" />
                </Card>
                <Typography sx={{ mb: 3 }} variant="subtitle2">
                  There are no Abandoned carts in your store
                </Typography>
              </Stack>
            ) : (
              <AbondonedCartDetails />
            )}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
