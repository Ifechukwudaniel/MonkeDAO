/* ╔════════════════════════════════════════════╗
   ║ FILE: Public Layout
   ║ DESC: Public layout for only Public Pages
   ║ CONTRIBUTOR: Open Source
   ╚════════════════════════════════════════════╝ */

import { Footer } from 'components/Footer';
import { Banner } from '../../components/Banner';
import { PublicHeader } from '../../components/Layouts/PublicHeader';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-auto flex-col relative">
      <Banner announcement=" MonkeDAO introduces 'MonkeDeals' — the first Web3-powered discount marketplace! Mint your first NFT coupon today and unlock real-world savings" />
      <PublicHeader />
      <main className="grow py-4">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
