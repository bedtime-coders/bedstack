# Architecture

## Overview

This service uses a **Layered Architecture** to keep our code clean, clear, and easy to maintain.

We mostly follow the [NestJS philosophy](https://docs.nestjs.com/#philosophy), but interpret it to fit our needs.

We separate the system into 3 layers:

1.	**Controller** – Talks to the client
2.	**Service** – Handles the business logic
3.	**Repository** – Talks to the database

### 1. Controller Layer (Client-facing)

- Receives data from the client (DTO)
- Returns data to the client (DTO)
- Validates data types
- Calls the service layer
- Can shape requests and responses, without performing any business logic

---

### 2. Service Layer (Business Logic)

- Contains the business logic
- Can perform any kind of calculation or transformation as long as it's part of the business rules
- Validates logic rules (e.g., checking if a user can register)
- Handles errors and logging
- Calls the repository layer to get or save data

---

### 3. Repository Layer (Database Access)

- Talks to the database
- Only responsible for saving and retrieving data
- **No** assumptions about validation
- **No** business logic should go here

## Types we use 

> [!NOTE]
> We will use the `User` entity as an example for the rest of this document.

To keep things clear & scalable, we separate each "entity" into three types:

| Type                                                | Associated Layer | Purpose                                        |
| --------------------------------------------------- | ---------------- | ---------------------------------------------- |
| `CreateUserDto`, `UpdateUserDto`, `UserResponseDto` | Controller       | Used to talk with the client                   |
| `IUser`                                             | All              | Common contract shared between layers          |
| `User`                                              | Repository       | Defines how the data is stored in the database |

## Type Design Principles

1. **Interfaces vs Classes**:
   - Use interfaces (`IUser`) to define contracts between layers
   - Use classes (`User`) for concrete implementations. The (database) entity is a concrete implementation of the interface.
   - This separation allows for better testing and flexibility

2. **Canonical Forms**:
   - Store canonical forms in the database (e.g., `birthdate`)
   - The canonical form is represented in the entity (`User`) *and* the interface (`IUser`)
   - The DTO might use a different form, e.g. `CreateUserDto` might use `age` instead of `birthdate`
   - Use mappers to convert between forms

3. **System vs Domain Properties**:
   - System properties (`id`, `createdAt`, `updatedAt`) are managed by the base entity
   - Domain properties (e.g. `email`, `name`) are defined in the interface, enforced by the entity, and controlled by the DTOs

## Examples

### Example 1: Can register?

```typescript
canRegister(user: Partial<IUser>) {
  if (user.email.endsWith('@banned.com')) {
    throw new ForbiddenException('Email domain is not allowed');
  }

  if (!this.isOldEnough(user.birthdate)) {
    throw new ForbiddenException('User must be at least 13 years old');
  }
}
```

This check lives in the service layer because:

- It's business logic
- It could change based on product decisions
- It might be reused across different controllers (`signup`, `adminCreateUser`, etc.)
- If tomorrow we add GraphQL on top of our REST, this logic will remain the same

### Example 2: Normalize email

```typescript
normalizeEmail(email: string) {
  return email.toLowerCase().trim();
}
```

Also clearly service-level: it’s a standardized rule, not controller-specific logic.

## See also

- **Project structure** - see [Project Structure](#TODO)
- **Contributing** - see [Developer's Guide](CONTRIBUTING.md)
- **Diagrams** - see [Diagrams](#TODO)
- **Documentation (for consumers)** - see [RealWorld Backend Specifications](https://realworld-docs.netlify.app/specifications/backend/introduction/)
