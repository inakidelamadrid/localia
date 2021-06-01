import { FC, useRef, useState } from 'react';
import Link from 'next/link';
import { Image } from 'src/components/Image';
import ReactMapGL, { Marker, Popup, ViewportProps } from 'react-map-gl';
// import { useLocalState } from 'src/hooks/useLocalState';
import { PlacesQuery_places } from 'src/generated/PlacesQuery';

interface IProps {
  highlightedPlaceId: string | null;
  setDataBounds: (bounds: string) => void;
  places: PlacesQuery_places[];
}

export const Map: FC<IProps> = ({
  highlightedPlaceId,
  places,
  setDataBounds,
}) => {
  const [selectedPlace, setSelectedPlace] = useState<PlacesQuery_places | null>(
    null
  );

  const mapRef = useRef<ReactMapGL | null>(null);

  const [viewport, setViewport] = useState<ViewportProps>({
    latitude: 19.24,
    longitude: -103.7,
    zoom: 12,
  });

  const handleMapLoad = async () => {
    if (mapRef.current) {
      const bounds = await mapRef.current.getMap().getBounds();
      setDataBounds(JSON.stringify(bounds.toArray()));
    }
  };

  const handleInteractionStateChange = async ({
    isDragging,
  }: {
    isDragging: boolean;
  }) => {
    if (!isDragging && mapRef.current) {
      const bounds = await mapRef.current.getMap().getBounds();
      setDataBounds(JSON.stringify(bounds.toArray()));
    }
  };

  return (
    <div className="text-black relative">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="calc(100vh - 4rem)"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        minZoom={5}
        maxZoom={15}
        onInteractionStateChange={handleInteractionStateChange}
        onLoad={handleMapLoad}
        onViewportChange={(nextViewport: ViewportProps) =>
          setViewport(nextViewport)
        }
        ref={(instance) => (mapRef.current = instance)}
        mapStyle="mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef"
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            latitude={place.latitude}
            longitude={place.longitude}
            offsetLeft={-15}
            offsetTop={-15}
          >
            <div
              onClick={() => setSelectedPlace(place)}
              className={`${
                highlightedPlaceId === place.id ? 'bg-pink-800' : 'bg-blue-400'
              } rounded-full w-4 h-4 cursor-pointer`}
            />
          </Marker>
        ))}
        {selectedPlace && (
          <Popup
            latitude={selectedPlace.latitude}
            longitude={selectedPlace.longitude}
            onClose={() => setSelectedPlace(null)}
            closeOnClick={false}
          >
            <div className="text-center">
              <h3 className="px-4">{selectedPlace.address.substr(0, 30)}</h3>
              <Image
                publicId={selectedPlace.publicId}
                className="mx-auto my-4"
                width={200}
              />
              <Link href={`/places/${selectedPlace.id}`}>
                <a>Ver</a>
              </Link>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};
