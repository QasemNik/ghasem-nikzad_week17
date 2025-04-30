import { useReducer } from 'react';
import { formReducer, initialState } from '../context/formReducer';

export function useContactForm(initialContact) {
  const [state, dispatch] = useReducer(formReducer, initialContact || initialState);

  const validateForm = () => {
    const errors = {};

    // First name validation
    if (!state.firstName?.trim()) {
      errors.firstName = 'First name is required';
    }

    // Last name validation
    if (!state.lastName?.trim()) {
      errors.lastName = 'Last name is required';
    }

    // Email validation
    if (!state.email?.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(state.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (!state.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else {
      const phoneDigits = state.phone.replace(/\D/g, ''); 
      const phoneRegex = /(?:\+98|98|0)?9\d{9}$/; 

      if (!phoneRegex.test(phoneDigits)) {
        errors.phone = 'Phone number is not valid';
      }
    }

    dispatch({ type: 'SET_ERRORS', errors });
    return Object.keys(errors).length === 0;
  };

  const setField = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const loadContact = (contact) => {
    dispatch({ type: 'LOAD_CONTACT', contact });
  };

  return {
    formData: state,
    setField,
    validateForm,
    resetForm,
    loadContact,
  };
}
