import {
  Authorized,
  Arg,
  Ctx,
  Field,
  Float,
  ID,
  InputType,
  Mutation,
  Resolver,
  ObjectType,
  Query,
} from 'type-graphql';
import { Max, Min } from 'class-validator';
import { getBoundsOfDistance } from 'geolib';
import { AuthorizedContext, Context } from './context';

@InputType()
class CoordinatesInput {
  @Min(-90)
  @Max(90)
  @Field((_type) => Float)
  latitude!: number;

  @Min(-180)
  @Max(180)
  @Field((_type) => Float)
  longitude!: number;
}

@InputType()
class BoundsInput {
  @Field((_type) => CoordinatesInput)
  sw!: CoordinatesInput;

  @Field((_type) => CoordinatesInput)
  ne!: CoordinatesInput;
}

@InputType()
class PlaceInput {
  @Field((_type) => String)
  address!: string;

  @Field((_type) => String)
  image!: string;

  @Field((_type) => CoordinatesInput)
  coordinates!: CoordinatesInput;

  @Field((_type) => String)
  name!: string;
}

@ObjectType()
class Place {
  @Field((_type) => ID)
  id!: number;

  @Field((_type) => String)
  userId!: string;

  @Field((_type) => Float)
  latitude!: number;

  @Field((_type) => Float)
  longitude!: number;

  @Field((_type) => String)
  address!: string;

  @Field((_type) => String)
  image!: string;

  @Field((_type) => String)
  publicId(): string {
    const parts = this.image.split('/');
    return parts[parts.length - 1];
  }

  @Field((_type) => String)
  name!: string;

  @Field((_type) => [Place])
  async nearby(@Ctx() ctx: Context) {
    const bounds = getBoundsOfDistance(
      { latitude: this.latitude, longitude: this.longitude },
      10000
    );

    return ctx.prisma.place.findMany({
      where: {
        latitude: { gte: bounds[0].latitude, lte: bounds[1].latitude },
        longitude: { gte: bounds[0].longitude, lte: bounds[1].longitude },
        id: { not: { equals: this.id } },
      },
      take: 25,
    });
  }
}

@Resolver()
export class PlaceResolver {
  @Query((_returns) => Place, { nullable: true })
  async place(@Arg('id') id: string, @Ctx() ctx: Context) {
    return ctx.prisma.place.findOne({ where: { id: parseInt(id) } });
  }

  @Query((_returns) => [Place], { nullable: false })
  async places(@Arg('bounds') bounds: BoundsInput, @Ctx() ctx: Context) {
    return ctx.prisma.place.findMany({
      where: {
        latitude: { gte: bounds.sw.latitude, lte: bounds.ne.latitude },
        longitude: { gte: bounds.sw.longitude, lte: bounds.ne.longitude },
      },
      take: 50,
    });
  }

  @Authorized()
  @Mutation((_returns) => Place, { nullable: true })
  async createPlace(
    @Arg('input') input: PlaceInput,
    @Ctx() ctx: AuthorizedContext
  ) {
    const {
      image,
      address,
      coordinates: { longitude, latitude },
      name,
    } = input;
    return ctx.prisma.place.create({
      data: { image, address, longitude, latitude, userId: ctx.uid, name },
    });
  }

  @Authorized()
  @Mutation((_returns) => Place, { nullable: true })
  async updatePlace(
    @Arg('id') id: string,
    @Arg('input') input: PlaceInput,
    @Ctx() ctx: AuthorizedContext
  ) {
    const placeId = parseInt(id, 10);
    const place = await ctx.prisma.place.findOne({ where: { id: placeId } });

    if (!place || place.userId !== ctx.uid) return null;

    return await ctx.prisma.place.update({
      where: { id: placeId },
      data: {
        image: input.image,
        address: input.address,
        latitude: input.coordinates.latitude,
        longitude: input.coordinates.longitude,
        name: input.name,
      },
    });
  }
}
