/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-key */
import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  Button,
  DialogContent,
  
} from '@mui/material';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);


const CustomiseSuperstore = ({ open, handleClose }) => (
    <>
      <Dialog
        maxWidth={'lg'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ mb: 3 }}>{'Customise Your Store'}</DialogTitle>
        <DialogContent>
          

          {/* // ! Superstore */}
          {/* // * DONE Hero image, Hero text, Button link  */}
          {/* // * DONE Flash deals Product */}
          {/* // * DONE Top categories */}
          {/* // * DONE Top Ratings */}
          {/* // * DONE New Arrivals */}
          {/* // * DONE Big Discounts */}
          {/* // * DONE Products By category */}

          {/* // * DONE Products By category */}
          {/* // * DONE categories */}
          {/* // * DONE More for you */}

          {/* // * DONE Top Picks */}
          {/* // * DONE Best Seller */}
          {/* // * DONE Customer reviews */}
          {/* // * DONE Trending Items */}
          {/* // * DONE Custom section with heading and products */}

          {/* // * DONE Customisable Banners */}
          {/* // * DONE Image Banners */}

          {/* // * DONE Deal of the week */}
          {/* // * DONE Deal of the day */}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

export default CustomiseSuperstore;