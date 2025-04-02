import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

function Navigation() {
  const navItems = [
    { path: '/', label: 'Original Content' },
    { path: '/notes', label: 'AI Notes' },
    { path: '/summary', label: 'AI Summary' },
    { path: '/flashcards', label: 'AI Flashcards' },
    { path: '/quizzes', label: 'AI Quizzes' },
  ];

  return (
    <nav className="flex space-x-1 p-2 bg-gray-50 border-b border-gray-200">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            clsx(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            )
          }
          end
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;