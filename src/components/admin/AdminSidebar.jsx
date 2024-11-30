import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminData from './AdminData';

const AdminSidebar = () => {
  const location = useLocation(); // Get the current location path
  const adminData = AdminData(); // Fetch admin data

  return (
    <div className="admin-sidebar-main w-1/4">
      <h2>Admin Sidebar</h2>
      <ul>
        {adminData.map((item) => {
          // Determine if the current link matches the location pathname
          const isActive = location.pathname === `/${item.link}`;
          return (
            <li key={item.id} className="mb-2">
              <a
                href={`/${item.link}`}
                className={`${
                  isActive ? 'text-yellow-500 font-bold' : 'text-blue-600'
                } hover:underline`}
              >
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminSidebar;

