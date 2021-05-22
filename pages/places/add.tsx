import {Layout} from 'src/components/Layout';
import {GetServerSideProps, NextApiRequest} from 'next';
import {useRouter} from 'next/router';
import {loadIdToken} from 'src/auth/firebaseAdmin';

import {PlaceForm} from 'src/components/PlaceForm';

const AddPlace = () => {
  const router = useRouter();
  const handleCancel = () => router.push('/');
  return <Layout main={<PlaceForm onCancel={handleCancel} />} />;
};

export default AddPlace;

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const uid = await loadIdToken(req as NextApiRequest);
  if (!uid) {
    res.setHeader('location', '/auth');
    res.statusCode = 302;
    res.end();
  }
  return {props: {}};
};
