import { test } from 'tap';
import build from '../../src/server';
import prisma from '../../src/utils/prisma';
import { createFakeUserInput } from '../../src/utils/fakeData';
import { LoginResponse } from '../../src/user/user.schema';

interface ValidJWT {
  id: string;
  email: string;
  iat: string;
}

test('should authenticate user and return verified jwt', async t => {
  const server = build();

  const user = createFakeUserInput();

  await server.inject({
    method: 'POST',
    url: '/api/user/register',
    payload: user,
  });

  const response = await server.inject({
    method: 'POST',
    url: '/api/user/auth',
    payload: { email: user.email, password: user.password },
  });

  const data = LoginResponse.parse(response.json());

  const jwt = server.jwt.verify<ValidJWT>(data.accessToken);

  t.equal(response.statusCode, 200);
  t.equal(response.headers['content-type'], 'application/json; charset=utf-8');

  t.equal(jwt.email, user.email);
  t.type(jwt.id, 'number');
  t.type(jwt.iat, 'number');

  t.teardown(async () => {
    server.close();
    await prisma.user.deleteMany({});
  });
});

test('should fail to authenticate user and return error object', async t => {
  const server = build();

  const user = createFakeUserInput();

  await server.inject({
    method: 'POST',
    url: '/api/user/register',
    payload: user,
  });

  const response = await server.inject({
    method: 'POST',
    url: '/api/user/auth',
    payload: { email: user.email, password: 'wrongpassword' },
  });

  const data = response.json();

  t.equal(response.statusCode, 401);
  t.equal(response.headers['content-type'], 'application/json; charset=utf-8');

  t.same(data, {
    statusCode: 401,
    error: 'Unauthorized',
    message: 'password is incorrect',
  });

  t.teardown(async () => {
    server.close();
    await prisma.user.deleteMany({});
  });
});
