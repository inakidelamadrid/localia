import {FC, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

import {SearchBox} from 'src/components/SearchBox';

interface IFormData {
  address: string;
  latitude: number | null;
  longitude: number | null;
  image: FileList;
  contact: {
    number: string;
  };
}

interface IHouseFormProps {}
export const HouseForm: FC<IHouseFormProps> = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
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

  return (
    <form
      className="mx-auto max-w-xl py-4"
      onSubmit={handleSubmit(onFormSubmit)}>
      <h1>Agrega tu negocio</h1>
      <div className="mt-4">
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
        <h2>{address}</h2>
      </div>
      <button type="submit" value="Crear" disabled={submitting} />
    </form>
  );
};
