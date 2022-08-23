import { test } from 'tap';
import { faker } from '@faker-js/faker';
import build from '../../src/server';
import { UserResponse } from '../../src/user/user.schema';
import prisma from '../../src/utils/prisma';

test('should create user and return user response', async t => {
  const server = build();

  t.teardown(async () => {
    server.close();
    await prisma.user.deleteMany({});
  });

  const user = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  const response = await server.inject({
    method: 'POST',
    url: '/api/user/register',
    payload: user,
  });

  const data = UserResponse.parse(response.json());

  t.equal(response.statusCode, 201);
  t.equal(response.headers['content-type'], 'application/json; charset=utf-8');

  t.equal(data.name, user.name);
  t.equal(data.email, user.email);
  t.type(data.id, 'number');
});
