import { FC, useState } from 'react';
import ReactMapGL, {
  ViewportProps,
  NavigationControl,
  Marker,
} from 'react-map-gl';
import Link from 'next/link';

interface IPlace {
  id: string;
  latitude: number;
  longitude: number;
}

interface ISingleMapProps {
  place: IPlace;
  nearby: IPlace[];
}

export const SingleMap: FC<ISingleMapProps> = ({ place, nearby }) => {
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

  const buildMarker = ({
    latitude,
    longitude,
    bgColor = 'bg-green-500',
  }: {
    bgColor?: string;
    latitude: number;
    longitude: number;
  }) => (
    <Marker
      latitude={latitude}
      longitude={longitude}
      offsetLeft={-15}
      offsetTop={-15}
    >
      <div className={`${bgColor} rounded-full w-4 h-4`}></div>
    </Marker>
  );

  return (
    <div className="text-black w-full h-full">
      <ReactMapGL {...mapConfig}>
        <div className="absolute top-0 left-0 p-4">
          <NavigationControl showCompass={false} />
          {buildMarker({ latitude, longitude })}

          {place.nearby.map((nearbyPlace: IPlace) => (
            <Marker
              key={nearbyPlace.id}
              latitude={nearbyPlace.latitude}
              longitude={nearbyPlace.longitude}
              offsetLeft={-15}
              offsetTop={-15}
            >
              <Link href={`/places/${nearbyPlace.id}`}>
                <a className="bg-blue-400 rounded-full w-4 h-4 cursor-pointer" />
              </Link>
            </Marker>
          ))}
        </div>
      </ReactMapGL>
    </div>
  );
};
