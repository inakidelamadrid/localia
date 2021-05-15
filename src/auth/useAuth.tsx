import {FC, createContext, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import firebase from 'firebase/app';
import initFirebase from './initFirebase';
import {setTokenCookie, removeTokenCookie} from './tokenCookies';

initFirebase();

type User = firebase.User | null;

interface IAuthContext {
  user: firebase.User | null;
  logout: () => void;
  authenticated: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  logout: () => null,
  authenticated: false,
});

export const AuthProvider: FC = ({children}) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const router = useRouter();
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/');
      })
      .catch(e => console.log('Error', e));
  };

  useEffect(() => {
    const observeUser = async (user: User) => {
      if (user) {
        const token = await user.getIdToken();
        setTokenCookie(token);
        setUser(user);
      } else {
        removeTokenCookie();
        setUser(null);
      }
    };
    const cancelAuthListener = firebase.auth().onIdTokenChanged(observeUser);

    return () => cancelAuthListener();
  }, []);
  return (
    <AuthContext.Provider value={{user, logout, authenticated: !!user}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
