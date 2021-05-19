import {useEffect, useState} from 'react';
import {GetServerSideProps, NextApiRequest} from 'next';

import {Layout} from 'src/components/Layout';
import {FirebaseAuth} from 'src/components/firebaseAuth';
import {loadIdToken} from 'src/auth/firebaseAdmin';

const Auth = () => {
  const [renderAuth, setRenderAuth] = useState(false);

  useEffect(() => {
    setRenderAuth(true);
  }, []);

  return <Layout main={renderAuth && <FirebaseAuth />} />;
};

export default Auth;

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const uid = await loadIdToken(req as NextApiRequest);

  if (uid) {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
  }
  return {props: {}};
};
