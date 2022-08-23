import build from './server';

const server = build();

const start = async () => {
  try {
    await server.listen({ port: 3000, host: '::' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
