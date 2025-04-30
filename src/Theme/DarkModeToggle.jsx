import React from 'react'
import { useContacts } from '../context/ContactContext';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function DarkModeToggle() {
    const { state, dispatch } = useContacts();
    return (
        <button
            onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            className="fixed bottom-4 left-4 p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-lg"
        >
            {state.darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
        </button>
    );
}

