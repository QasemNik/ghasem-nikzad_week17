import { FaCamera, FaUser } from 'react-icons/fa';

export default function ContactImageUpload({ image, onImageChange, fileInputRef, onButtonClick }) {
    return (
        <div className="flex justify-center mb-6">
            <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {image ? (
                        <img
                            src={image}
                            alt="Contact"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                            <div
                                className="w-full h-full flex items-center justify-center">
                                <FaUser
                                    className="w-16 h-16 text-gray-400" />
                        </div>
                    )}
                </div>
                <button
                    type="button"
                    onClick={onButtonClick}
                    className="absolute bottom-0 right-0 bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600"
                >
                    <FaCamera />
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                    className="hidden"
                />
            </div>
        </div>
    );
}
