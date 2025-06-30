# Effest - Effect-TS HTTP API Server

A modern HTTP API server built with Effect-TS, featuring:

- **Bun** as the runtime
- **Effect HTTP API** for type-safe REST endpoints
- **Effect Schema** for validation
- **Drizzle ORM** with Effect SQL integration
- **SQLite** as the database
- **Swagger/OpenAPI** documentation

## Project Structure

```
src/
├── api/
│   ├── user-api.ts          # HTTP API endpoint definitions
│   └── user-handlers.ts     # API handlers implementation
├── db/
│   ├── schema.ts           # Drizzle schema definitions
│   └── database.ts         # Database layer setup
├── repositories/           # Database repositories using Drizzle + Effect SQL
│   └── user-repository.ts
├── schemas/               # Effect Schema definitions for validation
│   └── user.ts
├── migrations/           # Database migrations
│   └── 0001_create_users.ts
└── api-server.ts        # HTTP API server entry point
```

## Features

### HTTP API with Swagger

- RESTful API endpoints with full type safety
- Automatic OpenAPI/Swagger documentation at `/docs`
- Type-safe request/response validation
- Built-in error handling with proper HTTP status codes

### Drizzle ORM Integration

- Type-safe database operations with Drizzle ORM
- Effect SQL integration for composable database layers
- Automatic schema inference and type safety
- Built-in migration system

### Schema Validation

- Type-safe request/response validation using Effect Schema
- Email validation with regex patterns
- Optional fields with proper typing

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
# Push schema changes to database
bun run db:push
```

3. Start the HTTP API server:

```bash
bun run api
```

The server will start on `http://localhost:3000` with:

- REST API endpoints available at `/users`
- Swagger documentation at `http://localhost:3000/docs`

### Available Scripts

- `bun run api` - Start HTTP API server with hot reload
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run db:generate` - Generate Drizzle migrations
- `bun run db:migrate` - Run Drizzle migrations
- `bun run db:push` - Push schema changes to database
- `bun run db:studio` - Open Drizzle Studio (database GUI)

## API Endpoints

The HTTP API provides RESTful endpoints for user management:

### GET /users

Get a list of users with optional pagination.

Query parameters:

- `limit` (optional): Number of users to return
- `offset` (optional): Number of users to skip

### GET /users/:id

Get a user by ID.

### POST /users

Create a new user.

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### PATCH /users/:id

Update an existing user.

Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

### DELETE /users/:id

Delete a user by ID.

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

## API Documentation

Visit `http://localhost:3000/docs` when the server is running to access the interactive Swagger documentation.

## Example Usage

### Using curl

```bash
# Get all users
curl http://localhost:3000/users

# Get user by ID
curl http://localhost:3000/users/1

# Create a new user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'

# Update a user
curl -X PATCH http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe"}'

# Delete a user
curl -X DELETE http://localhost:3000/users/1
```

## Architecture

### HTTP API + Effect Platform

- Type-safe HTTP endpoints with automatic validation
- Built-in Swagger/OpenAPI documentation generation
- Composable middleware and error handling
- Request/response schema validation

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
- **HTTP API**: RESTful endpoints with automatic documentation

## Extending the Template

1. **Add new entities**:

   - Add to `src/db/schema.ts`
   - Create Effect schemas in `src/schemas/`
   - Create API endpoints in `src/api/`
   - Create repository and handlers

2. **Add middleware**: Use HTTP middleware for authentication, logging, etc.

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
