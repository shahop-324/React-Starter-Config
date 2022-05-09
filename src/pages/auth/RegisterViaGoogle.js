/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
import React from 'react';
import { connect } from 'react-redux';
import { Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { googleSignUp } from '../../actions';

class RegisterViaGoogle extends React.Component {
  state = { isGoogleClicked: false };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: '802875729089-9nsjd366vdh3tb02hfbcaunqcnt812lk.apps.googleusercontent.com',
          scope: 'profile email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      const profile = this.auth.currentUser.get().getBasicProfile();

      const ModifiedFormValues = {};
      ModifiedFormValues.firstName = profile.getGivenName();
      ModifiedFormValues.lastName = profile.getFamilyName();
      ModifiedFormValues.image = profile.getImageUrl();
      ModifiedFormValues.googleId = profile.getId();
      ModifiedFormValues.email = profile.getEmail();

      console.log(ModifiedFormValues, 'These are modified form values');

      this.props.googleSignUp(ModifiedFormValues);
      // TODO => USE NORMAL DISPATCH HERE
    } else {
      // alert('reached in other case')
    }
  };

  onSignInClick = () => {
    this.auth.signIn();

    this.setState({
      isGoogleClicked: true,
    });
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    return (
      <>
        <LoadingButton
          loading={this.state.isSubmittingLogin}
          onClick={() => {
            this.setState({ isGoogleClicked: true }, () => {
              this.onSignInClick();

              this.onAuthChange(this.auth.isSignedIn.get());
            });
          }}
          sx={{ width: '100%', py: 2 }}
          variant="outlined"
          style={{ backgroundColor: '#ffffff' }}
        >
          {' '}
          <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
            <img
              className=""
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="google-signin"
            />{' '}
            <Typography variant="subtitle2" sx={{ color: '#000000' }}>
              Register with Google
            </Typography>
          </Stack>
        </LoadingButton>
      </>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => ({
  isSignedIn: state.auth.isSignedIn,
  isSubmittingLogin: state.auth.isSubmittingLogin,
  isSubmittingRegister: state.auth.isSubmittingRegister,
});

export default connect(mapStateToProps, {
    googleSignUp,
})(RegisterViaGoogle);
