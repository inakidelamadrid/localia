/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EditPlaceQuery
// ====================================================

export interface EditPlaceQuery_place {
  __typename: "Place";
  id: string;
  userId: string;
  address: string;
  image: string;
  publicId: string;
  latitude: number;
  longitude: number;
}

export interface EditPlaceQuery {
  place: EditPlaceQuery_place | null;
}

export interface EditPlaceQueryVariables {
  id: string;
}
