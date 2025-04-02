import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import mylogo from "../images/logo.png";
import myuser from "../images/user.jpg";


function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={mylogo}
              alt="Logo" 
              className="h-8 w-8"
            />
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notification Popup */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">
                            Welcome back! It's been a while since your last visit. 
                            Continue your learning journey today.
                          </p>
                          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Picture */}
            <button className="flex items-center space-x-3 p-1 hover:bg-gray-100 rounded-full">
              <img
                src={myuser}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;