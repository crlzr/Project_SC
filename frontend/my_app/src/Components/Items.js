import React, { useState, useEffect, useRef, useCallback} from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import StarIcon from '@mui/icons-material/Star';
import ChatIcon from '@mui/icons-material/Chat';
import LogoLoader from './LogoLoader';
import Calendar from './Calendar';
import format from 'date-fns/format';
import '../index.css';
import mapboxgl from 'mapbox-gl'; // Import Mapbox
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS
import Modal from '@mui/material/Modal'; // Import Modal
import Chat from './Session';
import { useAuth0 } from '@auth0/auth0-react'; // Import Auth0


const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

const ItemsListing = (syncConversation) => {
  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const { category_name, itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [confirmedDates, setConfirmedDates] = useState(null);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef([]);

  mapboxgl.accessToken = process.env.REACT_APP_MB_TOKEN;


  // const clearMarkers = () => {
  //   markerRef.current.forEach(marker => marker.remove());
  //   markerRef.current = []; // Clear markers array
  // };

  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5004/${category_name}/${itemId}`);
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

  const handleRentNowClick = () => {
    setShowCalendar(true);
  };

  const handleConfirmDates = (dates) => {
    setConfirmedDates(dates);
    setShowCalendar(false);
  };


  useEffect(() => {
    console.log(mapContainerRef.current);
    if (item && mapContainerRef.current && item.renter_longitude && item.renter_latitude) {
      // clearMarkers();
      if (!mapRef.current) {
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/standard',
          center: [item.renter_longitude, item.renter_latitude],
          zoom: 12,
          minZoom: 10,      // Set the minimum zoom level (further out)
          maxZoom: 13,      // Set the maximum zoom level (closer in, but limited)
        });

        // const navControl = new mapboxgl.NavigationControl();
        // mapRef.current.addControl(navControl, 'top-right');

        // Create a custom div for the marker
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';  // Add this class for styling

        markerRef.current = new mapboxgl.Marker(markerElement)
          .setLngLat([item.renter_longitude, item.renter_latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`<h4>${item.Item_name}</h4>`))
          .addTo(mapRef.current);

        // Add a circle layer for the radius
      mapRef.current.on('load', () => {
        mapRef.current.addLayer({
          id: 'radius-circle',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [item.renter_longitude, item.renter_latitude],
              },
            },
          },
          paint: {
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              10,  // At zoom level 10, set radius
              25,  // Example radius in pixels
              13,  // At zoom level 13
              50, // Example larger radius in pixels
            ],
            'circle-color': '#8ABEE8',
            'circle-opacity': 0.4,
          },
        });
      });
      } else {
        console.log("Updating existing map");
        mapRef.current.setCenter([item.renter_longitude, item.renter_latitude]);
        markerRef.current.setLngLat([item.renter_longitude, item.renter_latitude]);
      // Update the circle's position
      mapRef.current.getSource('radius-circle').setData({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [item.renter_longitude, item.renter_latitude],
        },
      });
    }
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [item]);

  const handleProceedToPayment = async () => {
    if (!confirmedDates || !confirmedDates.startDate || !confirmedDates.endDate) {
      console.error('Invalid date range.');
      return;
    }

    try {
      const stripe = await stripePromise;
      const numberOfDays = (confirmedDates.endDate - confirmedDates.startDate) / (1000 * 60 * 60 * 24);
      const totalAmount = Math.round(item.Price_per_day * numberOfDays * 100); // Convert to cents
      const currentPageUrl = window.location.href;

      // Store the message in local storage
      localStorage.setItem('paymentItemName', item.Item_name);
      localStorage.setItem('paymentItemPrice', (totalAmount / 100).toFixed(2)); // Store total amount (in dollars)
      localStorage.setItem('paymentRenterName', `${item.First_name} ${item.Last_name}`); // Renter's name
      localStorage.setItem('paymentItemPhoto', item.Image_url); // Item photo
      localStorage.setItem('paymentStartDate', confirmedDates.startDate.toISOString()); // Store start date as ISO string
      localStorage.setItem('paymentEndDate', confirmedDates.endDate.toISOString());     // Store end date as ISO string
      localStorage.setItem('paymentMessage', 'Payment Successful');

      const response = await axios.post('http://localhost:5004/create-checkout-session', {
        amount: totalAmount,
        category: item.Category_id,
        itemName: item.Item_name,
        imageUrl: item.Image_url,
        renterFirstName: item.First_name,
        renterLastName: item.Last_name,
        previousPageUrl: currentPageUrl
      });

      const { id } = response.data;

      const result = await stripe.redirectToCheckout({ sessionId: id });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error.response?.data || error.message);
    }
  };


  if (loading) {
    return <LogoLoader />;
  }

  if (!item) {
    return <p>No item found.</p>;
  }

  const handleLogin = () => {
    loginWithRedirect({
        redirectUri: window.location.origin + window.location.pathname // Redirect back to the same page
    });
};

  return (
    <div className="item-details-container">
      <Card sx={{ maxWidth: 400, margin: '20px' }} className="item-details-card">
        <CardMedia
          component="img"
          className="item-image"
          height="140"
          image={item.Image_url}
          alt={item.Item_name}
        />
        <CardContent>
          <div className="item-header-container">
            <h2 className="item-name">{item.Item_name}</h2>
            <p className="item-price">${item.Price_per_day} per day</p>
          </div>
          <div className="description-availability-container">
            <p className="item-description">{item.Description}</p>
            <p className="item-availability">{item.Availability ? 'Available now' : 'Not Available'}</p>
          </div>
          <div className="renter-container">
            <div className="renter-info">
              <img
                src={item.Profile_pic}
                alt="Renter Profile"
                className="renter-profile-pic"
              />
              <div className="renter-details">
                <p className="renter-full-name">{item.Renter_name} {item.Last_name}</p>
                <div className="rating-container">
                  <p className="renter-rating">{item.Rating}</p>
                  <StarIcon className="star-icon" alt="star-icon" />
                </div>
              </div>
              {isAuthenticated && <Chat syncConversation={syncConversation} />} 
            </div>
          </div>
          {/* Map container */}
          <div ref={mapContainerRef} style={{ width: '100%', height: '300px' }} className="map-container" />
          {!isAuthenticated && 
          <div className="rent-login-button-container">
            <p className="login-rent-prompt">Please log in to rent item</p>
            <button className="rent-login-button" onClick={() => loginWithRedirect()}>Log in</button>
          </div>
          }
          {isAuthenticated && 
          <div className="rent-button-container">
          <button className="rent-button" onClick={handleRentNowClick}>Rent Now</button>
          </div>
          }
          
          {/* {showCalendar && <Calendar onConfirmDates={handleConfirmDates} />}  */}
          {/* Modal for Calendar */}
          <Modal
          open={showCalendar}
          onClose={() => setShowCalendar(false)}
          aria-labelledby="calendar-modal-title"
          aria-describedby="calendar-modal-description"
          >
            <div className="calendar-modal">
              <Calendar onConfirmDates={handleConfirmDates} />
            </div>
            </Modal>
            {confirmedDates && (
              <div className="confirmed-dates">
                <h4 className="dates-title">Confirmed Dates:</h4>
                <p className="date-range">{format(confirmedDates.startDate, 'dd/MM/yyyy')} - {format(confirmedDates.endDate, 'dd/MM/yyyy')}</p>
                <button className="proceed-button" onClick={handleProceedToPayment}>
            Proceed to Payment
          </button>
        </div>
      )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemsListing;