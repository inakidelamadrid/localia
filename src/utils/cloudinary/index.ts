import {gql} from '@apollo/client';
import {objectToFormData} from 'src/utils';

export const SIGNATURE_MUTATION = gql`
  mutation CreateSignatureMutation {
    createImageSignature {
      signature
      timestamp
    }
  }
`;

export interface IUploadImageResponse {
  secure_url: string;
}

export async function uploadImage(
  image: File,
  signature: string,
  timestamp: number,
): Promise<IUploadImageResponse> {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

  const formData = objectToFormData({
    signature,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY ?? '',
    file: image,
    timestamp: timestamp.toString(),
  });

  const response = await fetch(url, {
    method: 'post',
    body: formData,
  });

  return response.json();
}
