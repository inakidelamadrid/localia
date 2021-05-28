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
