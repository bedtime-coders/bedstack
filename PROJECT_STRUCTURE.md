# Project Structure

This document describes the file structure and organization of the codebase. The layout is flat and feature-sliced, with each domain feature (e.g., articles, comments) self-contained.

We follow a **one file per thing** rule to maintain clear organization.

## Top-Level Overview

```plaintext
src/
├── app.module.ts            # Main module that composes all features
├── ...resources/             # All resource modules directly under `src/`
├── db/                      # Drizzle ORM config and database init
├── shared/                  # Common constants, interfaces, and utilities
```

> [!NOTE]
> The `app.module.ts` file is named in the spirit of NestJS, where the app module is the device in charge of putting together all the pieces of the application. See [NestJS Modules](https://docs.nestjs.com/modules) for more details.

## Resource Module Layout

Each resource module (e.g. `articles/`, `comments/`) uses this layout:

```plaintext
resource/
├── resources.controller.ts       # REST handler logic
├── resources.service.ts          # Business logic
├── resources.repository.ts       # DB access logic
├── resources.mapper.ts           # Converts DB to DTO
├── schema/
│   └── feature.schema.ts       # Drizzle schema + optional relations
├── dto/
│   ├── create-feature.dto.ts   # Input shape (TypeBox)
│   ├── update-feature.dto.ts   # Input shape (if needed)
│   └── feature.dto.ts          # Output DTO for response
├── interfaces/
│   ├── feature.interface.ts    # Domain model
│   └── feature-row.interface.ts# Drizzle-inferred DB shape
```

> [!NOTE]
> Note the filename is written in plural form (`resources.controller.ts`, e.g. `articles.controller.ts`) in the spirit of NestJS.

## Folder-Level Purpose

### `/db/`

- Drizzle config and init
- Exports the db instance
- Does **not** export db tables, these are found as schemas inside feature folders

### `/shared/`

Global utilities, middleware, and shared concerns.

```plaintext
shared/
├── auth-middleware.ts     # Extracts auth context
├── http-errors.ts         # Shared error classes
├── slugify.ts             # Utility for slug generation
```

## Naming Conventions

### DTO Naming

- `CreateThingDto` – used for `POST` requests
- `UpdateThingDto` – used for `PATCH`/`PUT` requests
- `ThingResponseDto` or `ThingsResponseDto` – response structure (singular or plural, depending on the request)
- Each DTO is defined via TypeBox and typed via `Static<typeof schema>`
- DTO files live in `dto/` and share name with their schema

### Interface Naming

- `IThing` – the core domain interface used in services
- `ThingRow` – the shape returned by Drizzle ORM (via InferSelectModel)
- Stored in `interfaces/` and always one interface per file

### Schema Naming

- `feature.schema.ts` – contains Drizzle `pgTable()` definitions
- May also define `relations()` in the same file unless very large
- If split, name the second file `feature-relations.schema.ts`

## See also

- More on **Architecture** - see [Architecture](ARCHITECTURE.md)
- **Contributing** - see [Developer's Guide](CONTRIBUTING.md)
- **API Documentation** - see [RealWorld Backend Specifications](https://realworld-docs.netlify.app/specifications/backend/introduction/)
- **Drizzle ORM Documentation** - see [Drizzle ORM](https://orm.drizzle.team/)
