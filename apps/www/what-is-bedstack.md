# What is Bedstack?

Bedstack is a bleeding-edge tech stack for building backend applications with TypeScript. The name is an acronym for [**B**un](https://bun.com/) + [**E**lysiaJS](https://elysiajs.com/) + [**D**rizzle](https://orm.drizzle.team/) + [**A**rkType](https://arktype.io/).

Bedstack’s philosophy is simple on the surface, powerful underneath. It is designed to guide developers into the pit of success by default. Strong type safety is not optional, and the stack remains flexible enough to support complex, real production use cases, as demonstrated by its [RealWorld](https://github.com/gothinkster/realworld) example project.

This [repository](https://github.com/bedtime-coders/bedstack) implements the RealWorld backend specification. By design, it is fully interchangeable with other RealWorld backend implementations and works with any RealWorld-compatible frontend.

## Core technologies

The selected technologies share Bedstack's core philosophy. They are:

- **[Bun](https://bun.com/)** - All-in-one JavaScript runtime & toolkit designed for speed, complete with a bundler, test runner, and Node.js-compatible package manager.

- **[ElysiaJS](https://elysiajs.com/)** - TypeScript framework supercharged by Bun with End-to-End Type Safety, unified type system and outstanding developer experience.

- **[Drizzle](https://orm.drizzle.team/)** - Lightweight, performant, typesafe, non-lactose, gluten-free, flexible, serverless-ready, and headless TypeScript ORM with both relational and SQL-like query APIs.

While not part of the flashy acronym, these tools are also core to Bedstack’s philosophy:

- **[ArkType](https://arktype.io/)** - A runtime validator that can 1:1 match TypeScript types. It aligns strongest with Bedstack's philosophy of being typesafe by default with minimal ceremony.

- **[Biome](https://biomejs.dev/)** - A toolchain for web projects, aiming to provide a fast, reliable, and user-friendly experience for formatting, linting, and other code quality tasks.


## Why RealWorld?

The RealWorld project provides a rare combination of clarity and depth.

For **beginners**, it offers a concrete API and dozens of implementations across languages and frameworks. This makes it easy to learn new tools, compare approaches, and validate understanding against real examples.

For **experienced developers**, RealWorld is a practical benchmark. It is a structured way to evaluate new technologies, stress-test architectural ideas, and contribute high-quality reference implementations back to the community.

## Why Bun, ElysiaJS, Drizzle, or any of the core technologies?

When [Bun](https://bun.com/) was announced, it promised a simpler and more unified approach to modern TypeScript development. It was tested under real conditions.

The question was simple:

> What better way to evaluate a new runtime than to build a full RealWorld backend with it?

ElysiaJS, Drizzle, and ArkType were selected because they are designed with Bun and TypeScript-first development in mind, and because they reinforce the same core values.

Bedstack is unapologetically opinionated. A tech stack is not a menu of options, it is a curated path to correct decisions. ArkType offers excellent type inference and makes the correct choice the easiest choice.

That said, Bedstack relies on the [Standard Schema](https://github.com/standard-schema/standard-schema) interface. Advanced users can substitute another compliant validator if needed, but ArkType remains the recommended and supported path.
