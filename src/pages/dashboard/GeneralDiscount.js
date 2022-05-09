/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import '../../index.css';
import { styled, alpha } from '@mui/material/styles';
import { useFormik } from 'formik';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PercentIcon from '@mui/icons-material/Percent';
import SearchIcon from '@mui/icons-material/Search';

import { LoadingButton, MobileDateTimePicker } from '@mui/lab';

// @mui
import { Grid, Container, Typography, Button, Box, Autocomplete, InputBase } from '@mui/material';
import {
  createNewDiscount,
  fetchDiscounts,
  fetchCategory,
  fetchDivision,
  fetchProducts,
  fetchSubCategory,
} from '../../actions';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { DiscountWelcome, DiscountLessons } from '../../sections/@dashboard/general/discount/index';
import DiscountCard from '../../components/DiscountCard';
import AddNewDiscount from '../../Dialogs/Discount/AddNewDiscount';

// ----------------------------------------------------------------------

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

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

export default function GeneralDiscount() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const { divisions } = useSelector((state) => state.division);
  const { categories } = useSelector((state) => state.category);
  const { subCategories } = useSelector((state) => state.subCategory);
  const { products } = useSelector((state) => state.product);

  const { discounts } = useSelector((state) => state.discount);

  const [openCreateDiscount, setOpenCreateDiscount] = useState(false);

  const [term, setTerm] = useState('');

  const formik = useFormik({
    initialValues: {
      buyX: 1,
      getY: 1,
      numberOfCoupons: 50,
      discountCode: '',
      usesPerCustomer: 1,
      discountPercentage: 1,
      discountAmount: 1,
      minOrderValue: 1,
      maxDiscount: 1,
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      buyX: Yup.number().min(1, 'Must be minimum 1'),
      getY: Yup.number().min(1, 'Must be minimum 1'),
      numberOfCoupons: Yup.number().min(1, 'Must be minimum 1').required('Number of coupons is required'),
      discountCode: Yup.string()
        .uppercase('Must be completely Uppercase')
        .min(1, 'Must be more than 5 characters')
        .required('Discount Code is required'),
      usesPerCustomer: Yup.string().min(1, 'Must be more than 5 characters').required('Discount Code is required'),
      discountPercentage: Yup.number().min(1, 'Must be minimum 1'),
      discountAmount: Yup.number().min(1, 'Must be minimum Rs.1'),
      minOrderValue: Yup.number().min(1, 'Must be minimum Rs.1'),
      maxDiscount: Yup.number(),
    }),
    onSubmit: (values) => {
      const formValues = {
        buyX: values.buyX,
        getY: values.getY,
        numberOfCoupons: values.numberOfCoupons,
        discountCode: values.discountCode,
        usesPerCustomer: values.usesPerCustomer,
        discountPercentage: values.discountPercentage,
        discountAmount: values.discountAmount,
        minOrderValue: values.minOrderValue,
        maxDiscount: values.maxDiscount,

        discountType,
        applicableOn,
        type,

        applicableFromDateTime,
        applicableTillDateTime,
        boughtProduct,
        givenProduct,
        applicableCategories,
        applicableSubCategories,
        applicableDivisions,
        applicableProducts,
        showToCustomer,
      };

      dispatch(createNewDiscount(formValues));
    },
  });

  // Fetch all categories
  // Fetch all subcategories
  // Fetch all products
  // Fetch all divisions

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchSubCategory());
    dispatch(fetchProducts());
    dispatch(fetchDivision());
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchDiscounts(term));
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  const handleOpenCreateDiscount = () => {
    setOpenCreateDiscount(true);
  };

  const handleCloseCreateDiscount = () => {
    setOpenCreateDiscount(false);
  };

  const [discountType, setDiscountType] = useState('percentage');
  const [type, setType] = useState('regular');
  const [applicableOn, setApplicableOn] = useState('allProducts');
  const [applicableFromDateTime, setApplicableFromDateTime] = React.useState(new Date());
  const [applicableTillDateTime, setApplicableTillDateTime] = React.useState(new Date());
  const [applicableCategories, setApplicableCategoories] = useState([]);
  const [applicableSubCategories, setApplicableSubCategories] = useState([]);
  const [applicableDivisions, setApplicableDivisions] = useState([]);
  const [applicableProducts, setApplicableProducts] = useState([]);
  const [boughtProduct, setBoughtProduct] = useState(null);
  const [givenProduct, setGivenProduct] = useState(null);
  const [showToCustomer, setShowToCustomer] = useState();

  const { themeStretch } = useSettings();

  

  const categoryOptions = categories.map((el) => ({
    label: el.name,
    value: el._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${el.image}`,
  }));

  const productOptions = products.map((el) => ({
    label: el.productName,
    value: el._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${el.images[0]}`,
  }));

  const subCategoryOptions = subCategories.map((subCategory) => ({
    label: subCategory.name,
    value: subCategory._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${subCategory.image}`,
  }));

  const divisionOptions = divisions.map((division) => ({
    label: division.name,
    value: division._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${division.image}`,
  }));

  return (
    <>
      <Page title="Discount">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Boost sales with discounts
          </Typography>

          <Grid container spacing={3} className="mb-4">
            <Grid item xs={12} md={8}>
              <DiscountWelcome displayName={user?.displayName} />
            </Grid>
            <Grid item xs={12} md={4}>
              <DiscountLessons />
            </Grid>
          </Grid>

          {discounts.length * 1 !== 0 ? (
            <>
              <Stack sx={{ mb: 3 }} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setTerm(e.target.value)}
                  />
                </Search>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleOpenCreateDiscount();
                  }}
                >
                  Add Discount
                </Button>
              </Stack>

              <Box
                sx={{
                  display: 'grid',
                  gap: 3,
                  mb: 4,
                  gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                  },
                }}
              >
                {discounts.slice(0)
                  .reverse().map((el) => {
                  const {
                    discountCode,
                    _id,
                    discountType,
                    applicableFromDateTime,
                    applicableTillDateTime,
                    type,
                    numberOfCoupons,
                    totalUsed,
                    buyX,
                    getY,
                    discountPercentage,
                    discountAmount,
                    minOrderValue,
                    maxDiscount,
                    active,
                  } = el;
                  return (
                    <DiscountCard
                      key={_id}
                      id={_id}
                      code={discountCode}
                      discountType={discountType}
                      applicableFromDateTime={applicableFromDateTime}
                      applicableTillDateTime={applicableTillDateTime}
                      type={type}
                      numberOfCoupons={numberOfCoupons}
                      totalUsed={totalUsed}
                      buyX={buyX}
                      getY={getY}
                      discountPercentage={discountPercentage}
                      discountAmount={discountAmount}
                      minOrderValue={minOrderValue}
                      maxDiscount={maxDiscount}
                      active={active}
                    />
                  );
                })}
              </Box>
            </>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <div className="mt-5 px-4">
                    <FormLabel component="legend">Type</FormLabel>
                    <RadioGroup
                      defaultValue={type}
                      className="mb-4"
                      row
                      aria-label="Discount type"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="regular"
                        control={<Radio onClick={() => setType('regular')} />}
                        label="Regular Discount"
                      />

                      <FormControlLabel
                        value="buyXGetYFree"
                        control={<Radio onClick={() => setType('buyXGetYFree')} />}
                        label="Buy X get Y free"
                      />
                      <FormControlLabel
                        value="firstPurchase"
                        control={<Radio onClick={() => setType('firstPurchase')} />}
                        label="First Purchase"
                      />
                    </RadioGroup>
                    {type !== 'buyXGetYFree' && (
                      <>
                        <FormLabel component="legend">Applicable on</FormLabel>
                        <RadioGroup
                          defaultValue={applicableOn}
                          className="mb-4"
                          row
                          aria-label="Discount type"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="allProducts"
                            control={<Radio onClick={() => setApplicableOn('allProducts')} />}
                            label="All Products"
                          />
                          <FormControlLabel
                            value="selectedCategory"
                            control={<Radio onClick={() => setApplicableOn('selectedCategory')} />}
                            label="Selected category"
                          />
                          <FormControlLabel
                            value="selectedSubCategory"
                            control={<Radio onClick={() => setApplicableOn('selectedSubCategory')} />}
                            label="Selected Sub category"
                          />
                          <FormControlLabel
                            value="selectedDivision"
                            control={<Radio onClick={() => setApplicableOn('selectedDivision')} />}
                            label="Selected division"
                          />
                          <FormControlLabel
                            value="selectedProducts"
                            control={<Radio onClick={() => setApplicableOn('selectedProducts')} />}
                            label="Selected products"
                          />
                        </RadioGroup>
                      </>
                    )}
                    {type !== 'buyXGetYFree' && (
                      <Stack>
                        <FormLabel component="legend">Discount type</FormLabel>
                        <RadioGroup
                          defaultValue={discountType}
                          className="mb-4"
                          row
                          aria-label="Discount type"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="percentage"
                            control={<Radio onClick={() => setDiscountType('percentage')} />}
                            label="Percentage"
                          />
                          <FormControlLabel
                            value="flat"
                            control={<Radio onClick={() => setDiscountType('flat')} />}
                            label="Flat"
                          />
                        </RadioGroup>
                      </Stack>
                    )}
                    <Box
                      sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 3,
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                      }}
                    >
                      <MobileDateTimePicker
                        value={applicableFromDateTime}
                        onChange={(newValue) => {
                          setApplicableFromDateTime(newValue);
                        }}
                        label="Applicable from Date & Time"
                        minDate={new Date('2018-01-01T00:00')}
                        inputFormat="yyyy/MM/dd hh:mm a"
                        mask="___/__/__ __:__ _M"
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <MobileDateTimePicker
                        value={applicableTillDateTime}
                        onChange={(newValue) => {
                          setApplicableTillDateTime(newValue);
                        }}
                        label="Applicable till Date & Time"
                        minDate={new Date('2018-01-01T00:00')}
                        inputFormat="yyyy/MM/dd hh:mm a"
                        mask="___/__/__ __:__ _M"
                        renderInput={(params) => <TextField {...params} />}
                      />

                      {type === 'buyXGetYFree' && (
                        <TextField
                          value={formik.values.buyX}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          fullWidth
                          label="Buy X"
                          variant="outlined"
                          name="buyX"
                          error={!!formik.touched.buyX && !!formik.errors.buyX}
                          helperText={formik.touched.buyX && formik.errors.buyX}
                          className="mb-4"
                          id="outlined-basic"
                        />
                      )}

                      {type === 'buyXGetYFree' && (
                        <TextField
                          value={formik.values.getY}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          fullWidth
                          label="Get Y"
                          variant="outlined"
                          name="getY"
                          error={!!formik.touched.getY && !!formik.errors.getY}
                          helperText={formik.touched.getY && formik.errors.getY}
                          className="mb-4"
                          id="outlined-basic"
                        />
                      )}

                      {type === 'buyXGetYFree' && (
                        <Autocomplete
                          required
                          value={boughtProduct}
                          onChange={(e, value) => {
                            setBoughtProduct(value);
                          }}
                          fullWidth
                          disablePortal
                          autoHighlight
                          getOptionLabel={(option) => option.label}
                          renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                              <img loading="lazy" width="50" src={option.image} srcSet={`${option.image} 2x`} alt="" />
                              {option.label}
                            </Box>
                          )}
                          options={productOptions}
                          renderInput={(params) => (
                            <TextField required {...params} label="Bought Product" fullWidth name="boughtProduct" />
                          )}
                        />
                      )}

                      {type === 'buyXGetYFree' && (
                        <Autocomplete
                          required
                          value={givenProduct}
                          onChange={(e, value) => {
                            setGivenProduct(value);
                          }}
                          fullWidth
                          disablePortal
                          autoHighlight
                          getOptionLabel={(option) => option.label}
                          renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                              <img loading="lazy" width="50" src={option.image} srcSet={`${option.image} 2x`} alt="" />
                              {option.label}
                            </Box>
                          )}
                          options={productOptions}
                          renderInput={(params) => (
                            <TextField required {...params} label="Given Product" fullWidth name="givenProduct" />
                          )}
                        />
                      )}

                      {applicableOn === 'selectedCategory' && (
                        <Autocomplete
                          multiple
                          required
                          value={applicableCategories}
                          onChange={(e, value) => {
                            setApplicableCategoories(value);
                          }}
                          fullWidth
                          disablePortal
                          autoHighlight
                          getOptionLabel={(option) => option.label}
                          renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                              <img loading="lazy" width="50" src={option.image} srcSet={`${option.image} 2x`} alt="" />
                              {option.label}
                            </Box>
                          )}
                          options={categoryOptions}
                          renderInput={(params) => (
                            <TextField
                              required
                              {...params}
                              label="Applicable categories"
                              fullWidth
                              name="applicableCategories"
                            />
                          )}
                        />
                      )}

                      {applicableOn === 'selectedSubCategory' && (
                        <Autocomplete
                          multiple
                          required
                          value={applicableSubCategories}
                          onChange={(e, value) => {
                            setApplicableSubCategories(value);
                          }}
                          fullWidth
                          disablePortal
                          autoHighlight
                          getOptionLabel={(option) => option.label}
                          renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                              <img loading="lazy" width="50" src={option.image} srcSet={`${option.image} 2x`} alt="" />
                              {option.label}
                            </Box>
                          )}
                          options={subCategoryOptions}
                          renderInput={(params) => (
                            <TextField
                              required
                              {...params}
                              label="Applicable Sub Categories"
                              fullWidth
                              name="applicableSubCategories"
                            />
                          )}
                        />
                      )}

                      {applicableOn === 'selectedDivision' && (
                        <Autocomplete
                          multiple
                          required
                          value={applicableDivisions}
                          onChange={(e, value) => {
                            setApplicableDivisions(value);
                          }}
                          fullWidth
                          disablePortal
                          autoHighlight
                          getOptionLabel={(option) => option.label}
                          renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                              <img loading="lazy" width="50" src={option.image} srcSet={`${option.image} 2x`} alt="" />
                              {option.label}
                            </Box>
                          )}
                          options={divisionOptions}
                          renderInput={(params) => (
                            <TextField
                              required
                              {...params}
                              label="Applicable Divisions"
                              fullWidth
                              name="applicableDivisions"
                            />
                          )}
                        />
                      )}

                      {applicableOn === 'selectedProducts' && (
                        <Autocomplete
                          multiple
                          required
                          value={applicableProducts}
                          onChange={(e, value) => {
                            setApplicableProducts(value);
                          }}
                          fullWidth
                          disablePortal
                          autoHighlight
                          getOptionLabel={(option) => option.label}
                          renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                              <img loading="lazy" width="50" src={option.image} srcSet={`${option.image} 2x`} alt="" />
                              {option.label}
                            </Box>
                          )}
                          options={productOptions}
                          renderInput={(params) => (
                            <TextField
                              required
                              {...params}
                              label="Applicable Products"
                              fullWidth
                              name="applicableProducts"
                            />
                          )}
                        />
                      )}

                      <TextField
                        value={formik.values.numberOfCoupons}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        fullWidth
                        label="Number Of Coupons"
                        variant="outlined"
                        name="numberOfCoupons"
                        error={!!formik.touched.numberOfCoupons && !!formik.errors.numberOfCoupons}
                        helperText={formik.touched.numberOfCoupons && formik.errors.numberOfCoupons}
                        id="outlined-basic"
                      />
                      <TextField
                        value={formik.values.discountCode}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        fullWidth
                        label="Discount Code"
                        variant="outlined"
                        name="discountCode"
                        error={!!formik.touched.discountCode && !!formik.errors.discountCode}
                        helperText={formik.touched.discountCode && formik.errors.discountCode}
                        id="outlined-basic"
                        className="mb-4"
                      />

                      <TextField
                        value={formik.values.usesPerCustomer}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        fullWidth
                        label="Uses Per Customer"
                        variant="outlined"
                        name="usesPerCustomer"
                        error={!!formik.touched.usesPerCustomer && !!formik.errors.usesPerCustomer}
                        helperText={formik.touched.usesPerCustomer && formik.errors.usesPerCustomer}
                        id="outlined-basic"
                        className="mb-4"
                        type="number"
                      />
                      {discountType !== 'flat' && (
                        <TextField
                          value={formik.values.discountPercentage}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          fullWidth
                          label="Discount Percentage"
                          variant="outlined"
                          name="discountPercentage"
                          error={!!formik.touched.discountPercentage && !!formik.errors.discountPercentage}
                          helperText={formik.touched.discountPercentage && formik.errors.discountPercentage}
                          id="outlined-basic"
                          className="mb-4"
                          type="number"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment>
                                <PercentIcon style={{ fontSize: '20px' }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}

                      {discountType === 'flat' && (
                        <TextField
                          value={formik.values.discountAmount}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          fullWidth
                          label="Discount Amount"
                          variant="outlined"
                          name="discountAmount"
                          error={!!formik.touched.discountAmount && !!formik.errors.discountAmount}
                          helperText={formik.touched.discountAmount && formik.errors.discountAmount}
                          id="outlined-basic"
                          className="mb-4"
                          type="number"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment>
                                <CurrencyRupeeIcon style={{ fontSize: '20px' }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}

                      <TextField
                        value={formik.values.minOrderValue}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        fullWidth
                        label="Min. Order Value"
                        variant="outlined"
                        name="minOrderValue"
                        error={!!formik.touched.minOrderValue && !!formik.errors.minOrderValue}
                        helperText={formik.touched.minOrderValue && formik.errors.minOrderValue}
                        id="outlined-basic"
                        className="mb-4"
                        type="number"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment>
                              <CurrencyRupeeIcon style={{ fontSize: '20px' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {discountType !== 'flat' && (
                        <TextField
                          value={formik.values.maxDiscount}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          fullWidth
                          label="Max. Discount"
                          variant="outlined"
                          name="maxDiscount"
                          error={!!formik.touched.maxDiscount && !!formik.errors.maxDiscount}
                          helperText={formik.touched.maxDiscount && formik.errors.maxDiscount}
                          id="outlined-basic"
                          className="mb-4"
                          type="number"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment>
                                <CurrencyRupeeIcon style={{ fontSize: '20px' }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    </Box>

                    <Stack direction="row" spacing={4} alignItems="center">
                      <Typography>Show discount coupon on shop to customers?</Typography>
                      <AntSwitch
                        checked={showToCustomer}
                        onChange={(e) => {
                          setShowToCustomer(e.target.checked);
                        }}
                        inputProps={{ 'aria-label': 'ant design' }}
                      />
                    </Stack>

                    <div className="d-flex flex-row align-items-center justify-content-end">
                      <LoadingButton disabled={!(formik.isValid)} type="submit" variant="contained">
                        {' '}
                        Create discount{' '}
                      </LoadingButton>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </form>
          )}
        </Container>
      </Page>
      {openCreateDiscount && <AddNewDiscount open={openCreateDiscount} handleClose={handleCloseCreateDiscount} />}
    </>
  );
}
