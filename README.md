# Effect-TS Web Server Template with Drizzle ORM

A modern web server template built with Effect-TS, featuring:

- **Bun** as the runtime
- **Effect Schema** for validation
- **Effect RPC** for type-safe endpoints
- **Drizzle ORM** with Effect SQL integration
- **SQLite** as the database

## Project Structure

```
src/
├── db/
│   ├── schema.ts        # Drizzle schema definitions
│   └── database.ts      # Database layer setup
├── schemas/             # Effect Schema definitions for validation
│   └── user.ts
├── rpc/                # RPC endpoint definitions
│   └── user-rpc.ts
├── repositories/       # Database repositories using Drizzle + Effect SQL
│   └── user-repository.ts
├── handlers/           # RPC handlers connecting endpoints to repositories
│   └── user-handlers.ts
├── main.ts            # Main server entry point
├── client.ts          # Example client usage
└── init-db.ts         # Database initialization script
drizzle.config.ts      # Drizzle configuration
```

## Features

### Drizzle ORM Integration

- Type-safe database operations with Drizzle ORM
- Effect SQL integration for composable database layers
- Automatic schema inference and type safety
- Built-in migration system

### Schema Validation

- Type-safe request/response validation using Effect Schema
- Email validation with regex patterns
- Optional fields with proper typing

### RPC Endpoints

- Type-safe remote procedure calls
- Automatic serialization/deserialization
- Error handling with typed errors

### Bun Integration

- Fast startup and execution
- Built-in TypeScript support
- Hot reloading in development

## Getting Started

### Prerequisites

- Bun installed on your system

### Installation

1. Install dependencies:

```bash
bun install
```

2. Set up the database:

```bash
# Initialize the database with tables
bun run init-db

# Or use Drizzle push to sync schema
bun run db:push
```

3. Start the development server:

```bash
bun run dev
```

The server will start on `http://localhost:3000` with RPC endpoints available at `/rpc`.

### Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run init-db` - Initialize database with tables
- `bun run db:generate` - Generate Drizzle migrations
- `bun run db:migrate` - Run Drizzle migrations
- `bun run db:push` - Push schema changes to database
- `bun run db:studio` - Open Drizzle Studio (database GUI)

## Database Operations

### Using Drizzle Studio

```bash
bun run db:studio
```

This opens a web-based database GUI for inspecting and editing data.

### Schema Changes

1. Modify `src/db/schema.ts`
2. Generate migration: `bun run db:generate`
3. Apply migration: `bun run db:migrate`

Or for development, push directly: `bun run db:push`

## API Endpoints

All endpoints are available via RPC at `/rpc`:

### UserList

Get a list of users with pagination.

### UserById

Get a user by ID.

### UserCreate

Create a new user.

### UserUpdate

Update an existing user.

### UserDelete

Delete a user.

## Example Usage

### Using the Client

Run the example client to see the RPC calls in action:

```bash
bun src/client.ts
```

### Manual Testing with curl

```bash
curl -X POST http://localhost:3000/rpc \
  -H "Content-Type: application/json" \
  -d '{"_tag": "Request", "id": "123", "tag": "UserList", "payload": {"limit": 10}, "traceId": "trace", "spanId": "span", "sampled": true, "headers": {}}'
```

## Architecture

### Drizzle ORM + Effect SQL

- Type-safe database operations
- Composable database layers
- Automatic schema inference
- Migration system
- Connection pooling

### Effect Schema

- Compile-time type safety
- Runtime validation
- Automatic serialization
- Custom validation rules

### Effect RPC

- Type-safe client/server communication
- Automatic request/response handling
- Built-in error propagation
- Middleware support

### Repository Pattern

- Clean separation of concerns
- Testable data access layer
- Dependency injection via Effect services

## Development

The template follows functional programming principles with Effect-TS:

- **Services**: Dependency injection and resource management
- **Layers**: Composable application architecture
- **Effects**: Structured concurrency and error handling
- **Schemas**: Type-safe data validation and transformation

## Extending the Template

1. **Add new entities**:

   - Add to `src/db/schema.ts`
   - Create Effect schemas in `src/schemas/`
   - Create RPC definitions
   - Create repository and handlers

2. **Add middleware**: Use RPC middleware for authentication, logging, etc.

3. **Add validation**: Extend schemas with custom validation rules

4. **Switch databases**: Change the database layer in `src/db/database.ts` and `drizzle.config.ts`

## Database Schema

Current schema includes a `users` table with:

- `id` - Auto-incrementing primary key
- `name` - User's name (required)
- `email` - User's email (required, unique)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## License

MIT
