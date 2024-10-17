import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HomepageLoader from './HomepageLoader'; // Import your loader component
import '../index.css'; // Assuming your custom CSS is here

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    const delay = new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
    try {
      const response = await axios.get('http://localhost:5005/');
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
          <div className="categories-grid"> {/* Updated container class */}
            {categories.map((category) => (
              <div key={category.ID} className="category-tile"> {/* Each tile */}
                <Link to={`/category/${category.Name}`} className="no-undies">
                  <img
                    src={category.Category_pic}
                    alt={category.Name}
                    className="category-tile-image"
                  />
                  <div className="category-tile-content">
                    <h4>{category.Name}</h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Categories;
