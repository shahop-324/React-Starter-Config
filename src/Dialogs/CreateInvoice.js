/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { v4 as uuidv4 } from 'uuid';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// @mui
import {
  Box,
  Card,
  Grid,
  Dialog,
  DialogTitle,
  TextField,
  Autocomplete,
  Button,
  InputAdornment,
} from '@mui/material';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import PhoneInput from 'react-phone-number-input';
import CustomPhoneNumber from '../forms/PhoneNumber';

const CreateInvoice = ({ open, handleClose }) => {
  const [invoiceFrom, setInvoiceFrom] = useState({
    name: '',
    phone: '',
    country: { label: '', image: '' },
    state: '',
    city: '',
    address: '',
    pincode: '',
    landmark: '',
  });
  const [invoiceTo, setInvoiceTo] = useState({
    name: '',
    phone: '',
    country: { label: '', image: '' },
    state: '',
    city: '',
    address: '',
    pincode: '',
    landmark: '',
  });

  const [note, setNote] = useState('');

  const [billIsPaid, setBillIsPaid] = useState(false);

  const [supportEmail, setSupportEmail] = useState('');

  const [products, setProducts] = useState([{ index: '', product: { label: '', id: '', image: '' }, quantity: 0 }]);
  const [charges, setCharges] = useState([{ index: '', type: { label: 'discount' }, name: '', amount: '' }]);

  const addProductRow = () => {
    setProducts((prev) => [...prev, { index: uuidv4(), product: { name: '', id: '', image: '' }, quantity: 0 }]);
  };

  const deleteProductRow = (index) => {
    setProducts((prev) => prev.filter((el) => el.index !== index));
  };

  const updateProduct = (value, index, field) => {
    setProducts((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el[field] = value;
        return el;
      })
    );
  };

  const updateInvoiceFrom = (value, field) => {
    setInvoiceFrom((prev) => {
      prev[field] = value;
      return prev;
    });
  };

  const updateInvoiceTo = (value, field) => {
    setInvoiceTo((prev) => {
      prev[field] = value;
      return prev;
    });
  };

  const addChargeRow = () => {
    setCharges((prev) => [...prev, { index: uuidv4(), type: { label: 'discount' }, name: '', amount: '' }]);
  };

  const deleteChargeRow = (index) => {
    setCharges((prev) => prev.filter((el) => el.index !== index));
  };

  const updateCharge = (value, index, field) => {
    setCharges((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el[field] = value;
        return el;
      })
    );
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <div className="d-flex flex-row align-items-center justify-content-between px-4 py-2">
          <DialogTitle>Generate Invoice</DialogTitle>
          <div className="d-flex flex-row align-items-center justify-content-end">
            <Button variant="contained" className="me-3">
              Genrate
            </Button>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
          </div>
        </div>

        <Grid className="px-4 pt-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }} className="mb-3">
              <div>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Invoice from</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid className="pt-3" container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Card sx={{ p: 3 }}>
                          <Box
                            sx={{
                              display: 'grid',
                              columnGap: 2,
                              rowGap: 3,
                              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                            }}
                          >
                            <TextField
                              name="name"
                              label="Name"
                              fullWidth
                              value={invoiceFrom.name}
                              onChange={(e) => {
                                updateInvoiceFrom(e.target.value, 'name');
                              }}
                            />
                            <PhoneInput
                              name="phoneNumber"
                              placeholder="Enter phone number"
                              value={invoiceFrom.phone}
                              onChange={(value) => updateInvoiceFrom(value, 'phone')}
                              inputComponent={CustomPhoneNumber}
                              defaultCountry="IN"
                            />
                            <Autocomplete
                              value={invoiceFrom.country}
                              onChange={(e, value) => {
                                updateInvoiceFrom(value, 'country');
                              }}
                              id="country-select-demo"
                              fullWidth
                              options={countries}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                    alt=""
                                  />
                                  {option.label} ({option.code}) +{option.phone}
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a country"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                            <TextField
                              name="state"
                              label="State/Region"
                              fullWidth
                              value={invoiceFrom.state}
                              onChange={(e) => {
                                updateInvoiceFrom(e.target.value, 'state');
                              }}
                            />
                            <TextField
                              name="city"
                              label="City"
                              fullWidth
                              value={invoiceFrom.city}
                              onChange={(e) => {
                                updateInvoiceFrom(e.target.value, 'city');
                              }}
                            />
                            <TextField
                              name="address"
                              label="Address"
                              fullWidth
                              value={invoiceFrom.address}
                              onChange={(e) => {
                                updateInvoiceFrom(e.target.value, 'address');
                              }}
                            />
                            <TextField
                              name="pincode"
                              label="Pincode"
                              fullWidth
                              value={invoiceFrom.pincode}
                              onChange={(e) => {
                                updateInvoiceFrom(e.target.value, 'pincode');
                              }}
                            />
                            <TextField
                              name="landmark"
                              label="Landmark"
                              fullWidth
                              value={invoiceFrom.landmark}
                              onChange={(e) => {
                                updateInvoiceFrom(e.target.value, 'landmark');
                              }}
                            />
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography>Invoice to</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid className="pt-3" container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Card sx={{ p: 3 }}>
                          <Box
                            sx={{
                              display: 'grid',
                              columnGap: 2,
                              rowGap: 3,
                              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                            }}
                          >
                            <TextField
                              name="name"
                              label="Name"
                              fullWidth
                              value={invoiceTo.name}
                              onChange={(e) => {
                                updateInvoiceTo(e.target.value, 'name');
                              }}
                            />
                            <PhoneInput
                              name="phoneNumber"
                              placeholder="Enter phone number"
                              value={invoiceTo.phone}
                              onChange={(value) => updateInvoiceTo(value, 'phone')}
                              inputComponent={CustomPhoneNumber}
                              defaultCountry="IN"
                            />
                            <Autocomplete
                              value={invoiceTo.country}
                              onChange={(e, value) => {
                                updateInvoiceTo(value, 'country');
                              }}
                              id="country-select-demo"
                              fullWidth
                              options={countries}
                              autoHighlight
                              getOptionLabel={(option) => option.label}
                              renderOption={(props, option) => (
                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                    alt=""
                                  />
                                  {option.label} ({option.code}) +{option.phone}
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Choose a country"
                                  inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                  }}
                                />
                              )}
                            />
                            <TextField
                              name="state"
                              label="State/Region"
                              fullWidth
                              value={invoiceTo.state}
                              onChange={(e) => {
                                updateInvoiceTo(e.target.value, 'state');
                              }}
                            />
                            <TextField
                              name="city"
                              label="City"
                              fullWidth
                              value={invoiceTo.city}
                              onChange={(e) => {
                                updateInvoiceTo(e.target.value, 'city');
                              }}
                            />
                            <TextField
                              name="address"
                              label="Address"
                              fullWidth
                              value={invoiceTo.address}
                              onChange={(e) => {
                                updateInvoiceTo(e.target.value, 'address');
                              }}
                            />
                            <TextField
                              name="pincode"
                              label="Pincode"
                              fullWidth
                              value={invoiceTo.pincode}
                              onChange={(e) => {
                                updateInvoiceTo(e.target.value, 'pincode');
                              }}
                            />
                            <TextField
                              name="landmark"
                              label="Landmark"
                              fullWidth
                              value={invoiceTo.landmark}
                              onChange={(e) => {
                                updateInvoiceTo(e.target.value, 'landmark');
                              }}
                            />
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography>Items/Products</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {products.map((el) => (
                      <div key={el.index}>
                        <Grid className="pt-3" container spacing={3}>
                          <Grid item xs={12} md={12}>
                            <Card sx={{ p: 3 }}>
                              <Box
                                sx={{
                                  display: 'grid',
                                  columnGap: 2,
                                  rowGap: 3,
                                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                }}
                              >
                                <Autocomplete
                                  value={el.product}
                                  onChange={(e, value) => {
                                    updateProduct(value, el.index, 'product');
                                  }}
                                  id="country-select-demo"
                                  fullWidth
                                  options={productOptions}
                                  autoHighlight
                                  getOptionLabel={(option) => option.label}
                                  renderOption={(props, option) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                      <img
                                        loading="lazy"
                                        width="20"
                                        src={option.image}
                                        srcSet={`${option.image}`}
                                        alt=""
                                      />
                                      {option.label}
                                    </Box>
                                  )}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Choose a product"
                                      inputProps={{
                                        ...params.inputProps,
                                        autoComplete: '', // disable autocomplete and autofill
                                      }}
                                    />
                                  )}
                                />
                                <TextField
                                  name="productQuantity"
                                  label="Quantity"
                                  fullWidth
                                  value={el.quantity}
                                  onChange={(e) => {
                                    updateProduct(e.target.value, el.index, 'quantity');
                                  }}
                                />
                              </Box>
                              <div className="d-flex flex-row align-items-center justify-content-end mt-3">
                                <Button
                                  onClick={() => {
                                    deleteProductRow(el.index);
                                  }}
                                  color="error"
                                >
                                  Remove item
                                </Button>
                              </div>
                            </Card>
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                    <div className="d-flex flex-row align-items-center justify-content-center my-2">
                      <Button
                        onClick={() => {
                          addProductRow();
                        }}
                        variant="outlined"
                      >
                        Add item
                      </Button>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography>Discounts/Charges/Tax</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {charges.map((el) => (
                      <div key={el.index}>
                        <Grid className="pt-3" container spacing={3}>
                          <Grid item xs={12} md={12}>
                            <Card sx={{ p: 3 }}>
                              <Box
                                sx={{
                                  display: 'grid',
                                  columnGap: 2,
                                  rowGap: 3,
                                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                                }}
                              >
                                <Autocomplete
                                  value={el.type}
                                  onChange={(e, value) => {
                                    updateCharge(value, el.index, 'type');
                                  }}
                                  id="charge-type"
                                  fullWidth
                                  options={chargesTypeOptions}
                                  autoHighlight
                                  getOptionLabel={(option) => option.label}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Choose a charge type"
                                      inputProps={{
                                        ...params.inputProps,
                                        autoComplete: '', // disable autocomplete and autofill
                                      }}
                                    />
                                  )}
                                />
                                <TextField
                                  name="chargeName"
                                  label="Charge / Discount Name"
                                  fullWidth
                                  value={el.name}
                                  onChange={(e) => {
                                    updateCharge(e.target.value, el.index, 'name');
                                  }}
                                />
                                <TextField
                                  name="chargeAmount"
                                  label="Charge amount"
                                  fullWidth
                                  value={el.amount}
                                  onChange={(e) => {
                                    updateCharge(e.target.value, el.index, 'amount');
                                  }}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment>
                                        <CurrencyRupeeRoundedIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Box>
                              <div className="d-flex flex-row align-items-center justify-content-end mt-3">
                                <Button
                                  onClick={() => {
                                    deleteChargeRow(el.index);
                                  }}
                                  color="error"
                                >
                                  Remove charge
                                </Button>
                              </div>
                            </Card>
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                    <div className="d-flex flex-row align-items-center justify-content-center my-2">
                      <Button
                        onClick={() => {
                          addChargeRow();
                        }}
                        variant="outlined"
                      >
                        Add Discount / Charge
                      </Button>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography>Note</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid className="pt-3" container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Card sx={{ p: 3 }}>
                          <Box
                            sx={{
                              display: 'grid',
                              columnGap: 2,
                              rowGap: 3,
                              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                          >
                            <TextField
                              name="noteToCustomer"
                              label="Note to customer"
                              fullWidth
                              value={note}
                              onChange={(e) => {
                                setNote(e.target.value);
                              }}
                            />
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography>Other Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid className="pt-3" container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Card sx={{ p: 3 }}>
                          <Box
                            sx={{
                              display: 'grid',
                              columnGap: 2,
                              rowGap: 3,
                              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                            }}
                          >
                            <TextField
                              name="supportEmail"
                              label="Support Email"
                              fullWidth
                              value={supportEmail}
                              onChange={(e) => {
                                setSupportEmail(e.target.value);
                              }}
                            />

                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={billIsPaid}
                                    onChange={(e, value) => setBillIsPaid(value)}
                                    defaultChecked
                                  />
                                }
                                label="Bill is paid by customer"
                              />
                            </FormGroup>
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default CreateInvoice;

// Name, Address, Phone
// Name, Address, Phone
// Items
// Discount / Charges / Tax
// Notes
// Other Details

const chargesTypeOptions = [{ label: 'Discount' }, { label: 'GST' }, { label: 'VAT' }, { label: 'Other charges' }];

const productOptions = [
  {
    label: 'Aloo paratha',
    id: '123',
    image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2020/08/aloo-paratha-recipe.jpg',
  },
  { label: 'Masala Dosa', id: '1234', image: 'https://i.ytimg.com/vi/CCab5oh0ZOc/maxresdefault.jpg' },
  {
    label: 'Chole Bhature',
    id: '12345678',
    image: 'https://bigoven-res.cloudinary.com/image/upload/t_recipe-1280/chana-bhatura-0ee3ab7d0f229c6b0bd89cdc.jpg',
  },
];

const countries = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  {
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971',
  },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  {
    code: 'AG',
    label: 'Antigua and Barbuda',
    phone: '1-268',
  },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  {
    code: 'AU',
    label: 'Australia',
    phone: '61',
    suggested: true,
  },
  { code: 'AW', label: 'Aruba', phone: '297' },
  { code: 'AX', label: 'Alland Islands', phone: '358' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  {
    code: 'BA',
    label: 'Bosnia and Herzegovina',
    phone: '387',
  },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'BH', label: 'Bahrain', phone: '973' },
  { code: 'BI', label: 'Burundi', phone: '257' },
  { code: 'BJ', label: 'Benin', phone: '229' },
  { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
  { code: 'BM', label: 'Bermuda', phone: '1-441' },
  { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BT', label: 'Bhutan', phone: '975' },
  { code: 'BV', label: 'Bouvet Island', phone: '47' },
  { code: 'BW', label: 'Botswana', phone: '267' },
  { code: 'BY', label: 'Belarus', phone: '375' },
  { code: 'BZ', label: 'Belize', phone: '501' },
  {
    code: 'CA',
    label: 'Canada',
    phone: '1',
    suggested: true,
  },
  {
    code: 'CC',
    label: 'Cocos (Keeling) Islands',
    phone: '61',
  },
  {
    code: 'CD',
    label: 'Congo, Democratic Republic of the',
    phone: '243',
  },
  {
    code: 'CF',
    label: 'Central African Republic',
    phone: '236',
  },
  {
    code: 'CG',
    label: 'Congo, Republic of the',
    phone: '242',
  },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { code: 'CK', label: 'Cook Islands', phone: '682' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CM', label: 'Cameroon', phone: '237' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CV', label: 'Cape Verde', phone: '238' },
  { code: 'CW', label: 'Curacao', phone: '599' },
  { code: 'CX', label: 'Christmas Island', phone: '61' },
  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  {
    code: 'DE',
    label: 'Germany',
    phone: '49',
    suggested: true,
  },
  { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  {
    code: 'DO',
    label: 'Dominican Republic',
    phone: '1-809',
  },
  { code: 'DZ', label: 'Algeria', phone: '213' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'EH', label: 'Western Sahara', phone: '212' },
  { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'FJ', label: 'Fiji', phone: '679' },
  {
    code: 'FK',
    label: 'Falkland Islands (Malvinas)',
    phone: '500',
  },
  {
    code: 'FM',
    label: 'Micronesia, Federated States of',
    phone: '691',
  },
  { code: 'FO', label: 'Faroe Islands', phone: '298' },
  {
    code: 'FR',
    label: 'France',
    phone: '33',
    suggested: true,
  },
  { code: 'GA', label: 'Gabon', phone: '241' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GD', label: 'Grenada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GF', label: 'French Guiana', phone: '594' },
  { code: 'GG', label: 'Guernsey', phone: '44' },
  { code: 'GH', label: 'Ghana', phone: '233' },
  { code: 'GI', label: 'Gibraltar', phone: '350' },
  { code: 'GL', label: 'Greenland', phone: '299' },
  { code: 'GM', label: 'Gambia', phone: '220' },
  { code: 'GN', label: 'Guinea', phone: '224' },
  { code: 'GP', label: 'Guadeloupe', phone: '590' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  {
    code: 'GS',
    label: 'South Georgia and the South Sandwich Islands',
    phone: '500',
  },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'GU', label: 'Guam', phone: '1-671' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { code: 'GY', label: 'Guyana', phone: '592' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  {
    code: 'HM',
    label: 'Heard Island and McDonald Islands',
    phone: '672',
  },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IM', label: 'Isle of Man', phone: '44' },
  { code: 'IN', label: 'India', phone: '91' },
  {
    code: 'IO',
    label: 'British Indian Ocean Territory',
    phone: '246',
  },
  { code: 'IQ', label: 'Iraq', phone: '964' },
  {
    code: 'IR',
    label: 'Iran, Islamic Republic of',
    phone: '98',
  },
  { code: 'IS', label: 'Iceland', phone: '354' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JE', label: 'Jersey', phone: '44' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'JO', label: 'Jordan', phone: '962' },
  {
    code: 'JP',
    label: 'Japan',
    phone: '81',
    suggested: true,
  },
  { code: 'KE', label: 'Kenya', phone: '254' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { code: 'KH', label: 'Cambodia', phone: '855' },
  { code: 'KI', label: 'Kiribati', phone: '686' },
  { code: 'KM', label: 'Comoros', phone: '269' },
  {
    code: 'KN',
    label: 'Saint Kitts and Nevis',
    phone: '1-869',
  },
  {
    code: 'KP',
    label: "Korea, Democratic People's Republic of",
    phone: '850',
  },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { code: 'KW', label: 'Kuwait', phone: '965' },
  { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7' },
  {
    code: 'LA',
    label: "Lao People's Democratic Republic",
    phone: '856',
  },
  { code: 'LB', label: 'Lebanon', phone: '961' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { code: 'LI', label: 'Liechtenstein', phone: '423' },
  { code: 'LK', label: 'Sri Lanka', phone: '94' },
  { code: 'LR', label: 'Liberia', phone: '231' },
  { code: 'LS', label: 'Lesotho', phone: '266' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'LY', label: 'Libya', phone: '218' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MC', label: 'Monaco', phone: '377' },
  {
    code: 'MD',
    label: 'Moldova, Republic of',
    phone: '373',
  },
  { code: 'ME', label: 'Montenegro', phone: '382' },
  {
    code: 'MF',
    label: 'Saint Martin (French part)',
    phone: '590',
  },
  { code: 'MG', label: 'Madagascar', phone: '261' },
  { code: 'MH', label: 'Marshall Islands', phone: '692' },
  {
    code: 'MK',
    label: 'Macedonia, the Former Yugoslav Republic of',
    phone: '389',
  },
  { code: 'ML', label: 'Mali', phone: '223' },
  { code: 'MM', label: 'Myanmar', phone: '95' },
  { code: 'MN', label: 'Mongolia', phone: '976' },
  { code: 'MO', label: 'Macao', phone: '853' },
  {
    code: 'MP',
    label: 'Northern Mariana Islands',
    phone: '1-670',
  },
  { code: 'MQ', label: 'Martinique', phone: '596' },
  { code: 'MR', label: 'Mauritania', phone: '222' },
  { code: 'MS', label: 'Montserrat', phone: '1-664' },
  { code: 'MT', label: 'Malta', phone: '356' },
  { code: 'MU', label: 'Mauritius', phone: '230' },
  { code: 'MV', label: 'Maldives', phone: '960' },
  { code: 'MW', label: 'Malawi', phone: '265' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'MZ', label: 'Mozambique', phone: '258' },
  { code: 'NA', label: 'Namibia', phone: '264' },
  { code: 'NC', label: 'New Caledonia', phone: '687' },
  { code: 'NE', label: 'Niger', phone: '227' },
  { code: 'NF', label: 'Norfolk Island', phone: '672' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NP', label: 'Nepal', phone: '977' },
  { code: 'NR', label: 'Nauru', phone: '674' },
  { code: 'NU', label: 'Niue', phone: '683' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'OM', label: 'Oman', phone: '968' },
  { code: 'PA', label: 'Panama', phone: '507' },
  { code: 'PE', label: 'Peru', phone: '51' },
  { code: 'PF', label: 'French Polynesia', phone: '689' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PK', label: 'Pakistan', phone: '92' },
  { code: 'PL', label: 'Poland', phone: '48' },
  {
    code: 'PM',
    label: 'Saint Pierre and Miquelon',
    phone: '508',
  },
  { code: 'PN', label: 'Pitcairn', phone: '870' },
  { code: 'PR', label: 'Puerto Rico', phone: '1' },
  {
    code: 'PS',
    label: 'Palestine, State of',
    phone: '970',
  },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'PW', label: 'Palau', phone: '680' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'QA', label: 'Qatar', phone: '974' },
  { code: 'RE', label: 'Reunion', phone: '262' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russian Federation', phone: '7' },
  { code: 'RW', label: 'Rwanda', phone: '250' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SB', label: 'Solomon Islands', phone: '677' },
  { code: 'SC', label: 'Seychelles', phone: '248' },
  { code: 'SD', label: 'Sudan', phone: '249' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SH', label: 'Saint Helena', phone: '290' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  {
    code: 'SJ',
    label: 'Svalbard and Jan Mayen',
    phone: '47',
  },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'SL', label: 'Sierra Leone', phone: '232' },
  { code: 'SM', label: 'San Marino', phone: '378' },
  { code: 'SN', label: 'Senegal', phone: '221' },
  { code: 'SO', label: 'Somalia', phone: '252' },
  { code: 'SR', label: 'Suriname', phone: '597' },
  { code: 'SS', label: 'South Sudan', phone: '211' },
  {
    code: 'ST',
    label: 'Sao Tome and Principe',
    phone: '239',
  },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  {
    code: 'SX',
    label: 'Sint Maarten (Dutch part)',
    phone: '1-721',
  },
  {
    code: 'SY',
    label: 'Syrian Arab Republic',
    phone: '963',
  },
  { code: 'SZ', label: 'Swaziland', phone: '268' },
  {
    code: 'TC',
    label: 'Turks and Caicos Islands',
    phone: '1-649',
  },
  { code: 'TD', label: 'Chad', phone: '235' },
  {
    code: 'TF',
    label: 'French Southern Territories',
    phone: '262',
  },
  { code: 'TG', label: 'Togo', phone: '228' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TJ', label: 'Tajikistan', phone: '992' },
  { code: 'TK', label: 'Tokelau', phone: '690' },
  { code: 'TL', label: 'Timor-Leste', phone: '670' },
  { code: 'TM', label: 'Turkmenistan', phone: '993' },
  { code: 'TN', label: 'Tunisia', phone: '216' },
  { code: 'TO', label: 'Tonga', phone: '676' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  {
    code: 'TT',
    label: 'Trinidad and Tobago',
    phone: '1-868',
  },
  { code: 'TV', label: 'Tuvalu', phone: '688' },
  {
    code: 'TW',
    label: 'Taiwan, Province of China',
    phone: '886',
  },
  {
    code: 'TZ',
    label: 'United Republic of Tanzania',
    phone: '255',
  },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  {
    code: 'US',
    label: 'United States',
    phone: '1',
    suggested: true,
  },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  {
    code: 'VA',
    label: 'Holy See (Vatican City State)',
    phone: '379',
  },
  {
    code: 'VC',
    label: 'Saint Vincent and the Grenadines',
    phone: '1-784',
  },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  {
    code: 'VG',
    label: 'British Virgin Islands',
    phone: '1-284',
  },
  {
    code: 'VI',
    label: 'US Virgin Islands',
    phone: '1-340',
  },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'XK', label: 'Kosovo', phone: '383' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'YT', label: 'Mayotte', phone: '262' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' },
];
