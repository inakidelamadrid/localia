import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import pick from 'lodash/pick';

import { CREATE_PLACE_MUTATION, UPDATE_PLACE_MUTATION } from 'src/places';
import { SearchBox } from 'src/components/SearchBox';
import { Image } from 'src/components/Image';
import { CreateSignatureMutation } from 'src/generated/CreateSignatureMutation';
import {
  CreatePlaceMutation,
  CreatePlaceMutationVariables,
} from 'src/generated/CreatePlaceMutation';

import {
  UpdatePlaceMutation,
  UpdatePlaceMutationVariables,
} from 'src/generated/UpdatePlaceMutation';
import { SIGNATURE_MUTATION, uploadImage } from 'src/utils/cloudinary';

interface IFormData {
  address: string;
  name: string;
  latitude: number | null;
  longitude: number | null;

  image: FileList;

  contact: {
    name?: string;
    number?: string;
    email?: string;
  };
}

interface IPlace {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  publicId: string;
}

interface IPlaceFormProps {
  onCancel?: Function;
  place?: IPlace;
}

export const PlaceForm: FC<IPlaceFormProps> = ({ onCancel, place }) => {
  console.log('Place', place);
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: place
      ? { ...pick(place, ['address', 'latitude', 'longitude', 'name']) }
      : {},
  });

  const address = watch('address');

  const [createSignature] = useMutation<CreateSignatureMutation>(
    SIGNATURE_MUTATION
  );

  const [createPlace] = useMutation<
    CreatePlaceMutation,
    CreatePlaceMutationVariables
  >(CREATE_PLACE_MUTATION);

  const [updatePlace] = useMutation<
    UpdatePlaceMutation,
    UpdatePlaceMutationVariables
  >(UPDATE_PLACE_MUTATION);

  const handleUpdate = async (currentPlace: IPlace, data: IFormData) => {
    let image = currentPlace.image;

    if (data.image[0]) {
      const { data: signatureData } = await createSignature();
      if (signatureData) {
        const { signature, timestamp } = signatureData.createImageSignature;
        const imageData = await uploadImage(
          data.image[0],
          signature,
          timestamp
        );
        image = imageData.secure_url;
      }
    }

    const { data: placeData } = await updatePlace({
      variables: {
        id: currentPlace.id,
        input: {
          address: data.address,
          name: data.name,
          image: image,
          coordinates: {
            latitude: data.latitude ?? 0,
            longitude: data.longitude ?? 0,
          },
        },
      },
    });

    if (placeData?.updatePlace) {
      router.push(`/places/${currentPlace.id}`);
    }
  };

  const handleCreate = async (data: IFormData) => {
    const { data: signatureData } = await createSignature();

    if (signatureData) {
      const { signature, timestamp } = signatureData.createImageSignature;
      const imageData = await uploadImage(data.image[0], signature, timestamp);

      const { data: placeData } = await createPlace({
        variables: {
          input: {
            name: 'TEST NAME',
            address: data.address,
            image: imageData.secure_url,
            coordinates: {
              latitude: data.latitude ?? 0,
              longitude: data.longitude ?? 0,
            },
          },
        },
      });

      if (placeData?.createPlace) {
        router.push(`/places/${placeData.createPlace.id}`);
      }
    }
  };

  const onFormSubmit = (data: IFormData) => {
    setSubmitting(true);
    place ? handleUpdate(place, data) : handleCreate(data);
  };

  useEffect(() => {
    register('address', { required: 'Please enter your address' });
    register('latitude', { required: true, min: -90, max: 90 });
    register('longitude', { required: true, min: -180, max: 180 });
  }, [register]);

  const imageFormHandlers = register('image', {
    validate: (fileList: FileList) => {
      if (place || fileList.length === 1) return true;
      return 'Please upload one file';
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filelist = event?.target?.files;
    if (filelist?.[0]) {
      const file = filelist[0];
      imageFormHandlers.onChange(event);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      className="mx-auto max-w-xl py-4 space-y-4"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <h1>{place ? `Editar ${place.name}` : 'Agrega tu negocio'}</h1>
      <div>
        <label className="block" htmlFor="search">
          Busca la direccion de tu negocio
        </label>
        <SearchBox
          onSelectAddress={(address, latitude, longitude) => {
            setValue('address', address);
            setValue('latitude', latitude);
            setValue('longitude', longitude);
          }}
          defaultValue={place ? place.address : ''}
        />
        {errors.address && <p>{errors.address.message}</p>}
      </div>

      {address && (
        <>
          <div>
            <label
              htmlFor="image"
              className="p-4 border-dashed border-4 border-gray-600 block cursor-pointer"
            >
              Haz click para subir la imagen de tu lugar (Razon 16:9)
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              {...imageFormHandlers}
              onChange={handleImageChange}
            />
            {previewImage ? (
              <img
                src={previewImage}
                className="mt-4 object-cover"
                style={{ width: '576px', height: `${(9 / 16) * 576}px` }}
              />
            ) : place ? (
              <Image publicId={place.publicId} width={576} className="mt-4" />
            ) : null}
            {errors.image && <p>{errors.image.message}</p>}
          </div>

          <div>
            <label className="text-light-pink">Nombre</label>
            <input {...register('name')} />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
              type="submit"
              disabled={submitting}
            >
              Guardar
            </button>{' '}
            <a
              href="#"
              onClick={(evt: React.MouseEvent<HTMLAnchorElement>) => {
                evt.preventDefault();
                onCancel && onCancel();
              }}
            >
              Cancelar
            </a>
          </div>
        </>
      )}
    </form>
  );
};
