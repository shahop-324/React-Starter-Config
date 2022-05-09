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
//
import { useSelector } from 'react-redux';
import dateFormat from 'dateformat';
import Scrollbar from '../../../../components/Scrollbar';

// ----------------------------------------------------------------------

export default function Walletetails() {

  const {transactions} = useSelector((state) => state.wallet);

  return (
    <>
      <Card>
        <CardHeader title="Wallet Transactions" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 200 }}>Transaction Id</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Type</TableCell> {/* Type can be credit of debit  */}
                  <TableCell sx={{ minWidth: 160 }}>Amount</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Reason</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Timestamp</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions?.length > 0 &&
                  transactions?.map((row) => (
                    <TableRow key={row?._id}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2">{row?.transactionId}</Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>{row?.type}</TableCell>
                      <TableCell>Rs.{row?.amount}</TableCell>

                      <TableCell>
                        {row?.reason}
                      </TableCell>
                      <TableCell>
                        {dateFormat(new Date(row?.timestamp || Date.now()), 'ddd mmm dS, yy, hh:mm TT')}
                      </TableCell>
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
