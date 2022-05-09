/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

import { snackbarActions } from '../reducers/snackbarSlice';
import { notificationActions } from '../reducers/notificationSlice';

import { appActions } from '../reducers/appSlice';


// const BaseURL = 'https://api.app.qwikshop.online/v1/';
const BaseURL = 'http://localhost:8000/v1/';



export const showSnackbar = (severity, message) => async (dispatch, _getState) => {
  dispatch(
    snackbarActions.openSnackBar({
      message,
      severity,
    })
  );

  setTimeout(() => {
    dispatch(snackbarActions.closeSnackBar());
  }, 4000);
};

export const showNotification = (message) => async (dispatch, _getState) => {
  dispatch(
    notificationActions.setNotification({
      message,
    })
  );
};

export const fetchImages = (term) => async(dispatch, getState) => {
  // Make an API call to api to fetch images
  let message;

  try{

    const res = await fetch(`${BaseURL}search/images/`, {
      method: 'POST',

      body: JSON.stringify({
        term,
      }),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(message);
      }
    }

    // dispatch(showSnackbar('success', message));

    console.log(result);

    dispatch(
      appActions.FetchImages({
        images: result.data
      })
    );


  }
  catch(error) {
    console.log(error);
    dispatch(showSnackbar("error", message));
  }
} 