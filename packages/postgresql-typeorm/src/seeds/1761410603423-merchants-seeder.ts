import { MerchantEntity } from 'src/entities';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
export class MerchantsSeeder1761410603423 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    // Get the repository for Merchant entity
    const merchantRepo = dataSource.getRepository(MerchantEntity);

    // Example seed data
    const merchants = [
      { name: 'TechMart', email: 'contact@techmart.com', active: true },
      { name: 'FashionHub', email: 'hello@fashionhub.com', active: true },
      { name: 'GadgetWorld', email: 'support@gadgetworld.com', active: false },
    ];

    for (const merchant of merchants) {
      const entity = merchantRepo.create(merchant);
      await merchantRepo.save(entity);
    }
  }
}
