import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5004/item/search?q=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      console.log("Fetched Data:", data);
      onSearch(data);
      navigate(`/search?query=${query}`, { state: { results: data } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for an item..."
          />
          {/* Search Icon inside the input */}
          <div
            className="search-icon"
            onClick={loading ? null : handleSearch}
            aria-label="Search"
          >
            <SearchIcon />
          </div>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SearchBar;
