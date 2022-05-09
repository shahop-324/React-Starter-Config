import {
  Box,
  Card,
  Stack,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
import dateFormat from 'dateformat';
//
import { useSelector } from 'react-redux';
import Scrollbar from '../../../../components/Scrollbar';

// ----------------------------------------------------------------------

export default function ReferralDetails() {
  
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Card>
        <CardHeader title="Your Referrals" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 200 }}>Name</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Mobile</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Email</TableCell>
                  <TableCell sx={{ minWidth: 200 }}>Joined At</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Upgraded</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Plan</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {user.referredUsers?.length > 0 &&
                  user.referredUsers?.map((row) => (
                    <TableRow key={row?._id}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2">{`${row?.firstName} ${row?.lastName}`}</Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>{row?.phone || '----'}</TableCell>
                      <TableCell>{row?.email}</TableCell>

                      <TableCell>
                        {dateFormat(new Date(row?.joinedAt || Date.now()), 'ddd mmm dS, yy')}
                      
                      </TableCell>
                      <TableCell>{!row?.upgraded ? 'Not Yet' : 'Yes'}</TableCell>
                      <TableCell>{row?.plan}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}> </Box>
      </Card>
    </>
  );
}
