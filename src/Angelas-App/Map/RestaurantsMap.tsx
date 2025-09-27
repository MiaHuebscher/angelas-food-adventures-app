import L from 'leaflet';
import myIcon from './icon.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { FaPlus } from "react-icons/fa6";
import * as client from './client';
import * as userClient from './../People/client';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import RestaurantAdder from './RestaurantAdder';
import * as dataClient from './../Data/client';

// Create custom marker icons for map
const customIcon = new L.Icon({
  iconUrl: myIcon,
  iconSize: [48, 48],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: '',
});

export default function RestaurantsMap() {
    const [editing, setEditing] = useState(false);
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [editingRest, setEditingRestaurant] = useState<any>({});
    const [cuisine, setCuisine] = useState("");
    const [restName, setRestName] = useState("");
    const [webLink, setWebLink] = useState("");
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [source, setSource] = useState("");
    const [angelasRating, setAngelasRating] = useState("");
    const [address, setAddress] = useState("");
    const [recommendedDishes, setRecommendedDishes] = useState("");
    const [note, setNote] = useState("");
    const [selectedStates, setSelectedStates] = useState<string[]>([]);
    const [angelasRatings, setAngelasRatings] = useState<string[]>([]);
    const [countries, setCountries] = useState<string[]>([]);
    const [cuisines, setCuisines] = useState<string[]>([]);
    const [sources, setSources] = useState<string[]>([]);
    
    // Get data from server
    const getData = async () => {
      const serverData = await dataClient.getData();
      setSelectedStates(serverData[0].states ?? []);
      setAngelasRatings(serverData[0].angelasRating ?? []);
      setCountries(serverData[0].country ?? []);
      setCuisines(serverData[0].cuisines ?? []);
      setSources(serverData[0].source ?? []);};

    {/* FILTERS */}
    const [cuisineFilter, setCuisineFilter] = useState("");
    const [ratingFilter, setRatingFilter] = useState("");
    const [searchText, setSearchText] = useState("");
    const [cityTextFilter, setCityTextFilter] = useState("");
    const [stateFilter, setStateFilter] = useState("");
    const [countryFilter, setCountryFilter] = useState("");
    const [sourceFilter, setSourceFilter] = useState("");
    const [showFilters, setShowFilters] = useState(true);

    const uniqueCuisines = useMemo(() => {
      const cuisines = restaurants.map((loc) => loc.cuisine?.trim()).filter(Boolean);
        return Array.from(new Set(cuisines)).sort();
    }, [restaurants]);
    const uniqueRatings = useMemo(() => {
      const ratings = restaurants.map((loc) => loc.angelasRating?.toString().trim()).filter(Boolean);
      return Array.from(new Set(ratings)).sort((a, b) => Number(b) - Number(a));
    }, [restaurants]);
    const uniqueStates = useMemo(() => {
      const states = restaurants.map((loc) => loc.state?.toString().trim()).filter(Boolean);
      return Array.from(new Set(states)).sort((a, b) => Number(b) - Number(a));
    }, [restaurants]);
    const uniqueCountries = useMemo(() => {
      const countries = restaurants.map((loc) => loc.country?.toString().trim()).filter(Boolean);
      return Array.from(new Set(countries)).sort((a, b) => Number(b) - Number(a));
    }, [restaurants]);
    const uniqueSources = useMemo(() => {
      const sources = restaurants.map((loc) => loc.source?.toString().trim()).filter(Boolean);
      return Array.from(new Set(sources)).sort((a, b) => Number(b) - Number(a));
    }, [restaurants]);
    
    const filteredRestaurants = restaurants.filter(loc => {
    const matchesSearch = searchText ? loc.restaurantName.toLowerCase().includes(searchText.toLowerCase()) : true;
    const matchesCuisine = cuisineFilter ? loc.cuisine?.toString() === cuisineFilter : true;
    const matchesRating = ratingFilter ? loc.angelasRating?.toString() === ratingFilter : true;
    const matchesCity = cityTextFilter ? loc.city.toLowerCase().includes(cityTextFilter.toLowerCase()) : true;
    const matchesState = stateFilter ? loc.state === stateFilter : true;
    const matchesCountry = countryFilter ? loc.country === countryFilter : true;
    const matchesSource = sourceFilter ? loc.source === sourceFilter : true;
    return matchesSearch && matchesCuisine && matchesRating && matchesCity && matchesState && matchesCountry && matchesSource;
    });

    {/* Interacting with Server*/}
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const fetchRestaurants = async () => {
        const restaurants = await client.findAllRestaurants();
        setRestaurants(restaurants);
      };
    const addRestaurant = async (newRest: any) => {
        try {
          const newRestResponse = await client.createRestaurant(newRest);
          const updateUserResponse = await userClient.updateUser({ ...currentUser, numRestsAdded: currentUser.numRestsAdded + 1})

          setRestaurants([...restaurants, newRest]); setCuisine("");

          setRestName(""); setWebLink(""); setLat(0); setLong(0); setCity("");
          setState(""); setCountry(""); setSource(""); setAngelasRating("");
          setAddress(""); setRecommendedDishes(""); setNote("");

          window.alert(`Successfully added ${newRest.restaurantName}`);
        } catch (error) {
          console.error("Failed to add restaurant:", error);
          window.alert("Failed to add restaurant. Please try again.");
        }
      };
    const updateRestaurant = async (rest: any) => {
        const editedRest = {...rest, restaurantName: restName, cuisine: cuisine, coords: [lat, long], address: address, city: city,
          state: state, country: country, source: source, webLink: webLink, note: note, recommendedDishes: recommendedDishes,
          angelasRating: ((currentUser.firstName === "Angela" && currentUser.lastName === "Todd") ? angelasRating : rest.angelasRating)
        };
        const response = await client.updateRestaurant(editedRest);
        setRestaurants((prev) =>
          prev.map((r) => (r._id === rest._id ? editedRest : r)));

        setRestName(""); setWebLink(""); setLat(0); setLong(0); setCity("");
        setState(""); setCountry(""); setSource(""); setAngelasRating("");
        setCuisine(""); setAddress(""); setRecommendedDishes(""); setNote("");
    };
    const deleteRestaurant = async (rid: string) => {
      if (rid) {
        await client.deleteRestaurant(rid);
        setRestaurants(prev => prev.filter(r => r._id !== rid));
      }
    };
    
    // Load data from server when page loads
    useEffect(() => {
      fetchRestaurants();
      getData();
    }, []);
    return (
      <div id='angelas-webpage' className='container-fluid mt-0'>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="text-center flex-grow-1 mb-0">
            Angela's Food Adventures Map test
          </h2>
          {!(currentUser.access === "READ-ONLY") &&
          <span>
            <button className="btn btn-success ms-0" data-bs-toggle="modal" data-bs-target="#wd-add-restaurant-module-dialog">
              <FaPlus className="position-relative me-2" style={{ bottom: "2px" }} />
              Add Restaurant
            </button>
            <RestaurantAdder setLat={setLat} setLong={setLong} setRestName={setRestName} setCuisine={setCuisine} 
              setAngelasRatings={setAngelasRating} setAddress={setAddress} setCity={setCity} setState={setState} setCountry={setCountry}
              setRecommendedDishes={setRecommendedDishes} setWebLink={setWebLink} setSource={setSource} setNote={setNote}
              addRestaurant={() => {addRestaurant({_id: new Date().getTime().toString(), restaurantName: restName, cuisine: cuisine, coords: [lat, long], 
                address: address, city: city, state: state, country: country, source: source, note: note,
                addedBy: `${currentUser.firstName} ${currentUser.lastName}`, webLink: webLink,
                angelasRating: angelasRating, recommendedDishes: recommendedDishes })}} />
          </span>}
        </div>
        <hr />
        <div className="d-flex flex-column gap-3 mb-3">
          <div className="d-flex flex-wrap align-items-center gap-3">
            {/* Search by Name */}
            <input
              type="text"
              className="form-control w-auto"
              placeholder="Search Restaurant"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {/* Search by City */}
            <input
              type="text"
              className="form-control w-auto"
              placeholder="Search City"
              value={cityTextFilter}
              onChange={(e) => setCityTextFilter(e.target.value)}
            />
            {/* Search by State */}
            <select
              className="form-select w-auto"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            >
              <option value="">All States</option>
              {uniqueStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {/* Search by Country */}
            <select
              className="form-select w-auto"
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
            >
              <option value="">All Countries</option>
              {uniqueCountries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div className="d-flex flex-wrap align-items-center gap-3">
            {/* Cuisine Dropdown */}
            <select
              className="form-select w-auto"
              value={cuisineFilter}
              onChange={(e) => setCuisineFilter(e.target.value)}
            >
              <option value="">All Cuisines</option>
              {uniqueCuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>
            {/* Rating Dropdown */}
            <select
              className="form-select w-auto"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="">All Ratings</option>
              {uniqueRatings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
            {/* Search by Source */}
            <select
              className="form-select w-auto"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
            >
              <option value="">All Sources</option>
              {uniqueSources.map((source) => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
            {/* Clear Filters Button */}
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setCuisineFilter("");
                setRatingFilter("");
                setSearchText("");
                setCityTextFilter("");
                setStateFilter("");
                setCountryFilter("");
                setSourceFilter("");
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
        <MapContainer id='angelas-map' className='w-95'
          center={[45.6280, -122.6739]}
          zoom={10}
          minZoom={5}
          style={{ height: '72vh', borderRadius: '7px' }}>
          <TileLayer
              url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=KA8DXtaZOGzGWg60NAIo`}
              attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; OpenStreetMap contributors'
              crossOrigin=""
              referrerPolicy="strict-origin"
            />
          <Marker key={1} position={[25.76579, -80.2251744]}/>
        </MapContainer>
      </div>
    );
}