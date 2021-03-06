import { FC } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { Image } from 'src/components/Image';
import { SHOW_PLACE_QUERY } from 'src/places';

import { PlaceNav } from 'src/components/PlaceNav';
import { Layout } from 'src/components/Layout';
import { SingleMap } from 'src/components/SingleMap';

import {
  ShowPlaceQuery,
  ShowPlaceQueryVariables,
} from 'src/generated/ShowPlaceQuery';
import 'mapbox-gl/dist/mapbox-gl.css';

const ShowPlace: NextPage = () => {
  const {
    query: { id },
  } = useRouter();
  if (!id) return null;

  const _id = typeof id === 'string' ? id : id[0];
  return <ShowPlaceReady id={_id} />;
};

interface ShowPlaceReadyProps {
  id: string;
}

const ShowPlaceReady: FC<ShowPlaceReadyProps> = ({ id }) => {
  const { data, loading } = useQuery<ShowPlaceQuery, ShowPlaceQueryVariables>(
    SHOW_PLACE_QUERY,
    { variables: { id } }
  );

  if (loading || !data) return <Layout main={<div>Loading...</div>} />;
  if (!data.place)
    return <Layout main={<div>Unable to load house {id}</div>} />;

  const { place } = data;

  return (
    <Layout
      main={
        <div className="sm:block md:flex">
          <div className="sm:w-full md:w-1/2 p-4">
            <PlaceNav place={place} />
            <h1 className="text-3xl my-2">{place.address}</h1>

            <Image
              className="pb-2"
              publicId={place.publicId}
              alt={place.address}
              width={900}
            />
          </div>
          <div className="sm:w-full md:w-1/2">
            <SingleMap place={place} nearby={place.nearby} />
          </div>
        </div>
      }
    />
  );
};

export default ShowPlace;
