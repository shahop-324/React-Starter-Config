/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Box,
  
  Stack,
 
  TextField,
  Autocomplete,
 
  Button,
  
  Divider,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateMenuItem, deleteMenuItem } from '../../../actions';

const UpdateStoreMenu = ({
  _id,
  
  menuTypeA,
  itemNameA,
  productA,
  categoryA,
  subCategoryA,
  divisionA,
  pageA,
}) => {
  const dispatch = useDispatch();

  const [menuType, setMenuType] = useState(menuTypeA);
  const [product, setProduct] = useState(productA);
  const [category, setCategory] = useState(categoryA);
  const [subCategory, setSubCategory] = useState(subCategoryA);
  const [division, setDivision] = useState(divisionA);
  const [page, setPage] = useState(pageA);
  const [itemName, setItemName] = useState(itemNameA);

  
  const [parent] = useState();

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
    value: el._id,
  }));

  const onUpdate = () => {
    dispatch(
      updateMenuItem({ parent, menuType, itemName, product, category, subCategory, division, page }, _id)
    );
  };

  const onDelete = () => {
    dispatch(deleteMenuItem(_id));
  };

  return (
    <div key={_id}>
    <TextField
    sx={{mb: 3}}
        name="itemName"
        label="Name"
        fullWidth
        value={itemName}
        onChange={(e) => {
          setItemName(e.target.value);
        }}
      />
      <Autocomplete
        sx={{ mb: 3 }}
        value={menuType}
        onChange={(e, value) => {
          setMenuType(value);
        }}
        id=""
        fullWidth
        options={menuTypeOptions}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose Type"
            inputProps={{
              ...params.inputProps,
              autoComplete: '', // disable autocomplete and autofill
            }}
          />
        )}
      />
      
      <Box sx={{ mt: 2 }}>
        {(() => {
          switch (menuType?.label) {
            case 'Product':
              return (
                <Autocomplete
                  sx={{ mb: 3 }}
                  value={product}
                  onChange={(e, value) => {
                    setProduct(value);
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
                  sx={{ mb: 3 }}
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
                      <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
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
                  sx={{ mb: 3 }}
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
                      <img loading="lazy" width="20" src={`${option.image}`} srcSet={`${option.image} 2x`} alt="" />
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
                  sx={{ mb: 3 }}
                  value={division}
                  onChange={(e, value) => {
                    setDivision(value);
                  }}
                  id=""
                  fullWidth
                  options={divisionOptions}
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
                  sx={{ mb: 3 }}
                  value={page}
                  onChange={(e, value) => {
                    setPage(value);
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
      </Box>

      <Stack spacing={2} justifyContent="end" direction={'row'} alignItems="center">
        <Button onClick={onUpdate} variant="contained">Update</Button>
        <Button onClick={onDelete} variant="outlined">Remove</Button>
      </Stack>

      <Divider sx={{ my: 2 }} />
    </div>
  );
};

export default UpdateStoreMenu;

const menuTypeOptions = [
  {
    label: 'Product',
  },
  {
    label: 'Category',
  },
  {
    label: 'Sub category',
  },
  {
    label: 'Division',
  },
  {
    label: 'Pages',
  },
];
