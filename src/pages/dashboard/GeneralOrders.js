/* eslint-disable react-hooks/exhaustive-deps */
// React select
import { useState, useEffect } from 'react';
// @mui
import Stack from '@mui/material/Stack';

import { styled, alpha } from '@mui/material/styles';
import { Container, Grid, Card, Typography, IconButton } from '@mui/material';

import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

// ----------------------------------------------------------------------
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

// hooks
import { useDispatch, useSelector } from 'react-redux';
import CsvDownload from 'react-json-to-csv';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { OrderDetails } from '../../sections/@dashboard/general/booking';
import { fetchOrders, fetchShipments } from '../../actions';

import NoOrder from '../../assets/shopping-basket.png';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#9C9C9C', 0.15),
  '&:hover': {
    backgroundColor: alpha('#9C9C9C', 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const allowed = ['ref', 'status', 'createdAt', 'charges', 'customer'];

export default function GeneralOrders() {
  const dispatch = useDispatch();

  const [term, setTerm] = useState('');
  const { store } = useSelector((state) => state.store);
  const { orders } = useSelector((state) => state.order);

  const storeName = store.name;
  const link = `qwikshop.online/${store.subName}`;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchOrders(term));
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  useEffect(() => {
    dispatch(fetchShipments());
  }, []);

  const { themeStretch } = useSettings();

  return (
    <Page title="Orders List">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" className="mb-4 d-flex flex-row align-items-center justify-content-between">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  onChange={(e) => {
                    setTerm(e.target.value);
                  }}
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              <CsvDownload
                data={orders.map((el) =>
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
            {!(typeof orders !== 'undefined' && orders.length > 0) ? (
              <Stack sx={{ width: '100%' }} direction="column" alignItems="center" justifyContent="center">
                <Card sx={{ p: 3, my: 3 }}>
                  <img style={{ height: '150px', width: '150px' }} src={NoOrder} alt="no active order" />
                </Card>
                <Typography sx={{ mb: 3 }} variant="subtitle2">
                  Please share your store to get orders
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  
                    <WhatsappShareButton url={link} title={storeName} separator=":">
                      {' '}
                      <WhatsappIcon round size={35} />{' '}
                    </WhatsappShareButton>
                  
                  
                    <FacebookShareButton url={link} quote={storeName}>
                      <FacebookIcon round size={35} />
                    </FacebookShareButton>
                  
                  
                    <TelegramShareButton url={link} title={storeName}>
                      <TelegramIcon round size={35} />
                    </TelegramShareButton>
                  
                  
                    <TwitterShareButton url={link} title={storeName}>
                      <TwitterIcon round size={35} />
                    </TwitterShareButton>
                  
                </Stack>
              </Stack>
            ) : (
              <OrderDetails />
            )}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
