import { useTitle } from '../hooks/‌UseTitle';
export default function FavoritesPage() {
  useTitle('Favorites')

  
 

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Favorite Contacts</h2>
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No favorite contacts yet
        </div>
    </div>
  );
}