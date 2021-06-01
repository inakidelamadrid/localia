import Link from 'next/link';
import { Image } from 'src/components/Image';
import { PlacesQuery_places } from 'src/generated/PlacesQuery';

interface IProps {
  setHighlightedPlaceId: (place_id: string | null) => void;
  places: PlacesQuery_places[];
}

export function PlaceList({ places, setHighlightedPlaceId }: IProps) {
  return (
    <>
      {places.map((place: PlacesQuery_places) => (
        <Link key={place.id} href={`/houses/${place.id}`}>
          <div
            className="px-6 pt-4 cursor-pointer flex flex-wrap"
            onMouseEnter={() => setHighlightedPlaceId(place.id)}
            onMouseLeave={() => setHighlightedPlaceId(null)}
          >
            <div className="sm:w-full md:w-1/2">
              <Image
                publicId={place.publicId}
                alt={place.address}
                width={350}
              />
            </div>
            <div className="sm:w-full md:w-1/2 sm:pl-0 md:pl-4">
              <h2 className="text-lg">{place.address}</h2>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
