import { AppSidebar } from '../../components/merchant/AppSidebar';

export default function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <AppSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Your Dashboard
          </h2>
          <p className="text-gray-600 mb-6">
            Use the sidebar to navigate through different sections of your
            merchant portal. Click the collapse button to minimize the sidebar.
          </p>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">24</p>
                <p className="text-sm text-gray-600">Active Deals</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">156</p>
                <p className="text-sm text-gray-600">Redeemed Today</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">$2.4k</p>
                <p className="text-sm text-gray-600">Revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
