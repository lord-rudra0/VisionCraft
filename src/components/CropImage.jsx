import React, { useState } from 'react';
import { cropImage } from '../api/imageService'; // Import the API function

const CropImage = () => {
  const [filename, setFilename] = useState('');
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [right, setRight] = useState(100);
  const [bottom, setBottom] = useState(100);
  const [croppedImage, setCroppedImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCrop = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await cropImage(filename, left, top, right, bottom);
      setCroppedImage(`data:image/jpeg;base64,${data.image}`);
    } catch (err) {
      setError(err.message || 'Crop failed');
      console.error('Crop failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-800 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-semibold mb-6">Crop Image</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="filename">
          Filename:
        </label>
        <input
          type="text"
          id="filename"
          placeholder="Enter filename"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="left">
            Left:
          </label>
          <input
            type="number"
            id="left"
            placeholder="Left coordinate"
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="top">
            Top:
          </label>
          <input
            type="number"
            id="top"
            placeholder="Top coordinate"
            value={top}
            onChange={(e) => setTop(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="right">
            Right:
          </label>
          <input
            type="number"
            id="right"
            placeholder="Right coordinate"
            value={right}
            onChange={(e) => setRight(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="bottom">
            Bottom:
          </label>
          <input
            type="number"
            id="bottom"
            placeholder="Bottom coordinate"
            value={bottom}
            onChange={(e) => setBottom(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
          />
        </div>
      </div>

      <button
        onClick={handleCrop}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        {loading ? 'Cropping...' : 'Crop'}
      </button>

      {croppedImage && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Cropped Image:</h3>
          <img src={croppedImage} alt="Cropped" className="max-w-full rounded-lg shadow-md" />
        </div>
      )}
    </div>
  );
};

export default CropImage; 