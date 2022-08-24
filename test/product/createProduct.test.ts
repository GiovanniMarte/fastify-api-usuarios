import { test } from 'tap';
import build from '../../src/server';
import prisma from '../../src/utils/prisma';
import { createFakeProduct, createFakeUser } from '../../src/utils/fakeData';
import { createAndAuthenticateUser } from '../user/authUser.test';

test('should create product and return product response', async t => {
  const server = build();

  const { user, jwt } = await createAndAuthenticateUser(server);

  const product = createFakeProduct();

  const response = await server.inject({
    method: 'POST',
    url: '/api/product',
    headers: { authorization: `Bearer ${jwt.token}` },
    payload: product,
  });

  const data = response.json();

  t.equal(response.statusCode, 201);
  t.equal(response.headers['content-type'], 'application/json; charset=utf-8');

  t.type(data.id, 'number');
  t.equal(data.title, product.title);
  t.equal(data.description, product.description);
  t.equal(data.price, product.price);

  t.equal(!isNaN(Date.parse(data.createdAt)), true);
  t.equal(!isNaN(Date.parse(data.updatedAt)), true);

  t.type(data.owner.id, 'number');
  t.equal(data.owner.name, user.name);
  t.equal(data.owner.email, user.email);

  t.teardown(async () => {
    server.close();
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({});
  });
});
