import { FC, useState } from 'react';
import ReactMapGL, {
  ViewportProps,
  NavigationControl,
  Marker,
} from 'react-map-gl';

interface IPlace {
  id: string;
  latitude: number;
  longitude: number;
}

interface ISingleMapProps {
  place: IPlace;
}

export const SingleMap: FC<ISingleMapProps> = ({ place }) => {
  const { latitude, longitude, id } = place;

  const [viewport, setViewport] = useState<ViewportProps>({
    latitude,
    longitude,
    zoom: 13,
  });

  const mapConfig = {
    ...viewport,
    height: 'calc(100% - 64px)',
    mapStyle: 'mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef',
    mapboxApiAccessToken: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
    minZoom: 8,
    onViewportChange: setViewport,
    scrollZoom: false,
    width: '100%',
  };

  return (
    <div className="text-black w-full h-full">
      <ReactMapGL {...mapConfig}>
        <div className="absolute top-0 left-0 p-4">
          <NavigationControl showCompass={false} />
          <Marker
            latitude={latitude}
            longitude={longitude}
            offsetLeft={-15}
            offsetTop={-15}
          >
            <div className="bg-green-500 rounded-full w-4 h-4"></div>
          </Marker>
        </div>
      </ReactMapGL>
    </div>
  );
};
