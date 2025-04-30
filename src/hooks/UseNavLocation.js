import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useNavTitle(setTitle) {
  const location = useLocation();

  useEffect(() => {
    const pathTitle = {
      '/': 'Home',
      '/trash': 'Trash',
      '/favorites': 'Favorites',
      '/selected': 'Selected',
    };

    setTitle(pathTitle[location.pathname] || 'Home');
  }, [location.pathname, setTitle]);
}
