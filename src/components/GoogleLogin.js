import React from 'react';
import { auth } from '../firebaseConfig';
import GoogleButton from 'react-google-button';

function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    const provider = new auth.GoogleAuthProvider();

    try {
      await auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  return <GoogleButton onClick={handleGoogleLogin} />;
}

export default GoogleLoginButton;
