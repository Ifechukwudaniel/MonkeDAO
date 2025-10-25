import { setSeederFactory } from 'typeorm-extension';
import { DealEntity } from '../entities';

export default setSeederFactory(DealEntity, (fake) => {
  const deal = new DealEntity();

  deal.slug = fake.helpers.slugify(fake.commerce.productName());
  deal.title = fake.commerce.productName();
  deal.description = fake.commerce.productDescription();
  deal.category = fake.helpers.arrayElement([
    'flight',
    'hotel',
    'product',
    'experience',
  ]);
  deal.subCategory = fake.commerce.department();
  deal.originalPrice = fake.number.float({ min: 50, max: 1000 });
  deal.discountedPrice = fake.number.float({ min: 20, max: 900 });
  deal.discountPercent = fake.number.float({ min: 5, max: 60 });
  deal.currency = 'USD';
  deal.featured = fake.datatype.boolean();
  deal.active = true;
  deal.source = fake.helpers.arrayElement(['Skyscanner', 'Booking', 'Shopify']);

  return deal;
});
