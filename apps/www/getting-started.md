# Getting Started

Getting started with this RealWorld project is as easy as installing a few prerequisites, running a few commands, and opening your favorite text editor. [Contributions](https://github.com/bedtime-coders/bedstack/blob/main/CONTRIBUTING.md) are welcome. If you have any questions, please reach out on [Discord](https://discord.gg/8UcP9QB5AV) or [GitHub Discussions](
  https://github.com/bedtime-coders/bedstack/discussions
)!

## Installation

### Prerequisites

- [Bun](https://bun.com/) version 1.0.6 or higher.
- Terminal for accessing Bun via its command-line interface (CLI).
- Text Editor with TypeScript support.
  - [Visual Studio Code](https://code.visualstudio.com/) is recommended for the best experience; other IDEs have been reported to cause issues with ElysiaJS's type inference system.

### Setup

1. **Clone and install dependencies**

  ```sh
  $ gh repo clone bedtime-coders/bedstack
  $ cd bedstack
  $ bun i
  ```

2. **Ensure Docker daemon is running and spin up the Postgres+Bun container**

```sh
$ bun db
```

3. **Migrate the schema to the database**

```sh
$ bun db:migrate
```

4. **Run the app**

```sh
$ bun dev
```

## What's Next?

* To contribute, see the [contributing guide](https://github.com/bedtime-coders/bedstack/blob/main/CONTRIBUTING.md).
* For a place to start, see the [good first issues](https://github.com/bedtime-coders/bedstack/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22).
* For support, visit the [support page](https://github.com/bedtime-coders/bedstack/blob/main/SUPPORT.md).
* To ask questions or chat, join the [Discord server](https://discord.gg/8UcP9QB5AV) or [GitHub Discussions](https://github.com/bedtime-coders/bedstack/discussions).
