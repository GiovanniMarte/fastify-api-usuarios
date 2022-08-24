import { faker } from '@faker-js/faker';

export interface FakeUser {
  password?: string | undefined;
  email?: string | undefined;
  name?: string | undefined;
}

interface FakeUserOptions {
  hasName?: boolean;
  hasEmail?: boolean;
  hasPassword?: boolean;
}

export function createFakeUser({ hasName = true, hasEmail = true, hasPassword = true } = {}) {
  return {
    ...(hasName && { name: faker.name.firstName() }),
    ...(hasEmail && { email: faker.internet.email() }),
    ...(hasPassword && { password: faker.internet.password() }),
  };
}

export function createFakeUserList(
  length: number,
  userCallback: (options: FakeUserOptions) => FakeUser
) {
  return Array.from({ length }, userCallback);
}

export function createFakeProduct({
  hasTitle = true,
  hasDescription = true,
  hasPrice = true,
} = {}) {
  return {
    ...(hasTitle && { title: faker.commerce.product() }),
    ...(hasDescription && { description: faker.commerce.productDescription() }),
    ...(hasPrice && { price: faker.datatype.float({ max: 200 }) }),
  };
}
