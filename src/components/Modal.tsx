// components/Modal.tsx
'use client'
import React, { useEffect, useState } from 'react';

const Modal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [hasClosed, setHasClosed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasClosed) {
        setIsModalVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasClosed]);

  const handleClose = () => {
    setIsModalVisible(false);
    setHasClosed(true); 
  };

  if (!isModalVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Welcome to our new website, Hilma-biocare</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
