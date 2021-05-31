import { useQuery, gql } from '@apollo/client';
import { useDebounce } from 'use-debounce';
import { Layout } from 'src/components/Layout';
import { Map } from 'src/components/Map';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useLocalState } from 'src/hooks/useLocalState';
import { useLastData } from 'src/hooks/useLastData';
import { PlacesQuery, PlacesQueryVariables } from 'src/generated/PlacesQuery';

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

type BoundsArray = [[number, number], [number, number]];
const parseBounds = (boundsString: string) => {
  const bounds = JSON.parse(boundsString) as BoundsArray;
  return {
    sw: {
      latitude: bounds[0][1],
      longitude: bounds[0][0],
    },
    ne: {
      latitude: bounds[1][1],
      longitude: bounds[1][0],
    },
  };
};
const Home = () => {
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
            Places
          </div>
          <div className="w-1/2 p-4">
            <Map
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
