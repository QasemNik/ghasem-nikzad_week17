import { FaHome, FaTrash, FaStar, FaUsers, FaTags } from 'react-icons/fa';

export const navLinks = [
  {
    to: '/',
    icon: <FaHome />,
    label: 'Home'
  },
  {
    to: '/trash',
    icon: <FaTrash />,
    label: 'Trash'
  },
  {
    to: '/favorites',
    icon: <FaStar />,
    label: 'Favorites'
  },
  {
    to: '/selected',
    icon: <FaUsers />,
    label: 'Selected'
  },
 
];