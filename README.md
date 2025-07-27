# MEMOGATE APP

---

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

A backend API for the [Memogate mobile app](https://github.com/Neo0432/memogate) — a simple and convenient mobile application for saving quick notes and bookmarks. Capture URLs, titles, descriptions, and organize everything with tags.

## Install

---

```bash
  yarn install
```

### Create and configure the `.env` file in the project root:

1. Create a `.env` file in the root directory of the project.
2. Configure it according to the `example.env`:
   - Set the `DATABASE_URL`
   - Set a `JWT_SECRET` (you can generate it yourself)

### Install Prisma CLI and start migrations (if needed)

```bash
  yarn prisma generate
  yarn migrate
```

### Install Prisma CLI and start migrations (if needed)
```bash
  yarn prisma generate
  yarn migrate
```

### Start the project

```bash
  yarn start
```

## Contributing

---

Pull requests are welcome.

> Note: If you're editing this README, please follow the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

---

[MIT © Ilia Dorovskih.](./LICENSE)
