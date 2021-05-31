import { FC, HTMLProps } from 'react';
import { Image as CloudinaryImage } from 'cloudinary-react';

interface CloudinaryImageProps extends HTMLProps<HTMLImageElement> {
  publicId: string;
}

export const Image: FC<CloudinaryImageProps> = ({
  publicId,
  width = '200',
  ...rest
}) => {
  const height = Math.floor((9 / 16) * parseInt(String(width), 10));

  return (
    <CloudinaryImage
      {...rest}
      cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
      publicId={publicId}
      secure
      dpr="auto"
      quality="auto"
      width={width}
      height={height}
      crop="fill"
      gravity="auto"
    />
  );
};
