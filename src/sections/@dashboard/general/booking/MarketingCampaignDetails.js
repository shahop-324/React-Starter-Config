import {
  Box,
  Card,
  Stack,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  TableHead,
  CardHeader,
  Typography,
  TableContainer,
  Tooltip,
} from '@mui/material';
//
import { useSelector } from 'react-redux';
import dateFormat from 'dateformat';
import EmailRounded from '@mui/icons-material/EmailRounded';
import SendRounded from '@mui/icons-material/SendRounded';
import { useState } from 'react';
import MessageRounded from '@mui/icons-material/MessageRounded';
import DesignEmailCampaign from '../../../../Dialogs/Marketing/DesignEmailCampaign';
import SendEmailCampaign from '../../../../Dialogs/Marketing/SendEmailCampaign';
import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';
import SendSMSCampaign from '../../../../Dialogs/Marketing/SendSMSCampaign';
import EditSMSCampaign from '../../../../Dialogs/Marketing/EditSMSCampaign';

// ----------------------------------------------------------------------

export default function MarketingCampaignDetails() {
  const { campaigns } = useSelector((state) => state.marketing);

  const [id, setId] = useState();
  const [openEditEmail, setOpenEditEmail] = useState(false);
  const [openEditSMS, setOpenEditSMS] = useState(false);
  const [openSendSMS, setOpenSendSMS] = useState(false);
  const [openSendEmail, setOpenSendEmail] = useState(false);

  const handleCloseEditEmail = () => {
    setOpenEditEmail(false);
  };

  const handleCloseEditSMS = () => {
    setOpenEditSMS(false);
  }

  const handleCloseSendSMS = () => {
    setOpenSendSMS(false);
  };
  const handleCloseSendEmail = () => {
    setOpenSendEmail(false);
  };

  return (
    <>
      <Card>
        <CardHeader title="Marketing Campaigns" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 160 }}>Campaign Id</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Name</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Channel</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Charge</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>No. of customers</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Created At</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Status</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Actions</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {campaigns?.length > 0 &&
                  campaigns?.slice(0)
                  .reverse().map((row) => (
                    <TableRow key={row?._id}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2">{row?.campaignId}</Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.channel}</TableCell>

                      <TableCell>
                        <Label
                          variant={'ghost'}
                          color={
                            (row.status === 'paid' && 'success') || (row.status === 'pending' && 'warning') || 'error'
                          }
                        >
                          Rs.{row?.amount}
                        </Label>
                      </TableCell>

                      <TableCell sx={{ textTransform: 'capitalize' }}>{row?.customers?.length}</TableCell>

                      <TableCell align="center">
                        <Typography variant="caption">{dateFormat(row?.createdAt, 'ddd mmm dS')}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="caption">{row?.status}</Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Tooltip title={'Edit Campaign'}>
                          {row.channel === 'email' ?  <IconButton
                            onClick={() => {
                              setOpenEditEmail(true);
                              setId(row?._id);
                            }}
                          >   <EmailRounded style={{ fontSize: '20px', color: 'primary' }} />
                          </IconButton>: 
                          
                          <IconButton
                            onClick={() => {
                              setOpenEditSMS(true);
                              setId(row?._id);
                            }}
                          >   <MessageRounded style={{ fontSize: '20px', color: 'primary' }} />
                          </IconButton>
                           }
                         
                           
                        </Tooltip>

                        <Tooltip title={'Send Campaign'}>
                          <IconButton
                            onClick={() => {
                              if (row.channel === 'email') {
                                setOpenSendEmail(true);
                              }
                              if (row.channel === 'sms') {
                                setOpenSendSMS(true);
                              }

                              setId(row?._id);
                            }}
                          >
                            <SendRounded style={{ fontSize: '20px', color: '#4A7DCF' }} />
                          </IconButton>
                        </Tooltip>
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
      {openEditEmail && <DesignEmailCampaign open={openEditEmail} handleClose={handleCloseEditEmail} id={id} />}
      {openSendEmail && <SendEmailCampaign open={openSendEmail} handleClose={handleCloseSendEmail} id={id} />}
      {openSendSMS && <SendSMSCampaign open={openSendSMS} handleClose={handleCloseSendSMS} id={id} />}
      {openEditSMS && <EditSMSCampaign open={openEditSMS} handleClose={handleCloseEditSMS} id={id} />}
    </>
  );
}
