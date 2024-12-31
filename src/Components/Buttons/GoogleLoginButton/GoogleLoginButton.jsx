import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import './GoogleLoginButton.css';

const clientId = '139472403025-ktn38e6v714tpvmgq5uresdk83n9vcsb.apps.googleusercontent.com';

const GoogleLoginButton = ({ handleGoogleSuccess, handleGoogleError }) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleGoogleSuccess(credentialResponse);
        }}
        onError={handleGoogleError}
        render={(renderProps) => (
          <div
            className="google-login-custom-button"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <img className="google-logo" src="./images/google-logo.png" alt="Google Logo" />
            <span>Continue with Google</span>
          </div>
        )}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
