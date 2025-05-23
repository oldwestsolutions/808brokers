import React from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get('q') || '';

  return (
    <div className="search-results-page" style={{ padding: '2rem', color: '#fff' }}>
      <h1>Search Results</h1>
      <p>Showing results for: <strong>{searchTerm}</strong></p>
      {/* Placeholder for actual search results */}
      <div className="results-placeholder">
        <p>No results yet. (Implement your search logic here!)</p>
      </div>
    </div>
  );
};

export default SearchResults; 