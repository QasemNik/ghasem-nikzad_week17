import { useContacts } from '../context/ContactContext';
import ContactList from '../components/ContactList';
import { useTitle } from '../hooks/‌UseTitle';

export default function SelectedPage() {
  useTitle('selected')
  const { state } = useContacts();
  
  const selectedContacts = state.contacts.filter(contact => 
    state.selectedContacts.includes(contact.id)
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-200">Selected Contacts</h2>
      {selectedContacts.length > 0 ? (
        <ContactList contacts={selectedContacts} />
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No contacts selected
        </div>
      )}
    </div>
  );
}