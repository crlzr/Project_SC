import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import StarIcon from '@mui/icons-material/Star';
import SearchBar from "./SearchBar";

const SearchResults = () => {
  const location = useLocation();
  const initialResults = location.state?.results || [];
  const [results, setResults] = useState(initialResults); // Use state for results

  // This function will be passed to the SearchBar to handle new searches
  const handleSearch = (newResults) => {
    setResults(newResults); // Update the results state with new search results
  };

  console.log('Search Results:', results);

  return (
    <div className="Category-items-container">
      {/* SearchBar now allows users to search again */}
      <SearchBar onSearch={handleSearch} /> {/* Pass the handleSearch function */}
      <h2>Search Results</h2>
      {results.length === 0 ? (
        <p>No items found. Try searching again!</p>
      ) : (
        <div className="items-container">
          {results.map((item) => (
            <Card sx={{ maxWidth: 345, margin: '20px' }} key={item.Item_id} className="category-items-card">
              <Link to={`/category/${item.category}/${item.Item_id}`} className="no-undies">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    className="item-image"
                    height="140"
                    image={item.Image_url}
                    alt={item.Item_name}
                  />
                  <CardContent>
                    <h3 className="item-header">{item.Item_name}</h3>
                    <div className="renter-container">
                      <div className="renter-info">
                        <img
                          src={item.Profile_pic}
                          alt="Renter Profile"
                          className="renter-profile-pic"
                        />
                        <div className="renter-details">
                          <p className="renter-full-name">{item.Renter_name}</p>
                          <div className="rating-container">
                            <p className="renter-rating">{item.Rating}</p>
                            <StarIcon className="star-icon" alt="star-icon" />
                          </div>
                        </div>
                      </div>
                      <p className="search-result-price">${item.Price_per_day} per day</p>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
