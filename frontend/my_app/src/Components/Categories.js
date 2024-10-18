import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import Font Awesome Icon component
import { faBabyCarriage, faLaptop, faTools, faCouch, faFilm, faHeartbeat, faMountain, faTshirt } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
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

  // Mapping category names to Font Awesome icons
  const iconMap = {
    "Baby & Kids": faBabyCarriage, // Baby & Kids category
    "Electronics": faLaptop, // Electronics category
    "Tools & Equipment": faTools, // Tools & Equipment category
    "Furniture": faCouch, // Furniture category
    "Entertainment": faFilm, // Entertainment category
    "Health & Fitness": faHeartbeat, // Health & Fitness category
    "Outdoor": faMountain, // Outdoor category
    "Clothes": faTshirt, // Clothes category
  };

  return (
    <>
      {loading ? (
        <HomepageLoader />
      ) : (
        <>
          <h2 className="categories-title">Categories</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <div key={category.ID} className="category-tile">
                <Link to={`/category/${category.Name}`} className="no-undies">
                  <FontAwesomeIcon
                    icon={iconMap[category.Name] || faBabyCarriage} // Use mapped icon or default to faBaby
                    size="3x" // Set icon size
                    className="category-tile-icon" // Add a class for styling
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
