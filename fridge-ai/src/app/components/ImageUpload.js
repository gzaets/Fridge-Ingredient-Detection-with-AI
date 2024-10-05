'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ImageUpload({ onResult }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (results.length > 0) {
      console.log("Detected Results: ", results);
    }
  }, [results]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    // Check if the file is in the correct format (JPEG or PNG)
    if (!selectedFile || !['image/jpeg', 'image/png'].includes(selectedFile.type)) {
      setError('Please upload a valid image in JPG or PNG format.');
      return;
    }

    setError(null);
    setImage(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('/api/detect_with_aws', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data && response.data.ingredients) {
        setResults(response.data.ingredients);
        onResult(response.data.ingredients);
      } else {
        setError('Invalid data received from the server');
      }
    } catch (error) {
      setError('Error detecting ingredients. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center relative">
      
      {/* Stylized Title */}
      <div className="absolute top-4 right-4 text-silver-300 text-2xl font-bold tracking-widest text-right shadow-lg reflection-effect">
        fridge ai <br /> by Georgy Zaets
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-black p-8 rounded-lg shadow-md text-white">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        <button
          type="submit"
          disabled={!image || loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
        >
          {loading ? 'Detecting...' : 'Detect Ingredients'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-blue-500">Processing your image, please wait...</p>
          </div>
        )}
        <div className="mt-4">
          {results.length > 0 && (
            <ul>
              {results.map((result, index) => (
                <li key={index}>
                  {result.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
}
