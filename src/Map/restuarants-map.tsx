import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import L from 'leaflet';
import myIcon from './icon.png';

// Fix Leaflet marker icons (optional, avoids missing icons issue)
const customIcon = new L.Icon({
  iconUrl: myIcon,
  iconSize: [32, 32],     // adjust to your PNG
  iconAnchor: [16, 32],   // point of the icon which will correspond to marker's location
  popupAnchor: [0, -32],  // position of the popup relative to the icon
  shadowUrl: '',          // remove shadow if you don’t want it
});

// Example data points
const locations = [
  { id: 1, restaurantName: "Nong's Khao Man Gai", webLink: 'http://khaomangai.com/', foodType: 'Thai', 
    address: '609 SE Ankeny St C, Portland, OR 97214', city: 'Portland', state: 'OR', country: 'USA',
    recommended_dishes: '', 
    source: 'Bizzare Foods: Delicious Destinations', angelasRating: 'Needs More Data', coords: [45.5223816,-122.6593161]},
  { id: 2, restaurantName: "Raymundo's", webLink: 'https://www.instagram.com/raymundos_taco_shop_/?hl=en', foodType: 'Mexican', 
    address: '7918 Ivanhoe Ave, La Jolla, CA 92037', city: 'La Jolla', state: 'CA', country: 'USA',
    recommended_dishes: 'California Burrito', 
    source: 'Palomar', angelasRating: 'Needs More Data', coords: [32.847653,-117.272592]},
];

// Add filters for city and cuisine, sign in functionality, only angela can add users to database
// Only Angela can add food places, everyone else has read access
// Change marker icons to funny emojis

export default function RestaurantsMap() {
    return (
    <div className='container mt-4'>
      <h2 className='text-center mb-3'>Angela's Food Aventures Map</h2>
      <MapContainer
        center={[39.8283, -98.5795]} // center on USA
        zoom={4}
        style={{ height: '800px', width: '100%', borderRadius: '12px' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={loc.coords as [number, number]} icon={customIcon}>
            <Popup>
              <div>
                <strong className='restaurant-name'>{loc.restaurantName}</strong><br />
                <strong>Type of Food:</strong> {loc.foodType}<br />
                <strong>Angela's Rating:</strong> {loc.angelasRating}<br />
                <strong>Address:</strong> {loc.address}<br />
                <strong>Recommended Dish(es):</strong> {loc.recommended_dishes}<br />
                <strong>
                  <a href={loc.webLink} target="_blank" rel="noopener noreferrer">Website</a>
                </strong><br />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
    );
}