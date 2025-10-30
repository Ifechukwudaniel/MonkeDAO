/* ╔════════════════════════════════════════════╗
   ║ FILE: Notification Page
   ║ DESC: Track Merchants Notification
   ║ CONTRIBUTOR: Open Source
   ╚════════════════════════════════════════════╝ */

import NotificationCard from 'components/NotificationCard';
import { mockNotifications } from 'data';

const NotificationsPage = () => {
  return (
    <div className=" mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {mockNotifications.map((notif, index) => (
        <NotificationCard
          key={index}
          title={notif.title}
          message={notif.message}
          author={notif.author}
          category={notif.category}
          time={notif.time}
          iconType={notif.iconType as any}
        />
      ))}
    </div>
  );
};

export default NotificationsPage;
