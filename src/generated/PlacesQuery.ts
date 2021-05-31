/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BoundsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: PlacesQuery
// ====================================================

export interface PlacesQuery_places {
  __typename: "Place";
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  publicId: string;
}

export interface PlacesQuery {
  places: PlacesQuery_places[];
}

export interface PlacesQueryVariables {
  bounds: BoundsInput;
}
