import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';
import LogoLoader from './LogoLoader'; // Import your LogoLoader component
import '../index.css'; // Assuming your custom CSS is here

const Categories = () => {
  // State to hold categories data and loading state
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  // Function to fetch categories from the API
  const fetchCategories = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get('http://localhost:5006/'); // Adjust the endpoint accordingly
      setCategories(response.data); // Set the categories data
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching is complete
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []); // Empty dependency array ensures this only runs once

  return (
    <>
      <h1 className="categories-title">Categories</h1>
      {loading ? ( // Show loader while loading
        <LogoLoader />
      ) : (
        <div className="categories-container">
          {categories.map((category) => (
            <Card sx={{ maxWidth: 345, margin: '20px' }} key={category.ID} className="category-card">
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
                    <h3>{category.Name}</h3>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default Categories;
