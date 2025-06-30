import { SqlClient } from "@effect/sql";
import * as SqliteDrizzle from "@effect/sql-drizzle/Sqlite";
import { SqliteClient } from "@effect/sql-sqlite-node";
import { Layer } from "effect";

export const SqlLive = SqliteClient.layer({
  filename: "database.db",
});

export const DrizzleLive = SqliteDrizzle.layer.pipe(Layer.provide(SqlLive));

export const DatabaseLive = Layer.mergeAll(SqlLive, DrizzleLive);
