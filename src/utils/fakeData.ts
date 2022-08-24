import { faker } from '@faker-js/faker';

export function createFakeUserInput({ hasName = true, hasEmail = true, hasPassword = true } = {}) {
  return {
    ...(hasName && { name: faker.name.firstName() }),
    ...(hasEmail && { email: faker.internet.email() }),
    ...(hasPassword && { password: faker.internet.password() }),
  };
}
