import { Schema } from "effect";

export class User extends Schema.Class<User>("User")({
  id: Schema.Number,
  name: Schema.String,
  email: Schema.String.pipe(Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)),
  createdAt: Schema.String,
  updatedAt: Schema.String,
}) {}

export const CreateUserRequest = Schema.Struct({
  name: Schema.String.pipe(Schema.minLength(1)),
  email: Schema.String.pipe(Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)),
});

export const UpdateUserRequest = Schema.Struct({
  name: Schema.optional(Schema.String.pipe(Schema.minLength(1))),
  email: Schema.optional(
    Schema.String.pipe(Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
  ),
});

export const UserListQuery = Schema.Struct({
  limit: Schema.optional(
    Schema.NumberFromString.pipe(Schema.positive(), Schema.int())
  ),
  offset: Schema.optional(
    Schema.NumberFromString.pipe(Schema.nonNegative(), Schema.int())
  ),
});

export type CreateUserRequestFrom = Schema.Schema.Type<
  typeof CreateUserRequest
>;
export type UpdateUserRequestFrom = Schema.Schema.Type<
  typeof UpdateUserRequest
>;
export type UserListQueryFrom = Schema.Schema.Type<typeof UserListQuery>;
