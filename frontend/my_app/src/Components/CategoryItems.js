import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import to access the category name from the URL
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import StarIcon from '@mui/icons-material/Star';
import '../index.css'; // Assuming your custom CSS is here
import { getUserLocation } from '../Location';
import LogoLoader from './LogoLoader'; // Import your LogoLoader component
import { Select, MenuItem } from '@mui/material';

// distance calculator for all items
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};


const CategoryItems = () => {
  const { category_name } = useParams(); // Get the category name from the URL
  const [items, setItems] = useState([]);
  const [userAddress, setUserAddress] = useState({});
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [sortOption, setSortOption] = useState('name');


  useEffect(() => {
    // fetchCategoryItems();

    const fetchUserLocation = async () => {
      try {
        const location = await getUserLocation();
        console.log('User location:', location); // Debugging log
        setUserAddress({
          latitude: location.latitude,
          longitude: location.longitude,
          // || { street: 'Unknown', city: 'Unknown', state: 'Unknown', postcode: '' }
          ...location.address});
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    };

    fetchUserLocation(); // Call the async function to get user location
    //fetchCategoryItems
  }, []);

   // sorting filters
  //Sorting Options
  const sortItems = useCallback((items) => {
    switch (sortOption) {
      case 'name':
        return [...items].sort((a, b) => a.Item_name.localeCompare(b.Item_name));
      case 'name-desc':
        return [...items].sort((a, b) => b.Item_name.localeCompare(a.Item_name));
      case 'price':
        return [...items].sort((a, b) => a.Price_per_day - b.Price_per_day);
      case 'price-desc':
        return [...items].sort((a, b) => b.Price_per_day - a.Price_per_day);
      case 'distance':
        return [...items].sort((a, b) => a.distance - b.distance);
      case 'distance-desc':
        return [...items].sort((a, b) => b.distance - a.distance);
      default:
        return items;
    }
  }, [sortOption]); // Add 'sortOption' as a dependency




  const fetchCategoryItems = useCallback(async () => {
    setLoading(true);
    try {
      // const response = await axios.get(`http://localhost:5005/${category_name}`);
      const response = await axios.get(`https://project-sc.onrender.com/${category_name}`);
      console.log('API Response:', response.data);

      const fetchedItems = response.data;

      // Calculate distance for each item if userAddress has latitude and longitude
      if (userAddress.latitude && userAddress.longitude) {
         const updatedItems = fetchedItems.map(item => {
            console.log('Item:', item); // Should log an item object
            const distance = calculateDistance(
               userAddress.latitude,
               userAddress.longitude,
               item.renter_latitude,
               item.renter_longitude
            );
            return { ...item, distance }; // Add distance to each item
         });
         setItems(sortItems(updatedItems));  // Set the updated items with distance
      } else {
         setItems(sortItems(fetchedItems));  // Set items without distance if no user location yet
      }
      console.log(fetchedItems); // Should log an array of items
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  // }, [category_name, userAddress]);
  }, [category_name, userAddress, sortItems]);




  // Fetch Category Items after user location is set
  // useEffect(() => {
  //   if (userAddress.latitude && userAddress.longitude) {
  //     fetchCategoryItems();
  //   }
  // }, [fetchCategoryItems, userAddress]);

  // useEffect(() => {
  //   // fetchCategoryItems();

  //   const fetchUserLocation = async () => {
  //     try {
  //       const location = await getUserLocation();
  //       console.log('User location:', location); // Debugging log
  //       setUserAddress({
  //         latitude: location.latitude,
  //         longitude: location.longitude,
  //         // || { street: 'Unknown', city: 'Unknown', state: 'Unknown', postcode: '' }
  //         ...location.address});
  //     } catch (error) {
  //       console.error('Error getting user location:', error);
  //     }
  //   };

  //   fetchUserLocation(); // Call the async function to get user location
  //   //fetchCategoryItems
  // }, []);

  useEffect(() => {
    if (userAddress.latitude && userAddress.longitude) {
       fetchCategoryItems();
    }
 }, [fetchCategoryItems, userAddress]);


  if (loading) {
    return <LogoLoader />; // Show loader while loading
  }



  return (
    <div className="Category-items-container">
      <div className="sort-selector">
          <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)} label="Sort By">
            <MenuItem value="name">Name (A-Z)</MenuItem>
            <MenuItem value="name-desc">Name (Z-A)</MenuItem>
            <MenuItem value="price">Price (Low to High)</MenuItem>
            <MenuItem value="price-desc">Price (High to Low)</MenuItem>
            <MenuItem value="distance">Distance (Closest)</MenuItem>
            <MenuItem value="distance-desc">Distance (Furthest)</MenuItem>
          </Select>
        {/* <p>Sorted by: {sortOption}</p> */}
      </div>
      <div className="Category-items-title-address-container">
        <h1 className="Category-items-title">Items in {category_name}</h1>
        {userAddress && (
          <p className="user-address">
            {userAddress.street}, {userAddress.city}, {userAddress.state} {userAddress.postcode}
          </p>
        )}{/* Display user's address */}
      </div>
      <div className="items-container">
        {items.length > 0 ? (
          items.map(item => (
            <Card sx={{}} key={item.Item_id} className="category-items-card">
              <Link to={`/category/${category_name}/${item.Item_id}`} className="no-undies"> {/* Link to item details */}
                <CardActionArea>
                  <CardMedia
                      component="img"
                      className="item-image"
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
                      <p className="item-price">${item.Price_per_day} per day</p>
                      <p className='distance-info'>
                        {item.distance ? `${item.distance.toFixed(1)} km away` : 'Distance not available'}
                      </p>
                      {/* <img src={item.Image_url} alt={item.Item_name} /> */}
                    </div>
                  </CardContent>
                </CardActionArea>
              </Link>
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
