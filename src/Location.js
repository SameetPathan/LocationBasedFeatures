import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';

const LocationComponent = () => {
    const [locationName, setLocationName] = useState('');
    const [currentCoords, setCurrentCoords] = useState(null);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [displayLocation, setDisplayLocation] = useState('');

    const getLocationCoordinates = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setCurrentCoords({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              // Use geocoding to get location name from coordinates (for example, using reverse geocoding API)
              fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN`)
                .then(response => response.json())
                .then(data => {
                  const location = data.features[0].place_name;
                  setDisplayLocation(location);
                  setLocationName(location);
                })
                .catch(error => {
                  console.error('Error fetching location:', error);
                });
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          console.log('Geolocation is not supported by this browser.');
        }
      };
    
      const handleAddFeature = (e) => {
        const selectedFeature = e.target.value;
        if (!selectedFeatures.includes(selectedFeature)) {
          setSelectedFeatures([...selectedFeatures, selectedFeature]);
        }
      };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <Form>
            <Form.Group controlId="locationName">
              <Form.Label>Enter Location Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Location Name"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary m-2" onClick={getLocationCoordinates}>
              Get Current Location
            </Button>
            <hr />

            {currentCoords && (
              <p>
                Latitude: {currentCoords.latitude}, Longitude: {currentCoords.longitude}
              </p>
            )}
            <hr />

            <Form.Group controlId="selectFeatures">
              <Form.Label>Select Features:</Form.Label>
              <Form.Control as="select" multiple onChange={handleAddFeature}>
              <option value="Hotel">Hotel</option>
                <option value="School">School</option>
                <option value="Restaurant">Restaurant</option>
              </Form.Control>
            </Form.Group>
<hr />
            <div>
              
              <ul>
                {selectedFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Display Map and Text Data */}
            {/* Implement map and text data display using the selected features and location data */}
            {/* You can use libraries like Google Maps, Mapbox, etc., to display the map */}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LocationComponent;
