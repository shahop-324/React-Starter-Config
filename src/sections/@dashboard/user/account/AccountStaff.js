/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Stack, Container, Typography, InputAdornment } from '@mui/material';
import AddStaffMember from '../../../../Dialogs/AddStaffMember';
import UpdateStaffMember from '../../../../Dialogs/Staff/updateStaff';
import RemoveStaff from '../../../../Dialogs/Staff/removeStaff';

// hooks
import useCountdown from '../../../../hooks/useCountdown';
// components
import InputStyle from '../../../../components/InputStyle';
import SocialsButton from '../../../../components/SocialsButton';
// assets
import { ComingSoonIllustration } from '../../../../assets';

// ----------------------------------------------------------------------


const CountdownStyle = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const SeparatorStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(0, 2.5),
  },
}));

// ----------------------------------------------------------------------

const AccountStaff = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [id] = useState('');


  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleCloseRemove = () => {
    setOpenRemove(false);
  };


  const [open, setOpen] = useState(false);



  const handleClose = () => {
    setOpen(false);
  };

  

  const countdown = useCountdown(new Date('07/07/2022 21:30'));

  return (
    <>
      
      <Container>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <Typography variant="h3" paragraph>
              Coming Soon!
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>We are currently working hard on this page!</Typography>

            <ComingSoonIllustration sx={{ my: 10, height: 240 }} />

            <CountdownStyle>
              <div>
                <Typography variant="h2">{countdown.days}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Days</Typography>
              </div>

              <SeparatorStyle variant="h2">:</SeparatorStyle>

              <div>
                <Typography variant="h2">{countdown.hours}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Hours</Typography>
              </div>

              <SeparatorStyle variant="h2">:</SeparatorStyle>

              <div>
                <Typography variant="h2">{countdown.minutes}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Minutes</Typography>
              </div>

              <SeparatorStyle variant="h2">:</SeparatorStyle>

              <div>
                <Typography variant="h2">{countdown.seconds}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Seconds</Typography>
              </div>
            </CountdownStyle>

            <InputStyle
              fullWidth
              placeholder="Enter your email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button variant="contained" size="large">
                      Notify Me
                    </Button>
                  </InputAdornment>
                ),
              }}
              sx={{ my: 5, '& .MuiOutlinedInput-root': { pr: 0.5 } }}
            />

            <Stack alignItems="center">
              <SocialsButton size="large" initialColor />
            </Stack>
          </Box>
        </Container>
        {/* <Card sx={{ p: 3, position: 'relative' }}>
          <Stack sx={{ mb: 3 }} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <div>
              {
                ""
              }
            </div>
            <Stack direction={'row'} spacing={3} alignItems={'center'}>
              <Button
                variant="contained"
                onClick={() => {
                  handleOpen();
                }}
              >
                Add Staff Member
              </Button>
            </Stack>
          </Stack>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid rowHeight={200} rows={rows} columns={columns} />
          </Box>
        </Card> */}
      

      {open && <AddStaffMember open={open} handleClose={handleClose} />}
      {openUpdate && <UpdateStaffMember open={openUpdate} handleClose={handleCloseUpdate} id={id} />}
      {openRemove && <RemoveStaff open={openRemove} handleClose={handleCloseRemove} id={id} />}
    </>
  );
};

export default AccountStaff;
