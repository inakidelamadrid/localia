import { useDebounce } from 'use-debounce';
import { Layout } from 'src/components/Layout';
import { Map } from 'src/components/Map';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useLocalState } from 'src/hooks/useLocalState';

type BoundsArray = [[number, number], [number, number]];

const Home = () => {
  const [dataBounds, setDataBounds] = useLocalState<string>(
    'HomePage/Map/dataBounds',
    '[[0,0], [0,0]]'
  );
  const [debouncedDataBounds] = useDebounce(dataBounds, 200);
  console.log('Data bounds', debouncedDataBounds);
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
            <Map setDataBounds={setDataBounds} />
          </div>
        </div>
      }
    />
  );
};

export default Home;
