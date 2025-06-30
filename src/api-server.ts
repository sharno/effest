import { HttpApiBuilder, HttpApiSwagger, HttpServer } from "@effect/platform";
import { BunHttpServer, BunRuntime } from "@effect/platform-bun";
import { Layer } from "effect";
import { api } from "./api/user-api.js";
import { UsersGroupLive } from "./api/user-handlers.js";
import { DatabaseLive } from "./db/database.js";

const HttpLive = BunHttpServer.layer({
  port: 3000,
});

const UserApiLive = HttpApiBuilder.api(api).pipe(Layer.provide(UsersGroupLive));

const ServerLive = HttpApiBuilder.serve().pipe(
  Layer.provide(HttpApiSwagger.layer({ path: "/docs" })),
  Layer.provide(UserApiLive),
  Layer.provide(DatabaseLive),
  HttpServer.withLogAddress,
  Layer.provide(HttpLive)
);

BunRuntime.runMain(Layer.launch(ServerLive));
