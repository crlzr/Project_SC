import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';
import HomepageLoader from './HomepageLoader'; // Import your LogoLoader component
import '../index.css'; // Assuming your custom CSS is here

const Categories = () => {
  // State to hold categories data and loading state
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  const fetchCategories = async () => {
    const delay = new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
    try {
      const response = await axios.get('http://localhost:5005/');

      // Ensure both API fetching and 5 seconds delay are completed before proceeding
      await Promise.all([delay, setCategories(response.data)]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false); // Set loading to false after both tasks finish
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []); // Empty dependency array ensures this only runs once

  return (
    <>
      {loading ? ( // Show loader while loading
        <HomepageLoader />
      ) : (
        <>
        <h2 className="categories-title">Categories</h2>
        <div className="categories-container">
          {categories.map((category) => (
            <Card sx={{ maxWidth: 345, margin: '20px', height: '360px' }} key={category.ID} className="category-card">
              <CardActionArea>
                <Link to={`/category/${category.Name}`} className="no-undies"> {/* Link to category items page */}
                  <CardMedia
                    component="img"
                    className="category-image"
                    height="140"
                    image={category.Category_pic}
                    alt={category.Name}
                  />
                  <CardContent>
                    <h4 className="h4-category">{category.Name}</h4>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          ))}
        </div>
        </>
      )}
    </>
  );
};

export default Categories;
