import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserLocation } from '../Location';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import StarIcon from '@mui/icons-material/Star';
import PushPinIcon from '@mui/icons-material/PushPin';
import { Select, MenuItem } from '@mui/material';
import LogoLoader from './LogoLoader';
import '../index.css';

const NearbyItems = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [nearbyItems, setNearbyItems] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('name'); // New state for sorting
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const markersRef = useRef([]);
  const { category_name } = useParams();
  const [radius, setRadius] = useState(5);

  mapboxgl.accessToken = process.env.REACT_APP_MB_TOKEN;

  // Step 1: Create the state abbreviation mapping
  const stateAbbreviations = {
    "New South Wales": "NSW",
    "Victoria": "VIC",
    "Queensland": "QLD",
    "Western Australia": "WA",
    "South Australia": "SA",
    "Tasmania": "TAS",
    "Northern Territory": "NT",
    "Australian Capital Territory": "ACT",
    // Add other states and territories as needed
  };

  const formatState = (state) => {
    if (!state) return '';
    return state
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
  };

  const calculateBoundingBox = (latitude, longitude, radiusKm) => {
    const earthRadiusKm = 6371; // Earth's radius in km
    const angularDistance = radiusKm / earthRadiusKm;

    // Latitude bounds
    const minLatitude = latitude - (angularDistance * (180 / Math.PI));
    const maxLatitude = latitude + (angularDistance * (180 / Math.PI));

    // Longitude bounds (need to adjust for Earth's curvature)
    const minLongitude = longitude - (angularDistance * (180 / Math.PI)) / Math.cos(latitude * Math.PI / 180);
    const maxLongitude = longitude + (angularDistance * (180 / Math.PI)) / Math.cos(latitude * Math.PI / 180);

    return [
      [minLongitude, minLatitude], // Southwest corner
      [maxLongitude, maxLatitude]  // Northeast corner
    ];
  };

  const handleRadiusSelect = (event) => {
    const selectedRadius = event.target.value;
    setRadius(selectedRadius);
    fetchItemsNearby(selectedRadius);

    // Adjust map to fit the new radius
    if (userLocation && mapRef.current) {
      const bounds = calculateBoundingBox(userLocation.latitude, userLocation.longitude, selectedRadius);
      mapRef.current.fitBounds(bounds, {
        padding: 20,
        maxZoom: 14,
      });
    }
  };

  //Sorting Options
  const sortItems = (items) => {
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
  };

  const fetchItemsNearby = useCallback(async (radius_km = radius) => {
    if (userLocation) {
      setLoading(true);
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`http://localhost:5005/items/nearby?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&radius_km=${radius_km}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch nearby items');
        }

        const data = await response.json();
        setNearbyItems(sortItems(data)); // Sort items on fetch
      } catch (error) {
        console.error('Error fetching nearby items:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [getAccessTokenSilently, userLocation, radius, sortOption]);

  useEffect(() => {
    if (userLocation && mapContainerRef.current) {
      if (!mapRef.current) {
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/standard',
          center: [userLocation.longitude, userLocation.latitude],
          zoom: 11,
        });

        const navControl = new mapboxgl.NavigationControl();
        mapRef.current.addControl(navControl, 'top-right');

        mapRef.current.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
          })
        );

        userMarkerRef.current = new mapboxgl.Marker({ color: 'red' })
          .setLngLat([userLocation.longitude, userLocation.latitude])
          .setPopup(new mapboxgl.Popup().setHTML('<h4>You are here!</h4>'))
          .addTo(mapRef.current);
      } else {
        mapRef.current.setCenter([userLocation.longitude, userLocation.latitude]);
        userMarkerRef.current.setLngLat([userLocation.longitude, userLocation.latitude]);
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [userLocation]);

  useEffect(() => {
    if (userLocation && nearbyItems.length > 0) {
      clearMarkers();
      nearbyItems.forEach(item => {
        if (item.renter_latitude && item.renter_longitude) {
          const marker = new mapboxgl.Marker()
            .setLngLat([item.renter_longitude, item.renter_latitude])
            .setPopup(new mapboxgl.Popup().setHTML(`
              <h4>${item.Item_name}</h4>
              <p>Price: $${item.Price_per_day}/day</p>
              <p>Renter: ${item.Renter_name}</p>
            `))
            .addTo(mapRef.current);
          markersRef.current.push(marker);
        }
      });
    }
  }, [userLocation, nearbyItems]);

  useEffect(() => {
    getUserLocation()
      .then(({ latitude, longitude, address }) => {
        setUserLocation({ latitude, longitude });
        setUserAddress(address || { street: 'Unknown', city: 'Unknown', state: 'Unknown', postcode: '' });
      })
      .catch((error) => {
        console.error('Error getting user location:', error);
      });
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchItemsNearby();
      const bounds = calculateBoundingBox(userLocation.latitude, userLocation.longitude, radius);
      if (mapRef.current) {
        mapRef.current.fitBounds(bounds, {
          padding: 20,
          maxZoom: 14,
        });
      }
    }
  }, [userLocation, fetchItemsNearby, radius]);

  // useEffect(() => {
  //   if (userLocation) {
  //     fetchItemsNearby();
  //   }
  // }, [userLocation, fetchItemsNearby]);

  if (!isAuthenticated) {
    return (
      <div className="login-prompt">
        <h2>Please log in to view nearby items.</h2>
        <button className="login-button" onClick={() => loginWithRedirect()}>Log In</button>
      </div>
    );
  }

  return (
    <div className="Nearby-items-map-container">
      <h2 className="Nearby-items">Nearby Items</h2>
      <div className="address-bar">
        {userAddress && (
          <p className="user-address">
            <PushPinIcon className="push-pin-icon" />
            {userAddress.street}, {userAddress.city}, {stateAbbreviations[formatState(userAddress.state)] || userAddress.state} {userAddress.postcode}
          </p>
        )}

        <div className="radius-selector">
          <Select
            value={radius}
            onChange={handleRadiusSelect}
            label="Search Radius"
          >
            <MenuItem value={5}>5 km</MenuItem>
            <MenuItem value={15}>15 km</MenuItem>
            <MenuItem value={20}>20 km</MenuItem>
          </Select>
          <p>Search radius: {radius} km</p>
        </div>
      </div>

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

      <div ref={mapContainerRef} style={{ width: '100%', height: '300px' }} className="map-container" />

      {loading ? (
        <LogoLoader />
      ) : (
        <div className="Nearby-items-container">
          {nearbyItems.length > 0 ? (
            <div className="cards-grid">
              {nearbyItems.map(item => (
                <Card sx={{ maxWidth: 345, margin: '20px' }} key={item.Item_id} className="category-items-card">
                  <Link to={`/category/${item.category}/${item.Item_id}`} className="no-undies">
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        className="Nearby-item-image"
                        height="100"
                        image={item.Image_url}
                        alt={item.Item_name}
                      />
                      <CardContent>
                        <h3 className="item-header">{item.Item_name}</h3>
                        <div className="rating-container">
                          <p className="renter-rating">{item.Rating}</p>
                          <StarIcon className="star-icon" alt="star-icon" />
                        </div>
                        <p className="item-price">Price: ${item.Price_per_day} per day</p>
                        <p className="renter-name">Renter: {item.Renter_name}</p>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <p>No nearby items found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NearbyItems;