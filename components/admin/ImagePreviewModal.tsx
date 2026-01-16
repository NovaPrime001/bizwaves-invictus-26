
import React from 'react';

interface Props {
  imageUrl: string;
  imageName: string;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<Props> = ({ imageUrl, imageName, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-[60] p-4" onClick={onClose}>
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-transparent p-4 rounded-lg flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt={imageName} className="max-w-full max-h-full object-contain rounded-lg" />
        <button onClick={onClose} className="absolute top-4 right-16 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors z-10" title="Close">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <a href={imageUrl} download={imageName} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors z-10" title="Download Image">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
        </a>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
