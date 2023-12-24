# Realtime chat

Simple reatime chat with Y.js and React.

## Usage

To run the project locally, you'll need to have [Node.js v20](https://nodejs.org) and [pnpm v8](https://pnpm.io/) installed on your machine. Then, run the following commands:

```bash
git clone https://github.com/JuanM04/realtime-chat.git
cd realtime-chat
pnpm install
```

### Development

To start the development servers, run the following commands:

```bash
# On one terminal
cd server
pnpm run dev

# On another terminal
cd client
pnpm run dev
# Optional: if you want to export the frontend server to other devices in your network, run the following command instead:
pnpm run dev --host
```

### Production

To start the production server, you'll need to build the project first. Run the following commands:

```bash
# On one terminal
cd client
pnpm run build
# After the build is complete, run the following command:
pnpm run preview

# On another terminal
cd server
pnpm run start
```

## License

This project is licensed under the [MIT License](./LICENSE).
