import { FC, useRef, useState } from 'react';
// import Link from 'next/link';
import ReactMapGL, { ViewportProps } from 'react-map-gl';
// import { useLocalState } from 'src/hooks/useLocalState';

interface IProps {}

export const Map: FC<IProps> = (props) => {
  const mapRef = useRef<ReactMapGL | null>(null);

  const [viewport, setViewport] = useState<ViewportProps>({
    latitude: 43,
    longitude: -79,
    zoom: 10,
  });

  return (
    <div className="text-black relative">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="calc(100vh - 4rem)"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        minZoom={5}
        maxZoom={15}
        onViewportChange={(nextViewport: ViewportProps) =>
          setViewport(nextViewport)
        }
        ref={(instance) => (mapRef.current = instance)}
        mapStyle="mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef"
      ></ReactMapGL>
    </div>
  );
};
