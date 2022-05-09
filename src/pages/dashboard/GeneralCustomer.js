/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
// ----------------------------------------------------------------------
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
// @mui
import {
  Grid,
  Card,
  Container,
  Stack,
  Button,
  Typography,
  Paper,
  Grow,
  ClickAwayListener,
  ButtonGroup,
  Popper,
  Portal,
  MenuItem,
  MenuList,
} from '@mui/material';
// hooks
import { useDispatch, useSelector } from 'react-redux';
import { EditRounded } from '@mui/icons-material';
import CsvDownload from 'react-json-to-csv';
import NoCustomer from '../../assets/business-person-enjoying-break-time.png';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { BookingDetails } from '../../sections/@dashboard/general/booking';
import AddNewCustomer from '../../Dialogs/AddNewCustomer';
import { fetchCustomers } from '../../actions';
import BulkUploadCustomer from '../../Dialogs/Customer/BulkUploadCustomer';
import BulkUpdateCustomers from '../../Dialogs/Customer/BulkUpdateCustomer';

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

const options = ['Add Customer', 'Import using Excel'];
const allowed = ['phone', 'pincode', 'city', 'email', 'name'];

export default function GeneralCustomer() {
  const [openAddCustomer, setOpenAddCustomer] = useState(false);
  const [openImportCustomers, setOpenImportCustomers] = useState(false);
  const [openBulkUpdate, setOpenBulkUpdate] = useState(false);

  const { customers } = useSelector((state) => state.customer);
  const { store } = useSelector((state) => state.store);

  const [term, setTerm] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchCustomers(term));
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  const handleCloseAddCustomer = () => {
    setOpenAddCustomer(false);
  };

  const handleOpenAddCustomer = () => {
    setOpenAddCustomer(true);
  };

  const { themeStretch } = useSettings();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
    switch (selectedIndex * 1) {
      case 0:
        handleOpenAddCustomer();
        break;

      case 1:
        // Run logic to export all categories to excel
        handleOpenImportCustomers();
        break;

      default:
        break;
    }
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleOpenImportCustomers = () => {
    setOpenImportCustomers(true);
  };

  const handleCloseImportCustomers = () => {
    setOpenImportCustomers(false);
  };

  const handleOpenBulkUpdate = () => {
    setOpenBulkUpdate(true);
  };

  const handleCloseBulkUpdate = () => {
    setOpenBulkUpdate(false);
  };

  return (
    <>
      <Page title="Customers">
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

                <Stack direction="row" alignItems="center" spacing={2}>
                  {/* <div className="d-flex flex-row align-items-center justify-content-end">
                    <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                      <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                      <Button
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="add product category"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                      >
                        <ArrowDropDownRoundedIcon />
                      </Button>
                    </ButtonGroup>
                    <Portal>
                      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                  {options.map((option, index) => (
                                    <MenuItem
                                      key={option}
                                      selected={index === selectedIndex}
                                      onClick={(event) => handleMenuItemClick(event, index)}
                                    >
                                      <Typography variant="subtitle2">{option}</Typography>
                                    </MenuItem>
                                  ))}
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </Portal>
                  </div> */}
                  {/* <Button
                    onClick={() => {
                      handleOpenBulkUpdate();
                    }}
                    startIcon={<EditRounded />}
                    variant="outlined"
                  >
                    Bulk Update
                  </Button> */}
                  <CsvDownload
                    data={customers.map((el) =>
                      Object.keys(el)
                        .filter((key) => allowed.includes(key))
                        .reduce((obj, key) => {
                          obj[key] = el[key];
                          return obj;
                        }, {})
                    )}
                    filename={`customers_list_${store.storeName}.csv`}
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
              </Stack>
            </Grid>

            <Grid item xs={12}>
              {!(typeof customers !== 'undefined' && customers.length > 0) ? (
                <Stack sx={{ width: '100%' }} direction="column" alignItems="center" justifyContent="center">
                  <Card sx={{ p: 3, my: 3 }}>
                    <img style={{ height: '150px', width: '150px' }} src={NoCustomer} alt="no customer" />
                  </Card>
                  <Typography sx={{ mb: 3 }} variant="subtitle2">
                    Oh no, you haven't got any customers, please market your store and earn more
                  </Typography>
                </Stack>
              ) : (
                <BookingDetails customers={customers} />
              )}
            </Grid>
          </Grid>
        </Container>
      </Page>

      {openAddCustomer && <AddNewCustomer open={openAddCustomer} handleClose={handleCloseAddCustomer} />}
      {openImportCustomers && (
        <BulkUploadCustomer open={openImportCustomers} handleClose={handleCloseImportCustomers} />
      )}
      {openBulkUpdate && <BulkUpdateCustomers open={openBulkUpdate} handleClose={handleCloseBulkUpdate} />}
    </>
  );
}