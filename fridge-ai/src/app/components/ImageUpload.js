'use client'

import { useState } from 'react';
import axios from 'axios';

export default function ImageUpload({ onResult }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('/api/detect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setResults(response.data.ingredients);
      onResult(response.data.ingredients);
    } catch (error) {
      setError('Error detecting ingredients. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Group and calculate count and average confidence for each item type
  const groupAndCalculateResults = (results) => {
    const groupedResults = {};

    results.forEach((item) => {
      const label = item.label.charAt(0).toUpperCase() + item.label.slice(1); // Capitalize the first letter of each label
      if (!groupedResults[label]) {
        groupedResults[label] = { count: 0, totalConfidence: 0 };
      }
      groupedResults[label].count += 1;
      groupedResults[label].totalConfidence += item.confidence;
    });

    // Convert the grouped object into an array with average confidence
    const processedResults = Object.entries(groupedResults).map(([label, data]) => ({
      label,
      count: data.count,
      averageConfidence: (data.totalConfidence / data.count) * 100,  // Convert to percentage
    }));

    // Sort by label alphabetically for better readability (optional)
    return processedResults.sort((a, b) => a.label.localeCompare(b.label));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Detecting...' : 'Detect Ingredients'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        {results.length > 0 && (
          <ul>
            {groupAndCalculateResults(results).map((result, index) => (
              <li key={index}>
                {result.label}: Count: {result.count}, Average Confidence: {result.averageConfidence.toFixed(1)}%
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
