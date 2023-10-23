import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
const users = [...Array(24)].map((_, index) => ({
  index: index + 1,
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  nickname: faker.internet.userName(),
  level: faker.datatype.number({ min: 1, max: 30 }),
  cash: faker.datatype.number({ min: 1000, max: 100000 }),
  days: faker.datatype.number({ min: 1, max: 30 }),
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export default users;
