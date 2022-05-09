/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import FormControlLabel from '@mui/material/FormControlLabel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import DescriptionIcon from '@mui/icons-material/Description';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import {
  Box,
  Card,
  Grid,
  Dialog,
  DialogActions,
  TextField,
  Autocomplete,
  Button,
  InputAdornment,
  Typography,
  FormLabel,
  RadioGroup,
  Radio,
  FormControl,
  IconButton,
  Stack,
  Divider,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '../components/editor/index';
import { fetchCategory, fetchSubCategory, createNewProduct, fetchDivision } from '../actions';

import { RHFUploadMultiFile, FormProvider } from '../components/hook-form';

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ShoppingBasketIcon />,
    2: <DescriptionIcon />,
    3: <InsertPhotoRoundedIcon />,
    4: <FormatListBulletedRoundedIcon />,
    5: <InventoryRoundedIcon />,
    6: <CategoryRoundedIcon />,
    7: <AddShoppingCartRoundedIcon />,
    8: <LanguageRoundedIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = [
  'Product information',
  'Description',
  'Product images',
  'Specifications',
  'Inventory',
  'Variants',
  'Add ons',
  'SEO',
];

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
  ({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  })
);

// eslint-disable-next-line no-unused-vars
const AddNewProduct = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);
  useEffect(() => {
    dispatch(fetchSubCategory());
  }, []);
  useEffect(() => {
    dispatch(fetchDivision());
  }, []);

  const { subCategories } = useSelector((state) => state.subCategory);
  const { products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { isCreating } = useSelector((state) => state.product);

  const formik = useFormik({
    initialValues: {
      metaTitle: '',
      metaKeyword: '',
      metaDescription: '',
      weight: 100,
      productName: '',
      brand: '',
      price: '',
      discountedPrice: '',
      minQuantitySold: 1,
      quantityInStock: '',
      productSKU: '',
      wholesalePrice: '',
      minWholesaleQuantity: 1,
      coins: 0,
      length: 10,
      width: 10,
      height: 10,
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      metaTitle: Yup.string(),
      metaKeyword: Yup.string(),
      metaDescription: Yup.string(),
      weight: Yup.number().required('Weight in grams is required'),
      productName: Yup.string().required('Product name is required'),
      brand: Yup.string(),
      price: Yup.string().required('Price is required'),
      discountedPrice: Yup.string(),
      minQuantitySold: Yup.number(),
      quantityInStock: Yup.string(),
      productSKU: Yup.string(),
      wholesalePrice: Yup.number(),
      minWholesaleQuantity: Yup.number(),
      coins: Yup.number(),
      length: Yup.string(),
      width: Yup.string(),
      height: Yup.string(),
    }),
    onSubmit: (values) => {
      const formValues = {
        productName: values.productName,
        brand: values.brand,
        price: values.price,
        discountedPrice: values.discountedPrice,
        wholesalePrice: values.wholesalePrice,
        minWholesaleQuantity: values.minWholesaleQuantity,
        productSKU: values.productSKU,
        weight: values.weight,
        quantityInStock: values.quantityInStock,
        minQuantitySold: values.minQuantitySold,
        length: values.length,
        width: values.width,
        height: values.height,
        metaDescription: values.metaDescription,
        metaTitle: values.metaTitle,
        metaKeyword: values.metaKeyword,
        coins: values.coins,
        description,
        category,
        subCategory,
        isFragile,
        specifications,
        productUnit,
        dimensionUnit,
        InTheBox,
        colorsList,
        customVariants,
        addOnList,
        priceDeterminingVariant,
      };

      dispatch(createNewProduct(formValues, imageFiles, videoFiles, handleClose));
    },
  });

  const [colorsList, setColorsList] = useState([]);

  const [addOnList, setAddOnList] = useState([]);

  const [customVariants, setCustomVariants] = useState([]);

  const [specifications, setSpecifications] = useState([]);

  const addSpecificationRow = () => {
    setSpecifications((prev) => [...prev, { index: uuidv4(), property: '', value: '' }]);
  };

  const deleteSpecificationRow = (index) => {
    setSpecifications((prev) => prev.filter((el) => el.index !== index));
  };

  const updateSpecification = (index, value, field) => {
    setSpecifications((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el[field] = value;
        return el;
      })
    );
  };

  const addCustomVariant = () => {
    setCustomVariants((prev) => [
      ...prev,
      {
        index: uuidv4(),
        title: '',
        options: [{ name: '', price: '', wholesalePrice: '', qtyInStock: 100, index: uuidv4() }],
      },
    ]);
  };

  const deleteCustomVariant = (index) => {
    setCustomVariants((prev) => prev.filter((el) => el.index !== index));
  };

  const updateCustomVariantTitle = (index, value) => {
    setCustomVariants((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el.title = value;
        return el;
      })
    );
  };

  const updateCustomVariantOption = (index, optionIndex, field, value) => {
    setCustomVariants((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el.options = el.options.map((elm) => {
          if (elm.index !== optionIndex) {
            return elm;
          }
          elm[field] = value;
          return elm;
        });
        return el;
      })
    );
  };

  const addCustomVariantOptionRow = (index) => {
    setCustomVariants((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el.options = [...el.options, { name: '', price: '', discountedPrice: '', index: uuidv4() }];
        return el;
      })
    );
  };

  const deleteCustomVariantOptionRow = (index, optionsIndex) => {
    setCustomVariants((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el.options = el.options.filter((elm) => elm.index !== optionsIndex);
        return el;
      })
    );
  };

  const addColorRow = () => {
    setColorsList((prev) => [...prev, { index: uuidv4(), color: '#538BF7' }]);
  };

  const deleteColorRow = (index) => {
    setColorsList((prev) => prev.filter((el) => el.index !== index));
  };

  const updateColor = (value, index, field) => {
    setColorsList((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el[field] = value;
        return el;
      })
    );
  };

  const [description, setDescription] = useState('');
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();

  const [productUnit, setProductUnit] = useState({
    label: 'piece',
  });
  const [enableDimension, setEnableDimension] = useState(false);
  const [enableItemsInBox, setEnableItemsInBox] = useState(false);

  const [activeStep, setActiveStep] = useState(0);
  const [dimensionUnit, setDimensionUnit] = useState({
    label: 'centimeter',
    value: 'cm',
  });

  const [isFragile, setIsFragile] = useState(false);
  const [InTheBox, setInTheBox] = useState([{ index: uuidv4(), label: '' }]);

  const [videoFiles, setVideoFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const [priceDeterminingVariant, setPriceDeterminingVariant] = useState(customVariants[0]?.index);

  const addInTheBox = () => {
    setInTheBox((prev) => [...prev, { index: uuidv4(), label: '' }]);
  };

  const deleteInTheBox = (index) => {
    setInTheBox((prev) => prev.filter((el) => el.index !== index));
  };

  const updateInTheBox = (index, value) => {
    setInTheBox((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el.label = value;
        return el;
      })
    );
  };

  const onNext = () => {
    // eslint-disable-next-line consistent-return
    setActiveStep((prev) => {
      if (prev * 1 <= 6) {
        return (prev += 1);
      }
    });
  };

  const onPrev = () => {
    setActiveStep((prev) => (prev -= 1));
  };

  const NewProductSchema = Yup.object().shape({
    images: Yup.array().min(1, 'Images is required'),
  });

  const defaultValues = {
    images: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const { watch, setValue, handleSubmit } = methods;

  const values = watch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      try {
        setValue(
          'images',
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      } catch (error) {
        console.log(error);
      }

      acceptedFiles.map((el) => {
        if (el.type === 'video/mp4') {
          // setVideoFiles
          setVideoFiles((prev) => {
            prev.push(el);
            return prev;
          });
        } else {
          // setImageFiles
          setImageFiles((prev) => {
            prev.push(el);
            return prev;
          });
        }
      });
    },
    [setValue]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${category.image}`,
  }));

  const subCategoryOptions = subCategories
    .filter((el) => el.category?.value === category?.value)
    .map((subCategory) => ({
      label: subCategory.name,
      value: subCategory._id,
      image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${subCategory.image}`,
    }));

  const addOnOptions = products.map((product) => ({
    label: product.productName,
    value: product._id,
    image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${product.images[0]}`,
  }));

  return (
    <>
      <Dialog fullWidth maxWidth="lg" open={open}>
        <div className="p-4">
          <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={formik.handleSubmit}>
            {(() => {
              switch (activeStep) {
                case 0:
                  return (
                    <>
                      <Grid className="px-4 pt-3" container spacing={3}>
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
                                value={formik.values.productName}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Product Name"
                                variant="outlined"
                                name="productName"
                                error={!!formik.touched.productName && !!formik.errors.productName}
                                helperText={formik.touched.productName && formik.errors.productName}
                              />
                              <Autocomplete
                                value={category}
                                onChange={(e, value) => {
                                  setCategory(value);
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
                                    label="Choose a category"
                                    inputProps={{
                                      ...params.inputProps,
                                      autoComplete: '', // disable autocomplete and autofill
                                    }}
                                  />
                                )}
                              />
                              <Autocomplete
                                value={subCategory}
                                onChange={(e, value) => {
                                  setSubCategory(value);
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
                                    label="Choose a sub category"
                                    inputProps={{
                                      ...params.inputProps,
                                      autoComplete: '', // disable autocomplete and autofill
                                    }}
                                  />
                                )}
                              />

                              <TextField
                                value={formik.values.brand}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Brand"
                                variant="outlined"
                                name="brand"
                                error={!!formik.touched.brand && !!formik.errors.brand}
                                helperText={formik.touched.brand && formik.errors.brand}
                              />
                              <TextField
                                value={formik.values.price}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="MRP (Label Price)"
                                variant="outlined"
                                name="price"
                                error={!!formik.touched.price && !!formik.errors.price}
                                helperText={formik.touched.price && formik.errors.price}
                                type="number"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment>
                                      <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <TextField
                                value={formik.values.discountedPrice}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Your Selling Price"
                                variant="outlined"
                                name="discountedPrice"
                                error={!!formik.touched.discountedPrice && !!formik.errors.discountedPrice}
                                helperText={formik.touched.discountedPrice && formik.errors.discountedPrice}
                                type="number"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment>
                                      <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <TextField
                                value={formik.values.wholesalePrice}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Wholesale Price"
                                variant="outlined"
                                name="wholesalePrice"
                                error={!!formik.touched.wholesalePrice && !!formik.errors.wholesalePrice}
                                helperText={formik.touched.wholesalePrice && formik.errors.wholesalePrice}
                                type="number"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment>
                                      <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <TextField
                                value={formik.values.minWholesaleQuantity}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Minimum Wholesale Quantity"
                                variant="outlined"
                                name="minWholesaleQuantity"
                                error={!!formik.touched.minWholesaleQuantity && !!formik.errors.minWholesaleQuantity}
                                helperText={formik.touched.minWholesaleQuantity && formik.errors.minWholesaleQuantity}
                                type="number"
                              />
                              <TextField
                                value={formik.values.coins}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Coins"
                                variant="outlined"
                                name="coins"
                                error={!!formik.touched.coins && !!formik.errors.coins}
                                helperText={formik.touched.coins && formik.errors.coins}
                                type="number"
                              />
                              <FormControl className="mb-3">
                                <FormLabel id="demo-row-radio-buttons-group-label">
                                  Is Fragile (something which easily breaks or gets damaged) ?
                                </FormLabel>
                                <RadioGroup
                                  value={isFragile}
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="row-radio-buttons-group"
                                >
                                  <FormControlLabel
                                    value={true}
                                    control={
                                      <Radio
                                        onClick={() => {
                                          setIsFragile(true);
                                        }}
                                      />
                                    }
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    value={false}
                                    control={
                                      <Radio
                                        onClick={() => {
                                          setIsFragile(false);
                                        }}
                                      />
                                    }
                                    label="No"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </Box>
                          </Card>
                        </Grid>
                      </Grid>
                      <DialogActions>
                        <LoadingButton
                          onClick={() => {
                            onNext();
                          }}
                          type="button"
                          variant="contained"
                          loading={false}
                        >
                          Next <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
                        </LoadingButton>
                        <Button onClick={handleClose}>Cancel</Button>
                      </DialogActions>
                    </>
                  );

                case 1:
                  return (
                    <>
                      <Grid className="px-4 pt-3" container spacing={3}>
                        <Grid item xs={12} md={12}>
                          <Card sx={{ p: 3 }}>
                            <Editor value={description} onChange={(value) => setDescription(value)} />
                          </Card>
                        </Grid>
                      </Grid>

                      <DialogActions>
                        <LoadingButton
                          onClick={() => {
                            onPrev();
                          }}
                          type="button"
                          variant="outlined"
                          loading={false}
                        >
                          Previous
                        </LoadingButton>
                        <LoadingButton
                          onClick={() => {
                            onNext();
                          }}
                          type="button"
                          variant="contained"
                          loading={false}
                        >
                          Next <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
                        </LoadingButton>
                        <Button onClick={handleClose}>Cancel</Button>
                      </DialogActions>
                    </>
                  );

                case 2:
                  return (
                    <>
                      <div className="mt-3">
                        <FormProvider methods={methods} onSubmit={handleSubmit(onNext)}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                              <Card sx={{ p: 3 }}>
                                <RHFUploadMultiFile
                                  name="images"
                                  showPreview
                                  accept="image/*, video/*"
                                  maxSize={50145728}
                                  onDrop={handleDrop}
                                  onRemove={handleRemove}
                                  onRemoveAll={handleRemoveAll}
                                />
                              </Card>
                            </Grid>
                          </Grid>
                        </FormProvider>
                      </div>
                      <DialogActions>
                        <LoadingButton
                          onClick={() => {
                            onPrev();
                          }}
                          type="button"
                          variant="outlined"
                          loading={false}
                        >
                          Previous
                        </LoadingButton>
                        <LoadingButton
                          onClick={() => {
                            onNext();
                          }}
                          type="button"
                          variant="contained"
                          loading={false}
                        >
                          Next <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
                        </LoadingButton>
                        <Button
                          onClick={() => {
                            handleClose();
                          }}
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </>
                  );

                case 3:
                  return (
                    <>
                      <Grid className="px-4 pt-3" container spacing={3}>
                        <Grid item xs={12} md={12}>
                          <Card sx={{ p: 3, mb: 3 }}>
                            {specifications.map((el) => (
                              <Stack key={el.index} spacing={2}>
                                <Box
                                  sx={{
                                    display: 'grid',
                                    columnGap: 2,
                                    rowGap: 3,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                  }}
                                >
                                  <TextField
                                    required
                                    type="text"
                                    name="propertyName"
                                    label="Property Name"
                                    fullWidth
                                    value={el.name}
                                    onChange={(e) => {
                                      updateSpecification(el.index, e.target.value, 'name');
                                    }}
                                  />

                                  <TextField
                                    required
                                    type="text"
                                    name="propertyValue"
                                    label="Property value"
                                    fullWidth
                                    value={el.value}
                                    onChange={(e) => {
                                      updateSpecification(el.index, e.target.value, 'value');
                                    }}
                                  />
                                </Box>
                                <Stack sx={{ px: 4 }} direction={'row'} alignItems={'center'} justifyContent={'end'}>
                                  <Button
                                    color="error"
                                    onClick={() => {
                                      deleteSpecificationRow(el.index);
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </Stack>
                              </Stack>
                            ))}
                            <Stack alignItems={'center'} justifyContent={'center'}>
                              {' '}
                              <Button onClick={addSpecificationRow} variant="outlined">
                                Add Specification
                              </Button>
                            </Stack>
                          </Card>
                        </Grid>
                      </Grid>
                      <DialogActions>
                        <LoadingButton
                          onClick={() => {
                            onPrev();
                          }}
                          type="button"
                          variant="outlined"
                          loading={false}
                        >
                          Previous
                        </LoadingButton>
                        <LoadingButton
                          onClick={() => {
                            onNext();
                          }}
                          type="button"
                          variant="contained"
                          loading={false}
                        >
                          Next <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
                        </LoadingButton>
                        <Button
                          onClick={() => {
                            handleClose();
                          }}
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </>
                  );

                case 4:
                  return (
                    <>
                      <Grid className="px-4 pt-3" container spacing={3}>
                        <Grid item xs={12} md={12}>
                          <Card sx={{ p: 3, mb: 3 }}>
                            <Box
                              sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                              }}
                            >
                              <Autocomplete
                                required
                                value={productUnit}
                                onChange={(e, value) => {
                                  setProductUnit(value);
                                }}
                                id=""
                                fullWidth
                                options={productUnitOptions}
                                autoHighlight
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                  <TextField
                                    required
                                    {...params}
                                    label="Product unit"
                                    inputProps={{
                                      ...params.inputProps,
                                      autoComplete: '', // disable autocomplete and autofill
                                    }}
                                  />
                                )}
                              />
                              <TextField
                                value={formik.values.minQuantitySold}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Minimum Purchase Quantity"
                                variant="outlined"
                                name="minQuantitySold"
                                error={!!formik.touched.minQuantitySold && !!formik.errors.minQuantitySold}
                                helperText={formik.touched.minQuantitySold && formik.errors.minQuantitySold}
                                type="number"
                              />
                              <TextField
                                value={formik.values.productSKU}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Stock Keeping Unit"
                                variant="outlined"
                                name="productSKU"
                                error={!!formik.touched.productSKU && !!formik.errors.productSKU}
                                helperText={formik.touched.productSKU && formik.errors.productSKU}
                                type="text"
                              />
                              <TextField
                                value={formik.values.quantityInStock}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Quantity In Stock"
                                variant="outlined"
                                name="quantityInStock"
                                error={!!formik.touched.quantityInStock && !!formik.errors.quantityInStock}
                                helperText={formik.touched.quantityInStock && formik.errors.quantityInStock}
                                type="number"
                              />
                              <TextField
                                value={formik.values.weight}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Weight (in gm per unit)"
                                variant="outlined"
                                name="weight"
                                error={!!formik.touched.weight && !!formik.errors.weight}
                                helperText={formik.touched.weight && formik.errors.weight}
                                type="number"
                              />
                            </Box>
                          </Card>
                          <Card sx={{ p: 3, mb: 3 }}>
                            <Stack direction="row" alignItems={'center'} justifyContent="space-between">
                              <Typography>Enable Dimensions</Typography>

                              <FormControlLabel
                                control={
                                  <IOSSwitch
                                    sx={{ m: 1 }}
                                    checked={enableDimension}
                                    onChange={(e) => {
                                      setEnableDimension(e.target.checked);
                                    }}
                                  />
                                }
                                label=""
                              />
                            </Stack>
                            {enableDimension && (
                              <Box
                                sx={{
                                  mt: 3,
                                  display: 'grid',
                                  columnGap: 2,
                                  rowGap: 3,
                                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                }}
                              >
                                <Autocomplete
                                  value={dimensionUnit}
                                  onChange={(e, value) => {
                                    setDimensionUnit(value);
                                  }}
                                  id=""
                                  fullWidth
                                  options={dimensionUnitOptions}
                                  autoHighlight
                                  getOptionLabel={(option) => option.label}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Dimension unit"
                                      inputProps={{
                                        ...params.inputProps,
                                        autoComplete: '', // disable autocomplete and autofill
                                      }}
                                    />
                                  )}
                                />
                                <TextField
                                  value={formik.values.length}
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  fullWidth
                                  label="Length"
                                  variant="outlined"
                                  name="length"
                                  error={!!formik.touched.length && !!formik.errors.length}
                                  helperText={formik.touched.length && formik.errors.length}
                                  type="number"
                                />
                                <TextField
                                  value={formik.values.width}
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  fullWidth
                                  label="Width"
                                  variant="outlined"
                                  name="width"
                                  error={!!formik.touched.width && !!formik.errors.width}
                                  helperText={formik.touched.width && formik.errors.width}
                                  type="number"
                                />
                                <TextField
                                  value={formik.values.height}
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  fullWidth
                                  label="Height"
                                  variant="outlined"
                                  name="height"
                                  error={!!formik.touched.height && !!formik.errors.height}
                                  helperText={formik.touched.height && formik.errors.height}
                                  type="number"
                                />
                              </Box>
                            )}
                          </Card>
                          <Card sx={{ p: 3, mb: 3 }}>
                            <Stack direction="row" alignItems={'center'} justifyContent="space-between">
                              <Typography>Enable Items in box</Typography>

                              <FormControlLabel
                                control={
                                  <IOSSwitch
                                    sx={{ m: 1 }}
                                    checked={enableItemsInBox}
                                    onChange={(e) => {
                                      setEnableItemsInBox(e.target.checked);
                                    }}
                                  />
                                }
                                label=""
                              />
                            </Stack>
                            {enableItemsInBox && (
                              <Box sx={{ mt: 3 }}>
                                <Typography sx={{ mb: 3 }} variant="subtitle1">
                                  What's included in Box
                                </Typography>
                                <Box
                                  sx={{
                                    mb: 3,
                                    display: 'grid',
                                    columnGap: 2,
                                    rowGap: 3,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                  }}
                                >
                                  {InTheBox.map((el, index) => (
                                    <TextField
                                      key={el.index}
                                      name="item"
                                      label={`Item ${index + 1}`}
                                      fullWidth
                                      value={el.label}
                                      onChange={(e) => {
                                        updateInTheBox(el.index, e.target.value);
                                      }}
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment>
                                            <Button
                                              color="error"
                                              onClick={() => {
                                                deleteInTheBox(el.index);
                                              }}
                                            >
                                              Remove
                                            </Button>
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                  ))}
                                </Box>

                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  <Button
                                    variant="outlined"
                                    onClick={() => {
                                      addInTheBox();
                                    }}
                                  >
                                    Add Item
                                  </Button>
                                </Stack>
                              </Box>
                            )}
                          </Card>
                        </Grid>
                      </Grid>

                      <DialogActions>
                        <LoadingButton
                          onClick={() => {
                            onPrev();
                          }}
                          type="button"
                          variant="outlined"
                          loading={false}
                        >
                          Previous
                        </LoadingButton>
                        <LoadingButton
                          onClick={() => {
                            onNext();
                          }}
                          type="button"
                          variant="contained"
                          loading={false}
                        >
                          Next <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
                        </LoadingButton>
                        <Button
                          onClick={() => {
                            handleClose();
                          }}
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </>
                  );

                case 5:
                  return (
                    <>
                      <Grid className="px-4 pt-3" container spacing={3}>
                        <Grid item xs={12} md={12}>
                          <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Price Determining Variant</FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                            >
                              {customVariants.map((el) => (
                                <FormControlLabel
                                  key={el.index}
                                  value={el.index}
                                  control={
                                    <Radio
                                      onClick={() => {
                                        setPriceDeterminingVariant(el.index);
                                      }}
                                      checked={priceDeterminingVariant === el.index}
                                    />
                                  }
                                  label={el.title}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>

                          <Divider sx={{ my: 2 }} />
                          <div>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                              >
                                <Typography variant="h6">Color</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Card sx={{ p: 3 }}>
                                  {colorsList.map((el) => (
                                    <div key={el.index} className="d-flex flex-column">
                                      <Box
                                        className="mb-3"
                                        sx={{
                                          display: 'grid',
                                          columnGap: 2,
                                          rowGap: 3,
                                          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                        }}
                                      >
                                        <TextField
                                          required
                                          className="mb-2"
                                          defaultValue={'#ffffff'}
                                          type="color"
                                          label={`Color `}
                                          name="color"
                                          fullWidth
                                          value={el.color}
                                          onChange={(e) => {
                                            updateColor(e.target.value, el.index, 'color');
                                          }}
                                        />

                                        <TextField
                                          required
                                          type="text"
                                          label={`Color Name `}
                                          name="name"
                                          fullWidth
                                          value={el.name}
                                          onChange={(e) => {
                                            updateColor(e.target.value, el.index, 'name');
                                          }}
                                        />
                                      </Box>
                                      <div className="d-flex flex-row align-items-center justify-content-end">
                                        <Button
                                          color="error"
                                          size="small"
                                          onClick={() => {
                                            deleteColorRow(el.index);
                                          }}
                                        >
                                          Remove
                                        </Button>
                                      </div>
                                    </div>
                                  ))}

                                  <div className="d-flex flex-row align-items-center justify-content-center">
                                    <Button
                                      onClick={() => {
                                        addColorRow();
                                      }}
                                      variant="outlined"
                                    >
                                      Add color
                                    </Button>
                                  </div>
                                </Card>
                              </AccordionDetails>
                            </Accordion>
                            {customVariants.map((el) => (
                              <Accordion key={el.index}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel2a-content"
                                  id="panel2a-header"
                                >
                                  <Stack direction="row" alignItems="center" spacing={3}>
                                    <TextField
                                      required
                                      className="mb-2"
                                      type="text"
                                      label={`Name of variant`}
                                      name="name"
                                      value={el.title}
                                      onChange={(e) => {
                                        updateCustomVariantTitle(el.index, e.target.value);
                                      }}
                                    />
                                    <IconButton
                                      onClick={() => {
                                        deleteCustomVariant(el.index);
                                      }}
                                    >
                                      <DeleteRounded />
                                    </IconButton>
                                  </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Card sx={{ p: 3 }}>
                                    {el.options.map((elm) => (
                                      <div className="d-flex flex-column mb-3" key={elm.index}>
                                        <Box
                                          className="mb-2"
                                          sx={{
                                            display: 'grid',
                                            columnGap: 2,
                                            rowGap: 3,
                                            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                                          }}
                                        >
                                          <TextField
                                            required
                                            className="mb-2"
                                            type="text"
                                            label={`Type`}
                                            name="name"
                                            fullWidth
                                            value={elm.name}
                                            onChange={(e) => {
                                              updateCustomVariantOption(el.index, elm.index, 'name', e.target.value);
                                            }}
                                          />
                                          <TextField
                                            required
                                            className="mb-2"
                                            type="number"
                                            label={`Price`}
                                            name="price"
                                            fullWidth
                                            value={elm.price}
                                            onChange={(e) => {
                                              updateCustomVariantOption(el.index, elm.index, 'price', e.target.value);
                                            }}
                                            InputProps={{
                                              startAdornment: (
                                                <InputAdornment>
                                                  <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                                                </InputAdornment>
                                              ),
                                            }}
                                          />
                                          <TextField
                                            required
                                            className="mb-2"
                                            type="number"
                                            label={`Wholsale price`}
                                            name="wholesalePrice"
                                            fullWidth
                                            value={elm.wholesalePrice}
                                            onChange={(e) => {
                                              updateCustomVariantOption(
                                                el.index,
                                                elm.index,
                                                'wholesalePrice',
                                                e.target.value
                                              );
                                            }}
                                            InputProps={{
                                              startAdornment: (
                                                <InputAdornment>
                                                  <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                                                </InputAdornment>
                                              ),
                                            }}
                                          />
                                          <TextField
                                            required
                                            className="mb-2"
                                            type="number"
                                            minValue={1}
                                            label={`Quantity In Stock`}
                                            name="qtyInStock"
                                            fullWidth
                                            value={elm.qtyInStock}
                                            onChange={(e) => {
                                              updateCustomVariantOption(
                                                el.index,
                                                elm.index,
                                                'qtyInStock',
                                                e.target.value
                                              );
                                            }}
                                          />
                                        </Box>
                                        <div className="d-flex flex-row align-items-center justify-content-end">
                                          <Button
                                            onClick={() => {
                                              deleteCustomVariantOptionRow(el.index, elm.index);
                                            }}
                                            size="small"
                                            color="error"
                                          >
                                            Remove
                                          </Button>
                                        </div>
                                      </div>
                                    ))}

                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <Button
                                        onClick={() => {
                                          addCustomVariantOptionRow(el.index);
                                        }}
                                        variant="outlined"
                                      >
                                        Add variant row
                                      </Button>
                                    </div>
                                  </Card>
                                </AccordionDetails>
                              </Accordion>
                            ))}
                            <div className="d-flex flex-row align-items-center justify-content-center">
                              <Button
                                onClick={() => {
                                  addCustomVariant();
                                }}
                                variant="outlined"
                              >
                                Add variant
                              </Button>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                      <DialogActions>
                        <LoadingButton
                          onClick={() => {
                            onPrev();
                          }}
                          type="button"
                          variant="outlined"
                          loading={false}
                        >
                          Previous
                        </LoadingButton>
                        <LoadingButton
                          onClick={() => {
                            onNext();
                          }}
                          type="button"
                          variant="contained"
                          loading={false}
                        >
                          Next <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
                        </LoadingButton>
                        <Button
                          onClick={() => {
                            handleClose();
                          }}
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </>
                  );

                case 6:
                  return (
                    <>
                      <Grid className="px-4 pt-3" container spacing={3}>
                        <Grid item xs={12} md={12}>
                          <div>
                            <Card sx={{ p: 3 }} className="mb-3">
                              <Autocomplete
                                multiple
                                sx={{ mb: 3 }}
                                value={addOnList}
                                onChange={(e, value) => {
                                  setAddOnList(value);
                                }}
                                id=""
                                fullWidth
                                options={addOnOptions}
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
                                    label="Choose Add ons"
                                    inputProps={{
                                      ...params.inputProps,
                                      autoComplete: '', // disable autocomplete and autofill
                                    }}
                                  />
                                )}
                              />
                            </Card>
                          </div>
                        </Grid>
                      </Grid>

                      <DialogActions>
                        <LoadingButton
                          onClick={() => {
                            onPrev();
                          }}
                          type="button"
                          variant="outlined"
                          loading={false}
                        >
                          Previous
                        </LoadingButton>
                        <LoadingButton
                          onClick={() => {
                            onNext();
                          }}
                          type="button"
                          variant="contained"
                          loading={false}
                        >
                          Next <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
                        </LoadingButton>
                        <Button
                          onClick={() => {
                            handleClose();
                          }}
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </>
                  );

                case 7:
                  return (
                    <>
                      <Grid className="px-4 pt-3" container spacing={3}>
                        <Grid item xs={12} md={12}>
                          <Card sx={{ p: 3 }}>
                            <Box
                              className="mb-3"
                              sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                              }}
                            >
                              <TextField
                                value={formik.values.metaTitle}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Meta Title"
                                variant="outlined"
                                name="metaTitle"
                                error={!!formik.touched.metaTitle && !!formik.errors.metaTitle}
                                helperText={formik.touched.metaTitle && formik.errors.metaTitle}
                              />

                              <TextField
                                value={formik.values.metaKeyword}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                fullWidth
                                label="Meta Keyword"
                                variant="outlined"
                                name="metaKeyword"
                                error={!!formik.touched.metaKeyword && !!formik.errors.metaKeyword}
                                helperText={formik.touched.metaKeyword && formik.errors.metaKeyword}
                              />
                            </Box>

                            <TextField
                              value={formik.values.metaDescription}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              fullWidth
                              label="Meta Description"
                              variant="outlined"
                              name="metaDescription"
                              error={!!formik.touched.metaDescription && !!formik.errors.metaDescription}
                              helperText={formik.touched.metaDescription && formik.errors.metaDescription}
                            />
                          </Card>
                        </Grid>
                      </Grid>
                      <DialogActions>
                        <LoadingButton
                          onClick={() => {
                            onPrev();
                          }}
                          type="button"
                          variant="outlined"
                          loading={false}
                        >
                          Previous
                        </LoadingButton>
                        <LoadingButton
                          onClick={() => {
                            if (!formik.isValid) {
                              return;
                            }
                            const formValues = {
                              productName: formik.values.productName,
                              brand: formik.values.brand,
                              price: formik.values.price,
                              discountedPrice: formik.values.discountedPrice,
                              wholesalePrice: formik.values.wholesalePrice,
                              minWholesaleQuantity: formik.values.minWholesaleQuantity,
                              productSKU: formik.values.productSKU,
                              weight: formik.values.weight,
                              quantityInStock: formik.values.quantityInStock,
                              minQuantitySold: formik.values.minQuantitySold,
                              length: formik.values.length,
                              width: formik.values.width,
                              height: formik.values.height,
                              metaDescription: formik.values.metaDescription,
                              metaTitle: formik.values.metaTitle,
                              metaKeyword: formik.values.metaKeyword,
                              coins: formik.values.coins,
                              description,
                              category,
                              subCategory,
                              isFragile,
                              specifications,
                              productUnit,
                              dimensionUnit,
                              InTheBox,
                              colorsList,
                              customVariants,
                              addOnList,
                              priceDeterminingVariant,
                            };

                            dispatch(createNewProduct(formValues, imageFiles, videoFiles, handleClose));
                          }}
                          disabled={!formik.isValid}
                          // type="submit"
                          variant="contained"
                          // loading={isCreating}
                        >
                          Finish <ArrowForwardIosRoundedIcon className="ms-3" style={{ fontSize: '0.8rem' }} />
                        </LoadingButton>
                        <Button
                          onClick={() => {
                            handleClose();
                          }}
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </>
                  );

                default:
                  break;
              }
            })()}
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default AddNewProduct;

const dimensionUnitOptions = [
  {
    label: 'meter',
    value: 'm',
  },
  {
    label: 'centimeter',
    value: 'cm',
  },
  {
    label: 'miliimeter',
    value: 'mm',
  },
  {
    label: 'inch',
    value: 'in',
  },
  {
    label: 'foot',
    value: 'ft',
  },
  {
    label: 'kilometer',
    value: 'km',
  },
  {
    label: 'yard',
    value: 'yd',
  },
];

const productUnitOptions = [
  {
    label: 'piece',
  },
  {
    label: 'kg',
  },
  {
    label: 'gm',
  },
  {
    label: 'ml',
  },
  {
    label: 'litre',
  },
  {
    label: 'mm',
  },
  {
    label: 'ft',
  },
  {
    label: 'meter',
  },
  {
    label: 'sq. ft.',
  },
  {
    label: 'sq. meter',
  },
  {
    label: 'km',
  },
  {
    label: 'set',
  },
  {
    label: 'hour',
  },
  {
    label: 'day',
  },
  {
    label: 'bunch',
  },
  {
    label: 'bundle',
  },
  {
    label: 'month',
  },
  {
    label: 'year',
  },
  {
    label: 'service',
  },
  {
    label: 'work',
  },
  {
    label: 'packet',
  },
  {
    label: 'box',
  },
  {
    label: 'pound',
  },
  {
    label: 'dozen',
  },
  {
    label: 'gunta',
  },
  {
    label: 'pair',
  },
  {
    label: 'minute',
  },
  {
    label: 'qunital',
  },
  {
    label: 'ton',
  },
  {
    label: 'capsule',
  },
  {
    label: 'tablet',
  },
  {
    label: 'plate',
  },
  {
    label: 'inch',
  },
];
