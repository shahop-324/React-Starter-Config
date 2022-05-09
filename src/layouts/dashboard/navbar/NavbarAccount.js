/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Link, Typography, Button, Stack } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// routes
// components

import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import MenuPopover from '../../../components/MenuPopover';
import AddNewStore from '../../../Dialogs/Store/AddNewStore';
import {switchStore} from '../../../actions';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const { store } = useSelector((state) => state.store);

  const [openAddStore, setOpenAddStore] = useState(false);

  const handleCloseAddStore = () => {
    setOpenAddStore(false);
  };

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const MENU_OPTIONS = [];

  user?.stores
    ?.filter((el) => el._id !== store._id)
    ?.forEach((store) => {
      MENU_OPTIONS.push({ name: store?.storeName, logo: store?.logo, id: store?._id });
    });

  return (
    <>
      <Link onClick={handleOpen} underline="none" color="inherit">
        <RootStyle
          sx={{
            ...(isCollapse && {
              bgcolor: 'transparent',
            }),
          }}
        >
          <Avatar src={`https://qwikshop.s3.ap-south-1.amazonaws.com/${store.logo}`} />

          <Box
            sx={{
              ml: 2,
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.shorter,
                }),
              ...(isCollapse && {
                ml: 0,
                width: 0,
              }),
            }}
          >
            <Typography variant="subtitle2" noWrap>
              {store?.storeName}
            </Typography>
           
          </Box>
        </RootStyle>
      </Link>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          width: 270,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Stack>
          {MENU_OPTIONS.map((option) => (
            <MenuItem onClick={() => {
              handleClose();
              dispatch(switchStore(option.id));
            }}>
              <RootStyle
                sx={{
                  ...(isCollapse && {
                    bgcolor: 'transparent',
                    width: '100% !important',
                  }),
                  width: '100% !important',
                }}
              >
                <Avatar variant='rounded' src={`https://qwikshop.s3.ap-south-1.amazonaws.com/${option.logo}`} />

                <Box
                  sx={{
                    ml: 2,
                    transition: (theme) =>
                      theme.transitions.create('width', {
                        duration: theme.transitions.duration.shorter,
                      }),
                    ...(isCollapse && {
                      ml: 0,
                      width: 0,
                    }),
                  }}
                >
                  <Typography variant="subtitle2" noWrap>
                    {option.name}
                  </Typography>
                  
                </Box>
                
              </RootStyle>
            </MenuItem>
          ))}
        </Stack>

        <MenuItem
          onClick={() => {
            handleClose();
            setOpenAddStore(true);
          }}
          sx={{ m: 1 }}
          alignItems="center"
        >
          <Stack sx={{ width: '100%' }} direction={'row'} justifyContent={'center'} alignItems={'center'}>
            <Button variant="outlined" startIcon={<AddRoundedIcon />}>
              Add new shop
            </Button>
          </Stack>
        </MenuItem>
      </MenuPopover>
      {openAddStore && <AddNewStore open={openAddStore} handleClose={handleCloseAddStore} />}
    </>
  );
}

// const MENU_OPTIONS = [{name: 'Ambala Kirana Store', level: 'Staff',}];
