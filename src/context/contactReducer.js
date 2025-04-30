const initialState = {
  contacts: JSON.parse(localStorage.getItem('contacts')) || [],
  deletedContacts: JSON.parse(localStorage.getItem('deletedContacts')) || [],
 
  selectedContacts: [],
  searchTerm: '',
  darkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
};

function contactReducer(state, action) {
  switch (action.type) {
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, { ...action.payload }],
      };
   
    case 'DELETE_CONTACT': {
      const contactToDelete = state.contacts.find(c => c.id === action.payload);
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload),
        deletedContacts: [
          ...state.deletedContacts,
          { ...contactToDelete, deletedAt: new Date().toISOString() },
        ],
      };
    }
    case 'RESTORE_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
            deletedContacts: state.deletedContacts.filter(c => c.id !== action.payload.id),
      };
    case 'PERMANENTLY_DELETE_CONTACT':
      return {
        ...state,
        deletedContacts: state.deletedContacts.filter(c => c.id !== action.payload.id),
        contact: []
      }
    case 'DELETE_SELECTED': {
      const contactsToDelete = state.contacts.filter(c =>
        state.selectedContacts.includes(c.id)
      );
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => !state.selectedContacts.includes(contact.id)
        ),
        deletedContacts: [
          ...state.deletedContacts,
          ...contactsToDelete.map(c => ({
            ...c,
            deletedAt: new Date().toISOString(),
          })),
        ],
        selectedContacts: [],
      };
    }
    case 'TOGGLE_SELECT':
      return {
        ...state,
        selectedContacts: state.selectedContacts.includes(action.payload)
          ? state.selectedContacts.filter(id => id !== action.payload)
          : [...state.selectedContacts, action.payload],
      };
    case 'SELECT_ALL':
      return {
        ...state,
        selectedContacts: state.contacts.map(contact => contact.id),
      };
    case 'DESELECT_ALL':
      return {
        ...state,
        selectedContacts: [],
      };
    case 'SET_SEARCH':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(c => c.id === action.payload.id ?
          { ...c, ...action.payload } : c)
      }
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
}

export { contactReducer, initialState };
