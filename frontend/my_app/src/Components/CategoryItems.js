import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import to access the category name from the URL
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import StarIcon from '@mui/icons-material/Star';
import '../index.css'; // Assuming your custom CSS is here

const CategoryItems = () => {
  const { category_name } = useParams(); // Get the category name from the URL
  const [items, setItems] = useState([]);

  const fetchCategoryItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5007/${category_name}`); // Fetch items by category
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchCategoryItems();
  }, [category_name]); // Re-fetch if category_name changes

  return (
    <div className="Category-items-container">
      <h1 className="Category-items-title">Items in {category_name}</h1>
      <div className="items-container">
        {items.length > 0 ? (
          items.map(item => (
            <Card sx={{ maxWidth: 345, margin: '20px' }} key={item.Item_id} className="category-items-card">
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
                  <div className="rating-container">
                    <StarIcon className="star-icon" alt="star-icon" />
                    <p className="renter-rating"> {item.Rating}</p> {/* Add rating instead */}
                  </div>
                  <p className="item-price">Price: ${item.Price_per_day} per day</p>
                  {/* <img src={item.Image_url} alt={item.Item_name} /> */}
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <p>No items found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryItems;