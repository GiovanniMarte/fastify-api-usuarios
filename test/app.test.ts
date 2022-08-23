import { test } from 'tap';

import build from '../src/server';

test('should return status OK when app is healthy', async t => {
  const server = build();

  t.teardown(() => {
    server.close();
  });

  const response = await server.inject({ method: 'GET', url: '/healthcheck' });

  t.equal(response.statusCode, 200);
  t.same(response.json(), { status: 'OK' });
});
