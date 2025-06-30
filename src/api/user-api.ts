import {
  HttpApi,
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiSchema,
  HttpApiError,
} from "@effect/platform";
import { Schema } from "effect";
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserListQuery,
} from "../schemas/user.js";

const idParam = HttpApiSchema.param("id", Schema.NumberFromString);

export const usersGroup = HttpApiGroup.make("users")
  .add(
    HttpApiEndpoint.get("getUsers", "/users")
      .setUrlParams(UserListQuery)
      .addSuccess(Schema.Array(User))
      .addError(HttpApiError.BadRequest)
  )
  .add(
    HttpApiEndpoint.get("getUser")`/users/${idParam}`
      .addSuccess(User)
      .addError(HttpApiError.NotFound)
  )
  .add(
    HttpApiEndpoint.post("createUser", "/users")
      .setPayload(CreateUserRequest)
      .addSuccess(User)
      .addError(HttpApiError.BadRequest)
  )
  .add(
    HttpApiEndpoint.patch("updateUser")`/users/${idParam}`
      .setPayload(UpdateUserRequest)
      .addSuccess(User)
      .addError(HttpApiError.NotFound)
      .addError(HttpApiError.BadRequest)
  )
  .add(
    HttpApiEndpoint.del("deleteUser")`/users/${idParam}`.addError(
      HttpApiError.NotFound
    )
  );

export const api = HttpApi.make("UserApi").add(usersGroup);
