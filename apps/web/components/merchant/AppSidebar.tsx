'use client';

import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Home,
  PlusCircle,
  Settings,
  Tag,
  Ticket,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // ✅ import this
import { useState } from 'react';

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/dashboard' },
  {
    id: 'create-deal',
    label: 'Create Deal',
    icon: PlusCircle,
    href: '/dashboard/deals/create',
  },
  { id: 'deals', label: 'My Deals', icon: Tag, href: '/dashboard/deals' },
  {
    id: 'redeem',
    label: 'Redeem Coupon',
    icon: Ticket,
    href: '/dashboard/redeem',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    href: '/dashboard/analytics',
  },
];

const bottomNavigationItems = [
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    href: '/dashboard/notifications',
    badge: 3,
  },
  { id: 'help', label: 'Help & Support', icon: HelpCircle, href: '/help' },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
  },
];

const SidebarNavItem = ({ item, isActive, isCollapsed }) => {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
        transition-all duration-200 relative group uppercase  font-semibold
        ${isActive ? 'text-white bg-[#4A8F5D] font-semibold' : 'text-gray-800 hover:bg-[#4A8F5D20] '}
        ${isCollapsed ? 'justify-center' : ''}
      `}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!isCollapsed && (
        <>
          <span className="flex-1 text-left text-xs">{item.label}</span>
          {item.badge && (
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
              {item.badge}
            </span>
          )}
        </>
      )}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
          {item.label}
          {item.badge && (
            <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
              {item.badge}
            </span>
          )}
        </div>
      )}
    </Link>
  );
};

export const AppSidebar = () => {
  const pathname = usePathname(); // ✅ get current path
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Function to check if the current item is active
  const isActive = (href: string) => pathname === href;

  return (
    <div
      className={`h-screen border-r border-border-default flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border-default flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <h1 className="text-xl font-bold text-gray-900">Monkedeals</h1>
            <p className="text-xs text-gray-500">Merchant Portal</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navigationItems.map((item) => (
          <SidebarNavItem
            key={item.id}
            item={item}
            isActive={isActive(item.href)}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 border-t border-border-default space-y-1">
        {bottomNavigationItems.map((item) => (
          <SidebarNavItem
            key={item.id}
            item={item}
            isActive={isActive(item.href)}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border-default">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                John's Diner
              </p>
              <p className="text-xs text-gray-200 truncate">john@diner.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
