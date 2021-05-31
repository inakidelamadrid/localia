/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ShowPlaceQuery
// ====================================================

export interface ShowPlaceQuery_place_nearby {
  __typename: "Place";
  id: string;
  latitude: number;
  longitude: number;
}

export interface ShowPlaceQuery_place {
  __typename: "Place";
  id: string;
  userId: string;
  address: string;
  publicId: string;
  latitude: number;
  longitude: number;
  nearby: ShowPlaceQuery_place_nearby[];
}

export interface ShowPlaceQuery {
  place: ShowPlaceQuery_place | null;
}

export interface ShowPlaceQueryVariables {
  id: string;
}
