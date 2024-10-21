import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import StarIcon from '@mui/icons-material/Star';
import SearchBar from "./SearchBar";
import axios from 'axios';

const SearchResults = () => {
  const { category_name, itemId } = useParams();
  const location = useLocation();
  const initialResults = location.state?.results || [];
  const [results, setResults] = useState(initialResults); // Use state for results
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [item, setItem] = useState(null);

  const handleSearch = (newResults) => {
    setResults(newResults); // Update the results state
  };

  console.log('Search Results:', results);

  
  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5005/${category_name}/${itemId}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();

    return () => {
      // Cleanup any potential ongoing fetches or subscriptions
      setItem(null);
    };
  }, [category_name, itemId]);

  return (
    <div className="Category-items-container">
      <SearchBar onSearch={handleSearch} /> {/* Pass the handleSearch function */}
      <h2>Search Results</h2>
      {results.length === 0 ? (
        <p>No items found</p>
      ) : (
        <div className="items-container">
          {results.map((item) => (
            <Card sx={{ maxWidth: 345, margin: '20px' }} key={item.Item_id} className="category-items-card">
              <Link to={`/category/${category_name}/${item.Item_id}`} className="no-undies">
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
                      <p className="item-price">Price: ${item.Price_per_day} per day</p>
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
