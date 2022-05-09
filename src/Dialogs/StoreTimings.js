/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import TimePicker from '@mui/lab/TimePicker';
import { Typography, Box, Card, Grid, Dialog, DialogTitle, TextField, Button, Divider, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { updateStoreTiming } from '../actions';

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

const StoreTimings = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { store, isUpdatingStoreTimings } = useSelector((state) => state.store);

  const [timing, setTiming] = useState(
    store.storeTimings.length > 0
      ? store.storeTimings
      : [
          {
            index: '0',
            day: 'Sunday',
            open: true,
            openTime: new Date('2022-01-29T08:00:00'),
            closeTime: new Date('2022-01-29T22:30:00'),
            allDay: true,
          },
          {
            index: '1',
            day: 'Monday',
            open: true,
            openTime: new Date('2022-01-29T08:00:00'),
            closeTime: new Date('2022-01-29T22:30:00'),
            allDay: true,
          },
          {
            index: '2',
            day: 'Tuesday',
            open: true,
            openTime: new Date('2022-01-29T08:00:00'),
            closeTime: new Date('2022-01-29T22:30:00'),
            allDay: true,
          },
          {
            index: '3',
            day: 'Wednesday',
            open: true,
            openTime: new Date('2022-01-29T08:00:00'),
            closeTime: new Date('2022-01-29T22:30:00'),
            allDay: true,
          },
          {
            index: '4',
            day: 'Thrusday',
            open: true,
            openTime: new Date('2022-01-29T08:00:00'),
            closeTime: new Date('2022-01-29T22:30:00'),
            allDay: true,
          },
          {
            index: '5',
            day: 'Friday',
            open: true,
            openTime: new Date('2022-01-29T08:00:00'),
            closeTime: new Date('2022-01-29T22:30:00'),
            allDay: true,
          },
          {
            index: '6',
            day: 'Saturday',
            open: true,
            openTime: new Date('2022-01-29T08:00:00'),
            closeTime: new Date('2022-01-29T22:30:00'),
            allDay: true,
          },
        ]
  );

  const updateTiming = (index, field, value) => {
    setTiming((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }
        el[field] = value;
        return el;
      })
    );
  };

  const onSubmit = () => {
    dispatch(updateStoreTiming({ storeTimings: timing }, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <DialogTitle>Setup Timings</DialogTitle>

        <Typography variant="p3" className="px-4 mt-2">
          Your store will be automatically switched open/close based on the hours you choose.
        </Typography>

        <Grid className="px-4 pt-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              {timing.map((el) => (
                <div key={el.index} className="my-3">
                  <Box
                    className="mb-3"
                    sx={{
                      display: 'grid',
                      columnGap: 2,
                      rowGap: 3,
                      alignItems: 'center',
                      gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '1fr 1fr 1.5fr 0.1fr 1.5fr' },
                    }}
                  >
                    <Typography>{el.day}</Typography>
                    <Stack direction="row" spacing={4} alignItems="center">
                      <AntSwitch
                        checked={el.open}
                        onChange={(e) => updateTiming(el.index, 'open', e.target.checked)}
                        inputProps={{ 'aria-label': 'ant design' }}
                      />
                      <Typography>{el.open ? 'Open' : 'Closed'}</Typography>
                    </Stack>

                    <TimePicker
                      disabled={!el.open}
                      label="Opens at"
                      value={el.openTime}
                      onChange={(value) => {
                        updateTiming(el.index, 'openTime', value);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <Typography>-</Typography>
                    <TimePicker
                      disabled={!el.open}
                      label="Closes at"
                      value={el.closeTime}
                      onChange={(value) => {
                        updateTiming(el.index, 'closeTime', value);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Box>

                  <Divider />
                </div>
              ))}
            </Card>
          </Grid>
        </Grid>

        <div className="d-flex flex-row align-items-center justify-content-end px-4 my-4">
          <LoadingButton
            onClick={() => {
              onSubmit();
            }}
            type="submit"
            variant="contained"
            loading={isUpdatingStoreTimings}
          >
            Save
          </LoadingButton>
          <Button
            className="ms-3"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default StoreTimings;
