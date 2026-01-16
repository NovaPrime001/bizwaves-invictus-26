
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[70] p-4" onClick={onClose}>
      <div className="bg-[#020624] border border-red-500/50 rounded-lg shadow-2xl shadow-red-500/10 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <h3 className="font-orbitron text-xl font-bold text-white">{title}</h3>
          <p className="mt-2 text-gray-300">{message}</p>
        </div>
        <div className="bg-black/30 px-6 py-3 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="font-semibold text-sm border-2 border-gray-500 text-gray-300 px-4 py-2 rounded-md transition-all duration-300 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="font-semibold text-sm bg-red-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_10px_rgba(255,0,0,0.5)]"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
