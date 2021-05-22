import {FC, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

import {SearchBox} from 'src/components/SearchBox';

interface IFormData {
  address: string;
  latitude: number | null;
  longitude: number | null;

  image: FileList;

  contact: {
    name?: string;
    number?: string;
    email?: string;
  };
}

interface IPlaceFormProps {
  onCancel?: Function;
}

export const PlaceForm: FC<IPlaceFormProps> = ({onCancel}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm<IFormData>({
    defaultValues: {},
  });

  const address = watch('address');

  const onFormSubmit = (data: IFormData) => {
    setSubmitting(true);
    console.log('Data', data);
  };

  useEffect(() => {
    register('address', {required: 'Please enter your address'});
    register('latitude', {required: true, min: -90, max: 90});
    register('longitude', {required: true, min: -180, max: 180});
  }, [register]);

  const imageFormHandlers = register('image', {
    validate: (fileList: FileList) => {
      if (fileList.length === 1) return true;
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
      onSubmit={handleSubmit(onFormSubmit)}>
      <h1>Agrega tu negocio</h1>
      <div>
        <label className="block" htmlFor="search">
          Busca la direccion de tu negocio
        </label>
        <SearchBox
          onSelectAddress={(address, latitude, longitude) => {
            console.log('Address', address);
            setValue('address', address);
            setValue('latitude', latitude);
            setValue('longitude', longitude);
          }}
          defaultValue=""
        />
        {errors.address && <p>{errors.address.message}</p>}
      </div>

      {address && (
        <>
          <div>
            <label
              htmlFor="image"
              className="p-4 border-dashed border-4 border-gray-600 block cursor-pointer">
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
            {previewImage && (
              <img
                src={previewImage}
                className="mt-4 object-cover"
                style={{width: '576px', height: `${(9 / 16) * 576}px`}}
              />
            )}
            {errors.image && <p>{errors.image.message}</p>}
          </div>

          <div>
            <label className="text-light-pink">Nombre (Contacto)</label>
            <input {...register('contact.name')} />
          </div>
          <div>
            <label className="text-light-pink">Numero (Contacto)</label>
            <input {...register('contact.number')} />
          </div>
          <div>
            <label>Email (Contacto)</label>
            <input {...register('contact.email')} />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
              type="submit"
              disabled={submitting}>
              Guardar
            </button>{' '}
            <a
              href="#"
              onClick={(evt: React.MouseEvent<HTMLAnchorElement>) => {
                evt.preventDefault();
                onCancel && onCancel();
              }}>
              Cancelar
            </a>
          </div>
        </>
      )}
    </form>
  );
};
