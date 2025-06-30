import { Effect, Layer } from "effect";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { SqlClient } from "@effect/sql";
import * as SqliteDrizzle from "@effect/sql-drizzle/Sqlite";
import { DatabaseLive } from "./db/database.js";
import { users } from "./db/schema.js";

const program = Effect.gen(function* () {
  const sql = yield* SqlClient.SqlClient;
  const db = yield* SqliteDrizzle.SqliteDrizzle;

  yield* Effect.log("Creating users table...");

  yield* sql`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `;

  yield* Effect.log("Database initialized successfully!");
});

const MainLive = DatabaseLive.pipe(Layer.provide(BunContext.layer));

program.pipe(Effect.provide(MainLive), BunRuntime.runMain);
