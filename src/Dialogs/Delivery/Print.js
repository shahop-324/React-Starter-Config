/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
  Typography,
  Card,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Receipt from '@mui/icons-material/Receipt';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import LabelIcon from '@mui/icons-material/Label';
import {
  printInvoice,
  printLabel,
  printManifest,
  resetIsGeneratingInvoice,
  resetIsGeneratingLabel,
  resetIsGeneratingManifest,
} from '../../actions';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const Print = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const { isGeneratingLabel, isGeneratingInvoice, isGeneratingManifest } = useSelector((state) => state.shipment);

  const onPrintInvoice = () => {
    dispatch(printInvoice(id));
  };
  const onPrintLabel = () => {
    dispatch(printLabel(id));
  };
  const onPrintManifest = () => {
    dispatch(printManifest(id));
  };

  useEffect(() => {
    dispatch(resetIsGeneratingLabel());
    dispatch(resetIsGeneratingInvoice());
    dispatch(resetIsGeneratingManifest());
  }, []);

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Shipment Invoice, Label, Manifest'}</DialogTitle>

        <DialogContent>
          <Stack sx={{ p: 3 }} direction="row" alignItems={'center'} spacing={4}>
            <Card sx={{ px: 5, py: 3 }}>
              <Stack direction={'column'} alignItems="center" spacing={3}>
                <Typography variant="h6">Invoice</Typography>
                <Receipt sx={{ fontSize: '40px' }} color="success" />
                <LoadingButton
                  loading={isGeneratingInvoice}
                  startIcon={<LocalPrintshopIcon />}
                  variant="outlined"
                  onClick={onPrintInvoice}
                >
                  Print
                </LoadingButton>
              </Stack>
            </Card>
            <Card sx={{ px: 5, py: 3 }}>
              <Stack direction={'column'} alignItems="center" spacing={3}>
                <Typography variant="h6">Label</Typography>
                <LabelIcon sx={{ fontSize: '40px' }} color="info" />

                <LoadingButton
                  loading={isGeneratingLabel}
                  startIcon={<LocalPrintshopIcon />}
                  variant="outlined"
                  onClick={onPrintLabel}
                >
                  Print
                </LoadingButton>
              </Stack>
            </Card>
            <Card sx={{ px: 5, py: 3 }}>
              <Stack direction={'column'} alignItems="center" spacing={3}>
                <Typography variant="h6">Manifest</Typography>
                <DescriptionIcon sx={{ fontSize: '40px' }} color="warning" />
                <LoadingButton
                  loading={isGeneratingManifest}
                  startIcon={<LocalPrintshopIcon />}
                  variant="outlined"
                  onClick={onPrintManifest}
                >
                  Print
                </LoadingButton>
              </Stack>
            </Card>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Print;
