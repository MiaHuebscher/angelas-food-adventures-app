import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as client from './../Data/client';

export default function RestaurantAdder({ setRestName, setCuisine, setAngelasRatings, setAddress, setCity,
    setState, setCountry, setRecommendedDishes, setWebLink, setSource, addRestaurant } :
    { setRestName: (restName: string) => void; setCuisine: (cuisine: string) => void;
    setAngelasRatings: (rating: string) => void; setAddress: (address: string) => void; setCity: (city: string) => void;
    setState: (state: string) => void; setCountry: (country: string) => void;
    setRecommendedDishes: (recoDishes: string) => void; setWebLink: (webLink: string) => void; setSource: (source: string) => void;
    addRestaurant: () => void; }) {
        const [selectedStates, setSelectedStates] = useState<string[]>([]);
        const [angelasRatingOpts, setAngelasRatingOpts] = useState<string[]>([]);
        const [countries, setCountries] = useState<string[]>([]);
        const [cuisines, setCuisines] = useState<string[]>([]);
        const [sources, setSources] = useState<string[]>([]);

        // Get data from server
        const { currentUser } = useSelector((state: any) => state.accountReducer);
        const getData = async () => {
            const serverData = await client.getData();
            setSelectedStates(serverData[0].states ?? []);
            setAngelasRatingOpts(serverData[0].angelasRating ?? []);
            setCountries(serverData[0].country ?? []);
            setCuisines(serverData[0].cuisines ?? []);
            setSources(serverData[0].source ?? []);};
    
        // Load data from server when page loads
        useEffect(() => {getData();}, []);

      return (
        <div id="wd-add-restaurant-module-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Add Restaurant
                </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                {/* Restaurant Name */}
                <div className="d-flex align-items-center mb-2">
                    <b className='me-2'>Restaurant Name:</b>
                    <input defaultValue="Restaurant Name" onChange={(e) => setRestName(e.target.value)}
                            className="form-control form-control-sm flex-grow-1"
                            id="food-type-input" />
                </div>
                {/* Cuisine*/}
                <div className="d-flex align-items-center mb-2">
                    <b className='me-2'>Cuisine:</b>
                    <select className="form-select form-select-sm flex-grow-1" value=""
                            onChange={(e) => setCuisine(e.target.value)}>
                        <option value="">Choose Cuisine</option>
                        {cuisines.map((cuisine) => (
                            <option key={cuisine} value={cuisine}>{cuisine}</option> ))}
                    </select>
                </div>
                {/* Angelas Rating */}
                <div className="d-flex align-items-center mb-2">
                    <b className="me-2">Angela's Rating:</b>
                    <select className="form-select form-select-sm flex-grow-1" id="angelas-rating-input" value=""
                        onChange={(e) => setAngelasRatings(e.target.value)} 
                        disabled={!(currentUser.firstName === 'Angela' && currentUser.lastName === "Todd")}>
                        <option value="">Choose Rating</option>
                        {angelasRatingOpts.map((rating) => (
                            <option key={rating} value={rating}>{rating}</option> ))}
                    </select>
                </div>
                {/* Address */}
                <div className="d-flex align-items-center mb-2">
                    <b className="me-2">Address:</b>
                    <input defaultValue="Address" onChange={(e) => setAddress(e.target.value)}
                            className="form-control form-control-sm flex-grow-1"
                            id="address-input" />
                </div>
                {/* City */}
                <div className="d-flex align-items-center mb-2">
                    <b className="me-2">City:</b>
                    <input defaultValue="City" onChange={(e) => setCity(e.target.value)}
                            className="form-control form-control-sm flex-grow-1"
                            id="city-input" />
                </div>
                {/* State */}
                <div className="d-flex align-items-center mb-2">
                    <b className="me-2">State:</b>
                    <select className="form-select form-select-sm flex-grow-1" id="state-input" value=""
                        onChange={(e) => setState(e.target.value)} >
                        <option value="">Choose State</option>
                        {selectedStates.map((state) => (
                            <option key={state} value={state}>{state}</option> ))}
                    </select>
                </div>
                {/* Country */}
                <div className="d-flex align-items-center mb-2">
                    <b className="me-2">Country:</b>
                    <select className="form-select form-select-sm flex-grow-1" id="country-input" value=""
                        onChange={(e) => setAngelasRatings(e.target.value)} >
                        <option value="">Choose Country</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>{country}</option> ))}
                    </select>
                </div>
                {/* Source */}
                <div className="d-flex align-items-center mb-2">
                    <b className="me-2">Source:</b>
                    <select className="form-select form-select-sm flex-grow-1" id="source-input" value=""
                        onChange={(e) => setSource(e.target.value)} >
                        <option value="">Choose Source</option>
                        {sources.map((source) => (
                            <option key={source} value={source}>{source}</option> ))}
                    </select>
                </div>
                {/* Recommended Dishes */}
                <div className="d-flex align-items-center mb-2">
                <b className="me-2">Recommended Dishes:</b>
                <input defaultValue="Recommended Dishes" onChange={(e) => setRecommendedDishes(e.target.value)}
                        className="form-control form-control-sm flex-grow-1"
                        id="rec-dishes-input" />
                </div>
                {/* Website */}
                <div className="d-flex align-items-center mb-2">
                <b className="me-2">Website:</b>
                <input defaultValue="Website" onChange={(e) => setWebLink(e.target.value)}
                        className="form-control form-control-sm flex-grow-1"
                        id="web-link-input" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel </button>
                <button onClick={addRestaurant} type="button" data-bs-dismiss="modal" className="btn btn-success">
                  Add Restaurant </button>
              </div>
            </div>
          </div>
        </div>
      );
    }