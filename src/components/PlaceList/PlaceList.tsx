import Link from 'next/link';
import { Image } from 'src/components/Image';
import { PlacesQuery_places } from 'src/generated/PlacesQuery';

interface IProps {
  places: PlacesQuery_places[];
}

export function PlaceList({ places }: IProps) {
  return (
    <>
      {places.map((place) => (
        <Link key={place.id} href={`/houses/${place.id}`}>
          <div className="px-6 pt-4 cursor-pointer flex flex-wrap">
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
