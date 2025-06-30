import { HttpApiBuilder, HttpApiError } from "@effect/platform";
import { Effect, Layer } from "effect";
import { api } from "./user-api.js";
import { UserRepository } from "../repositories/user-repository.js";

export const UsersGroupLive = HttpApiBuilder.group(api, "users", (handlers) =>
  Effect.gen(function* () {
    const userRepo = yield* UserRepository;

    return handlers
      .handle("getUsers", ({ urlParams }) =>
        userRepo
          .findAll(urlParams)
          .pipe(
            Effect.catchAll(() => Effect.fail(new HttpApiError.BadRequest()))
          )
      )
      .handle("getUser", ({ path: { id } }) =>
        userRepo
          .findById(id)
          .pipe(Effect.catchAll(() => Effect.fail(new HttpApiError.NotFound())))
      )
      .handle("createUser", ({ payload }) =>
        userRepo
          .create(payload)
          .pipe(
            Effect.catchAll(() => Effect.fail(new HttpApiError.BadRequest()))
          )
      )
      .handle("updateUser", ({ path: { id }, payload }) =>
        userRepo
          .update(id, payload)
          .pipe(Effect.catchAll(() => Effect.fail(new HttpApiError.NotFound())))
      )
      .handle("deleteUser", ({ path: { id } }) =>
        userRepo
          .remove(id)
          .pipe(Effect.catchAll(() => Effect.fail(new HttpApiError.NotFound())))
      );
  })
).pipe(Layer.provide(UserRepository.Default));
