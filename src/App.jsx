import { ContactProvider } from './context/ContactContext';
import Navigation from './components/Navigation';
import AppRoute from './routes/AppRoute';
import DarkModeToggle from './Theme/DarkModeToggle';


function App() {
  return (
      <ContactProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <Navigation />
            <main className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
             <AppRoute />
            </main>
          </div>
          <DarkModeToggle />
        </div>
      </ContactProvider>
    
  );
}

export default App;