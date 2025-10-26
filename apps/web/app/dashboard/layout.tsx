import { AppSidebar } from '../../components/merchant/AppSidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen ">
      <AppSidebar />
      <div className="flex-1 p-8 overflow-y-scroll">{children}</div>
    </div>
  );
}
