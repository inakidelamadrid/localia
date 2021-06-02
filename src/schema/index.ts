import { buildSchemaSync, Resolver, Query } from 'type-graphql';
import { ImageResolver } from './image';
import { PlaceResolver } from './place';

import { authChecker } from './auth';

export const schema = buildSchemaSync({
  resolvers: [ImageResolver, PlaceResolver],
  emitSchemaFile: process.env.NODE_ENV === 'development',
  authChecker,
});
