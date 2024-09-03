"use client";
import { useState } from 'react';

const UploadOrderTracking = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-order-tracking', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setStatus('File uploaded and orders updated successfully!');
      } else {
        setStatus(result.error || 'An error occurred.');
      }
    } catch (error) {
      console.log(error);
      setStatus('An error occurred during the upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">Upload Order Tracking IDs</h1>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2 mb-4"
        disabled={loading}
      />
      <button
        onClick={handleUpload}
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {status && (
        <p className={`mt-4 text-center ${status.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
          {status}
        </p>
      )}
    </div>
  );
};

export default UploadOrderTracking;
