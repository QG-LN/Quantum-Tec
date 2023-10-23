import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------
const games = [...Array(24)].map((_, index) => ({
  index: index + 1,
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  company: faker.company.name(),
  price: faker.datatype.number({ min: 1000, max: 100000 }),
  category: faker.animal.dog(),
  day: faker.date.past().toString(),
  review: faker.datatype.number({ min: 1, max: 5 }),
}));

export default games;
