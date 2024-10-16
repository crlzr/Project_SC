import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to retrieve state

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || []; // Safely get results from state

  console.log('Search Results:', results);

  return (
    <div>
      <h2>Search Results</h2>
      {results.length === 0 ? (
        <p>No items found</p>
      ) : (
        <ul>
          {results.map((item) => (
            <li key={item.Item_id}>
              <h3>{item.Item_name}</h3>
              <p>{item.Description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;