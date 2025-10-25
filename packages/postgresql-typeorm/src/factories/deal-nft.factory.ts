import { setSeederFactory } from 'typeorm-extension';
import { DealNFTEntity } from '../entities';

export default setSeederFactory(DealNFTEntity, (fake) => {
  const nft = new DealNFTEntity();

  nft.mintable = true;
  nft.tokenStandard = 'ERC-1155';
  nft.royaltyPercentage = fake.number.float({ min: 1, max: 5 });
  nft.transferable = true;
  nft.maxSupply = fake.number.int({ min: 100, max: 5000 });
  nft.currentMinted = fake.number.int({ min: 0, max: 5000 });

  return nft;
});
