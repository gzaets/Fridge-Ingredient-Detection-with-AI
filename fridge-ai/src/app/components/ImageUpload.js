'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ImageUpload({ onResult }) {
  // State for handling selected image, loading status, error messages, and detection results
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  // Log results to console whenever results change
  useEffect(() => {
    if (results.length > 0) {
      console.log("Detected Results: ", results);
    }
  }, [results]);

  // Handle image selection from input field
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    // Check if the file is in the correct format (JPEG or PNG)
    if (!selectedFile || !['image/jpeg', 'image/png'].includes(selectedFile.type)) {
      setError('Please upload a valid image in JPG or PNG format.');
      return;
    }

    // Reset error and update the selected image
    setError(null);
    setImage(selectedFile);
  };

  // Handle form submission for image detection
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    // Show loading spinner and reset error state
    setLoading(true);
    setError(null);

    // Prepare form data to send the image to the backend for processing
    const formData = new FormData();
    formData.append('image', image);

    try {
      // Send the image to the backend API (replace '/api/detect_with_aws' with your own endpoint)
      const response = await axios.post('/api/detect_with_aws', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Check if the response contains ingredients and update the results state
      if (response.data && response.data.ingredients) {
        setResults(response.data.ingredients);
        onResult(response.data.ingredients); // Trigger parent callback with results
      } else {
        setError('Invalid data received from the server');
      }
    } catch (error) {
      // Display an error message if the request fails
      setError('Error detecting ingredients. Please try again.');
    } finally {
      // Hide the loading spinner
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center relative">
      
      {/* "By Georgy Zaets" text displayed at the top-right corner */}
      <div className="absolute top-4 right-4 text-silver-300 text-2xl font-bold tracking-widest text-right shadow-lg reflection-effect cyberpunk-font">
        By Georgy Zaets
      </div>

      {/* Form for file input and detection */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-black p-4 rounded-lg shadow-md text-white max-w-sm">
        
        {/* Input field for choosing an image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={`block w-full text-sm text-gray-500
            file:mr-4 file:py-1 file:px-2
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100`}
        />

        {/* Submit button to trigger the detection process */}
        <button
          type="submit"
          disabled={!image || loading}  // Disabled if no image is selected or detection is in progress
          className="px-4 py-2 rounded-full bg-transparent text-neon-green font-orbitron text-2xl border border-neon-green shadow-lg hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-neon-green disabled:opacity-50 transition-transform transform hover:scale-105"
        >
          {loading ? 'Detecting...' : 'Detect Ingredients'}
        </button>

        {/* Error message display */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Loading spinner while detection is in progress */}
        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-blue-500">Processing your image, please wait...</p>
          </div>
        )}

        {/* Display the detected results */}
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
