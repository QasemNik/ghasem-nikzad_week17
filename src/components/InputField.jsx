export default function ContactInputField({ type, name, value, placeholder, onChange, error, inputRef }) {
    return (
        <div>
            <input
                ref={inputRef}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full p-2 border focus:outline-teal-400/8 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
}
