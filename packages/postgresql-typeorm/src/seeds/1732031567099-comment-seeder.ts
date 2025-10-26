import { getRandomInt } from '@monkedeals/nest-common';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import {
  CommentEntity,
  DealEntity,
  MerchantEntity,
  UserEntity,
} from '../entities';

export class CommentSeeder1732031567099 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(UserEntity);
    const dealRepository = dataSource.getRepository(DealEntity);
    const merchantRepository = dataSource.getRepository(MerchantEntity);

    // Get random users
    const numberOfUsers = await userRepository.count();
    const randomUserOffset = getRandomInt(0, Math.max(0, numberOfUsers - 10));
    const users = await userRepository
      .createQueryBuilder('user')
      .skip(randomUserOffset)
      .take(10)
      .getMany();

    // Get random deals
    const numberOfDeals = await dealRepository.count();
    const randomDealOffset = getRandomInt(0, Math.max(0, numberOfDeals - 10));
    const deals = await dealRepository
      .createQueryBuilder('deal')
      .skip(randomDealOffset)
      .take(10)
      .getMany();

    // Get random merchants
    const numberOfMerchants = await merchantRepository.count();
    const randomMerchantOffset = getRandomInt(
      0,
      Math.max(0, numberOfMerchants - 10),
    );
    const merchants = await merchantRepository
      .createQueryBuilder('merchant')
      .skip(randomMerchantOffset)
      .take(10)
      .getMany();

    const commentFactory = factoryManager.get(CommentEntity);

    // Seed comments linking random users → random deals & merchants
    for (const user of users) {
      const deal = deals[getRandomInt(0, deals.length - 1)];
      const merchant = merchants[getRandomInt(0, merchants.length - 1)];

      await commentFactory.saveMany(5, {
        authorId: user.id,
        dealId: deal?.id,
        merchantId: merchant?.id,
      });
    }
  }
}
