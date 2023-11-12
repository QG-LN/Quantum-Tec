import { faker } from '@faker-js/faker';
import { random } from 'nanoid';
let arr = ['결제됨','보류중','환불됨'];
function getstate(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomState = array[randomIndex];
  return randomState;
}
// ----------------------------------------------------------------------
const payments = [...Array(24)].map((_, index) => ({
  index: index + 1,
  payhistory: faker.datatype.uuid(),
  userid: faker.company.name(),
  paytype: faker.name.fullName(),
  payday: faker.date.past().toString(),
  paystates: getstate(arr),
}));



export default payments;
