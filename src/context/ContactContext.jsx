import { createContext, useContext, useReducer, useEffect } from 'react';
import { contactReducer, initialState } from './contactReducer';

const ContactContext = createContext();

export function ContactProvider({ children }) {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
    localStorage.setItem('deletedContacts', JSON.stringify(state.deletedContacts));
    localStorage.setItem('darkMode', JSON.stringify(state.darkMode));

    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.contacts, state.deletedContacts, state.darkMode]);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContacts() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('Something went wrong');
  }
  return context;
}