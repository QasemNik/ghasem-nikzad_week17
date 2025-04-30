/* eslint-disable no-unused-vars */
import { useContacts } from '../context/ContactContext';
import { useTitle } from '../hooks/‌UseTitle';

export default function TrashPage() {
  useTitle('Trash')

  const { state, dispatch } = useContacts();
  
  const handleRestore = (contact) => {
    const { deletedAt, ...contactData } = contact;
    dispatch({ type: 'RESTORE_CONTACT', payload: contactData });
  };
  const handleDelete = (c) => {
          dispatch({ type: 'PERMANENTLY_DELETE_CONTACT' , payload: c})
  }

  return (
    <div className="space-y-4">
      <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg mb-4">
        <p className="text-yellow-800 dark:text-yellow-200">
          Deleted contacts will be permanently removed after 30 days.
        </p>
      </div>

      {state.deletedContacts.map(contact => {
        const deletedDate = new Date(contact.deletedAt);
        const daysLeft = 30 - Math.floor((new Date() - deletedDate) / (1000 * 60 * 60 * 24));

        return (
          <div
            key={contact.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <div className="flex justify-self items-start gap-2">
              <div>
                <h3 className="font-semibold dark:text-white">
                  {contact.firstName} {contact.lastName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{contact.email}</p>
                <p className="text-gray-600 dark:text-gray-400">{contact.phone}</p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                  Will be deleted in {daysLeft} days
                </p>
              </div>
              <button
                onClick={() => handleRestore(contact)}
                className="px-4 py-2 bg-teal-500 dark:text-white rounded hover:bg-teal-600 "
              >
                Restore
              </button>
              <button
                onClick={() => handleDelete(contact)}
                className="px-4 py-2 bg-red-500 dark:text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}

      {state.deletedContacts.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No deleted contacts
        </div>
      )}
    </div>
  );
}