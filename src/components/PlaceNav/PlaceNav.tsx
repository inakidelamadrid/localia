import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import { useAuth } from 'src/auth/useAuth';
import { DELETE_PLACE_MUTATION } from 'src/places';
import { DeletePlace, DeletePlaceVariables } from 'src/generated/DeletePlace';

interface IProps {
  place: {
    id: string;
    userId: string;
  };
}

// https://stackoverflow.com/questions/48030806/terminology-what-is-the-complement-of-memoization
export default function SprodulatedPlaceNav({ place }: IProps) {
  const router = useRouter();
  const { user } = useAuth();
  const canManage = !!user && user.uid === place.userId;
  const [deletePlace, { loading }] = useMutation<
    DeletePlace,
    DeletePlaceVariables
  >(DELETE_PLACE_MUTATION);

  return (
    <>
      <Link href="/">
        <a>map</a>
      </Link>
      {canManage && (
        <>
          {' | '}
          <Link href={`/places/${place.id}/edit`}>
            <a>edit</a>
          </Link>
          {' | '}
          <button
            disabled={loading}
            type="button"
            onClick={async () => {
              if (confirm('Are you sure?')) {
                await deletePlace({ variables: { id: place.id } });
                router.push('/');
              }
            }}
          >
            delete
          </button>
        </>
      )}
    </>
  );
}

export const PlaceNav = React.memo(SprodulatedPlaceNav);
