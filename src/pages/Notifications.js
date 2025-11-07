import React, { useEffect, useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(saved);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-600">Belum ada notifikasi</p>
      ) : (
        <div className="bg-white rounded-xl shadow p-6">
          <ul className="space-y-3">
            {notifications.map((notif, i) => (
              <li
                key={i}
                className="border-b last:border-none pb-2 text-gray-700"
              >
                <p>{notif.message}</p>
                <p className="text-xs text-gray-400">{notif.date}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
