import { DialogTitle, Dialog } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const EditShipment = ({ open, handleClose, id }) => {
  const [state, setState] = useState();

  const { shipments } = useSelector((state) => state.shipment);

  const shipment = shipments.find((el) => el._id === id);

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Update Shipment</DialogTitle>
      </Dialog>
    </>
  );
};

export default EditShipment;
