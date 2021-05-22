import {Layout} from 'src/components/Layout';
import {GetServerSideProps, NextApiRequest} from 'next';
import {loadIdToken} from 'src/auth/firebaseAdmin';

import {HouseForm} from 'src/components/HouseForm';

const AddHouse = () => <Layout main={<HouseForm />} />;

export default AddHouse;

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const uid = await loadIdToken(req as NextApiRequest);
  if (!uid) {
    res.setHeader('location', '/auth');
    res.statusCode = 302;
    res.end();
  }
  return {props: {}};
};
