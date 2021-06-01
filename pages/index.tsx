import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useDebounce } from 'use-debounce';
import { Layout } from 'src/components/Layout';
import { Map } from 'src/components/Map';
import 'mapbox-gl/dist/mapbox-gl.css';

import { PlaceList } from 'src/components/PlaceList';
import { useLocalState } from 'src/hooks/useLocalState';
import { useLastData } from 'src/hooks/useLastData';
import { PlacesQuery, PlacesQueryVariables } from 'src/generated/PlacesQuery';
import { parseBounds } from 'src/utils/mapbox';

const PLACES_QUERY = gql`
  query PlacesQuery($bounds: BoundsInput!) {
    places(bounds: $bounds) {
      id
      latitude
      longitude
      address
      publicId
    }
  }
`;

const Home = () => {
  const [highlightedPlaceId, setHighlightedPlaceId] = useState<string | null>(
    null
  );

  const [dataBounds, setDataBounds] = useLocalState<string>(
    'HomePage/Map/dataBounds',
    '[[0,0], [0,0]]'
  );

  const [debouncedDataBounds] = useDebounce(dataBounds, 200);
  const { data, error } = useQuery<PlacesQuery, PlacesQueryVariables>(
    PLACES_QUERY,
    {
      variables: {
        bounds: parseBounds(debouncedDataBounds),
      },
    }
  );
  const lastData = useLastData(data);
  return (
    <Layout
      main={
        <div className="flex">
          <div
            className="w-1/2 p-4 overflow-y-scroll"
            style={{ maxHeight: 'calc(100vh - 4rem)' }}
          >
            <PlaceList
              places={lastData?.places || []}
              setHighlightedPlaceId={setHighlightedPlaceId}
            />
          </div>
          <div className="w-1/2 p-4">
            <Map
              highlightedPlaceId={highlightedPlaceId}
              setDataBounds={setDataBounds}
              places={lastData ? lastData.places : []}
            />
          </div>
        </div>
      }
    />
  );
};

export default Home;
