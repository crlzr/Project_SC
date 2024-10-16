import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom'; // Import useLocation to retrieve state

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import StarIcon from '@mui/icons-material/Star';

const SearchResults = () => {
  const { category_name } = useParams(); // Get the category name from the URL
  const location = useLocation();
  const results = location.state?.results || []; // Safely get results from state

  console.log('Search Results:', results);

  return (
    <div className="Category-items-container">
      <h2>Search Results</h2>
      {results.length === 0 ? (
        <p>No items found</p>
      ) : (
        <div className="items-container">
          {results.map((item) => (
            <Card sx={{ maxWidth: 345, margin: '20px' }} key={item.Item_id} className="category-items-card">
            <Link to={`/category/${category_name}/${item.Item_id}`} className="no-undies"> {/* Link to item details */}
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
                          <p className="renter-rating"> {item.Rating}</p> {/* Add rating instead */}
                          <StarIcon className="star-icon" alt="star-icon" />
                        </div>
                      </div>
                    </div>
                    <p className="item-price">Price: ${item.Price_per_day} per day</p>
                    {/* <img src={item.Image_url} alt={item.Item_name} /> */}
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