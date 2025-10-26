import { setSeederFactory } from 'typeorm-extension';
import { DealOptionEntity } from '../entities';

export default setSeederFactory(DealOptionEntity, (fake) => {
  const option = new DealOptionEntity();

  option.name = fake.commerce.product();
  option.originalPrice = fake.number.float({ min: 50, max: 500 });
  option.discountedPrice = fake.number.float({ min: 30, max: 400 });
  option.available = fake.datatype.boolean();
  option.maxGuests = fake.number.int({ min: 1, max: 6 });

  return option;
});
