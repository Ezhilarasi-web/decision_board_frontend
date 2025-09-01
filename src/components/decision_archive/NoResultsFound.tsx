import React from "react";

interface NoResultsFoundProps {
  searchTerm: string;
  onClearSearch: () => void;
}

/**
 * Component shown when no search results are found
 */
const NoResultsFound: React.FC<NoResultsFoundProps> = ({ searchTerm, onClearSearch }) => (
  <div className="text-center py-8">
    <p className="text-gray-500">No decisions found matching "{searchTerm}".</p>
    <button
      className="mt-2 text-indigo-600 hover:text-indigo-800"
      onClick={onClearSearch}
    >
      Clear search
    </button>
  </div>
);

export default NoResultsFound;