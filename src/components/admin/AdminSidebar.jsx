import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminData from './AdminData';

const AdminSidebar = () => {
  const location = useLocation(); // Get the current location path
  const adminData = AdminData(); // Fetch admin data

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="admin-sidebar-main left-0 w-1/2 sm:w-1/4 bg-slate-50">
      {/* <Logo/>  */}
      {/* <h1 className='text-left'>Admin Dashboard</h1> */}
      <div className='admin-profile-main flex space-x-4   items-center p-4'>
        {/* <Logo/> */}

        <div className='admin-profile-img rounded-full bg-appColor'>

          <img
            src="https://philipngungi.vercel.app/Assets/images/hero-img1.png" 
            alt="Admin Profile"
            className="w-[63px] rounded-full h-[72px]  p4 "
          />
        </div>
        <div className='admin-profile-username text-center  text-xs  p-4'>
          <h1 className='bg-appColor p-2 mb-2 rounded-full '>ADMIN</h1>
          {user.username} <br></br>
          {user.email}

        </div>
      </div>
      <ul className='py-4'>
        {adminData.map((item) => {
          // Determine if the current link matches the location pathname
          const isActive = location.pathname === `/${item.link}`;
          return (
            <li key={item.id} className="mb-2 p-4 border-b border-appColor">
              <a
                href={`/${item.link}`}
                className={`${isActive ? 'text-yellow-500 font-bold' : 'text-black'
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

