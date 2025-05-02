import { useEffect, useRef } from 'react';
import { useContactForm } from '../hooks/useContactForm';
import ImageUpload from './ImageUpload';
import InputField from './InputField';
import { useContacts } from '../context/ContactContext';
import { handleImageChange } from '../helper/handleImageChange';
import contactData from '../helper/contactData';

export default function ContactForm({ contact, onClose }) {
  const { dispatch } = useContacts();
  const { formData, setField, validateForm, resetForm, loadContact } = useContactForm();
  const firstNameRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (contact) {
      loadContact(contact);
    }
    firstNameRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const contactsData = contactData(formData, contact)

    dispatch({
      type: contact ? 'UPDATE_CONTACT' : 'ADD_CONTACT',
      payload: { ...contactsData, id: contact ? contact.id : Date.now().toString() },
    });

    resetForm();
    onClose();
  };


  return (
    <form onSubmit={handleSubmit}
      className="space-y-4">
      <ImageUpload
        image={formData.image}
        onImageChange={handleImageChange(setField)}
        fileInputRef={fileInputRef}
        onButtonClick={() => fileInputRef.current?.click()}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="John"
          onChange={(e) => setField('firstName', e.target.value)}
          error={formData.errors.firstName}
          inputRef={firstNameRef}
        />
        <InputField
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Doe"
          onChange={(e) => setField('lastName', e.target.value)}
          error={formData.errors.lastName}
        />
      </div>

      <InputField
        type="email"
        name="email"
        value={formData.email}
        placeholder="exmaple@mail.com"
        onChange={(e) => setField('email', e.target.value)}
        error={formData.errors.email}
      />

      <InputField
        type="tel"
        name="phone"
        value={formData.phone}
        placeholder="+98"
        onChange={(e) => setField('phone', e.target.value)}
        error={formData.errors.phone}
      />

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-600 dark:bg-teal-900 dark:hover:bg-teal-800"
        >
          {contact ? 'Update' : 'Add'} Contact
        </button>
      </div>
    </form>
  );
}