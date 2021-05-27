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
} from 'type-graphql'
import { Max, Min } from 'class-validator'
import { AuthorizedContext } from './context'

@InputType()
class CoordinatesInput {
  @Min(-90)
  @Max(90)
  @Field((_type) => Float)
  latitude!: number

  @Min(-180)
  @Max(180)
  @Field((_type) => Float)
  longitude!: number
}

@InputType()
class PlaceInput {
  @Field((_type) => String)
  address!: string

  @Field((_type) => String)
  image!: string

  @Field((_type) => CoordinatesInput)
  coordinates!: CoordinatesInput
}

@ObjectType()
class Place {
  @Field((_type) => ID)
  id!: number

  @Field((_type) => String)
  userId!: string

  @Field((_type) => Float)
  latitude!: number

  @Field((_type) => Float)
  longitude!: number

  @Field((_type) => String)
  address!: string

  @Field((_type) => String)
  image!: string

  @Field((_type) => String)
  publicId(): string {
    const parts = this.image.split('/')
    return parts[parts.length - 1]
  }
}

@Resolver()
export class PlaceResolver {
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
    } = input
    return ctx.prisma.place.create({
      data: { image, address, longitude, latitude, userId: ctx.uid },
    })
  }
}
