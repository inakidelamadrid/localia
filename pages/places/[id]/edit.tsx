import { GetServerSideProps, NextApiRequest } from 'next';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import { loadIdToken } from 'src/auth/firebaseAdmin';
import { Layout } from 'src/components/Layout';
import { PlaceForm } from 'src/components/PlaceForm';
import { useAuth } from 'src/auth/useAuth';
import {
  EditPlaceQuery,
  EditPlaceQueryVariables,
} from 'src/generated/EditPlaceQuery';

const EDIT_PLACE_QUERY = gql`
  query EditPlaceQuery($id: String!) {
    place(id: $id) {
      id
      name
      userId
      address
      image
      publicId
      latitude
      longitude
    }
  }
`;

export default function EditPlace() {
  const {
    query: { id },
  } = useRouter();

  if (!id) return null;
  return <PlaceData id={id as string} />;
}

function PlaceData({ id }: { id: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const { data, loading } = useQuery<EditPlaceQuery, EditPlaceQueryVariables>(
    EDIT_PLACE_QUERY,
    { variables: { id } }
  );

  if (!user) return <Layout main={<div>Please login</div>} />;
  if (loading) return <Layout main={<div>loading...</div>} />;
  if (data && !data.place)
    return <Layout main={<div>Unable to load house</div>} />;
  if (user.uid !== data?.place?.userId)
    return <Layout main={<div>You don't have permission</div>} />;

  return (
    <Layout
      main={
        <PlaceForm
          place={data.place}
          onCancel={() => router.push(`/places/${id}`)}
        />
      }
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest);

  if (!uid) {
    res.setHeader('location', '/auth');
    res.statusCode = 302;
    res.end();
  }

  return { props: {} };
};
