/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Stack,
  Button,
  Typography,
  Card,
  Box,
  Grid,
  TextField,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { useDispatch, useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';
import CustomiseSuperstore from '../../../../Dialogs/StoreTheme/CustomiseSuperstore';

import {
  fetchProducts,
  fetchCategory,
  fetchSubCategory,
  fetchDivision,
  getStorePages,
  updateStore,
  updateHeroBanners,
} from '../../../../actions';

import { UploadAvatar } from '../../../../components/upload';
import { fData } from '../../../../utils/formatNumber';

const StoreAppearance = () => {
  const { store } = useSelector((state) => state.store);

  const [superstore, setSuperstore] = useState(false);

  const handleCloseSuperstore = () => {
    setSuperstore(false);
  };

  const dispatch = useDispatch();

  const [flashDeals, setFlashDeals] = useState(store.flashDeals);
  const [topCategories, setTopCategories] = useState(store.topCategories);
  const [bigDiscounts, setBigDiscounts] = useState(store.bigDiscounts);

 

  const writeableHeroBanners = store.heroBanners.map((el) => ({ ...el }));

  const [heroBanners, setHeroBanners] = useState(store ? writeableHeroBanners : []);



 
 

  const addHeroBanner = () => {
    setHeroBanners((prev) => [
      ...prev,
      {
        index: uuidv4(),
        file: null,
        preview: null,
        heading: null,
        caption: null,
        CTALabel: null,
        product: null,
        destination: null,
        category: null,
        subCategory: null,
        division: null,
        page: null,
      },
    ]);
  };

 
  const removeHeroBanner = (index) => {
    setHeroBanners((prev) => prev.filter((el) => el.index !== index));
  };



  const updateHeroBanner = (index, value, field) => {
    setHeroBanners((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el[field] = value;
        return el;
      })
    );
  };


  const handleDropHeroBanner = (acceptedFiles, index) => {
    const file = acceptedFiles[0];

    console.log(file);

    try{
      setHeroBanners((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el.file = file;
        el.preview = URL.createObjectURL(file);
        return el;
      })
    );
    }
    catch(error) {
      console.log(error);
    }

    
  };


  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategory());
    dispatch(fetchSubCategory());
    dispatch(fetchDivision());
    dispatch(getStorePages());
  }, []);

  const { products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { subCategories } = useSelector((state) => state.subCategory);
  const { divisions } = useSelector((state) => state.division);
  const { pages } = useSelector((state) => state.page);

  const productOptions = products.map((el) => ({
    label: el.productName,
    value: el._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${el.images[0]}`,
  }));

  const categoryOptions = categories.map((el) => ({
    label: el.name,
    value: el._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${el.image}`,
  }));

  const subCategoryOptions = subCategories.map((el) => ({
    label: el.name,
    value: el._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${el.image}`,
  }));

  const divisionOptions = divisions.map((el) => ({
    label: el.name,
    value: el._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${el.image}`,
  }));

  const pageOptions = pages.map((el) => ({
    label: el.name,
    value: el.slug,
  }));

  return (
    <div>
      <div style={{ width: '100%' }} className="d-flex flex-row align-items-center justify-content-end mb-3">
        <a
          style={{ textDecoration: 'none' }}
          href={`https://qwikshop.online/${store.subName}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outlined" startIcon={<RemoveRedEyeIcon />}>
            Preview
          </Button>
        </a>
      </div>

      <Stack sx={{ mb: 3, mt: 2 }} direction={'row'} alignItems="center" justifyContent={'space-between'}>
        <Typography variant="subtitle1" className="mb-3">
          Customise your store appearance
        </Typography>
      </Stack>

      <Box sx={{ width: '900px' }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Hero Banners</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {heroBanners.map((el) => (
              <div key={el.index}>
                <Grid className="px-4 pt-3" container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3, mb: 2 }}>
                      <UploadAvatar
                        required
                        name="avatarUrl"
                        accept="image/*"
                        maxSize={3145728}
                        onDrop={(files) => {
                          handleDropHeroBanner(files, el.index);
                        }}
                        file={el.preview}
                        helperText={
                          <Typography
                            variant="caption"
                            sx={{
                              mt: 2,
                              mx: 'auto',
                              display: 'block',
                              textAlign: 'center',
                              color: 'text.secondary',
                            }}
                          >
                            Allowed *.jpeg, *.jpg, *.png, *.gif
                            <br /> max size of {fData(3145728)}
                          </Typography>
                        }
                      />
                    </Card>
                  </Grid>
                </Grid>
                <TextField
                  sx={{ mb: 2 }}
                  name="heroHeading"
                  label="Heading"
                  fullWidth
                  value={el.heading}
                  onChange={(e) => {
                    updateHeroBanner(el.index, e.target.value, 'heading');
                  }}
                />
                <TextField
                  sx={{ mb: 2 }}
                  multiline
                  name="heroDescription"
                  label="Caption"
                  fullWidth
                  value={el.caption}
                  onChange={(e) => {
                    updateHeroBanner(el.index, e.target.value, 'caption');
                  }}
                />
                <TextField
                  sx={{ mb: 2 }}
                  multiline
                  name="actionButton"
                  label="Action Button Label"
                  fullWidth
                  value={el.CTALabel}
                  onChange={(e) => {
                    updateHeroBanner(el.index, e.target.value, 'CTALabel');
                  }}
                />
                <Autocomplete
                  sx={{ mb: 2 }}
                  value={el.destination}
                  onChange={(e, value) => {
                    updateHeroBanner(el.index, value, 'destination');
                  }}
                  id=""
                  fullWidth
                  options={CTATypeOptions}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose Destination"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: '', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
                {(() => {
                  switch (el.destination?.label) {
                    case 'Product':
                      return (
                        <Autocomplete
                          sx={{ mb: 2 }}
                          value={el.product}
                          onChange={(e, value) => {
                            updateHeroBanner(el.index, value, 'product');
                          }}
                          id=""
                          fullWidth
                          options={productOptions}
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
                              label="Choose a Product"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: '', // disable autocomplete and autofill
                              }}
                            />
                          )}
                        />
                      );

                    case 'Category':
                      return (
                        <Autocomplete
                          sx={{ mb: 2 }}
                          value={el.category}
                          onChange={(e, value) => {
                            updateHeroBanner(el.index, value, 'category');
                          }}
                          id=""
                          fullWidth
                          options={categoryOptions}
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
                              label="Choose a Category"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: '', // disable autocomplete and autofill
                              }}
                            />
                          )}
                        />
                      );

                    case 'Sub Category':
                      return (
                        <Autocomplete
                          sx={{ mb: 2 }}
                          value={el.subCategory}
                          onChange={(e, value) => {
                            updateHeroBanner(el.index, value, 'subCategory');
                          }}
                          id=""
                          fullWidth
                          options={subCategoryOptions}
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
                              label="Choose a Sub Category"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: '', // disable autocomplete and autofill
                              }}
                            />
                          )}
                        />
                      );

                    case 'Division':
                      return (
                        <Autocomplete
                          sx={{ mb: 2 }}
                          value={el.division}
                          onChange={(e, value) => {
                            updateHeroBanner(el.index, value, 'division');
                          }}
                          id=""
                          fullWidth
                          options={divisionOptions}
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
                              label="Choose a Division"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: '', // disable autocomplete and autofill
                              }}
                            />
                          )}
                        />
                      );

                    case 'Pages':
                      return (
                        <Autocomplete
                          sx={{ mb: 2 }}
                          value={el.page}
                          onChange={(e, value) => {
                            updateHeroBanner(el.index, value, 'page');
                          }}
                          id=""
                          fullWidth
                          options={pageOptions}
                          autoHighlight
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Choose a Page"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: '', // disable autocomplete and autofill
                              }}
                            />
                          )}
                        />
                      );

                    default:
                      break;
                  }
                })()}
                <Stack sx={{ px: 4 }} direction={'row'} alignItems="center" justifyContent={'end'}>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => {
                      removeHeroBanner(el.index);
                    }}
                  >
                    Remove
                  </Button>
                </Stack>
              </div>
            ))}
          </AccordionDetails>
          <Stack sx={{ mb: 3, mt: 2 }} direction={'row'} alignItems="center" justifyContent={'center'}>
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => {
                addHeroBanner();
              }}
            >
              Add Hero Banner
            </Button>
          </Stack>
          <Stack direction={'row'} sx={{ mb: 3 }} alignItems="center" justifyContent={'center'}>
            <Button
              sx={{ width: 'max-content' }}
              variant="contained"
              onClick={() => {
                dispatch(updateHeroBanners(heroBanners));
              }}
            >
              Update Hero Banners
            </Button>
          </Stack>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Flash Deals</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack sx={{ mb: 2 }}>
              <Typography variant="caption">
                These are products on which you are offering discounts for a limited time.
              </Typography>
            </Stack>

            <Autocomplete
              multiple
              sx={{ mb: 2 }}
              value={flashDeals}
              onChange={(e, value) => {
                setFlashDeals(value);
              }}
              id=""
              fullWidth
              options={productOptions}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
                  {option.label}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose Products"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: '', // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </AccordionDetails>
          <Stack sx={{ px: 2, pb: 2 }} direction="row" alignItems={'center'} justifyContent="end">
            <Button
              onClick={() => {
                dispatch(updateStore({ flashDeals }));
              }}
              variant="contained"
            >
              Update
            </Button>
          </Stack>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Top Categories</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack sx={{ mb: 2 }}>
              <Typography variant="caption">These are categories you want to promote on your store.</Typography>
            </Stack>
            <Autocomplete
              multiple
              sx={{ mb: 3 }}
              value={topCategories}
              onChange={(e, value) => {
                setTopCategories(value);
              }}
              id=""
              fullWidth
              options={categoryOptions}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
                  {option.label}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose Categories"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: '', // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </AccordionDetails>
          <Stack sx={{ px: 2, pb: 2 }} direction="row" alignItems={'center'} justifyContent="end">
            <Button
              onClick={() => {
                dispatch(updateStore({ topCategories }));
              }}
              variant="contained"
            >
              Update
            </Button>
          </Stack>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Big Discounts</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack sx={{ mb: 2 }}>
              <Typography variant="caption">
                Here you can select products with Huge Discount which can attract and retain more customers at your
                store.
              </Typography>
            </Stack>
            <Autocomplete
              multiple
              sx={{ mb: 3 }}
              value={bigDiscounts}
              onChange={(e, value) => {
                setBigDiscounts(value);
              }}
              id=""
              fullWidth
              options={productOptions}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
                  {option.label}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose Products"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: '', // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </AccordionDetails>
          <Stack sx={{ px: 2, pb: 2 }} direction="row" alignItems={'center'} justifyContent="end">
            <Button
              onClick={() => {
                dispatch(updateStore({ bigDiscounts }));
              }}
              variant="contained"
            >
              Update
            </Button>
          </Stack>
        </Accordion>

       
        <Divider sx={{ my: 2 }} />
        
        
      </Box>
      {superstore && <CustomiseSuperstore open={superstore} handleClose={handleCloseSuperstore} />}
    </div>
  );
};

export default StoreAppearance;

const CTATypeOptions = [
  { label: 'Product' },
  { label: 'Category' },
  { label: 'Sub Category' },
  { label: 'Page' },
];
