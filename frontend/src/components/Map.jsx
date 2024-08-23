import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchGeoDistribution } from '../services/apiService';

// Define mock coordinates for some cities for demonstration purposes
const mockCoordinates = {
  "El Paso": [31.7619, -106.4850],
  "Plano": [33.0198, -96.6989],
  "Stockton": [37.9577, -121.2908],
  "Las Vegas": [36.1699, -115.1398],
  "St. Paul": [44.9537, -93.0900],
  "Seattle": [47.6062, -122.3321],
  "San Antonio": [29.4241, -98.4936],
  "Oakland": [37.8044, -122.2711],
  "Kansas City": [39.0997, -94.5786],
  "Washington": [38.9072, -77.0369],
  "Hialeah": [25.8576, -80.2781],
  "Houston": [29.7604, -95.3698],
  "Dallas": [32.7767, -96.7970],
  "Wichita": [37.6872, -97.3301],
  "Laredo": [27.5306, -99.4803],
  "Cincinnati": [39.1031, -84.5120],
  "Boston": [42.3601, -71.0589],
  "Austin": [30.2672, -97.7431],
  "San Jose": [37.3382, -121.8863],
  "Chula Vista": [32.6401, -117.0842],
};

function CustomerMap() {
  const [customerLocations, setCustomerLocations] = useState([]);

  useEffect(() => {
    const loadLocations = async () => {
      const data = await fetchGeoDistribution(); // Fetch data from your API
      setCustomerLocations(data);
    };

    loadLocations();
  }, []);

  return (
    <MapContainer className='' center={[37.0902, -95.7129]} zoom={4} style={{ height: '500px', width: '100%' , }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {customerLocations.map((customer, index) => {
        const coordinates = mockCoordinates[customer._id] || [0, 0]; 

        if (coordinates[0] === 0 && coordinates[1] === 0) return null; // Skip invalid coordinates

        return (
          <Marker key={index} position={coordinates} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', iconSize: [25, 41] })}>
            <Popup>
              {customer._id} <br /> Total Customers: {customer.total}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default CustomerMap;
