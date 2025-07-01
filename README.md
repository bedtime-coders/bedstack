<div align='center'>

<img src="docs/public/logo-mini.png" alt="Logo for Bedstack RealWorld example" width=200>
<h1>Bedstack</h1>

[![Tests Status](https://github.com/bedtime-coders/bedstack/actions/workflows/tests.yml/badge.svg?event=push&branch=main&)](https://github.com/bedtime-coders/bedstack/actions/workflows/tests.yml?query=branch%3Amain+event%3Apush) [![Discord](https://img.shields.io/discord/1164270344115335320?label=Chat&color=5865f4&logo=discord&labelColor=121214)](https://discord.gg/8UcP9QB5AV) [![License](https://custom-icon-badges.demolab.com/github/license/bedtime-coders/bedstack?label=License&color=blue&logo=law&labelColor=0d1117)](https://github.com/bedtime-coders/bedstack/blob/main/LICENSE) [![Bun](https://img.shields.io/badge/Bun-14151a?logo=bun&logoColor=fbf0df)](https://bun.sh/) [![ElysiaJS](https://custom-icon-badges.demolab.com/badge/ElysiaJS-0f172b.svg?logo=elysia)](https://elysiajs.com/) [![Drizzle](https://img.shields.io/badge/Drizzle-C5F74F?logo=drizzle&logoColor=000)](https://drizzle.team/) [![Biome](https://img.shields.io/badge/Biome-24272f?logo=biome&logoColor=f6f6f9)](https://biomejs.dev/) [![Scalar](https://img.shields.io/badge/Scalar-080808?logo=scalar&logoColor=e7e7e7)](https://scalar.com/) [![Star](https://custom-icon-badges.demolab.com/github/stars/bedtime-coders/bedstack?logo=star&logoColor=373737&label=Star)](https://github.com/bedtime-coders/bedstack/stargazers/)

[RealWorld](https://realworld-docs.netlify.app/) example app for [Bun](https://bun.sh/) + [ElysiaJS](https://elysiajs.com/) + [Drizzle](https://orm.drizzle.team/)

[bedstack.js.org](https://bedstack.js.org)

</div>

> [!TIP]
> ⚡ **New!** Our Prisma-based alternative to Bedstack was just approved on CodebaseShow. Check it out: [Bepstack](https://github.com/bedtime-coders/bepstack)

> [!TIP]
> ⚡ **New!** We've added support for [Drizzle v1 Beta](https://orm.drizzle.team/roadmap) in _Bedstack (Stripped)_. Check it out: [`bedstack-stripped/tree/drizzle-v1`](https://github.com/bedtime-coders/bedstack-stripped/tree/drizzle-v1)

## Quickstart

1. **Clone and install dependencies**

    ```sh
    gh repo clone bedtime-coders/bedstack
    cd bedstack
    bun i
    ```

2. **Create a `.env` file**

   ```sh
   cp .env.example .env
   ```

   Use the provided example values or replace them with your own.

3. **Ensure Docker daemon is running and start the database service**

   ```sh
   bun db:start
   ```

4. **Migrate the schema to the database**

   ```sh
   bun db:migrate
   ```

5. **Run the development server**

   ```sh
   bun dev
   ```

6. **Run the API tests**

   ```sh
   bun run test # not `bun test`!
   ```

7. **(Optional) Start the [database studio](https://orm.drizzle.team/drizzle-studio/overview)**
   ```bash
   bun db:studio
   ```


## Building for production

> [!TIP]
> See more info in ElysiaJS's [Building for production](https://elysiajs.com/tutorial.html#build-for-production) guide.

1. **Build the app**

   ```sh
   bun run build # not `bun build`!
   ```

2. **Run the server**

   ```sh
   bun preview
   ```

## Contributing

See [Developer's Guide](CONTRIBUTING.md).
