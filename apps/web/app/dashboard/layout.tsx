import { AppHeader } from 'components/Layouts/AppHeader';
import { AppSidebar } from '../../components/merchant/AppSidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-[#FCFBF2] ">
      <AppSidebar />
      <div className="flex-1 overflow-y-scroll">
        <AppHeader />
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
