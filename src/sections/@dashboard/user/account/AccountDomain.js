import React from 'react';
import { Grid, Card, Stack, Typography, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import {useSelector} from 'react-redux';

const AccountDomain = () => {

  const {store} = useSelector((state) => state.store);

  const columns = [
    {
      field: 'id',
      hide: true,
    },
    {
      field: 'domainName',
      headerName: 'Domain Name',
      width: "220",
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: "220",
      editable: false,
      renderCell: (params) => <Chip label={params.value} style={{color: "#ffffff"}} color="success" />,
    },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      width: "220",
      editable: false,
    },
    {
      field: 'provider',
      headerName: 'Provider',
      width: "220",
      editable: false,
    },
  ];

  const rows = [
    {
      id: '82882-hjuiw8292-beu7282',
      domainName: `https://qwikshop.online/${store.subName}`,
      status: 'LIVE',
      dateCreated: '21-01-2022',
      provider: 'QwikShop',
    },
  ];

  return (
    <>
      <Grid className="px-4 pt-3" container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, position: 'relative' }}>
            <Typography variant="subtitle1" className="mb-4">
              QwikShop Managed Domain
            </Typography>
            <Box sx={{ height: 200, width: '100%' }}>
            <DataGrid pagination={false}  rows={rows} columns={columns} />
                </Box>
           
          </Card>
        </Grid>
      </Grid>

      <Grid className="px-4 pt-3" container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, position: 'relative' }}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Stack direction={'column'} spacing={1}>
                <Typography variant="subtitle1">Custom Domain</Typography>
                <Typography variant="caption">Get your own custom domain for free</Typography>
              </Stack>

<Chip label="Coming very soon" color="success" />
              {/* <Button variant="contained">Set up</Button> */}
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Grid className="px-4 pt-3" container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, position: 'relative' }}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Stack direction={'column'} spacing={1}>
                <Typography variant="subtitle1">Existing Domain</Typography>
                <Typography variant="caption">Connect your own existing domain</Typography>
              </Stack>

              <Chip label="Coming very soon" color="success" />
              {/* <Button variant="contained">Set up</Button> */}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AccountDomain;