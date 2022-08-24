import { test } from 'tap';
import build from '../../src/server';
import prisma from '../../src/utils/prisma';
import { createFakeUser, FakeUser } from '../../src/utils/fakeData';
import { FastifyInstance } from 'fastify';

interface ValidJWT {
  id: string;
  email: string;
  iat: string;
}

test('should authenticate user and return verified jwt', async t => {
  const server = build();

  const { statusCode, headers, user, jwt } = await createAndAuthenticateUser(server);

  t.equal(statusCode, 200);
  t.equal(headers['content-type'], 'application/json; charset=utf-8');

  t.equal(jwt.decoded.email, user.email);
  t.type(jwt.decoded.id, 'number');
  t.type(jwt.decoded.iat, 'number');

  t.teardown(async () => {
    server.close();
    await prisma.user.deleteMany({});
  });
});

test('should fail to authenticate user and return error object', async t => {
  const server = build();

  const user = createFakeUser();

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

  t.equal(response.statusCode, 401);
  t.equal(response.headers['content-type'], 'application/json; charset=utf-8');

  t.same(response.json(), {
    statusCode: 401,
    error: 'Unauthorized',
    message: 'password is incorrect',
  });

  t.teardown(async () => {
    server.close();
    await prisma.user.deleteMany({});
  });
});

export async function createAndAuthenticateUser(
  server: FastifyInstance,
  user: FakeUser = createFakeUser()
) {
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

  const data = response.json();

  const decodedJwt = server.jwt.verify<ValidJWT>(data.accessToken);

  return {
    ...response,
    user,
    jwt: {
      decoded: decodedJwt,
      token: data.accessToken,
    },
  };
}
