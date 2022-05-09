import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
// routes
import { useDispatch, useSelector } from 'react-redux';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import StoreMallDirectoryRoundedIcon from '@mui/icons-material/StoreMallDirectoryRounded';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import ConnectWithoutContactRoundedIcon from '@mui/icons-material/ConnectWithoutContactRounded';
// components
import MyAvatar from '../../../components/MyAvatar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import { logout } from '../../../actions';
import Profile from '../../../Dialogs/User/Profile';
import UserReferral from '../../../Dialogs/User/UserReferral';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(null);

  const [openProfile, setOpenProfile] = useState(false);

  const [openReferral, setOpenReferral] = useState(false);

  const handleCloseReferral = () => {
    setOpenReferral(false);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    dispatch(logout());
  };

  const MENU_OPTIONS = [
    {
      label: 'My Profile',
      icon: <PersonRoundedIcon sx={{ mr: 1 }} />,
      onClick: () => {
        setOpenProfile(true);
      },
    },
    {
      label: 'Store Profile',
      
      icon: <StoreMallDirectoryRoundedIcon sx={{ mr: 1 }} />,
      onClick: () => {
        window.location.href = `/dashboard/store/settings`;
      },
    },
    {
      label: 'Facebook Group',
      
      icon: <FacebookRoundedIcon sx={{ mr: 1 }} />,
      onClick: () => {
        window.location.href = `https://www.facebook.com/groups/327591219305404`;
      },
    },
    {
      label: 'Referral',
      icon: <ConnectWithoutContactRoundedIcon sx={{ mr: 1 }} />,
      onClick: () => {
        setOpenReferral(true);
      },
    },
  ];

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <MyAvatar />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {`${user?.firstName} ${user?.lastName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              sx={{ mb: 1 }}
              key={option.label}
              
              onClick={() => {
                option.onClick();
                handleClose();
              }}
            >
              {option.icon} {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
      {openProfile && <Profile open={openProfile} handleClose={handleCloseProfile} />}
      {openReferral && <UserReferral open={openReferral} handleClose={handleCloseReferral} />}
    </>
  );
}
