export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-32  flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-700 rounded-lg md:p-6 p-9 md:w-full max-w-md shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="sm:text-xl md:font-semibold dark:text-amber-50">{title}</h2>
          <button
            onClick={onClose}
            className="text-red-500 font-bold cursor-pointer"
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}