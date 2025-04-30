import { useState } from 'react';
import { useContacts } from '../context/ContactContext';
import Modal from './Modal';
import ContactForm from './ContactForm';
import { FaEdit, FaTrash, FaUser, FaCheck, FaTimes } from 'react-icons/fa';
import { filterContacts } from '../helper/filterContacts';

export default function ContactList() {
  const { state, dispatch } = useContacts();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);

  const filteredContacts = filterContacts(state.contacts, state.searchTerm);

  const handleEdit = (contact) => {
    setContactToEdit(contact);
    setIsFormModalOpen(true);
  };

  const handleDelete = (contact) => {
    setContactToDelete(contact);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSelected = () => {
    setContactToDelete(null);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      dispatch({ type: 'DELETE_CONTACT', payload: contactToDelete.id });
    } else {
      dispatch({ type: 'DELETE_SELECTED' });
    }
    setIsDeleteModalOpen(false);
    setContactToDelete(null);
  };

  const toggleSelectAll = () => {
    if (state.selectedContacts.length === filteredContacts.length && filteredContacts.length > 0) {
      dispatch({ type: 'DESELECT_ALL' });
    } else {
      dispatch({ type: 'SELECT_ALL' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={toggleSelectAll}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-500/20 shadow dark:bg-teal-700 rounded-lg hover:bg-teal-500/15 dark:hover:bg-teal-600 dark:shadow-lime-50/20"
        >
          {state.selectedContacts.length === filteredContacts.length && filteredContacts.length > 0 ? (
            <>
              <FaTimes className="text-primary-600 dark:text-primary-400" />
              <span>Deselect All</span>
            </>
          ) : (
            <>
              <FaCheck className="text-primary-600 dark:text-primary-400" />
              <span>Select All</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className={`contactList ${state.selectedContacts.includes(contact.id)
              ? 'contactListBox'
              : 'contactListSelected'
              }`}
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={state.selectedContacts.includes(contact.id)}
                    onChange={() => dispatch({ type: 'TOGGLE_SELECT', payload: contact.id })}
                    className="h-4 w-4 text-primary-600 rounded"
                  />
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                    {contact.image ? (
                      <img
                        src={contact.image}
                        alt={`${contact.firstName} ${contact.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaUser className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className='-space-x-2 w-3 '>
                    <h3 className="font-semibold dark:text-gray-100 w-32 truncate">
                      {contact.firstName} {contact.lastName}
                    </h3>
                    <div className="">
                      <p className="text-gray-400 w-40 truncate ">{contact.email}</p>
                      <p className="text-gray-400">{contact.phone}</p>

                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEdit(contact)}
                    className="p-2 text-teal-700 dark:text-teal-900 cursor-pointer"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(contact)}
                    className="md:p-2 text--600 hover:text-red-600/72 dark:text-red-400 dark:hover:text-red-400/85 cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {state.selectedContacts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-10">
          <button
            onClick={handleDeleteSelected}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer shadow-lg"
          >
            Delete Selected ({state.selectedContacts.length})
          </button>
        </div>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={contactToDelete ? 'Confirm Delete' : 'Confirm Bulk Delete'}
      >
        <div className="space-y-4">
          <p className="dark:text-white wrap-break-word">
            {contactToDelete
              ? 'Are you sure you want to delete this contact?'
              : `Are you sure you want to delete
               ${state.selectedContacts.length} 
               selected contacts?`}
          </p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setContactToEdit(null);
        }}
        title={contactToEdit ? 'Edit Contact' : 'Add Contact'}
      >
        <ContactForm
          contact={contactToEdit}
          onClose={() => {
            setIsFormModalOpen(false);
            setContactToEdit(null);
          }}
        />
      </Modal>
    </div>
  );
}
