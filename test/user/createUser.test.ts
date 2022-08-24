import { test } from 'tap';
import build from '../../src/server';
import prisma from '../../src/utils/prisma';
import { createFakeUser } from '../../src/utils/fakeData';

test('should create user and return user response', async t => {
  const server = build();

  const user = createFakeUser();

  const response = await server.inject({
    method: 'POST',
    url: '/api/user/register',
    payload: user,
  });

  const data = response.json();

  t.equal(response.statusCode, 201);
  t.equal(response.headers['content-type'], 'application/json; charset=utf-8');

  t.equal(data.name, user.name);
  t.equal(data.email, user.email);
  t.type(data.id, 'number');

  t.teardown(async () => {
    server.close();
    await prisma.user.deleteMany({});
  });
});

test('should fail to register and return an error object', async t => {
  const server = build();

  const user = createFakeUser({ hasEmail: false });

  const response = await server.inject({
    method: 'POST',
    url: '/api/user/register',
    payload: user,
  });

  t.equal(response.statusCode, 400);
  t.equal(response.headers['content-type'], 'application/json; charset=utf-8');

  t.same(response.json(), {
    statusCode: 400,
    error: 'Bad Request',
    message: "body must have required property 'email'",
  });

  t.teardown(() => {
    server.close();
  });
});
