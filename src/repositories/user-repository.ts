import { Effect } from "effect";
import { SqlClient } from "@effect/sql";
import * as SqliteDrizzle from "@effect/sql-drizzle/Sqlite";
import { eq, sql } from "drizzle-orm";
import { users } from "../db/schema.js";
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserListQuery,
  UserListQueryFrom,
  CreateUserRequestFrom,
  UpdateUserRequestFrom,
} from "../schemas/user.js";

export class UserRepository extends Effect.Service<UserRepository>()(
  "UserRepository",
  {
    effect: Effect.gen(function* () {
      const sqlClient = yield* SqlClient.SqlClient;
      const db = yield* SqliteDrizzle.SqliteDrizzle;

      const findAll = ({ limit = 10, offset = 0 }: UserListQueryFrom) =>
        Effect.tryPromise(() =>
          db
            .select()
            .from(users)
            .orderBy(users.createdAt)
            .limit(limit)
            .offset(offset)
        );

      const findById = (id: number) =>
        Effect.tryPromise(() =>
          db.select().from(users).where(eq(users.id, id))
        ).pipe(
          Effect.flatMap((results) =>
            results.length > 0
              ? Effect.succeed(results[0]!)
              : Effect.fail(`User not found: ${id}`)
          )
        );

      const create = ({ name, email }: CreateUserRequestFrom) =>
        Effect.tryPromise(() =>
          db
            .insert(users)
            .values({
              name,
              email,
            })
            .returning()
        ).pipe(
          Effect.flatMap((results) =>
            results.length > 0
              ? Effect.succeed(results[0]!)
              : Effect.fail("Failed to create user")
          )
        );

      const update = (id: number, data: UpdateUserRequestFrom) =>
        Effect.gen(function* () {
          const updateData: Partial<typeof users.$inferInsert> = {};

          if (data.name !== undefined) {
            updateData.name = data.name;
          }
          if (data.email !== undefined) {
            updateData.email = data.email;
          }

          const results = yield* Effect.tryPromise(() =>
            db.update(users).set(updateData).where(eq(users.id, id)).returning()
          );

          if (results.length === 0) {
            return yield* Effect.fail(`User not found: ${id}`);
          }

          return results[0]!;
        });

      const remove = (id: number) =>
        Effect.tryPromise(() => db.delete(users).where(eq(users.id, id))).pipe(
          Effect.asVoid
        );

      return {
        findAll,
        findById,
        create,
        update,
        remove,
      } as const;
    }),
  }
) {}
