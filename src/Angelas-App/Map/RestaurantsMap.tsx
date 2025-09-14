import L from 'leaflet';
import myIcon from './icon.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

// Create custom marker icons for map
const customIcon = new L.Icon({
  iconUrl: myIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: '',
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

// create modal to add restaurant to map
// Add filters to map
// create links for people to let angela delete/update them

export default function RestaurantsMap() {
    return (
      <div id='angelas-webpage' className='container-fluid m-4 mt-0'>
        <h2 className='text-center mb-2'>Angela's Food Aventures Map</h2>
        
        <MapContainer id='angelas-map' className='w-100'
          center={[45.6280, -122.6739]}
          zoom={6}
          style={{ height: '65vh', borderRadius: '12px' }}>
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