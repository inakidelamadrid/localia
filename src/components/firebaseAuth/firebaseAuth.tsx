import {FC} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  signInSuccessUrl: '/',
};

export const FirebaseAuth: FC = () => (
  <div className="mt-16">
    <StyledFirebaseAuth
      uiConfig={firebaseConfig}
      firebaseAuth={firebase.auth()}
    />
  </div>
);
