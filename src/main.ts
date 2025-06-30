import { HttpRouter } from "@effect/platform";
import { BunContext, BunHttpServer, BunRuntime } from "@effect/platform-bun";
import { RpcSerialization, RpcServer } from "@effect/rpc";
import { Effect, Layer } from "effect";
import { DatabaseLive } from "./db/database.js";

const HttpLive = BunHttpServer.layer({
  port: 3000,
});

const MainLive = Layer.mergeAll(
  DatabaseLive,
  HttpLive,
  BunContext.layer,
  HttpRouter.Default.serve()
);

const program = Effect.gen(function* () {
  yield* Effect.log("Server starting on http://localhost:3000");
  yield* Effect.log("RPC endpoint available at http://localhost:3000/rpc");
  yield* Effect.never;
}).pipe(
  Effect.provide(MainLive),
  Effect.provide(HttpLive),
  Effect.provide(RpcServer.layerProtocolHttp({ path: "/rpc" })),
  Effect.provide(RpcSerialization.layerJson)
);

BunRuntime.runMain(program);
