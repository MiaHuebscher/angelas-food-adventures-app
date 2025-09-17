import L from 'leaflet';
import myIcon from './icon.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as client from './client';
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
  { _id: '1', restaurantName: "Nong's Khao Man Gai", webLink: 'http://khaomangai.com/', foodType: 'Thai', 
    address: '609 SE Ankeny St C, Portland, OR 97214', city: 'Portland', state: 'OR', country: 'USA',
    recommendedDishes: '', 
    source: 'Bizzare Foods: Delicious Destinations', angelasRating: 'Needs More Data', coords: [45.5223816,-122.6593161]},
  { _id: '2', restaurantName: "Raymundo's", webLink: 'https://www.instagram.com/raymundos_taco_shop_/?hl=en', foodType: 'Mexican', 
    address: '7918 Ivanhoe Ave, La Jolla, CA 92037', city: 'La Jolla', state: 'CA', country: 'USA',
    recommendedDishes: 'California Burrito', 
    source: 'Palomar', angelasRating: 'Needs More Data', coords: [32.847653,-117.272592]},
];

// create modal to add restaurant to map
// Add filters to map
// create links for people to let angela delete/update them

export default function RestaurantsMap() {
    const [editing, setEditing] = useState(false);
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [rest, saveRest] = useState("");
    const [editingRest, setEditingRestaurant] = useState<any>({});
    const [foodType, setFoodType] = useState("");
    const [restName, setRestName] = useState("");
    const [webLink, setWebLink] = useState("");
    const [angelasRating, setAngelasRating] = useState("");
    const [address, setAddress] = useState("");
    const [recommendedDishes, setRecommendedDishes] = useState("");
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const fetchRestaurants = async () => {
        const restaurants = await client.findAllRestaurants();
        setRestaurants(restaurants);
      };
    useEffect(() => {
    fetchRestaurants();
    }, []);

    const deleteRestaurant = async (rid: string) => {
      if (rid) {
        await client.deleteRestaurant(rid);
        setRestaurants(prev => prev.filter(r => r._id !== rid));
      }
    };
    return (
      <div id='angelas-webpage' className='container-fluid m-4 mt-0'>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="text-center flex-grow-1 mb-0">
            Angela's Food Adventures Map
          </h2>
          <button className="btn btn-success ms-0">Add Restaurant</button>
        </div>
        <hr />
        <MapContainer id='angelas-map' className='w-95 m-4'
          center={[45.6280, -122.6739]}
          zoom={6}
          style={{ height: '83vh', borderRadius: '12px' }}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
          />
          {locations.map((loc) => (
            <Marker key={loc._id} position={loc.coords as [number, number]} icon={customIcon}>
              <Popup>
                {(editing && loc === editingRest ) ?
                  (<div className="d-flex flex-column">
                    <input className="form-control w-50" defaultValue={`${loc.restaurantName}`}
                           onChange={(e) => setRestName(e.target.value)}
                           onKeyDown={(e) => {if (e.key === "Enter") { saveRest(""); }}}/>
                    <div className="d-flex flex-column">
                      {/* Type of Food */}
                      <div className="mb-2">
                        <b>Type of Food:</b>
                        <input defaultValue={loc.foodType} onChange={(e) => setFoodType(e.target.value)}
                               className="form-control form-control-sm ms-2 mt-1 fs-7 d-inline-block"
                               style={{ width: "55%" }} id="food-type-input" 
                               onKeyDown={(e) => {if (e.key === "Enter") {saveRest("");}}} />
                      </div>
                      {/* Angelas Rating */}
                      <div className="mb-2">
                        <b>Angela's Rating:</b>
                        <input defaultValue={loc.angelasRating} onChange={(e) => setAngelasRating(e.target.value)}
                               className="form-control form-control-sm ms-2 mt-1 fs-7 d-inline-block"
                               style={{ width: "55%" }} id="angelas-rating-input" 
                               onKeyDown={(e) => {if (e.key === "Enter") {saveRest("");}}} 
                               disabled={(currentUser.firstName === 'Angela' && currentUser.lastName === "Todd") ? true : false}/>
                      </div>
                      {/* Address */}
                      <div className="mb-2">
                        <b>Address:</b>
                        <input defaultValue={loc.address} onChange={(e) => setAddress(e.target.value)}
                               className="form-control form-control-sm ms-2 mt-1 fs-7 d-inline-block"
                               style={{ width: "55%" }} id="address-input" 
                               onKeyDown={(e) => {if (e.key === "Enter") {saveRest("");}}} />
                      </div>
                      {/* Recommended Dishes */}
                      <div className="mb-2">
                        <b>Recommended Dishes:</b>
                        <input defaultValue={loc.recommendedDishes} onChange={(e) => setRecommendedDishes(e.target.value)}
                               className="form-control form-control-sm ms-2 mt-1 fs-7 d-inline-block"
                               style={{ width: "55%" }} id="rec-dishes-input" 
                               onKeyDown={(e) => {if (e.key === "Enter") {saveRest("");}}} />
                      </div>
                      {/* Website */}
                      <div className="mb-2">
                        <b>Website:</b>
                        <input defaultValue={loc.webLink} onChange={(e) => setWebLink(e.target.value)}
                               className="form-control form-control-sm ms-2 mt-1 fs-7 d-inline-block"
                               style={{ width: "55%" }} id="web-link-input" 
                               onKeyDown={(e) => {if (e.key === "Enter") {saveRest("");}}} />
                      </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-2">
                      <button className="btn btn-sm btn-secondary" onClick={() => {setEditing(false), setEditingRestaurant("")}}>Cancel</button>
                      <button className="btn btn-sm btn-success" onClick={() => {setEditing(false); setEditingRestaurant("")}}>Save</button>
                    </div>
                  </div>)
                  :
                  (<div>
                    <strong className='restaurant-name d-block mb-3 fs-4'>{loc.restaurantName}</strong>
                    <div className='mb-1'><strong>Type of Food:</strong> {loc.foodType}</div>
                    <div className='mb-1'><strong>Angela's Rating:</strong> {loc.angelasRating}</div>
                    <div className='mb-1'><strong>Address:</strong> {loc.address}</div>
                    <div className='mb-1'><strong>Recommended Dish(es):</strong> {loc.recommendedDishes}</div>
                    <strong>
                      <a href={loc.webLink} target="_blank" rel="noopener noreferrer">Website</a>
                    </strong>
                    <div className="d-flex justify-content-end gap-2 mt-2">
                      <button className="btn btn-sm btn-warning" onClick={() => {setEditing(true); setEditingRestaurant(loc); }}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => deleteRestaurant(loc._id)}>Delete</button>
                    </div>
                  </div>)
                  }
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
}