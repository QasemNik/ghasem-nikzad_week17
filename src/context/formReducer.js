const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  image: '',
  errors: {},
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: '',
        },
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };
    case 'RESET_FORM':
      return initialState;
    case 'LOAD_CONTACT':
      return {
        ...state,
        ...action.contact,
        errors: {},
      };
    default:
      return state;
  }
}
export {
    initialState,formReducer
}