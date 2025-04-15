<div align='center'>

<img src="docs/public/logo-mini.png" alt="Logo for Bedstack RealWorld example" width=200>
<h1>Bedstack</h1>

###### _[RealWorld](https://realworld-docs.netlify.app/) example app for [Bun](https://bun.sh/) + [ElysiaJS](https://elysiajs.com/) + [Drizzle](https://orm.drizzle.team/)_

[![Tests Status](https://github.com/agnyz/bedstack/actions/workflows/tests.yml/badge.svg?event=push&branch=main)](https://github.com/agnyz/bedstack/actions/workflows/tests.yml?query=branch%3Amain) [![RealWorld](https://img.shields.io/badge/RealWorld-compliant-success?labelColor=2f1c42)](https://github.com/gothinkster/realworld) [![Bed Puns](https://img.shields.io/badge/bed%20puns-welcome-limegreen)](https://discord.gg/8UcP9QB5AV) [![GitHub License](https://img.shields.io/github/license/agnyz/bedstack)](https://github.com/agnyz/bedstack/blob/main/LICENSE) [![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/agnyz/bedstack?utm_source=oss&utm_medium=github&utm_campaign=agnyz%2Fbedstack&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)](https://github.com/agnyz/bedstack/pulls) 

#### Visit https://bedstack.js.org to learn more about the stack you don't want to sleep on 🛌💤

## Let's share a BED - join our [Discord server](https://discord.gg/8UcP9QB5AV) 

</div>

### Quickstart

1. **Clone and install dependencies**

    ```sh
    gh repo clone agnyz/bedstack
    cd bedstack
    bun i
    ```

2. **Create a `.env` file**

    ```sh
    cp .env.example .env
    ```

    Use the provided example values or replace them with your own.

3. **Ensure Docker daemon is running and spin up the Postgres container**

    ```sh
    bun db
    ```
3. **Migrate the schema to the database**

    ```sh
    bun db:migrate
    ```

4. **Run the development server**

    ```sh
    bun dev
    ```

5. **Run the API tests**

    ```sh
    bun run test # not `bun test`!
    ```

### Building for production

> [!TIP]
> See more info in ElysiaJS's [Building for production](https://elysiajs.com/tutorial.html#build-for-production) guide.

1. **Build the app**

    ```sh
    bun run build # not `bun build`!
    ```

2. **Run the server**

    ```sh
    bun preview

### Contributing

See [Developer's Guide](CONTRIBUTING.md).
