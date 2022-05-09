/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import {
  Grid,
  Card,
  Stack,
  Typography,
  Box,
  Button,
  IconButton,
  MenuItem,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material';

import { useSelector } from 'react-redux';

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import TextFormatRoundedIcon from '@mui/icons-material/TextFormatRounded';
import PhotoRoundedIcon from '@mui/icons-material/PhotoRounded';
import ArrowDropDownCircleRoundedIcon from '@mui/icons-material/ArrowDropDownCircleRounded';

import EditRounded from '@mui/icons-material/EditRounded';

import Iconify from '../../../../components/Iconify';
import MenuPopover from '../../../../components/MenuPopover';
import AddCheckoutField from '../../../../Dialogs/AddCheckoutField';
import EditCheckoutField from '../../../../Dialogs/CheckoutField.js/EditCheckoutField';
import DeleteCheckoutField from '../../../../Dialogs/CheckoutField.js/DeleteCheckoutField';

const AccountCheckout = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [id, setId] = useState('');
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const { store } = useSelector((state) => state.store);

  console.log(store.formFields);

  console.log(store.guestCheckout);

  const [openAddCheckoutField, setOpenAddCheckoutField] = useState(false);

  const handleOpenAddCheckoutField = () => {
    setOpenAddCheckoutField(true);
  };

  const handleCloseAddCheckoutField = () => {
    setOpenAddCheckoutField(false);
  };

  return (
    <>
      <Grid className="px-4 pt-3" container spacing={3}>
        <Grid item xs={12} md={12}>
         {/*  */}
        </Grid>
      </Grid>
      <Stack direction="column" spacing={2}>
        <Grid className="px-4 pt-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3, position: 'relative' }}>
              <Stack className="mb-4" direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Stack direction={'column'} spacing={1}>
                  <Typography variant="subtitle1">Order Form</Typography>
                  <Typography variant="caption">Create custom form field for your store checkout.</Typography>
                </Stack>
              </Stack>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <TextField disabled name="name" label="Name" fullWidth readOnly />
                <TextField disabled name="mobileNumber" label="Mobile Number" fullWidth readOnly />
                <TextField disabled name="address" label="Address" fullWidth readOnly />
                <TextField disabled name="city" label="City" fullWidth readOnly />
                <TextField disabled name="pincode" label="Pincode" fullWidth readOnly />
                {store.formFields.map((el) => (
                  <Box
                    key={el._id}
                    sx={{
                      display: 'grid',
                      columnGap: 2,
                      rowGap: 3,
                      alignItems: 'center',
                      gridTemplateColumns: { xs: '10fr 1fr' },
                    }}
                  >
                    <TextField
                      disabled
                      name={el.fieldName}
                      label={el.fieldName}
                      fullWidth
                      readOnly
                      InputProps={{
                        startAdornment: (
                          <InputAdornment>
                            {(() => {
                              switch (el.type.title) {
                                case 'Email':
                                  return <EmailRoundedIcon style={{ fontSize: '24' }} />;

                                case 'Date Picker':
                                  return <EventRoundedIcon style={{ fontSize: '24' }} />;

                                case 'Time Picker':
                                  return <AccessTimeRoundedIcon style={{ fontSize: '24' }} />;

                                case 'Image Picker':
                                  return <PhotoRoundedIcon style={{ fontSize: '24' }} />;

                                case 'Text Field':
                                  return <TextFormatRoundedIcon style={{ fontSize: '24' }} />;

                                case 'Custom Dropdown':
                                  return <ArrowDropDownCircleRoundedIcon style={{ fontSize: '24' }} />;

                                default:
                                  break;
                              }
                            })()}
                          </InputAdornment>
                        ),
                      }}
                    />
                    <MoreMenuButton
                      onEdit={() => {
                        setId(el._id);
                        handleOpenEdit();
                      }}
                      onDelete={() => {
                        setId(el._id);
                        handleOpenDelete();
                      }}
                    />
                  </Box>
                ))}
              </Box>
              <Stack className="mt-4" direction={'row'} alignItems={'center'} justifyContent={'center'}>
                <Button
                  onClick={() => {
                    handleOpenAddCheckoutField();
                  }}
                  variant="outlined"
                >
                  Add Field
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Stack>
      {openAddCheckoutField && (
        <AddCheckoutField open={openAddCheckoutField} handleClose={handleCloseAddCheckoutField} />
      )}
      {openEdit && <EditCheckoutField open={openEdit} handleClose={handleCloseEdit} id={id} />}
      {openDelete && <DeleteCheckoutField open={openDelete} handleClose={handleCloseDelete} id={id} />}
    </>
  );
};

export default AccountCheckout;

function MoreMenuButton({ onEdit, onDelete }) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton style={{ height: 'max-content' }} size="large" onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem onClick={onEdit}>
          
          <EditRounded className="me-3" style={{fontSize: "20px"}} />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}
