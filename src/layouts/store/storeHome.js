import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import { Box, Typography, Stack, Tab, Tabs, Chip, Button } from '@mui/material';

import DirectionsRoundedIcon from '@mui/icons-material/DirectionsRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';

import { useSelector } from '../../redux/store';
import { FormProvider } from '../../components/hook-form';

import {
  ShopProductSort,
  ShopProductList,
  ShopFilterSidebar,
  ShopProductSearch,
} from '../../sections/@dashboard/e-commerce/shop';

const StoreHome = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const { products } = useSelector((state) => state.product);

  const methods = useForm({});

  const { watch } = methods;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleResetFilter = () => {};

  const values = watch();

  const isDefault =
    !values.priceRange &&
    !values.rating &&
    values.gender?.length === 0 &&
    values.colors?.length === 0 &&
    values.category === 'All';

  return (
    <>
      <div className="container my-4">
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          }}
        >
          <div>
            <Typography variant="h3">Neel Footwear</Typography>
            {/* <Typography>Shoes and Footwear Store</Typography> */}
            <Typography variant="caption">Deen Dayal Nagar, Gwalior</Typography>
            <div className="d-flex flex-row align-items-center mt-4 ">
              <Chip className="me-3" label="Open Now" variant="outlined" color="primary" size="small" />{' '}
              <Typography>10:00 am - 11:30 pm (Today)</Typography>
            </div>
          </div>

          <div className="d-flex align-items-end flex-column">
            <Chip
              className="mb-1"
              icon={<StarRoundedIcon style={{ color: '#ffffff' }} />}
              label="4.5"
              color="primary"
              variant="filled"
              style={{ color: '#ffffff' }}
            />
            <Typography variant="caption">4,509 Reviews</Typography>
            <div className="mt-3">
              <Button variant="outlined">
                {' '}
                <DirectionsRoundedIcon className="me-1" /> Direction
              </Button>
              <Button variant="outlined" className="mx-3">
                {' '}
                <ReplyRoundedIcon className="me-1" /> Share
              </Button>
              <Button variant="outlined">Reviews</Button>
            </div>
          </div>
        </Box>
      </div>

      <div className="container mt-3">
        <Tabs
          className="mb-4"
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="All Categories" />
          <Tab label="Nike" />
          <Tab label="Addidas" />
          <Tab label="Clarks" />
          <Tab label="Seeandwear" />
          <Tab label="Woodland" />
          <Tab label="Lee Cooper" />
          <Tab label="Fila" />
          <Tab label="Puma" />
          <Tab label="Reebok" />
          <Tab label="Hush Puppies" />
          <Tab label="Crocs" />
          <Tab label="Prince" />
          <Tab label="Yonex" />
          <Tab label="Wilson" />
          <Tab label="Lotto" />
          <Tab label="New Balance" />
          <Tab label="Red tape" />
          <Tab label="Jack Wolfskin" />
          <Tab label="Lowa" />
          <Tab label="Sketchers" />
        </Tabs>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <ShopProductSearch />
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <FormProvider methods={methods}>
              <ShopFilterSidebar
                onResetAll={handleResetFilter}
                isOpen={openFilter}
                onOpen={handleOpenFilter}
                onClose={handleCloseFilter}
              />
            </FormProvider>

            <ShopProductSort />
          </Stack>
        </Stack>

        <Stack sx={{ mb: 3 }}>
          {!isDefault && (
            <>
              <Typography variant="body2" gutterBottom>
                <strong>{products.length}</strong>
                &nbsp;Products found
              </Typography>

              {/* <ShopTagFiltered
                filters={filters}
                isShowReset={!isDefault && !openFilter}
                onRemoveGender={handleRemoveGender}
                onRemoveCategory={handleRemoveCategory}
                onRemoveColor={handleRemoveColor}
                onRemovePrice={handleRemovePrice}
                onRemoveRating={handleRemoveRating}
                onResetAll={handleResetFilter}
              /> */}
            </>
          )}
        </Stack>
        <ShopProductList products={products} loading={!products.length} />
      </div>
    </>
  );
};

export default StoreHome;
