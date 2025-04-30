import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { navLinks } from '../routes/navLinks';
import { useNavTitle } from '../hooks/UseNavLocation';
import { useContacts } from '../context/ContactContext';

export default function Navigation() {
  const { state } = useContacts();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [title, setTitle] = useState('Home');

  useNavTitle(setTitle);

  return (
    <nav className="bg-white  dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-6 relative">
      <div className="flex items-center justify-between  sm:hidden">
        <div className="text-xl sm:text-2xl font-bold dark:text-white">
          {title}

        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <ul className={`
        ${isMenuOpen ? 'flex' : 'hidden'} menuBurger`}>
        {navLinks.map(({ to, icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `navItems
               ${isActive ? 'bg-gray-200/20 text-gray-900' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
              onClick={() => {
                setIsMenuOpen(false);
                setTitle(label);
              }}
            >
              {icon}
              <span>{label}</span>

              {(label === 'Trash' && state.deletedContacts.length > 0) && (
                <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  {state.deletedContacts.length}
                </span>
              )}
              {(label === 'Selected' && state.selectedContacts.length > 0)
                &&
                (
                  <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    {state.selectedContacts.length}
                  </span>
                )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}