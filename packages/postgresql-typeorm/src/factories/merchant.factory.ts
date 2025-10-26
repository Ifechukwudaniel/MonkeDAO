import { setSeederFactory } from 'typeorm-extension';
import { MerchantEntity } from '../entities';

export default setSeederFactory(MerchantEntity, (fake) => {
  const merchant = new MerchantEntity();

  merchant.slug = fake.helpers.slugify(fake.company.name());
  merchant.name = fake.company.name();
  merchant.description = fake.company.catchPhrase();
  merchant.walletAddress = fake.finance.ethereumAddress();
  merchant.verifiedMerchant = fake.datatype.boolean();
  merchant.country = fake.location.country();
  merchant.city = fake.location.city();

  return merchant;
});
