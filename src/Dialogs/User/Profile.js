/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Grid,
  Card,
  Stack,
  TextField,
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import PhoneInput from 'react-phone-number-input';
import { UploadAvatar } from '../../components/upload';
import { fData } from '../../utils/formatNumber';
import {
  updateUserProfile,
  showSnackbar,
  updateUserPassword,
  resetIsUpdatingUser,
  resetIsUpdatingPassword,
} from '../../actions';

import CustomPhoneNumber from '../../forms/PhoneNumber';
import 'react-phone-number-input/style.css';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Profile = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const [pass, setPass] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [passConfirm, setPassConfirm] = useState('');

  const { user, isUpdatingUser, isUpdatingPassword } = useSelector((state) => state.user);

  const [phone, setPhone] = useState(user.phone);

  console.log(user?.image?.startsWith('https'));

  const [image, setImage] = useState();
  const [fileToPreview, setFileToPreview] = useState(
    user?.image?.startsWith('https') ? `https://qwikshop.s3.ap-south-1.amazonaws.com/${user.image}` : user?.image
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(file);
    setImage(file);
    try{
      setFileToPreview(URL.createObjectURL(file));
    }
    catch(error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (values) => {
    console.log(image, values);
    dispatch(updateUserProfile({ ...values, phone }, image));
  };

  const user_profile_schema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string(),
  });

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  useEffect(() => {
    dispatch(resetIsUpdatingUser());
    dispatch(resetIsUpdatingPassword());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Dialog
        maxWidth="md"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ mb: 2 }}>{'My Profile'}</DialogTitle>

        <DialogContent>
          <Box sx={{ width: { xs: '400px', md: '600px' } }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Profile" {...a11yProps(0)} />
                <Tab label="Change Password" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {/* Profile Form => Name, Email, Phone, Image */}
              <Formik initialValues={initialValues} validationSchema={user_profile_schema} onSubmit={handleFormSubmit}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid className="pt-3" container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Card sx={{ py: 3, px: 3 }}>
                          <Typography className="mb-4 text-center" variant="h6">
                            Image
                          </Typography>
                          <Box sx={{ mb: 2 }}>
                            <UploadAvatar
                              name="avatarUrl"
                              accept="image/*"
                              maxSize={3145728}
                              onDrop={handleDrop}
                              file={fileToPreview}
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
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Card sx={{ p: 3 }}>
                          <Box
                            sx={{
                              display: 'grid',
                              columnGap: 2,
                              rowGap: 3,
                              gridTemplateColumns: { xs: 'repeat(1, 1fr)' },
                            }}
                          >
                            <TextField
                              value={values.firstName}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={!!touched.firstName && !!errors.firstName}
                              helperText={touched.firstName && errors.firstName}
                              required
                              name="firstName"
                              label="First name"
                              fullWidth
                            />
                            <TextField
                              value={values.lastName}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={!!touched.lastName && !!errors.lastName}
                              helperText={touched.lastName && errors.lastName}
                              name="lastName"
                              label="Last name"
                              fullWidth
                              required
                            />
                            <TextField
                              disabled
                              value={values.email}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={!!touched.email && !!errors.email}
                              helperText={touched.email && errors.email}
                              name="email"
                              label="Email"
                              fullWidth
                              // required
                            />
                            <PhoneInput
                            disabled
                              name="phoneNumber"
                              placeholder="Phone Number"
                              value={phone}
                              onChange={setPhone}
                              inputComponent={CustomPhoneNumber}
                              defaultCountry="IN"
                            />
                            
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                    <Stack sx={{ mt: 2 }} direction="row" alignItems={'center'} justifyContent="end">
                      <LoadingButton loading={isUpdatingUser} variant="contained" type={'submit'}>
                        Save Changes
                      </LoadingButton>
                    </Stack>
                  </form>
                )}
              </Formik>
            </TabPanel>
            <TabPanel value={value} index={1}>
              {/* Change Password => Current Password, New Password, Confirm New password */}
              <form>
                <Grid className="pt-3" container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: 'grid',
                          columnGap: 2,
                          rowGap: 3,
                          gridTemplateColumns: { xs: 'repeat(1, 1fr)' },
                        }}
                      >
                        <TextField
                          value={oldPass}
                          onChange={(e) => {
                            setOldPass(e.target.value);
                          }}
                          required
                          name="currentPassword"
                          label="Current Password"
                          fullWidth
                        />
                        <TextField
                          value={pass}
                          onChange={(e) => {
                            setPass(e.target.value);
                          }}
                          required
                          name="newPassword"
                          label="New Password"
                          fullWidth
                        />
                        <TextField
                          value={passConfirm}
                          onChange={(e) => {
                            setPassConfirm(e.target.value);
                          }}
                          required
                          name="confirmNewPassword"
                          label="Confirm New Password"
                          fullWidth
                        />
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
                <Stack sx={{ mt: 2 }} direction="row" alignItems={'center'} justifyContent="end">
                  <Button
                    onClick={() => {
                      if (pass !== passConfirm || !pass || !passConfirm || !oldPass) {
                        dispatch(showSnackbar('error', 'Password and Confirm password do not match'));
                      } else {
                        dispatch(updateUserPassword({ pass, oldPass, passConfirm }));
                      }
                    }}
                    variant="contained"
                    type={'button'}
                    loading={isUpdatingPassword}
                  >
                    Update Password
                  </Button>
                </Stack>
              </form>
            </TabPanel>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
