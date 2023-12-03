import { faker } from '@faker-js/faker';
import { random } from 'nanoid';
let arr = ['결제 완료','결제 실패','환불'];
function getstate(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomState = array[randomIndex];
  return randomState;
}
// ----------------------------------------------------------------------
const payments = [...Array(24)].map((_, index) => ({
  paymentIndex: index + 1,
  paymentName: faker.datatype.uuid(),
  userId: faker.company.name(),
  paymentMethod: faker.name.fullName(),
  paymentDate: faker.date.past().toString(),
  paymentStatus: getstate(arr),
}));



export default payments;
