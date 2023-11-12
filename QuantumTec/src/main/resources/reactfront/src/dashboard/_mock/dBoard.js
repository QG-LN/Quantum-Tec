import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------
const dBoard = [...Array(24)].map((_, index) => ({
  index: index + 1,
  id: faker.datatype.uuid(),
  boardcategory: faker.random.word(),
  boardname: faker.company.name(),
  user: faker.name.fullName(),
  day: faker.date.past().toString(),
  views: [['active', 'banned']],
  recommend: faker.datatype.number({ min: 1, max: 5 }),
  comment: faker.datatype.number({ min: 1, max: 5 }),
}));

export default dBoard;
