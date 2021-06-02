import { gql } from '@apollo/client';

export const SHOW_PLACE_QUERY = gql`
  query ShowPlaceQuery($id: String!) {
    place(id: $id) {
      id
      userId
      address
      publicId
      latitude
      longitude
      name
      nearby {
        id
        latitude
        longitude
      }
    }
  }
`;

export const CREATE_PLACE_MUTATION = gql`
  mutation CreatePlaceMutation($input: PlaceInput!) {
    createPlace(input: $input) {
      id
    }
  }
`;

export const UPDATE_PLACE_MUTATION = gql`
  mutation UpdatePlaceMutation($id: String!, $input: PlaceInput!) {
    updatePlace(id: $id, input: $input) {
      id
      image
      publicId
      latitude
      longitude
      name
      address
    }
  }
`;
