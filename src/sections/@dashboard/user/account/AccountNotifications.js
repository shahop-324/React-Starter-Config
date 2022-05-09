import { useForm } from 'react-hook-form';
// @mui
import { Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, RHFSwitch } from '../../../../components/hook-form';
import { updateNotification } from '../../../../actions';

// ----------------------------------------------------------------------

const ACTIVITY_OPTIONS = [
  {
    value: 'storeOrder',
    label: 'Email and WhatsApp me when an order is placed on my store',
  },
  {
    value: 'storeStock',
    label: 'Email & WhatsApp me when an item get low in stock',
  },
  { value: 'storeAbondonedCart', label: 'Email & WhatsApp me when a cart is abondened for more than 2 days' },
];

const APPLICATION_OPTIONS = [
  { value: 'applicationNews', label: 'News and announcements' },
  { value: 'applicationProduct', label: 'Weekly product updates' },
  { value: 'applicationBlog', label: 'Weekly blog digest' },
];

// ----------------------------------------------------------------------

export default function AccountNotifications() {
  const dispatch = useDispatch();

  const { store, isUpdatingNotification } = useSelector((state) => state.store);

  const NOTIFICATION_SETTINGS = {
    storeOrder: store.storeOrder,
    storeStock: store.storeStock,
    storeAbondonedCart: store.storeAbondonedCart,
    applicationNews: store.applicationNews,
    applicationProduct: store.applicationProduct,
    applicationBlog: store.applicationBlog,
  };

  const defaultValues = {
    storeOrder: NOTIFICATION_SETTINGS.storeOrder,
    storeStock: NOTIFICATION_SETTINGS.storeStock,
    storeAbondonedCart: NOTIFICATION_SETTINGS.storeAbondonedCart,
    applicationNews: NOTIFICATION_SETTINGS.applicationNews,
    applicationProduct: NOTIFICATION_SETTINGS.applicationProduct,
    applicationBlog: NOTIFICATION_SETTINGS.applicationBlog,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(updateNotification(data));
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <Stack spacing={2} sx={{ width: 1 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Store
            </Typography>

            <Stack spacing={1}>
              {ACTIVITY_OPTIONS.map((activity) => (
                <RHFSwitch key={activity.value} name={activity.value} label={activity.label} sx={{ m: 0 }} />
              ))}
            </Stack>
          </Stack>

          <Stack spacing={2} sx={{ width: 1 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Application
            </Typography>
            <Stack spacing={1}>
              {APPLICATION_OPTIONS.map((application) => (
                <RHFSwitch key={application.value} name={application.value} label={application.label} sx={{ m: 0 }} />
              ))}
            </Stack>
          </Stack>

          <LoadingButton type="submit" variant="contained" loading={isUpdatingNotification}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
