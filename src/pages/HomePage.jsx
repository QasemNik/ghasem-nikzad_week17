import { useState } from 'react';
import ContactList from '../components/ContactList';
import ContactForm from '../components/ContactForm';
import Modal from '../components/Modal';
import SearchBar from '../components/SearchBar';
import { FaPlus } from 'react-icons/fa';
import { useTitle } from '../hooks/‌UseTitle';

export default function HomePage() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  useTitle('Home')

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="hidden sm:flex  text-2xl font-bold text-gray-800 dark:text-white">Contacts</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsFormModalOpen(true)}
            className="bg-teal-500 dark:bg-teal-900 dark:hover:bg-teal-800 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-teal-600 flex  items-center space-x-2 md:space-x-2 text-sm md:text-base"
          >
            <FaPlus />
            <span>Add Contact</span>
          </button>
        </div>
      </div>
      <SearchBar />
      <ContactList />

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title="Add New Contact"
      >
        <ContactForm onClose={() => setIsFormModalOpen(false)} />
      </Modal>
    </div>
  );
}