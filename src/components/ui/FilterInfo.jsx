import React from 'react';

const FilterInfo = ({ isOpen, onClose, filterInfo }) => {
  if (!isOpen || !filterInfo) return null;

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-100">{filterInfo.title || 'Filter Information'}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="prose prose-sm">
          {filterInfo.description && (
            <p className="text-gray-300 mb-4">{filterInfo.description}</p>
          )}
          {filterInfo.usage && (
            <>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Usage:</h4>
              <p className="text-gray-300 mb-4">{filterInfo.usage}</p>
            </>
          )}
          {filterInfo.parameters && (
            <>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Parameters:</h4>
              <ul className="list-disc list-inside text-gray-300">
                {Object.entries(filterInfo.parameters).map(([key, value]) => (
                  <li key={key} className="mb-1">
                    <span className="font-medium">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterInfo; 