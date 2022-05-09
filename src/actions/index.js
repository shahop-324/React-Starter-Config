/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { authActions } from '../reducers/authSlice';
import { snackbarActions } from '../reducers/snackbarSlice';
import { notificationActions } from '../reducers/notificationSlice';
import { userActions } from '../reducers/userSlice';
import { storeActions } from '../reducers/storeSlice';
import { orderActions } from '../reducers/orderSlice';
import { appActions } from '../reducers/appSlice';
import { categoryActions } from '../reducers/categorySlice';
import { productActions } from '../reducers/productSlice';
import { subCategoryActions } from '../reducers/subCategorySlice';
import { deliveryActions } from '../reducers/deliverySlice';
import { shipmentActions } from '../reducers/shipmentSlice';
import { transactionActions } from '../reducers/transactionSlice';
import { discountActions } from '../reducers/discountSlice';
import { pageActions } from '../reducers/pagesSlice';
import { referralActions } from '../reducers/referralSlice';
import { marketingActions } from '../reducers/marketingSlice';
import { customerActions } from '../reducers/customerSlice';
import { reviewActions } from '../reducers/reviewSlice';
import { questionActions } from '../reducers/questionsSlice';
import { divisionActions } from '../reducers/divisionSlice';
import { menuActions } from '../reducers/menuSlice';
import { walletActions } from '../reducers/walletSlice';

// const BaseURL = 'https://api.app.qwikshop.online/v1/';
const BaseURL = 'http://localhost:8000/v1/';

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: 'ap-south-1',
  accessKeyId: 'AKIA3EQQNGREDXST6CHF',
  secretAccessKey: '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',
});

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

export const register = (formValues, email, location) => async (dispatch, _getState) => {
  // Write logic for registering a user and handle any error case

  let message;

  dispatch(
    authActions.SetIsSubmittingRegister({
      isSubmitting: true,
    })
  );

  try {
    const res = await fetch(
      `${BaseURL}auth/register`,

      {
        method: 'POST',

        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(message);
      }
    }

    window.location.href = `/auth/verify/?email=${email}&ref=${location}`;
    dispatch(showSnackbar('success', message));

    dispatch(
      authActions.SetIsSubmittingRegister({
        isSubmitting: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));

    dispatch(
      authActions.SetIsSubmittingRegister({
        isSubmitting: false,
      })
    );
  }
};

export const verifyEmail = (email, otp) => async (dispatch, _getState) => {
  dispatch(
    authActions.SetIsSubmittingVerify({
      isSubmitting: true,
    })
  );

  let message;

  try {
    const res = await fetch(`${BaseURL}auth/verify-email`, {
      method: 'POST',

      body: JSON.stringify({
        email,
        otp,
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

    dispatch(showSnackbar('success', message));

    // Store token in auth state => redux store

    // Store user and shop data also

    console.log(result);

    dispatch(
      authActions.SignIn({
        token: result.token,
      })
    );

    dispatch(
      userActions.FetchUser({
        user: result.user,
      })
    );

    dispatch(
      storeActions.FetchStore({
        store: result.store,
      })
    );

    dispatch(
      storeActions.FetchPermissions({
        permissions: result.permissions,
      })
    );

    dispatch(showSnackbar('success', message));

    // Send user to dashboard

    setTimeout(() => {
      window.location.href = `/dashboard/home`;
    }, 1000);

    dispatch(
      authActions.SetIsSubmittingVerify({
        isSubmitting: false,
      })
    );
  } catch (error) {
    console.log(error);

    dispatch(showSnackbar('error', message));

    dispatch(
      authActions.SetIsSubmittingVerify({
        isSubmitting: false,
      })
    );
  }
};

export const switchStore = (storeId) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}store/switch/${storeId}`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
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

    console.log(result);

    // Store token in auth state => redux store

    dispatch(
      authActions.SignIn({
        token: result.token,
      })
    );

    dispatch(
      userActions.FetchUser({
        user: result.user,
      })
    );

    dispatch(
      storeActions.FetchStore({
        store: result.store,
      })
    );

    dispatch(
      storeActions.FetchPermissions({
        permissions: result.permissions,
      })
    );

    dispatch(showSnackbar('success', 'Store switched successfully!'));

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const login = (email, password) => async (dispatch, _getState) => {
  dispatch(
    authActions.SetIsSubmittingLogin({
      isSubmitting: true,
    })
  );

  let message;

  try {
    const res = await fetch(`${BaseURL}auth/login`, {
      method: 'POST',

      body: JSON.stringify({
        email,
        password,
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
        throw new Error(res.message);
      }
    }

    // Store token in auth state => redux store

    dispatch(
      authActions.SignIn({
        token: result.token,
      })
    );

    dispatch(
      userActions.FetchUser({
        user: result.user,
      })
    );

    dispatch(
      storeActions.FetchStore({
        store: result.store,
      })
    );

    dispatch(
      storeActions.FetchPermissions({
        permissions: result.permissions,
      })
    );

    dispatch(showSnackbar('success', message));

    dispatch(
      authActions.SetIsSubmittingLogin({
        isSubmitting: false,
      })
    );
  } catch (error) {
    dispatch(showSnackbar('error', message));
    console.log(error);

    dispatch(
      authActions.SetIsSubmittingLogin({
        isSubmitting: false,
      })
    );
  }
};

export const logout = () => async (dispatch, _getState) => {
  dispatch(authActions.SignOut());
  // dispatch(showSnackbar('success', 'Logged out successfully!'));
  setTimeout(() => {
    window.location.href = `/auth/login`;
  }, 1000);
};

export const resendEmailOTP = (email) => async (dispatch, _getState) => {
  let message;

  dispatch(
    authActions.SetIsReSendingOTP({
      state: true,
    })
  );

  try {
    const res = await fetch(`${BaseURL}auth/resend-email-otp`, {
      method: 'POST',

      body: JSON.stringify({
        email,
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
        throw new Error(res.message);
      }
    }

    dispatch(showSnackbar('success', message));

    dispatch(
      authActions.SetIsReSendingOTP({
        state: false,
      })
    );
  } catch (error) {
    console.log(error);

    dispatch(showSnackbar('error', message));

    dispatch(
      authActions.SetIsReSendingOTP({
        state: false,
      })
    );
  }
};

export const stopLoginBtnLoader = () => async (dispatch, _getState) => {
  dispatch(
    authActions.SetIsSubmittingLogin({
      isSubmitting: false,
    })
  );
};

export const createNewStore = (formValues, lat, long, onNext, handleClose) => async (dispatch, getState) => {
  let message;

  dispatch(
    storeActions.SetIsSubmittingSteup({
      isSubmitting: true,
    })
  );

  try {
    const res = await fetch(`${BaseURL}store/createNew`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
        lat,
        long,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    // Result will contain new store, new token, and updated user

    dispatch(
      storeActions.UpdateStore({
        store: result.store,
      })
    );

    dispatch(
      authActions.SignIn({
        token: result.token,
      })
    );

    dispatch(
      userActions.FetchUser({
        user: result.user,
      })
    );

    dispatch(
      storeActions.FetchPermissions({
        permissions: result.permissions,
      })
    );

    dispatch(showSnackbar('success', message));

    onNext();

    setTimeout(() => {
      handleClose();
      window.location.reload();
    }, 4000);

    dispatch(
      storeActions.SetIsSubmittingSteup({
        isSubmitting: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      storeActions.SetIsSubmittingSteup({
        isSubmitting: false,
      })
    );
    dispatch(showSnackbar('error', message));
  }
};

export const setupStore = (formValues, lat, long, onNext, handleClose) => async (dispatch, getState) => {
  let message;

  dispatch(
    storeActions.SetIsSubmittingSteup({
      isSubmitting: true,
    })
  );

  try {
    const res = await fetch(`${BaseURL}store/setup`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
        lat,
        long,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));

    console.log(onNext, handleClose);

    if (onNext) {
      if (onNext) {
        onNext();
      }
    }

    handleClose();

    dispatch(
      storeActions.SetIsSubmittingSteup({
        isSubmitting: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      storeActions.SetIsSubmittingSteup({
        isSubmitting: false,
      })
    );
    dispatch(showSnackbar('error', message));
  }
};

export const fetchUserDetails = () => async (dispatch, getState) => {
  if (!getState().auth.token) {
    return;
  }
  let message;

  try {
    // Fetch current user details

    const res = await fetch(`${BaseURL}user/getDetails`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      userActions.FetchUser({
        user: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const fetchStoreDetails = () => async (dispatch, getState) => {
  if (!getState().auth.token) {
    return;
  }
  let message;

  try {
    // Fetch current store details

    const res = await fetch(`${BaseURL}store/getDetails`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.FetchStore({
        store: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const fetchRecentOrder = () => async (dispatch, getState) => {
  if (!getState().auth.token) {
    return;
  }
  let message;

  try {
    // fetch recent orders

    const res = await fetch(`${BaseURL}order/recent`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      orderActions.FetchRecentOrders({
        recentOrders: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const fetchSubnames = () => async (dispatch, getState) => {
  if (!getState().auth.token) {
    return;
  }
  let message;

  try {
    const res = await fetch(`${BaseURL}general/getSubnames`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      appActions.FetchSubnames({
        subname: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

// ********************************************* Categories ********************************************* //

export const fetchCategory = (term) => async (dispatch, getState) => {
  let message;

  try {
    const fullLocation = `${BaseURL}category/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);

    const res = await fetch(newUrl, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      categoryActions.FetchCategories({
        categories: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const createCategory = (file, name, handleClose) => async (dispatch, getState) => {
  let message;

  const key = `category/${getState().store.store._id}/${uuidv4()}.${file.type}`;

  dispatch(categoryActions.SetIsCreating({ state: true }));

  try {
    // Upload image then send data to backend

    s3.getSignedUrl(
      'putObject',
      { Bucket: 'qwikshop', Key: key, ContentType: `image/${file.type}` },
      async (_err, presignedURL) => {
        await fetch(presignedURL, {
          method: 'PUT',

          body: file,

          headers: {
            'Content-Type': file.type,
          },
        });

        // Send category name and image with auth token to backend

        const res = await fetch(`${BaseURL}category/create`, {
          method: 'POST',

          body: JSON.stringify({
            image: key,
            name,
          }),

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });

        const result = await res.json();

        message = result.message;

        if (!res.ok) {
          if (!res.message) {
            throw new Error(message);
          } else {
            throw new Error(res.message);
          }
        }

        console.log(result);

        dispatch(
          categoryActions.CreateCategory({
            category: result.data,
          })
        );

        dispatch(showSnackbar('success', message));

        handleClose();

        dispatch(categoryActions.SetIsCreating({ state: false }));
      }
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(categoryActions.SetIsCreating({ state: false }));
  }
};

export const updateCategory = (file, name, id, handleClose) => async (dispatch, getState) => {
  let message;

  const key = `category/${getState().store.store._id}/${uuidv4()}.${file.type}`;

  dispatch(categoryActions.SetIsUpdating({ state: true }));

  try {
    if (file) {
      s3.getSignedUrl(
        'putObject',
        { Bucket: 'qwikshop', Key: key, ContentType: `image/${file.type}` },
        async (_err, presignedURL) => {
          await fetch(presignedURL, {
            method: 'PUT',

            body: file,

            headers: {
              'Content-Type': file.type,
            },
          });

          // Send category name and image with auth token to backend

          const res = await fetch(`${BaseURL}category/update/${id}`, {
            method: 'PATCH',

            body: JSON.stringify({
              image: key,
              name,
            }),

            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getState().auth.token}`,
            },
          });

          const result = await res.json();

          message = result.message;

          if (!res.ok) {
            if (!res.message) {
              throw new Error(message);
            } else {
              throw new Error(res.message);
            }
          }

          console.log(result);

          dispatch(
            categoryActions.UpdateCategory({
              category: result.data,
            })
          );

          dispatch(showSnackbar('success', message));

          handleClose();

          dispatch(categoryActions.SetIsUpdating({ state: false }));
        }
      );
    } else {
      const res = await fetch(`${BaseURL}category/update/${id}`, {
        method: 'PATCH',

        body: JSON.stringify({
          name,
        }),

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      const result = await res.json();

      message = result.message;

      if (!res.ok) {
        if (!res.message) {
          throw new Error(message);
        } else {
          throw new Error(res.message);
        }
      }

      console.log(result);

      dispatch(
        categoryActions.UpdateCategory({
          category: result.data,
        })
      );

      dispatch(showSnackbar('success', message));

      handleClose();

      dispatch(categoryActions.SetIsUpdating({ state: false }));
    }
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(categoryActions.SetIsUpdating({ state: false }));
  }
};

export const deleteCategory = (categoryId, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(categoryActions.SetIsDeleting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}category/delete/${categoryId}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      categoryActions.DeleteCategory({
        categoryId,
      })
    );

    handleClose();

    dispatch(showSnackbar('success', message));
    dispatch(categoryActions.SetIsDeleting({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(categoryActions.SetIsDeleting({ state: false }));
  }
};

export const deleteMultipleCategories = (ids, handleClose) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}category/deleteMultiple`, {
      method: 'DELETE',

      body: JSON.stringify({
        categoryIds: ids,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      categoryActions.DeleteMultipleCategory({
        ids,
      })
    );

    dispatch(showSnackbar('success', message));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const updateCategoryStock = (id, formValues, handleClose) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}category/updateStock/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      categoryActions.UpdateCategory({
        category: result.data,
      })
    );

    dispatch(showSnackbar('success', message));

    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const reorderCategories = (items) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}category/reorder/`, {
      method: 'POST',

      body: JSON.stringify({
        categories: items,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      categoryActions.FetchCategories({
        categories: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

// ********************************************* Product ********************************************* //

export const createNewProduct = (formValues, images, videos, handleClose) => async (dispatch, getState) => {
  const imageKeys = [];
  const videoKeys = [];

  dispatch(productActions.SetIsCreating({ state: true }));

  let message;

  try {
    // Upload images

    for (const _element of images) {
      const key = `product/image/${getState().store.store._id}/${uuidv4()}.${_element.type}`;
      imageKeys.push(key);

      s3.getSignedUrl(
        'putObject',
        { Bucket: 'qwikshop', Key: key, ContentType: `image/${_element.type}` },
        async (_err, presignedURL) => {
          await fetch(presignedURL, {
            method: 'PUT',

            body: _element,

            headers: {
              'Content-Type': _element.type,
            },
          });
        }
      );
    }

    for (const _element of videos) {
      const key = `product/video/${getState().store.store._id}/${uuidv4()}.${_element.type}`;
      videoKeys.push(key);
      s3.getSignedUrl(
        'putObject',
        { Bucket: 'qwikshop', Key: key, ContentType: `image/${_element.type}` },
        async (_err, presignedURL) => {
          await fetch(presignedURL, {
            method: 'PUT',

            body: _element,

            headers: {
              'Content-Type': _element.type,
            },
          });
        }
      );
    }

    // Upload videos
    // Send data back to api

    const res = await fetch(`${BaseURL}product/create/`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
        images: imageKeys,
        videos: videoKeys,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      productActions.CreateProduct({
        product: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(productActions.SetIsCreating({ state: false }));

    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(productActions.SetIsCreating({ state: false }));
  }
};

export const updateProduct =
  (productId, formValues, images, videos, excludedImages, excludedVideos, handleClose) =>
  async (dispatch, getState) => {
    let message;
    const imageKeys = [];
    const videoKeys = [];
    dispatch(productActions.SetIsUpdating({ state: true }));
    try {
      const newImages = images || [];
      for (const _element of newImages) {
        const key = `product/image/${getState().store.store._id}/${uuidv4()}.${_element.type}`;
        imageKeys.push(key);

        s3.getSignedUrl(
          'putObject',
          { Bucket: 'qwikshop', Key: key, ContentType: `image/${_element.type}` },
          async (_err, presignedURL) => {
            await fetch(presignedURL, {
              method: 'PUT',

              body: _element,

              headers: {
                'Content-Type': _element.type,
              },
            });
          }
        );
      }

      const newVideos = videos || [];
      for (const _element of newVideos) {
        const key = `product/video/${getState().store.store._id}/${uuidv4()}.${_element.type}`;
        videoKeys.push(key);
        s3.getSignedUrl(
          'putObject',
          { Bucket: 'qwikshop', Key: key, ContentType: `image/${_element.type}` },
          async (_err, presignedURL) => {
            await fetch(presignedURL, {
              method: 'PUT',

              body: _element,

              headers: {
                'Content-Type': _element.type,
              },
            });
          }
        );
      }

      // Upload videos
      // Send data back to api

      const res = await fetch(`${BaseURL}product/update/${productId}`, {
        method: 'PATCH',

        body: JSON.stringify({
          ...formValues,
          imageKeys: imageKeys || [],
          videoKeys: videoKeys || [],
          excludedImages: excludedImages || [],
          excludedVideos: excludedVideos || [],
        }),

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      const result = await res.json();

      message = result.message;

      if (!res.ok) {
        if (!res.message) {
          throw new Error(message);
        } else {
          throw new Error(res.message);
        }
      }

      console.log(result);

      dispatch(
        productActions.UpdateProduct({
          product: result.data,
        })
      );

      dispatch(showSnackbar('success', message));
      dispatch(productActions.SetIsUpdating({ state: false }));

      handleClose();
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar('error', message));
      dispatch(productActions.SetIsUpdating({ state: false }));
    }
  };

export const fetchProducts = (term) => async (dispatch, getState) => {
  if (!getState().auth.token) {
    return;
  }
  let message;
  try {
    //
    const fullLocation = `${BaseURL}product/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);

    const res = await fetch(newUrl, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      productActions.FetchProducts({
        products: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const updateProductStock = (id, formValues, handleClose) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}product/update/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
        imageKeys: [],
        videoKeys: [],
        excludedImages: [],
        excludedVideos: [],
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      productActions.UpdateProduct({
        product: result.data,
      })
    );

    dispatch(showSnackbar('success', message));

    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const reorderProducts = (items) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}product/reorder/`, {
      method: 'POST',

      body: JSON.stringify({
        products: items,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      productActions.FetchProducts({
        products: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const deleteProduct = (productId, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(productActions.SetIsDeleting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}product/delete/${productId}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      productActions.DeleteProduct({
        productId,
      })
    );

    handleClose();

    dispatch(showSnackbar('success', message));
    dispatch(productActions.SetIsDeleting({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(productActions.SetIsDeleting({ state: false }));
    dispatch(showSnackbar('error', message));
  }
};

export const deleteMultipleProducts = (ids, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(productActions.SetIsDeleting({ state: true }));
  try {
    const res = await fetch(`${BaseURL}product/deleteMultiple`, {
      method: 'DELETE',

      body: JSON.stringify({
        productIds: ids,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      productActions.DeleteMultipleProduct({
        ids,
      })
    );

    dispatch(showSnackbar('success', message));
    handleClose();
    dispatch(productActions.SetIsDeleting({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(productActions.SetIsDeleting({ state: false }));
  }
};

// ********************************************* Sub categories ********************************************* //

export const fetchSubCategory = (term) => async (dispatch, getState) => {
  let message;

  try {
    const fullLocation = `${BaseURL}subCategory/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);

    const res = await fetch(newUrl, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      subCategoryActions.FetchSubCategories({
        subCategories: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const createSubCategory = (file, name, category, handleClose) => async (dispatch, getState) => {
  let message;

  const key = `subCategory/${category.value}/${getState().store.store._id}/${uuidv4()}.${file.type}`;

  dispatch(subCategoryActions.SetIsCreating({ state: true }));

  try {
    // Upload image then send data to backend

    s3.getSignedUrl(
      'putObject',
      { Bucket: 'qwikshop', Key: key, ContentType: `image/${file.type}` },
      async (_err, presignedURL) => {
        await fetch(presignedURL, {
          method: 'PUT',

          body: file,

          headers: {
            'Content-Type': file.type,
          },
        });

        // Send subCategory name and image with auth token to backend

        const res = await fetch(`${BaseURL}subCategory/create`, {
          method: 'POST',

          body: JSON.stringify({
            image: key,
            name,
            category,
          }),

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });

        const result = await res.json();

        message = result.message;

        if (!res.ok) {
          if (!res.message) {
            throw new Error(message);
          } else {
            throw new Error(res.message);
          }
        }

        console.log(result);

        dispatch(
          subCategoryActions.CreateSubCategory({
            subCategory: result.data,
          })
        );

        dispatch(showSnackbar('success', message));

        handleClose();

        dispatch(subCategoryActions.SetIsCreating({ state: false }));
      }
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(subCategoryActions.SetIsCreating({ state: false }));
  }
};

export const updateSubCategory = (file, name, category, id, handleClose) => async (dispatch, getState) => {
  let message;

  const key = `subCategory/${category.value}/${getState().store.store._id}/${uuidv4()}.${file.type}`;

  dispatch(subCategoryActions.SetIsUpdating({ state: true }));

  try {
    if (file) {
      s3.getSignedUrl(
        'putObject',
        { Bucket: 'qwikshop', Key: key, ContentType: `image/${file.type}` },
        async (_err, presignedURL) => {
          await fetch(presignedURL, {
            method: 'PUT',

            body: file,

            headers: {
              'Content-Type': file.type,
            },
          });

          // Send category name and image with auth token to backend

          const res = await fetch(`${BaseURL}subCategory/update/${id}`, {
            method: 'PATCH',

            body: JSON.stringify({
              image: key,
              name,
              category,
            }),

            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getState().auth.token}`,
            },
          });

          const result = await res.json();

          message = result.message;

          if (!res.ok) {
            if (!res.message) {
              throw new Error(message);
            } else {
              throw new Error(res.message);
            }
          }

          console.log(result);

          dispatch(
            subCategoryActions.UpdateSubCategory({
              subCategory: result.data,
            })
          );

          dispatch(showSnackbar('success', message));

          handleClose();

          dispatch(subCategoryActions.SetIsUpdating({ state: false }));
        }
      );
    } else {
      const res = await fetch(`${BaseURL}subCategory/update/${id}`, {
        method: 'PATCH',

        body: JSON.stringify({
          name,
          category,
        }),

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      const result = await res.json();

      message = result.message;

      if (!res.ok) {
        if (!res.message) {
          throw new Error(message);
        } else {
          throw new Error(res.message);
        }
      }

      console.log(result);

      dispatch(
        subCategoryActions.UpdateSubCategory({
          subCategory: result.data,
        })
      );

      dispatch(showSnackbar('success', message));

      handleClose();

      dispatch(subCategoryActions.SetIsUpdating({ state: false }));
    }
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(subCategoryActions.SetIsUpdating({ state: false }));
  }
};

export const deleteSubCategory = (subCategoryId, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(subCategoryActions.SetIsDeleting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}subCategory/delete/${subCategoryId}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      subCategoryActions.DeleteSubCategory({
        subCategoryId,
      })
    );

    handleClose();

    dispatch(showSnackbar('success', message));
    dispatch(subCategoryActions.SetIsDeleting({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(subCategoryActions.SetIsDeleting({ state: false }));
  }
};

export const deleteMultipleSubCategories = (ids, handleClose) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}subCategory/deleteMultiple`, {
      method: 'DELETE',

      body: JSON.stringify({
        subCategoryIds: ids,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      subCategoryActions.DeleteMultipleSubCategory({
        ids,
      })
    );

    dispatch(showSnackbar('success', message));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const updateSubCategoryStock = (id, formValues, handleClose) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}subCategory/updateStock/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      subCategoryActions.UpdateSubCategory({
        subCategory: result.data,
      })
    );

    dispatch(showSnackbar('success', message));

    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const reorderSubCategories = (items) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}subCategory/reorder/`, {
      method: 'POST',

      body: JSON.stringify({
        subCategories: items,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      subCategoryActions.FetchSubCategories({
        subCategories: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

// ********************************************* Division *********************************************** //

export const fetchDivision = (term) => async (dispatch, getState) => {
  let message;

  try {
    const fullLocation = `${BaseURL}division/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);

    const res = await fetch(newUrl, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      divisionActions.FetchDivisions({
        divisions: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const createDivision = (file, name, subCategory, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(divisionActions.SetIsCreating({ state: true }));
  const key = `division/${subCategory.value}/${getState().store.store._id}/${uuidv4()}.${file.type}`;

  try {
    // Upload image then send data to backend

    s3.getSignedUrl(
      'putObject',
      { Bucket: 'qwikshop', Key: key, ContentType: `image/${file.type}` },
      async (_err, presignedURL) => {
        await fetch(presignedURL, {
          method: 'PUT',

          body: file,

          headers: {
            'Content-Type': file.type,
          },
        });

        // Send division name and image with auth token to backend

        const res = await fetch(`${BaseURL}division/create`, {
          method: 'POST',

          body: JSON.stringify({
            image: key,
            name,
            subCategory,
          }),

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getState().auth.token}`,
          },
        });

        const result = await res.json();

        message = result.message;

        if (!res.ok) {
          if (!res.message) {
            throw new Error(message);
          } else {
            throw new Error(res.message);
          }
        }

        console.log(result);

        dispatch(
          divisionActions.CreateDivision({
            division: result.data,
          })
        );

        dispatch(showSnackbar('success', message));
        dispatch(divisionActions.SetIsCreating({ state: false }));
        handleClose();
      }
    );
    dispatch(divisionActions.SetIsCreating({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(divisionActions.SetIsCreating({ state: false }));
  }
};

export const updateDivision = (file, name, subCategory, id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(divisionActions.SetIsUpdating({ state: true }));
  const key = `division/${subCategory.value}/${getState().store.store._id}/${uuidv4()}.${file.type}`;

  try {
    if (file) {
      s3.getSignedUrl(
        'putObject',
        { Bucket: 'qwikshop', Key: key, ContentType: `image/${file.type}` },
        async (_err, presignedURL) => {
          await fetch(presignedURL, {
            method: 'PUT',

            body: file,

            headers: {
              'Content-Type': file.type,
            },
          });

          // Send category name and image with auth token to backend

          const res = await fetch(`${BaseURL}division/update/${id}`, {
            method: 'PATCH',

            body: JSON.stringify({
              image: key,
              name,
              subCategory,
            }),

            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getState().auth.token}`,
            },
          });

          const result = await res.json();

          message = result.message;

          if (!res.ok) {
            if (!res.message) {
              throw new Error(message);
            } else {
              throw new Error(res.message);
            }
          }

          console.log(result);

          dispatch(
            divisionActions.UpdateDivision({
              division: result.data,
            })
          );

          dispatch(showSnackbar('success', message));
          dispatch(divisionActions.SetIsUpdating({ state: false }));
          handleClose();
        }
      );
    } else {
      const res = await fetch(`${BaseURL}division/update/${id}`, {
        method: 'PATCH',

        body: JSON.stringify({
          name,
          subCategory,
        }),

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      const result = await res.json();

      message = result.message;

      if (!res.ok) {
        if (!res.message) {
          throw new Error(message);
        } else {
          throw new Error(res.message);
        }
      }

      console.log(result);

      dispatch(
        divisionActions.UpdateDivision({
          division: result.data,
        })
      );

      dispatch(showSnackbar('success', message));
      dispatch(divisionActions.SetIsUpdating({ state: false }));
      handleClose();
    }
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(divisionActions.SetIsUpdating({ state: false }));
  }
};

export const deleteDivision = (divisionId, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(divisionActions.SetIsDeleting({ state: true }));
  try {
    const res = await fetch(`${BaseURL}division/delete/${divisionId}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      divisionActions.DeleteDivision({
        divisionId,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(divisionActions.SetIsDeleting({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(divisionActions.SetIsDeleting({ state: false }));
  }
};

export const deleteMultipleDivisions = (ids, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(divisionActions.SetIsDeleting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}division/deleteMultiple`, {
      method: 'DELETE',

      body: JSON.stringify({
        divisionIds: ids,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      divisionActions.DeleteMultipleDivision({
        ids,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(divisionActions.SetIsDeleting({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(divisionActions.SetIsDeleting({ state: false }));
  }
};

export const updateDivisionStock = (id, formValues, handleClose) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}division/updateStock/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      divisionActions.UpdateDivision({
        division: result.data,
      })
    );

    dispatch(showSnackbar('success', message));

    if (handleClose) {
      handleClose();
    }
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const reorderDivisions = (items) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}division/reorder/`, {
      method: 'POST',

      body: JSON.stringify({
        divisions: items,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      divisionActions.FetchDivisions({
        divisions: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

// ********************************************* Delivery ********************************************* //

export const addPickupPoint = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(deliveryActions.SetIsCreatingPickupPoint({ state: true }));
  try {
    const res = await fetch(`${BaseURL}delivery/pickupPoint/create`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      deliveryActions.CreatePickupPoint({
        pickupPoint: result.data,
      })
    );

    dispatch(deliveryActions.SetIsCreatingPickupPoint({ state: false }));
    if (handleClose) {
      handleClose();
    }

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(deliveryActions.SetIsCreatingPickupPoint({ state: false }));
  }
};

export const updatePickupPoint = (formValues, id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(deliveryActions.SetIsUpdatingPickupPoint({ state: true }));

  try {
    const res = await fetch(`${BaseURL}delivery/pickupPoint/update/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      deliveryActions.UpdatePickupPoint({
        pickupPoint: result.data,
      })
    );

    dispatch(deliveryActions.SetIsUpdatingPickupPoint({ state: false }));
    handleClose();
    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(deliveryActions.SetIsUpdatingPickupPoint({ state: false }));
  }
};

export const deletePickupPoint = (id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(deliveryActions.SetIsUpdatingPickupPoint({ state: true }));

  try {
    const res = await fetch(`${BaseURL}delivery/pickupPoint/delete/${id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      deliveryActions.DeletePickupPoint({
        pickupPointId: id,
      })
    );

    dispatch(deliveryActions.SetIsDeletingPickupPoint({ state: false }));
    handleClose();
    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(deliveryActions.SetIsDeletingPickupPoint({ state: false }));
  }
};

export const fetchPickupPoints = (term) => async (dispatch, getState) => {
  let message;
  try {
    const fullLocation = `${BaseURL}delivery/pickupPoint/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);
    const res = await fetch(newUrl, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      deliveryActions.FetchPickupPoints({
        pickupPoints: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const updatePickupPointStatus = (id, formValues) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}delivery/pickupPoint/update/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      deliveryActions.UpdatePickupPoint({
        pickupPoint: result.data,
      })
    );
    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const deleteMultiplePickupPoint = (ids, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(deliveryActions.SetIsDeletingPickupPoint({ state: true }));
  try {
    const res = await fetch(`${BaseURL}delivery/pickupPoint/deleteMultiple`, {
      method: 'DELETE',

      body: JSON.stringify({
        pickupPointIds: ids,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      deliveryActions.DeleteMultiplePickupPoints({
        ids,
      })
    );

    dispatch(showSnackbar('success', message));
    handleClose();
    dispatch(deliveryActions.SetIsDeletingPickupPoint({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    handleClose();
    dispatch(deliveryActions.SetIsDeletingPickupPoint({ state: false }));
  }
};

// ********************************************************* Shipment ********************************************************* //

export const fetchShipments = (term) => async (dispatch, getState) => {
  let message;
  try {
    const fullLocation = `${BaseURL}delivery/shipment/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);
    const res = await fetch(newUrl, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      shipmentActions.FetchShipments({
        shipments: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const updateShipment = (formValues, id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(shipmentActions.SetIsUpdating({ state: true }));

  try {
    const res = await fetch(`${BaseURL}delivery/shipment/update/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      shipmentActions.UpdateShipment({
        shipment: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(shipmentActions.SetIsUpdating({ state: false }));
    if (handleClose) {
      handleClose();
    }
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(shipmentActions.SetIsUpdating({ state: false }));
  }
};

// ****************************************************** Transactions *************************************************** //

export const fetchPayouts = (term) => async (dispatch, getState) => {
  let message;
  try {
    const fullLocation = `${BaseURL}payout/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);
    const res = await fetch(newUrl, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      transactionActions.FetchPayouts({
        payouts: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const fetchRefunds = (term) => async (dispatch, getState) => {
  let message;
  try {
    const fullLocation = `${BaseURL}refund/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);
    const res = await fetch(newUrl, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      transactionActions.FetchRefunds({
        refunds: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const fetchTransactions = (term) => async (dispatch, getState) => {
  let message;
  try {
    const fullLocation = `${BaseURL}transaction/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);
    const res = await fetch(newUrl, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      transactionActions.FetchTransactions({
        transactions: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

// ********************************************** Payment Settings ************************************************** //

export const updatePaymentSettings = (formValues) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingPaymentSettings({ state: true }));
  try {
    const res = await fetch(`${BaseURL}store/update/paymentSettings`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingPaymentSettings({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingPaymentSettings({ state: false }));
  }
};

// ************************************************* Discount *************************************************** //

// Create, Update, Read, Delete

export const createNewDiscount = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(discountActions.SetIsCreating({ state: true }));
  try {
    const res = await fetch(`${BaseURL}discount/create`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      discountActions.CreateDiscount({
        discount: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(discountActions.SetIsCreating({ state: false }));

    if (handleClose) {
      handleClose();
    }
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(discountActions.SetIsCreating({ state: false }));
    if (handleClose) {
      handleClose();
    }
  }
};

export const updateDiscount = (formValues, id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(discountActions.SetIsUpdating({ state: true }));
  try {
    const res = await fetch(`${BaseURL}discount/update/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      discountActions.UpdateDiscount({
        discount: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(discountActions.SetIsUpdating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(discountActions.SetIsUpdating({ state: false }));
    handleClose();
  }
};

export const fetchDiscounts = (term) => async (dispatch, getState) => {
  let message;
  try {
    const fullLocation = `${BaseURL}discount/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);

    const res = await fetch(newUrl, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      discountActions.FetchDiscounts({
        discounts: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const deleteDiscount = (id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(discountActions.SetIsDeleting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}discount/delete/${id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      discountActions.DeleteDiscount({
        discountId: id,
      })
    );

    dispatch(discountActions.SetIsDeleting({ state: false }));
    handleClose();
    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(discountActions.SetIsDeleting({ state: false }));
    dispatch(showSnackbar('error', message));
    handleClose();
  }
};

// ********************************************* Manage Store *********************************** //

export const updateStoreTheme = (theme) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}store/updateTheme/${theme}`, {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const updateStore = (formValues) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}store/update`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const updateStoreFavicon = (file, handleClose) => async (dispatch, getState) => {
  let message;

  dispatch(storeActions.SetIsUpdatingFavicon({ state: true }));

  try {
    // Upload to aws and send to api

    const key = `store/favicon/${getState().store.store._id}/${uuidv4()}.${file.type}`;

    s3.getSignedUrl(
      'putObject',
      { Bucket: 'qwikshop', Key: key, ContentType: `image/${file.type}` },
      async (_err, presignedURL) => {
        await fetch(presignedURL, {
          method: 'PUT',

          body: file,

          headers: {
            'Content-Type': file.type,
          },
        });
      }
    );

    const res = await fetch(`${BaseURL}store/manage/favicon`, {
      method: 'PATCH',

      body: JSON.stringify({
        favicon: key,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingFavicon({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingFavicon({ state: false }));
    handleClose();
  }
};

export const updateStoreSEO = (formValues, file, handleClose) => async (dispatch, getState) => {
  let message;
  let key;
  dispatch(storeActions.SetIsUpdatingStoreSEO({ state: true }));

  try {
    if (file) {
      key = `store/seo/${getState().store.store._id}/${uuidv4()}.${file.type}`;
      // Upload to aws

      s3.getSignedUrl(
        'putObject',
        { Bucket: 'qwikshop', Key: key, ContentType: `image/${file.type}` },
        async (_err, presignedURL) => {
          await fetch(presignedURL, {
            method: 'PUT',

            body: file,

            headers: {
              'Content-Type': file.type,
            },
          });
        }
      );
    }

    const res = await fetch(`${BaseURL}store/manage/seo`, {
      method: 'PATCH',

      body: JSON.stringify({
        seoImagePreview: key,
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingStoreSEO({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingStoreSEO({ state: false }));
    handleClose();
  }
};

export const updateOrderFlow = (orderFlow, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingOrderFlow({ state: true }));

  try {
    const res = await fetch(`${BaseURL}store/manage/order-flow`, {
      method: 'PATCH',

      body: JSON.stringify({
        orderFlow,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingOrderFlow({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingOrderFlow({ state: false }));
    handleClose();
  }
};

export const updateShareMessages = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingShareMessage({ state: true }));

  try {
    const res = await fetch(`${BaseURL}store/manage/share-message`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingShareMessage({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingShareMessage({ state: false }));
    handleClose();
  }
};

export const updateSelfDeliveryZone = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingSelfDeliveryZone({ state: true }));

  try {
    const res = await fetch(`${BaseURL}store/manage/self-delivery-zone`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingSelfDeliveryZone({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingSelfDeliveryZone({ state: false }));
    handleClose();
  }
};

export const updateManageCharges = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingManageCharges({ state: true }));

  try {
    const res = await fetch(`${BaseURL}store/manage/manage-charges`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingManageCharges({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingManageCharges({ state: false }));
    handleClose();
  }
};

export const updateStoreTiming = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingStoreTimings({ state: true }));

  try {
    const res = await fetch(`${BaseURL}store/manage/store-timing`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingStoreTimings({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingStoreTimings({ state: false }));
    handleClose();
  }
};

// *************************************** Policy ********************************** //

export const updatePolicy = (formValues) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingPolicy({ state: true }));

  try {
    const res = await fetch(`${BaseURL}store/policy/update`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingPolicy({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingPolicy({ state: false }));
  }
};

// ***************************************** Notification ************************************** //

export const updateNotification = (formValues) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingNotification({ state: true }));

  try {
    const res = await fetch(`${BaseURL}store/notification/update`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingNotification({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingNotification({ state: false }));
  }
};

// ***************************************** Update Social Links ************************************** //

export const updateSocialLinks = (formValues) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingSocialLinks({ state: true }));

  try {
    const res = await fetch(`${BaseURL}store/social-links/update`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingSocialLinks({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingSocialLinks({ state: false }));
  }
};

// ***************************************** Update Store General Info ************************************** //

export const updateStoreGeneralInfo = (formValues, subName, file) => async (dispatch, getState) => {
  let message;
  let key;
  dispatch(storeActions.SetIsSubmittingSteup({ state: true }));
  try {
    if (file) {
      key = `store/logo/${getState().store.store._id}/${uuidv4()}.${file.type}`;

      // Upload to aws

      s3.getSignedUrl(
        'putObject',
        { Bucket: 'qwikshop', Key: key, ContentType: `image/${file.type}` },
        async (_err, presignedURL) => {
          await fetch(presignedURL, {
            method: 'PUT',

            body: file,

            headers: {
              'Content-Type': file.type,
            },
          });
        }
      );
    }

    // If(image) => upload image and send to api

    const res = await fetch(`${BaseURL}store/general/update`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
        subName,
        key,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsSubmittingSteup({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsSubmittingSteup({ state: false }));
  }
};

// ************************************************* Store Other Info ************************************************ //

export const updateStoreOtherInfo = (formValues) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingOtherInfo({ state: true }));

  try {
    const res = await fetch(`${BaseURL}store/other-info/update`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingOtherInfo({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingOtherInfo({ state: false }));
  }
};

// ************************************************* Store Ambience ************************************************ //

export const updateStoreAmbience = (formValues) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingAmbience({ state: true }));
  try {
    const res = await fetch(`${BaseURL}store/ambience/update`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingAmbience({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingAmbience({ state: false }));
  }
};

// ************************************************* Store pages ************************************************* //

// Fetch, Add, Update, Delete

export const addStorePage = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  console.log(formValues);
  dispatch(pageActions.SetIsCreating({ state: true }));

  try {
    const res = await fetch(`${BaseURL}pages/create`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      pageActions.CreatePage({
        page: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(pageActions.SetIsCreating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(pageActions.SetIsCreating({ state: false }));
  }
};

export const getStorePages = (term) => async (dispatch, getState) => {
  let message;

  try {
    const fullLocation = `${BaseURL}pages/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);

    const res = await fetch(newUrl, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      pageActions.FetchPages({
        pages: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const updateStorePage = (formValues, id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(pageActions.SetIsUpdating({ state: true }));

  try {
    const res = await fetch(`${BaseURL}pages/update/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      pageActions.UpdatePage({
        page: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(pageActions.SetIsUpdating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(pageActions.SetIsUpdating({ state: false }));
  }
};

export const deleteStorePage = (id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(pageActions.SetIsDeleting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}pages/delete/${id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      pageActions.DeletePage({
        pageId: id,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(pageActions.SetIsDeleting({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(pageActions.SetIsDeleting({ state: false }));
    handleClose();
  }
};

// ************************************************* Checkout Field ************************************************* //

// Add, Update, Delete

export const toggleGuestCheckout = (state) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}store/general/guest-checkout`, {
      method: 'PATCH',

      body: JSON.stringify({
        guestCheckout: state,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const addCheckoutField = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsCreatingCheckoutField({ state: true }));
  try {
    const res = await fetch(`${BaseURL}store/checkout-form/create`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsCreatingCheckoutField({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsCreatingCheckoutField({ state: false }));
    handleClose();
  }
};

export const updateCheckoutField = (formValues, id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingCheckoutField({ state: true }));
  try {
    const res = await fetch(`${BaseURL}store/checkout-form/update/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingCheckoutField({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingCheckoutField({ state: false }));
    handleClose();
  }
};

export const deleteCheckoutField = (id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingCheckoutField({ state: true }));
  try {
    const res = await fetch(`${BaseURL}store/checkout-form/delete/${id}`, {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingCheckoutField({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingCheckoutField({ state: false }));
    handleClose();
  }
};

// **************************************************** Staff *************************************************************** //

// Add, update, deletes

export const addStaffMember = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsCreatingStaff({ state: true }));

  try {
    const res = await fetch(`${BaseURL}store/staff/create`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(storeActions.SetIsCreatingStaff({ state: false }));
    dispatch(showSnackbar('success', message));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsCreatingStaff({ state: false }));
    handleClose();
  }
};

export const updateStaffMember = (formValues, email, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingStaff({ state: true }));

  try {
    const res = await fetch(`${BaseURL}store/staff/update/${email}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(storeActions.SetIsUpdatingStaff({ state: false }));
    dispatch(showSnackbar('success', message));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingStaff({ state: false }));
    handleClose();
  }
};

export const removeStaffMember = (email, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsDeletingStaff({ state: true }));

  try {
    const res = await fetch(`${BaseURL}store/staff/delete/${email}`, {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.UpdateStore({
        store: result.data,
      })
    );

    dispatch(storeActions.SetIsDeletingStaff({ state: false }));
    dispatch(showSnackbar('success', message));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsDeletingStaff({ state: false }));
    handleClose();
  }
};

// ******************************************************** Referral ********************************************************** //

export const fetchReferralPurchases = () => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}referral/fetchReferralPurchases`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      referralActions.FetchReferralPurchases({
        purchases: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const fetchReferrals = (term) => async (dispatch, getState) => {
  let message;
  try {
    const fullLocation = `${BaseURL}referral/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);

    const res = await fetch(newUrl, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      referralActions.FetchReferrals({
        referrals: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const addNewReferrer = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(referralActions.SetIsCreating({ state: true }));

  try {
    const res = await fetch(`${BaseURL}referral/create`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      referralActions.CreateReferral({
        referral: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(referralActions.SetIsCreating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(referralActions.SetIsCreating({ state: false }));
  }
};

export const editReferrer = (formValues, id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(referralActions.SetIsUpdating({ state: true }));

  try {
    const res = await fetch(`${BaseURL}referral/update/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      referralActions.UpdateReferral({
        referral: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(referralActions.SetIsUpdating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(referralActions.SetIsUpdating({ state: false }));
  }
};

export const deleteReferrer = (id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(referralActions.SetIsDeleting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}referral/delete/${id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      referralActions.DeleteReferral({
        referralId: id,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(referralActions.SetIsDeleting({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(referralActions.SetIsDeleting({ state: false }));
  }
};

export const deleteMultipleReferrers = (ids, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(referralActions.SetIsDeleting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}referral/deleteMultiple`, {
      method: 'PATCH',

      body: JSON.stringify({
        ids,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      referralActions.DeleteMultipleReferral({
        ids,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(referralActions.SetIsDeleting({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(referralActions.SetIsDeleting({ state: false }));
  }
};

// ************************************************* Marketing ********************************************** //

export const fetchMarketingCampaigns = () => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}marketing/getAll`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      marketingActions.FetchCampaigns({
        campaigns: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const creatEmailCampaign = (formValues, customersList, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(marketingActions.SetIsCreating({ state: true }));

  try {
    const res = await fetch(`${BaseURL}marketing/create/email`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
        customers: customersList,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      marketingActions.CreateCampaign({
        campaign: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(marketingActions.SetIsCreating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(marketingActions.SetIsCreating({ state: false }));
  }
};

export const updateEmailCampaign = (formValues, id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(marketingActions.SetIsUpdating({ state: true }));
  try {
    const res = await fetch(`${BaseURL}marketing/update/mail/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      marketingActions.UpdateCampaign({
        campaign: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(marketingActions.SetIsUpdating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(marketingActions.SetIsUpdating({ state: false }));
  }
};

export const sendEmailCampaign = (id, handleClose) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}marketing/send/mail/${id}`, {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      marketingActions.UpdateCampaign({
        campaign: result.data,
      })
    );

    dispatch(
      storeActions.FetchStore({
        store: result.store,
      })
    );

    dispatch(showSnackbar('success', message));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const sendSMSCampaign = (id, handleClose) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}marketing/send/sms/${id}`, {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      marketingActions.UpdateCampaign({
        campaign: result.data,
      })
    );

    dispatch(
      storeActions.FetchStore({
        store: result.store,
      })
    );

    dispatch(showSnackbar('success', message));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const testEmailCampaign = () => async (dispatch, getState) => {};

export const createSMSCampaign = (formValues, customersList, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(marketingActions.SetIsCreating({ state: true }));

  try {
    const res = await fetch(`${BaseURL}marketing/create/sms`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
        customers: customersList,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      marketingActions.CreateCampaign({
        campaign: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(marketingActions.SetIsCreating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(marketingActions.SetIsCreating({ state: false }));
  }
};

export const updateSMSCampaign = (formValues, id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(marketingActions.SetIsUpdating({ state: true }));
  try {
    const res = await fetch(`${BaseURL}marketing/update/sms/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      marketingActions.UpdateCampaign({
        campaign: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(marketingActions.SetIsUpdating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(marketingActions.SetIsUpdating({ state: false }));
  }
};

export const createGoogleAdsCampaign = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(marketingActions.SetIsCreating({ state: true }));

  try {
    const res = await fetch(`${BaseURL}marketing/create/google`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      marketingActions.CreateCampaign({
        campaign: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(marketingActions.SetIsCreating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(marketingActions.SetIsCreating({ state: false }));
  }
};

// **************************************************** Customer ********************************************* //

// Add, update, delete, deleteMultiple, fetch, import, send sms

export const addCoinsToCustomer = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(customerActions.SetIsAddingCoins({ state: true }));

  try {
    const res = await fetch(`${BaseURL}customer/addCoins`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      customerActions.UpdateCustomer({
        customer: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(customerActions.SetIsAddingCoins({ state: false }));
    handleClose();

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(customerActions.SetIsAddingCoins({ state: false }));
  }
};

export const addNewCustomer = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(customerActions.SetIsCreating({ state: true }));
  try {
    const res = await fetch(`${BaseURL}customer/create`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      customerActions.CreateCustomer({
        customer: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(customerActions.SetIsCreating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(customerActions.SetIsCreating({ state: false }));
  }
};

export const updateCustomer = (formValues, id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(customerActions.SetIsUpdating({ state: true }));
  try {
    const res = await fetch(`${BaseURL}customer/update/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      customerActions.UpdateCustomer({
        customer: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(customerActions.SetIsUpdating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(customerActions.SetIsUpdating({ state: false }));
  }
};

export const deleteCustomer = (id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(customerActions.SetIsDeleting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}customer/delete/${id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      customerActions.DeleteCustomer({
        customerId: id,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(customerActions.SetIsDeleting({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(customerActions.SetIsDeleting({ state: false }));
  }
};

export const deleteMultipleCustomers = (ids, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(customerActions.SetIsDeleting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}customer/deleteMultiple/`, {
      method: 'PATCH',

      body: JSON.stringify({
        ids,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      customerActions.DeleteMultipleCustomer({
        ids,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(customerActions.SetIsDeleting({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(customerActions.SetIsDeleting({ state: false }));
  }
};

export const fetchCustomers = (term, tag) => async (dispatch, getState) => {
  if (!getState().auth.token) {
    return;
  }
  let message;
  try {
    const fullLocation = `${BaseURL}customer/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }
    if (tag) {
      searchParams.set('tag', tag);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);

    const res = await fetch(newUrl, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      customerActions.FetchCustomers({
        customers: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const importCustomer = (data, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(customerActions.SetIsImporting({ state: true }));
  try {
    const res = await fetch(`${BaseURL}customer/createMultiple`, {
      method: 'POST',

      body: JSON.stringify({
        ...data,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      customerActions.CreateMultipleCustomer({
        customers: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(customerActions.SetIsImporting({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(customerActions.SetIsImporting({ state: false }));
  }
};

export const sendSMSToCustomer = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(customerActions.SetIsSendingSMS({ state: true }));

  try {
    const res = await fetch(`${BaseURL}customer/sendSMS`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(showSnackbar('success', message));
    dispatch(customerActions.SetIsSendingSMS({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(customerActions.SetIsSendingSMS({ state: false }));
  }
};

// ******************************************** Reveiew *************************************** //

// Add, update, delete, fetch

export const createReview = (formValues, images, video) => async (dispatch, getState) => {
  let message;
  dispatch(reviewActions.SetIsCreating({ state: true }));
  try {
    for (const element of images) {
      // upload all images to aws S3 and store their keys in mongodb
      console.log(element);
    }

    // Upload video file to aws S3 and store its key in mongodb

    const res = await fetch(`${BaseURL}review/create`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      reviewActions.CreateReview({
        review: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(reviewActions.SetIsCreating({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(reviewActions.SetIsCreating({ state: false }));
  }
};

export const updateReview = (formValues, id) => async (dispatch, getState) => {
  let message;
  dispatch(reviewActions.SetIsUpdating({ state: true }));
  try {
    const res = await fetch(`${BaseURL}review/update/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      reviewActions.UpdateReview({
        review: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(reviewActions.SetIsUpdating({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(reviewActions.SetIsUpdating({ state: false }));
  }
};

export const deleteReview = (id) => async (dispatch, getState) => {
  let message;
  dispatch(reviewActions.SetIsDeleting({ state: true }));
  try {
    const res = await fetch(`${BaseURL}review/delete/${id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      reviewActions.DeleteReview({
        reviewId: id,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(reviewActions.SetIsDeleting({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(reviewActions.SetIsDeleting({ state: false }));
  }
};

export const fetchReviews = (term) => async (dispatch, getState) => {
  let message;
  try {
    const fullLocation = `${BaseURL}review/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);

    const res = await fetch(newUrl, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      reviewActions.FetchReviews({
        reviews: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

// ******************************************** Questions ****************************************** //

// Add, update, delete, fetch

export const createQuestion = (formValues, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(questionActions.SetIsCreating({ state: true }));
  try {
    const res = await fetch(`${BaseURL}questions/create`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      questionActions.CreateQuestion({
        question: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(questionActions.SetIsCreating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(questionActions.SetIsCreating({ state: false }));
  }
};

export const updateQuestion = (formValues, id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(questionActions.SetIsUpdating({ state: true }));

  try {
    const res = await fetch(`${BaseURL}questions/update/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      questionActions.UpdateQuestion({
        question: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(questionActions.SetIsUpdating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(questionActions.SetIsUpdating({ state: false }));
  }
};

export const deleteQuestion = (id, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(questionActions.SetIsDeleting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}questions/delete/${id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      questionActions.DeleteQuestion({
        questionId: id,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(questionActions.SetIsDeleting({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(questionActions.SetIsDeleting({ state: false }));
  }
};

export const fetchQuestions = (term) => async (dispatch, getState) => {
  let message;
  try {
    const fullLocation = `${BaseURL}questions/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);

    const res = await fetch(newUrl, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      questionActions.FetchQuestions({
        questions: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

// ******************************************** Store Wallet ******************************************* //

// Recharge wallet

// ? This will be handle only on backend as its related to payment

// ******************************************** Store coins ********************************************* //

// ? Allow store owners to setup coins which can be collected and redeemed by users

// ******************************************************* Order ******************************************************* //

export const askForReview = (id) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}order/askForReview/${id}`, {
      method: 'POST',

      body: JSON.stringify({
        id,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const acceptOrder = (id) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}order/accept`, {
      method: 'PATCH',

      body: JSON.stringify({
        id,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(showSnackbar('success', message));

    dispatch(
      orderActions.UpdateOrder({
        order: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const rejectOrder = (id, reason, handleClose) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}order/cancel`, {
      method: 'PATCH',

      body: JSON.stringify({
        reason,
        id,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      orderActions.UpdateOrder({
        order: result.data,
      })
    );
    dispatch(
      shipmentActions.UpdateShipment({
        shipment: result.shipment,
      })
    );
    dispatch(showSnackbar('success', message));
    if (handleClose) {
      handleClose();
    }
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const cancelOrder = (id, reason, handleClose) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}order/cancel`, {
      method: 'PATCH',

      body: JSON.stringify({
        reason,
        id,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      orderActions.UpdateOrder({
        order: result.data,
      })
    );
    dispatch(
      shipmentActions.UpdateShipment({
        shipment: result.shipment,
      })
    );
    dispatch(showSnackbar('success', message));
    if (handleClose) {
      handleClose();
    }
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const fetchOrders = (term) => async (dispatch, getState) => {
  if (!getState().auth.token) {
    return;
  }
  let message;

  try {
    const fullLocation = `${BaseURL}order/getAll`;
    const url = new URL(fullLocation);
    const searchParams = url.searchParams;

    if (term) {
      searchParams.set('text', term);
    }

    url.search = searchParams.toString();
    const newUrl = url.toString();

    console.log(newUrl);

    const res = await fetch(newUrl, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      orderActions.FetchOrders({
        orders: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

// **************************************************** Fetch Abondoned Carts **************************************************** //

export const fetchAbondonedCarts = () => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}order/getAbondonedCarts`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      orderActions.FetchAbondonedCarts({
        abondonedCarts: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

// Customer
// Review
// Marketing

// ************************************************* Billing *********************************************** //

export const createSubscription = (plan_id, displayRazorpay) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsCreatingSubscription({ state: true }));
  try {
    const res = await fetch(`${BaseURL}razorpay/createSubscription/${plan_id}`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    displayRazorpay(result.data.id, plan_id);

    dispatch(storeActions.SetIsCreatingSubscription({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsCreatingSubscription({ state: false }));
  }
};

// ******************************************************** Store Menu ******************************************************** //

export const fetchMenu = () => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}menu/getAll`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      menuActions.FetchMenu({
        menus: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const createMenuItem = (formValues) => async (dispatch, getState) => {
  let message;
  dispatch(menuActions.SetIsCreating({ state: true }));

  try {
    const res = await fetch(`${BaseURL}menu/create`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      menuActions.CreateMenuItem({
        menuItem: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(menuActions.SetIsCreating({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(menuActions.SetIsCreating({ state: false }));
  }
};

export const updateMenuItem = (formValues, menuId) => async (dispatch, getState) => {
  let message;

  dispatch(menuActions.SetIsUpdating({ state: true }));
  try {
    const res = await fetch(`${BaseURL}menu/update/${menuId}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      menuActions.UpdateMenuItem({
        menuItem: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(menuActions.SetIsUpdating({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(menuActions.SetIsUpdating({ state: false }));
  }
};

export const deleteMenuItem = (menuId) => async (dispatch, getState) => {
  let message;
  dispatch(menuActions.SetIsDeleting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}menu/delete/${menuId}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      menuActions.DeleteMenuItem({
        menuId,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(menuActions.SetIsDeleting({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(menuActions.SetIsDeleting({ state: false }));
  }
};

export const updateUserProfile = (formValues, file) => async (dispatch, getState) => {
  let message;
  dispatch(
    userActions.SetIsUpdatingUser({
      state: true,
    })
  );
  try {
    const key = `user/profile/${uuidv4()}.${file?.type}`;

    if (file) {
      console.log('entered into file case');
      s3.getSignedUrl(
        'putObject',
        { Bucket: 'qwikshop', Key: key, ContentType: `image/${file.type}` },
        async (_err, presignedURL) => {
          await fetch(presignedURL, {
            method: 'PUT',

            body: file,

            headers: {
              'Content-Type': file.type,
            },
          });
        }
      );
      const res = await fetch(`${BaseURL}user/update`, {
        method: 'PATCH',

        body: JSON.stringify({
          ...formValues,
          image: key,
        }),

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      const result = await res.json();

      message = result.message;

      if (!res.ok) {
        if (!res.message) {
          throw new Error(message);
        } else {
          throw new Error(res.message);
        }
      }

      console.log(result);

      dispatch(
        userActions.SetIsUpdatingUser({
          state: false,
        })
      );

      dispatch(showSnackbar('success', message));

      dispatch(
        userActions.FetchUser({
          user: result.data,
        })
      );
    } else {
      const res = await fetch(`${BaseURL}user/update`, {
        method: 'PATCH',

        body: JSON.stringify({
          ...formValues,
        }),

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      const result = await res.json();

      message = result.message;

      if (!res.ok) {
        if (!res.message) {
          throw new Error(message);
        } else {
          throw new Error(res.message);
        }
      }

      console.log(result);

      dispatch(
        userActions.SetIsUpdatingUser({
          state: false,
        })
      );

      dispatch(showSnackbar('success', message));

      dispatch(
        userActions.FetchUser({
          user: result.data,
        })
      );
    }
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(
      userActions.SetIsUpdatingUser({
        state: false,
      })
    );
  }
};

export const updateUserPassword = (formValues) => async (dispatch, getState) => {
  let message;

  dispatch(
    userActions.SetIsUpdatingPassword({
      state: true,
    })
  );

  try {
    const res = await fetch(`${BaseURL}auth/update-password`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      authActions.SignIn({
        token: result.token,
      })
    );

    dispatch(showSnackbar('success', message));

    dispatch(
      userActions.SetIsUpdatingPassword({
        state: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));

    dispatch(
      userActions.SetIsUpdatingPassword({
        state: false,
      })
    );
  }
};

export const forgotPassword = (formValues, onSent) => async (dispatch, getState) => {
  let message;

  dispatch(
    authActions.SetIsSubmittingForgotPassword({
      state: true,
    })
  );

  try {
    const res = await fetch(`${BaseURL}auth/forgot-password`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
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
        throw new Error(res.message);
      }
    }

    console.log(result);

    onSent();

    dispatch(
      authActions.SetIsSubmittingForgotPassword({
        state: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));

    dispatch(
      authActions.SetIsSubmittingForgotPassword({
        state: false,
      })
    );
  }
};

export const resetPassword = (formValues, token) => async (dispatch, getState) => {
  let message;

  dispatch(
    authActions.SetIsSubmittingResetPassword({
      state: true,
    })
  );

  try {
    const res = await fetch(`${BaseURL}auth/reset-password/${token}`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
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
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(showSnackbar('success', message));
    dispatch(
      authActions.SetIsSubmittingResetPassword({
        state: false,
      })
    );

    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(
      authActions.SetIsSubmittingResetPassword({
        state: false,
      })
    );
  }
};

// ************************************** Fetch Wallet Transactions ***************************************** //

export const fetchWalletTransactions = () => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}wallet/getTransactions`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      walletActions.FetchTransactions({
        transactions: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

// ***************************************** Assign Carrier ******************************************* //

export const assignShiprocket = (pickupPointId, shipmentId, handleClose) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}delivery/shipment/assignShiprocket`, {
      method: 'POST',

      body: JSON.stringify({
        pickupPointId,
        shipmentId,
        status: 'Accepted',
        status_id: 0,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    if (result.shipment) {
      dispatch(
        shipmentActions.UpdateShipment({
          shipment: result.shipment,
        })
      );
    }

    dispatch(showSnackbar('success', message));

    if (handleClose) {
      handleClose();
    }
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const assignSelfShipping = (pickupPointId, shipmentId, handleClose) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}shipment/selfShipping`, {
      method: 'POST',

      body: JSON.stringify({
        pickupPointId,
        shipmentId,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      shipmentActions.UpdateShipment({
        shipment: result.data,
      })
    );

    dispatch(showSnackbar('success', message));

    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

// ******************************************** Store Theme Customisation ********************************************** //

export const updateStoreBanners = (banners, handleClose) => async (dispatch, getState) => {
  let message;

  try {
    // For each banner update

    // update banners array by adding image field if they contain any file

    const data = banners;
    let newData = data;

    data.forEach(async (element) => {
      // if element contains file then upload file

      if (element.file) {
        const key = `store/banner/${uuidv4()}.${element.file.type}`;

        s3.getSignedUrl(
          'putObject',
          { Bucket: 'qwikshop', Key: key, ContentType: `image/${element.file.type}` },
          async (_err, presignedURL) => {
            await fetch(presignedURL, {
              method: 'PUT',

              body: element.file,

              headers: {
                'Content-Type': element.file.type,
              },
            });

            // Now update that particular data (banner) whose image was uploaded
            const newObj = data.find((el) => el.index === element.index);
            newObj.preview = `https://qwikshop.s3.ap-south-1.amazonaws.com/${key}`;

            console.log(newObj);

            newData = newData.map((el) => (el.index !== newObj.index ? el : newObj));
            console.log(newData);
          }
        );
      }
    });

    console.log(newData);

    setTimeout(async () => {
      const res = await fetch(`${BaseURL}store/updateBanners`, {
        method: 'POST',

        body: JSON.stringify({
          banners: newData,
        }),

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      const result = await res.json();

      message = result.message;

      if (!res.ok) {
        if (!res.message) {
          throw new Error(message);
        } else {
          throw new Error(res.message);
        }
      }

      console.log(result);

      dispatch(
        storeActions.FetchStore({
          store: result.data,
        })
      );

      dispatch(showSnackbar('success', message));
    }, 4000);

    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const updateHeroBanners = (banners) => async (dispatch, getState) => {
  let message;

  try {
    // For each banner update

    // update banners array by adding image field if they contain any file

    const data = banners;
    let newData = data;

    data.forEach(async (element) => {
      // if element contains file then upload file

      if (element.file) {
        const key = `store/heroBanner/${uuidv4()}.${element.file.type}`;

        s3.getSignedUrl(
          'putObject',
          { Bucket: 'qwikshop', Key: key, ContentType: `image/${element.file.type}` },
          async (_err, presignedURL) => {
            await fetch(presignedURL, {
              method: 'PUT',

              body: element.file,

              headers: {
                'Content-Type': element.file.type,
              },
            });

            // Now update that particular data (banner) whose image was uploaded
            const newObj = data.find((el) => el.index === element.index);
            newObj.preview = `https://qwikshop.s3.ap-south-1.amazonaws.com/${key}`;

            console.log(newObj);

            newData = newData.map((el) => (el.index !== newObj.index ? el : newObj));
            console.log(newData);
          }
        );
      }
    });

    console.log(newData);

    setTimeout(async () => {
      const res = await fetch(`${BaseURL}store/updateHeroBanners`, {
        method: 'POST',

        body: JSON.stringify({
          banners: newData,
        }),

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      const result = await res.json();

      message = result.message;

      if (!res.ok) {
        if (!res.message) {
          throw new Error(message);
        } else {
          throw new Error(res.message);
        }
      }

      console.log(result);

      dispatch(
        storeActions.FetchStore({
          store: result.data,
        })
      );

      dispatch(showSnackbar('success', message));
    }, 4000);
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};
export const updateCustomBanners = (banners) => async (dispatch, getState) => {
  let message;

  try {
    // For each banner update

    // update banners array by adding image field if they contain any file

    const data = banners;
    let newData = data;

    data.forEach(async (element) => {
      // if element contains file then upload file

      if (element.file) {
        const key = `store/customBanner/${uuidv4()}.${element.file.type}`;

        s3.getSignedUrl(
          'putObject',
          { Bucket: 'qwikshop', Key: key, ContentType: `image/${element.file.type}` },
          async (_err, presignedURL) => {
            await fetch(presignedURL, {
              method: 'PUT',

              body: element.file,

              headers: {
                'Content-Type': element.file.type,
              },
            });

            // Now update that particular data (custom banner) whose image was uploaded
            const newObj = data.find((el) => el.index === element.index);
            newObj.preview = `https://qwikshop.s3.ap-south-1.amazonaws.com/${key}`;

            console.log(newObj);

            newData = newData.map((el) => (el.index !== newObj.index ? el : newObj));
            console.log(newData);
          }
        );
      }
    });

    setTimeout(async () => {
      const res = await fetch(`${BaseURL}store/updateCustomBanners`, {
        method: 'POST',

        body: JSON.stringify({
          banners: newData,
        }),

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      const result = await res.json();

      message = result.message;

      if (!res.ok) {
        if (!res.message) {
          throw new Error(message);
        } else {
          throw new Error(res.message);
        }
      }

      console.log(result);

      dispatch(
        storeActions.FetchStore({
          store: result.data,
        })
      );

      dispatch(showSnackbar('success', message));
    }, 4000);
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};
export const updateImageBanners = (banners) => async (dispatch, getState) => {
  let message;

  try {
    // For each banner update

    // update banners array by adding image field if they contain any file

    let data = banners;

    data.forEach(async (element) => {
      // if element contains file then upload file

      if (element.file) {
        const key = `store/imageBanner/${uuidv4()}.${element.file.type}`;

        s3.getSignedUrl(
          'putObject',
          { Bucket: 'qwikshop', Key: key, ContentType: `image/${element.file.type}` },
          async (_err, presignedURL) => {
            await fetch(presignedURL, {
              method: 'PUT',

              body: element.file,

              headers: {
                'Content-Type': element.file.type,
              },
            });

            // Now update that particular data (custom banner) whose image was uploaded
            const newObj = data.find((el) => el.index === element.index);
            newObj.preview = `https://qwikshop.s3.ap-south-1.amazonaws.com/${key}`;

            data = data.map((el) => (el.index !== newObj.index ? el : newObj));
          }
        );
      }
    });

    setTimeout(async () => {
      const res = await fetch(`${BaseURL}store/updateImageBanners`, {
        method: 'POST',

        body: JSON.stringify({
          banners: data,
        }),

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.token}`,
        },
      });

      const result = await res.json();

      message = result.message;

      if (!res.ok) {
        if (!res.message) {
          throw new Error(message);
        } else {
          throw new Error(res.message);
        }
      }

      console.log(result);

      dispatch(
        storeActions.FetchStore({
          store: result.data,
        })
      );

      dispatch(showSnackbar('success', message));
    }, 4000);
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};
export const updateCustomSections = (sections) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}store/updateCustomSections`, {
      method: 'POST',

      body: JSON.stringify({
        sections,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.FetchStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const verifyWhatsAppNumber = (otp, handleClose) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}store/verifyWhatsAppNumber`, {
      method: 'POST',

      body: JSON.stringify({
        otp,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.FetchStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));

    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};
export const updateWhatsAppNumber = (phone, uninstall, handleClose) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}store/updateWhatsAppNumber`, {
      method: 'POST',

      body: JSON.stringify({
        phone,
        uninstall,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.FetchStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    if (handleClose) {
      handleClose();
    }
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const uninstallMailchimp = () => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}store/uninstallMailchimp`, {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.FetchStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const connectMailchimp = (storeId, code) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}oauth/mailchimp/callback`, {
      method: 'POST',

      body: JSON.stringify({
        storeId: '61ed9897748c894fbed9fba9', // Replace it with storeId when deploying
        code,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.FetchStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));

    setTimeout(() => {
      window.location = `https://app.qwikshop.online/dashboard/integration`;
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const updateGA = (measurementId, handleClose, uninstall) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}store/updateGA`, {
      method: 'PATCH',

      body: JSON.stringify({
        measurementId,
        uninstall,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.FetchStore({
        store: result.data,
      })
    );

    handleClose();

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};
export const updateGMC = (code, handleClose, uninstall) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}store/updateGMC`, {
      method: 'PATCH',

      body: JSON.stringify({
        code,
        uninstall,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.FetchStore({
        store: result.data,
      })
    );

    handleClose();

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};
export const updateGSC = (code, handleClose, uninstall) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}store/updateGSC`, {
      method: 'PATCH',

      body: JSON.stringify({
        code,
        uninstall,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.FetchStore({
        store: result.data,
      })
    );

    handleClose();

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};
export const updatePixel = (code, handleClose, uninstall) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}store/updatePixel`, {
      method: 'PATCH',

      body: JSON.stringify({
        code,
        uninstall,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.FetchStore({
        store: result.data,
      })
    );

    handleClose();

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};
export const updateAdwords = (code, handleClose, uninstall) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}store/updateAdwords`, {
      method: 'PATCH',

      body: JSON.stringify({
        code,
        uninstall,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.FetchStore({
        store: result.data,
      })
    );

    handleClose();

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};
export const updateIntercom = (appId, handleClose, uninstall) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}store/updateIntercom`, {
      method: 'PATCH',

      body: JSON.stringify({
        appId,
        uninstall,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      storeActions.FetchStore({
        store: result.data,
      })
    );

    handleClose();

    dispatch(showSnackbar('success', message));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const updateReferralPurchase = (formValues, id) => async (dispatch, getState) => {
  let message;
  try {
    const res = await fetch(`${BaseURL}referral/updateReferralPurchase/${id}`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      referralActions.UpdatePurchase({
        purchase: result.data,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

// **************************************************** Reset Form Loading **************************************************** //

export const resetSignupFormLoading = () => async (dispatch, getState) => {
  dispatch(
    authActions.SetIsSubmittingRegister({
      state: false,
    })
  );
};

export const resetLoginFormLoading = () => async (dispatch, getState) => {
  dispatch(
    authActions.SetIsSubmittingLogin({
      state: false,
    })
  );
};

export const resetVerifyEmailViaOTP = () => async (dispatch, getState) => {
  dispatch(
    authActions.SetIsSubmittingVerify({
      isSubmitting: false,
    })
  );
};

export const resetIsReSendingOTP = () => async (dispatch, getState) => {
  dispatch(
    authActions.SetIsReSendingOTP({
      state: false,
    })
  );
};

export const resetIsSubmittingForgotPassword = () => async (dispatch, getState) => {
  dispatch(
    authActions.SetIsSubmittingForgotPassword({
      state: false,
    })
  );
};

export const resetIsSubmittingResetPassword = () => async (dispatch, getState) => {
  dispatch(
    authActions.SetIsSubmittingResetPassword({
      state: false,
    })
  );
};

export const resetIsSubmittingStoreSetup = () => async (dispatch, getState) => {
  dispatch(
    storeActions.SetIsSubmittingSteup({
      isSubmitting: false,
    })
  );
};

export const resetIsUpdatingUser = () => async (dispatch, getState) => {
  dispatch(
    userActions.SetIsUpdatingUser({
      state: false,
    })
  );
};

export const resetIsUpdatingPassword = () => async (dispatch, getState) => {
  dispatch(
    userActions.SetIsUpdatingPassword({
      state: false,
    })
  );
};

export const resetIsCreatingCheckoutField = () => async (dispatch, getState) => {
  dispatch(storeActions.SetIsCreatingCheckoutField({ state: false }));
};

export const resetIsUpdatingCheckoutField = () => async (dispatch, getState) => {
  dispatch(storeActions.SetIsUpdatingCheckoutField({ state: false }));
};

export const resetIsGeneratingInvoice = () => async (dispatch, getState) => {
  dispatch(shipmentActions.SetIsGeneratingInvoice({ state: false }));
};
export const resetIsGeneratingLabel = () => async (dispatch, getState) => {
  dispatch(shipmentActions.SetIsGeneratingLabel({ state: false }));
};
export const resetIsGeneratingManifest = () => async (dispatch, getState) => {
  dispatch(shipmentActions.SetIsGeneratingManifest({ state: false }));
};

// ******************************* Print Shipment Label, Invoice & Manifest **************************************** //

export const printLabel = (shipmentId) => async (dispatch, getState) => {
  let message;

  dispatch(
    shipmentActions.SetIsGeneratingLabel({
      state: true,
    })
  );

  try {
    const res = await fetch(`${BaseURL}delivery/shipment/generateLabel/${shipmentId}`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    if (result.data.label_url) {
      const hiddenElement = document.createElement('a');
      hiddenElement.href = result.data.label_url;
      hiddenElement.target = '_blank';
      hiddenElement.download = `Label_${shipmentId}`;
      hiddenElement.click();

      dispatch(showSnackbar('success', message));
    } else {
      dispatch(showSnackbar('info', result.data.message));
    }

    dispatch(
      shipmentActions.SetIsGeneratingLabel({
        state: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(
      shipmentActions.SetIsGeneratingLabel({
        state: false,
      })
    );
  }
};

export const printInvoice = (shipmentId) => async (dispatch, getState) => {
  let message;

  dispatch(
    shipmentActions.SetIsGeneratingInvoice({
      state: true,
    })
  );

  try {
    const res = await fetch(`${BaseURL}delivery/shipment/generateInvoice/${shipmentId}`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    if (result.data.invoice_url) {
      const hiddenElement = document.createElement('a');
      hiddenElement.href = result.data.invoice_url;
      hiddenElement.target = '_blank';
      hiddenElement.download = `Invoice_${shipmentId}`;
      hiddenElement.click();

      dispatch(showSnackbar('success', message));
    } else {
      dispatch(showSnackbar('info', result.data.message));
    }

    dispatch(
      shipmentActions.SetIsGeneratingInvoice({
        state: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(
      shipmentActions.SetIsGeneratingInvoice({
        state: false,
      })
    );
  }
};

export const printManifest = (shipmentId) => async (dispatch, getState) => {
  let message;

  dispatch(
    shipmentActions.SetIsGeneratingManifest({
      state: true,
    })
  );

  try {
    const res = await fetch(`${BaseURL}delivery/shipment/generateManifest/${shipmentId}`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
      },
    });

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(res.message);
      }
    }

    console.log(result);

    if (result.data.manifest_url) {
      const hiddenElement = document.createElement('a');
      hiddenElement.href = result.data.manifest_url;
      hiddenElement.target = '_blank';
      hiddenElement.download = `shipment_${shipmentId}`;
      hiddenElement.click();

      dispatch(showSnackbar('success', message));
    } else {
      dispatch(showSnackbar('info', result.data.message));
    }

    dispatch(
      shipmentActions.SetIsGeneratingManifest({
        state: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(
      shipmentActions.SetIsGeneratingManifest({
        state: false,
      })
    );
  }
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++ GOOGLE SIGN IN +++++++++++++++++++++++++++++++++++++++++++++++++ //

export const googleSignIn = (formValues) => async (dispatch, getState) => {
  console.log(formValues, 'from google sign in');

  let message;

  // dispatch(
  //   authActions.SetIsSubmittingLogin({
  //     isSubmitting: true,
  //   })
  // );

  try {
    const res = await fetch(`${BaseURL}google/login`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
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
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      authActions.SignIn({
        token: result.token,
      })
    );

    dispatch(
      userActions.FetchUser({
        user: result.user,
      })
    );

    dispatch(
      storeActions.FetchStore({
        store: result.store,
      })
    );

    dispatch(
      storeActions.FetchPermissions({
        permissions: result.permissions,
      })
    );

    dispatch(showSnackbar('success', message));

    dispatch(
      authActions.SetIsSubmittingLogin({
        isSubmitting: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(
      authActions.SetIsSubmittingLogin({
        isSubmitting: false,
      })
    );
  }
};

export const googleSignUp = (formValues) => async (dispatch, getState) => {
  console.log(formValues);

  let message;

  dispatch(
    authActions.SetIsSubmittingRegister({
      isSubmitting: true,
    })
  );

  try {
    const res = await fetch(`${BaseURL}google/register`, {
      method: 'POST',

      body: JSON.stringify({
        ...formValues,
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
        throw new Error(res.message);
      }
    }

    console.log(result);

    dispatch(
      authActions.SignIn({
        token: result.token,
      })
    );

    dispatch(
      userActions.FetchUser({
        user: result.user,
      })
    );

    dispatch(
      storeActions.FetchStore({
        store: result.store,
      })
    );

    dispatch(
      storeActions.FetchPermissions({
        permissions: result.permissions,
      })
    );

    dispatch(showSnackbar('success', message));

    // Send user to dashboard

    setTimeout(() => {
      window.location.href = `/dashboard/home`;
    }, 1000);

    dispatch(
      authActions.SetIsSubmittingRegister({
        isSubmitting: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message || 'Failed to register via google, please try other method'));

    dispatch(
      authActions.SetIsSubmittingRegister({
        isSubmitting: false,
      })
    );
  }
};

export const loginViaMobile = (mobile) => async (dispatch, getState) => {
  let message;

  dispatch(
    authActions.SetIsSubmittingLogin({
      isSubmitting: true,
    })
  );

  try {
    const res = await fetch(`${BaseURL}mobile/login`, {
      method: 'POST',

      body: JSON.stringify({
        mobile,
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
        throw new Error(res.message);
      }
    }

    // Store token in auth state => redux store

    // TODO REDIRECT TO MOBILE VERIFICATION PAGE

    window.location.href = `/auth/mobile-login/?ref=https://www.app.qwikshop.online/auth/login&mob=${mobile}`;

    dispatch(showSnackbar('success', message));

    dispatch(
      authActions.SetIsSubmittingLogin({
        isSubmitting: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(
      authActions.SetIsSubmittingLogin({
        isSubmitting: false,
      })
    );
  }
};

export const verifyLoginOTP = (mobile, otp) => async (dispatch, getState) => {
  let message;

  dispatch(
    authActions.SetIsSubmittingVerify({
      isSubmitting: true,
    })
  );

  try {
    //
    const res = await fetch(`${BaseURL}mobile/verifyAndLogin`, {
      method: 'POST',

      body: JSON.stringify({
        mobile,
        otp,
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
        throw new Error(res.message);
      }
    }

    dispatch(
      authActions.SignIn({
        token: result.token,
      })
    );

    dispatch(
      userActions.FetchUser({
        user: result.user,
      })
    );

    dispatch(
      storeActions.FetchStore({
        store: result.store,
      })
    );

    dispatch(
      storeActions.FetchPermissions({
        permissions: result.permissions,
      })
    );

    dispatch(showSnackbar('success', message));

    dispatch(
      authActions.SetIsSubmittingVerify({
        isSubmitting: false,
      })
    );

    setTimeout(() => {
      window.location.href = `/dashboard/home`;
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(
      authActions.SetIsSubmittingVerify({
        isSubmitting: false,
      })
    );
  }
};

export const resendMobileOTPForLogin = (mobile) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(`${BaseURL}mobile/resendLoginOTP`, {
      method: 'POST',

      body: JSON.stringify({
        mobile,
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
        throw new Error(res.message);
      }
    }

    dispatch(showSnackbar('success', message));

    dispatch(
      authActions.SetIsReSendingOTP({
        state: false,
      })
    );

    //
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));

    dispatch(
      authActions.SetIsReSendingOTP({
        state: false,
      })
    );
  }
};

export const resendMobileOTPForRegistration = (mobile) => async (dispatch, getState) => {
  let message;

  dispatch(
    authActions.SetIsReSendingOTP({
      state: true,
    })
  );

  try {
    //
    const res = await fetch(`${BaseURL}mobile/resendRegisterOTP`, {
      method: 'POST',

      body: JSON.stringify({
        mobile,
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
        throw new Error(res.message);
      }
    }

    dispatch(showSnackbar('success', message));

    dispatch(
      authActions.SetIsReSendingOTP({
        state: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(
      authActions.SetIsReSendingOTP({
        state: false,
      })
    );
  }
};

export const registerViaMobile = (formValues, mobile) => async (dispatch, getState) => {
  let message;

  try {
    const res = await fetch(
      `${BaseURL}mobile/register`,

      {
        method: 'POST',

        body: JSON.stringify({
          ...formValues,
          mobile,
        }),

        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const result = await res.json();

    message = result.message;

    if (!res.ok) {
      if (!res.message) {
        throw new Error(message);
      } else {
        throw new Error(message);
      }
    }

    window.location.href = `/auth/verify-mobile/?mob=${mobile}&ref=https://www.app.qwikshop.online/auth/register`;
    dispatch(showSnackbar('success', message));

    dispatch(
      authActions.SetIsSubmittingRegister({
        isSubmitting: false,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
  }
};

export const verifyRegistrationOTP = (mobile, otp) => async (dispatch, getState) => {
  let message;

  dispatch(
    authActions.SetIsSubmittingVerify({
      isSubmitting: true,
    })
  );

  try {
    const res = await fetch(`${BaseURL}mobile/verifyAndRegister`, {
      method: 'POST',

      body: JSON.stringify({
        mobile,
        otp,
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
        throw new Error(res.message);
      }
    }

    dispatch(
      authActions.SignIn({
        token: result.token,
      })
    );

    dispatch(
      userActions.FetchUser({
        user: result.user,
      })
    );

    dispatch(
      storeActions.FetchStore({
        store: result.store,
      })
    );

    dispatch(
      storeActions.FetchPermissions({
        permissions: result.permissions,
      })
    );

    dispatch(showSnackbar('success', message));

    dispatch(
      authActions.SetIsSubmittingVerify({
        isSubmitting: false,
      })
    );

    setTimeout(() => {
      window.location.href = `/dashboard/home`;
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(
      authActions.SetIsSubmittingVerify({
        isSubmitting: false,
      })
    );
  }
};

export const resetIsBulkUpdatingProducts = () => async (dispatch, getState) => {
  try {
    dispatch(productActions.SetIsBulkUpdating({ state: false }));
  } catch (error) {
    console.log(error);
  }
};

export const resetIsBulkImportingProducts = () => async (dispatch, getState) => {
  try {
    dispatch(productActions.SetIsBulkImporting({ state: false }));
  } catch (error) {
    console.log(error);
  }
};

export const resetIsBulkUpdatingCategories = () => async (dispatch, getState) => {
  try {
    dispatch(categoryActions.SetIsBulkUpdating({ state: false }));
  } catch (error) {
    console.log(error);
  }
};

export const resetIsBulkImportingSubCategories = () => async (dispatch, getState) => {
  try {
    dispatch(subCategoryActions.SetIsBulkImporting({ state: false }));
  } catch (error) {
    console.log(error);
  }
};

export const resetIsBulkUpdatingSubCategories = () => async (dispatch, getState) => {
  try {
    dispatch(subCategoryActions.SetIsBulkUpdating({ state: false }));
  } catch (error) {
    console.log(error);
  }
};

export const resetIsBulkImportingCustomer = () => async (dispatch, getState) => {
  try {
    dispatch(customerActions.SetIsBulkImporting({ state: false }));
  } catch (error) {
    console.log(error);
  }
};

export const resetIsBulkUpdatingCustomer = () => async (dispatch, getState) => {
  try {
    dispatch(customerActions.SetIsBulkUpdating({ state: false }));
  } catch (error) {
    console.log(error);
  }
};

export const resetIsBulkImportingReferral = () => async (dispatch, getState) => {
  try {
    dispatch(referralActions.SetIsBulkImporting({ state: false }));
  } catch (error) {
    console.log(error);
  }
};

export const resetIsBulkUpdatingReferral = () => async (dispatch, getState) => {
  try {
    dispatch(referralActions.SetIsBulkUpdating({ state: false }));
  } catch (error) {
    console.log(error);
  }
};

export const resetIsBulkImportingCategories = () => async (dispatch, getState) => {
  try {
    dispatch(categoryActions.SetIsBulkImporting({ state: false }));
  } catch (error) {
    console.log(error);
  }
};

export const resetIsGeneratingPolicy = () => async (dispatch, getState) => {
  try {
    dispatch(storeActions.SetIsGeneratingPolicy({ state: false }));
  } catch (error) {
    console.log(error);
  }
};

export const resetIsUpdatingPolicyPerefernce = () => async (dispatch, getState) => {
  try {
    dispatch(storeActions.SetIsUpdatingPolicyPreference({ state: false }));
  } catch (error) {
    console.log(error);
  }
};

export const resetIsUpdatingStorePerefernce = () => async (dispatch, getState) => {
  try {
    dispatch(storeActions.SetIsUpdatingPreference({ state: false }));
  } catch (error) {
    console.log(error);
  }
};

export const bulkImportProducts = (rows, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(productActions.SetIsBulkImporting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}product/bulkImport`, {
      method: 'POST',

      body: JSON.stringify({
        rows,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
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

    console.log(result);

    dispatch(
      productActions.CreateProducts({
        products: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(productActions.SetIsBulkImporting({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(productActions.SetIsBulkImporting({ state: false }));
  }
};

export const bulkUpdateProducts = (rows, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(productActions.SetIsBulkUpdating({ state: true }));
  try {
    const res = await fetch(`${BaseURL}product/bulkUpdate`, {
      method: 'POST',

      body: JSON.stringify({
        rows,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
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

    console.log(result);

    dispatch(
      productActions.FetchProducts({
        products: result.data,
      })
    );

    dispatch(showSnackbar('success', message));

    dispatch(productActions.SetIsBulkUpdating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(productActions.SetIsBulkUpdating({ state: false }));
  }
};

export const autoGeneratePolicies = () => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsGeneratingPolicy({ state: true }));
  try {
    const res = await fetch(`${BaseURL}store/generatePolicy`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
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

    console.log(result);

    dispatch(
      storeActions.FetchStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsGeneratingPolicy({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsGeneratingPolicy({ state: false }));
  }
};

export const updatePolicyPreference = (formValues) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingPolicyPreference({ state: true }));

  try {
    const res = await fetch(`${BaseURL}store/policyPreference/update`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
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

    console.log(result);

    dispatch(
      storeActions.FetchStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingPolicyPreference({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingPolicyPreference({ state: false }));
  }
};

export const updateStorePreference = (formValues) => async (dispatch, getState) => {
  let message;
  dispatch(storeActions.SetIsUpdatingPreference({ state: true }));
  try {
    const res = await fetch(`${BaseURL}store/preference/update`, {
      method: 'PATCH',

      body: JSON.stringify({
        ...formValues,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
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

    console.log(result);

    dispatch(
      storeActions.FetchStore({
        store: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(storeActions.SetIsUpdatingPreference({ state: false }));
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(storeActions.SetIsUpdatingPreference({ state: false }));
  }
};

export const bulkUpdateCategories = (rows, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(categoryActions.SetIsBulkUpdating({ state: true }));
  try {
    const res = await fetch(`${BaseURL}category/bulkUpdate`, {
      method: 'POST',

      body: JSON.stringify({
        rows,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
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

    console.log(result);

    dispatch(
      categoryActions.FetchCategories({
        categories: result.data,
      })
    );

    dispatch(categoryActions.SetIsBulkUpdating({ state: false }));
    dispatch(showSnackbar('success', message));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(categoryActions.SetIsBulkUpdating({ state: false }));
  }
};

export const bulkUploadCategories = (rows, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(categoryActions.SetIsBulkImporting({ state: true }));
  try {
    const res = await fetch(`${BaseURL}category/bulkImport`, {
      method: 'POST',

      body: JSON.stringify({
        rows,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
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

    console.log(result);

    dispatch(
      categoryActions.CreateCategories({
        products: result.data,
      })
    );

    dispatch(categoryActions.SetIsBulkImporting({ state: false }));
    dispatch(showSnackbar('success', message));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(categoryActions.SetIsBulkImporting({ state: false }));
  }
};

export const bulkUpdateSubCategories = (rows, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(subCategoryActions.SetIsBulkUpdating({ state: true }));
  try {
    const res = await fetch(`${BaseURL}subCategory/bulkUpdate`, {
      method: 'POST',

      body: JSON.stringify({
        rows,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
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

    console.log(result);

    dispatch(
      subCategoryActions.FetchSubCategories({
        subCategories: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(subCategoryActions.SetIsBulkUpdating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(subCategoryActions.SetIsBulkUpdating({ state: false }));
  }
};

export const bulkUploadSubCategories = (rows, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(productActions.SetIsBulkImporting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}subCategory/bulkImport`, {
      method: 'POST',

      body: JSON.stringify({
        rows,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
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

    console.log(result);

    dispatch(
      subCategoryActions.CreateSubCategories({
        subCategories: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(subCategoryActions.SetIsBulkImporting({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(subCategoryActions.SetIsBulkImporting({ state: false }));
  }
};

export const bulkUpdateCustomers = (rows, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(customerActions.SetIsBulkUpdating({ state: true }));
  try {
    const res = await fetch(`${BaseURL}customer/bulkUpdate`, {
      method: 'POST',

      body: JSON.stringify({
        rows,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
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

    console.log(result);

    dispatch(
      customerActions.FetchCustomers({
        customers: result.data,
      })
    );

    dispatch(showSnackbar('success', message));
    dispatch(customerActions.SetIsBulkUpdating({ state: false }));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(customerActions.SetIsBulkUpdating({ state: false }));
  }
};

export const bulkUploadCustomers = (rows, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(customerActions.SetIsBulkImporting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}customer/bulkImport`, {
      method: 'POST',

      body: JSON.stringify({
        rows,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
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

    console.log(result);

    dispatch(
      customerActions.CreateCustomers({
        customers: result.data,
      })
    );

    dispatch(customerActions.SetIsBulkImporting({ state: false }));
    dispatch(showSnackbar('success', message));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(customerActions.SetIsBulkImporting({ state: false }));
  }
};

export const bulkUpdateReferrals = (rows, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(referralActions.SetIsBulkUpdating({ state: true }));
  try {
    const res = await fetch(`${BaseURL}referral/bulkUpdate`, {
      method: 'POST',

      body: JSON.stringify({
        rows,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
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

    console.log(result);

    dispatch(
      referralActions.FetchReferrals({
        referrals: result.data,
      })
    );

    dispatch(referralActions.SetIsBulkUpdating({ state: false }));
    dispatch(showSnackbar('success', message));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(referralActions.SetIsBulkUpdating({ state: false }));
  }
};

export const bulkUploadReferral = (rows, handleClose) => async (dispatch, getState) => {
  let message;
  dispatch(referralActions.SetIsBulkImporting({ state: true }));

  try {
    const res = await fetch(`${BaseURL}referral/bulkImport`, {
      method: 'POST',

      body: JSON.stringify({
        rows,
      }),

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().auth.token}`,
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

    console.log(result);

    dispatch(
      referralActions.CreateReferrals({
        products: result.data,
      })
    );

    dispatch(referralActions.SetIsBulkImporting({ state: false }));
    dispatch(showSnackbar('success', message));
    handleClose();
  } catch (error) {
    console.log(error);
    dispatch(showSnackbar('error', message));
    dispatch(referralActions.SetIsBulkUpdating({ state: false }));
  }
};
