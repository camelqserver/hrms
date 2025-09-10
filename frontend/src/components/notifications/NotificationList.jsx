import React, { useEffect, useState } from 'react';
import { getNotifications, markNotificationRead } from '../../services/notificationService';

const NotificationList = ({ employeeId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications(employeeId).then(res => setNotifications(res.data));
  }, [employeeId]);

  const markRead = async (id) => {
    await markNotificationRead(id);
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <div>
      <h3>Notifications</h3>
      {notifications.map(n => (
        <div key={n.id} style={{ backgroundColor: n.isRead ? '#eee' : '#fff' }}>
          <p>{n.message}</p>
          {!n.isRead && <button onClick={() => markRead(n.id)}>Mark as Read</button>}
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
