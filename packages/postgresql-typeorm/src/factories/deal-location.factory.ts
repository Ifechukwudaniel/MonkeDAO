import { setSeederFactory } from 'typeorm-extension';
import { DealLocationEntity } from '../entities';

export default setSeederFactory(DealLocationEntity, (fake) => {
  const location = new DealLocationEntity();

  location.address = fake.location.streetAddress();
  location.city = fake.location.city();
  location.state = fake.location.state();
  location.country = fake.location.country();
  location.lat = fake.location.latitude();
  location.lng = fake.location.longitude();
  location.distanceFromCenter = fake.number.float({ min: 0.1, max: 50 });

  return location;
});
