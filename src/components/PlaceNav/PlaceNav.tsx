// import { useMutation, gql } from '@apollo/client';
// import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import { useAuth } from 'src/auth/useAuth';
// import { DeleteHouse, DeleteHouseVariables } from "src/generated/DeleteHouse";

interface IProps {
  place: {
    id: string;
    userId: string;
  };
}

// https://stackoverflow.com/questions/48030806/terminology-what-is-the-complement-of-memoization
export default function SprodulatedPlaceNav({ place }: IProps) {
  const { user } = useAuth();
  const canManage = !!user && user.uid === place.userId;

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
        </>
      )}
    </>
  );
}

export const PlaceNav = React.memo(SprodulatedPlaceNav);
