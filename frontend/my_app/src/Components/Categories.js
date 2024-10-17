import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';
import HomepageLoader from './HomepageLoader'; // Import your LogoLoader component
import '../index.css'; // Assuming your custom CSS is here

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    const delay = new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const response = await axios.get('http://localhost:5004/');
      await Promise.all([delay, setCategories(response.data)]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {loading ? (
        <HomepageLoader />
      ) : (
        <>
          <h2 className="categories-title">Categories</h2>
          <div className="categories-container">
            {categories.map((category) => (
              <Card
                sx={{ maxWidth: 345, margin: '20px', position: 'relative', overflow: 'hidden' }}
                key={category.ID}
                className="category-card"
              >
                <CardActionArea>
                  <Link to={`/category/${category.Name}`} className="no-undies">
                    <CardMedia
                      component="img"
                      className="category-image"
                      height="140"
                      image={category.Category_pic}
                      alt={category.Name}
                    />
                    <div className="category-overlay">
                      <h4 className="h4-category">{category.Name}</h4>
                    </div>
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
