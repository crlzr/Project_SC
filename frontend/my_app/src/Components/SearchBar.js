import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);  // To handle errors
  const [loading, setLoading] = useState(false);  // To show a loading state
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!query) return;  // Prevent empty search
    setLoading(true);
    setError(null);
    try {
      // Replace 'http://localhost:5004' with your actual API URL
      const response = await fetch(`http://localhost:5005/item/search?q=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      onSearch(data);  // Pass the fetched results back to the parent (App.js)
      navigate(`/search?query=${query}`, { state: { results: data } });
    } catch (err) {
      setError(err.message);  // Set error state if the request fails
    } finally {
      setLoading(false);  // Stop loading state after the fetch is complete
    }
  };
  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {/* Show error message if there's an error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
export default SearchBar;