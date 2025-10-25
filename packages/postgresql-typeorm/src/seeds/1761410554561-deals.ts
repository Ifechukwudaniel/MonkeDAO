import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DealLocationEntity } from '../entities/deal-location.entity';
import { DealNFTEntity } from '../entities/deal-nft.entity';
import { DealOptionEntity } from '../entities/deal-option.entity';
import { DealEntity } from '../entities/deal.entity';

export class Deals1761410554561 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    _factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const dealRepo = dataSource.getRepository(DealEntity);
    const optionRepo = dataSource.getRepository(DealOptionEntity);
    const nftRepo = dataSource.getRepository(DealNFTEntity);
    const locationRepo = dataSource.getRepository(DealLocationEntity);

    // Example deals
    const deals = [
      { title: 'Super Sale', discount: 50, active: true },
      { title: 'Black Friday Deal', discount: 70, active: true },
    ];

    for (const dealData of deals) {
      const deal = dealRepo.create(dealData);
      await dealRepo.save(deal);

      // Add options
      const options = [
        { name: 'Option A', deal },
        { name: 'Option B', deal },
      ];
      for (const opt of options) {
        const option = optionRepo.create(opt);
        await optionRepo.save(option);
      }

      // Add NFTs
      const nfts = [
        { tokenId: `NFT-${deal.id}-1`, deal },
        { tokenId: `NFT-${deal.id}-2`, deal },
      ];
      for (const nft of nfts) {
        const n = nftRepo.create(nft);
        await nftRepo.save(n);
      }

      // Add Locations
      const locations = [
        { city: 'Lagos', deal },
        { city: 'Abuja', deal },
      ];
      for (const loc of locations) {
        const l = locationRepo.create(loc);
        await locationRepo.save(l);
      }
    }
  }
}
