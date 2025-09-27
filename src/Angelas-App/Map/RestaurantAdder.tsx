import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as client from './../Data/client';

export default function RestaurantAdder({ setRestName, setCuisine, setAngelasRatings, setLat, setLong, setNote,
    setAddress, setCity, setState, setCountry, setRecommendedDishes, setWebLink, setSource, addRestaurant } :
    { setRestName: (restName: string) => void; setCuisine: (cuisine: string) => void; setAngelasRatings: (rating: string) => void; 
      setAddress: (address: string) => void; setCity: (city: string) => void; setState: (state: string) => void; 
      setLat: (lat: number) => void; setLong: (long: number) => void; setNote: (cuisine: string) => void;
      setCountry: (country: string) => void; setRecommendedDishes: (recoDishes: string) => void; setWebLink: (webLink: string) => void; 
      setSource: (source: string) => void;
    addRestaurant: () => void; }) 
    {
        const [addRestName, setAddRestName] = useState("");
        const [addCuisine, setAddCuisine] = useState("");
        const [addAddress, setAddAddress] = useState("");
        const [addCity, setAddCity] = useState("");
        const [addState, setAddState] = useState("");
        const [addCountry, setAddCountry] = useState("");
        const [addSource, setAddSource] = useState("");
        const [addAngelasRating, setAddAngelasRating] = useState("");
        const [addLat, setAddLat] = useState(0);
        const [addLong, setAddLong] = useState(0);
        const [addRecommendedDishes, setAddRecommendedDishes] = useState("");
        const [addWebLink, setAddWebLink] = useState("");
        const [addNote, setAddNote] = useState("");
        const [selectedStates, setSelectedStates] = useState<string[]>([]);
        const [angelasRatingOpts, setAngelasRatingOpts] = useState<string[]>([]);
        const [countries, setCountries] = useState<string[]>([]);
        const [cuisines, setCuisines] = useState<string[]>([]);
        const [sources, setSources] = useState<string[]>([]);

        const resetForm = () => {
            setRestName("");
            setCuisine("");
            setAngelasRatings("");
            setAddress("");
            setCity("");
            setState("");
            setCountry("");
            setRecommendedDishes("");
            setWebLink("");
            setSource("");
            setNote("");

            setAddCuisine("");
            setAddState("");
            setAddSource("");
            setAddAngelasRating("");
            setAddCountry("");
        };

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
                <button type="button" className="btn-close" data-bs-dismiss="modal"
                        onClick={resetForm} />
              </div>
              <div className="modal-body">
                <span>*Optional</span>
                <a href="https://www.latlong.net/convert-address-to-lat-long.html" target="_blank" 
                   rel="noopener noreferrer" className='float-end'>Coordinate Search</a>
                {/* Restaurant Name */}
                <div className="d-flex align-items-center mb-2 mt-2">
                    <b className='me-2'>Restaurant Name:</b>
                    <input placeholder="Restaurant Name" defaultValue={addRestName} 
                            onChange={(e) => {setRestName(e.target.value); setAddRestName(e.target.value); }}
                            className="form-control form-control-sm flex-grow-1"
                            id="food-type-input" />
                </div>
                {/* Cuisine*/}
                <div className="d-flex align-items-center mb-2">
                    <b className='me-2'>Cuisine:</b>
                    <select className="form-select form-select-sm flex-grow-1" value={addCuisine}
                            onChange={(e) => {setCuisine(e.target.value); setAddCuisine(e.target.value); }}>
                        <option value="">Choose Cuisine</option>
                        {cuisines.map((cuisine) => (
                            <option key={cuisine} value={cuisine}>{cuisine}</option> ))}
                    </select>
                </div>
                {/* Address */}
                <div className="d-flex align-items-center mb-2">
                    <b className="me-2">Address:</b>
                    <input placeholder="Address" defaultValue={addAddress} 
                            onChange={(e) => {setAddress(e.target.value); setAddAddress(e.target.value); }}
                            className="form-control form-control-sm flex-grow-1"
                            id="address-input" />
                </div>
                {/* City */}
                <div className="d-flex align-items-center mb-2">
                    <b className="me-2">City:</b>
                    <input placeholder="City" defaultValue={addCity}
                            onChange={(e) => {setCity(e.target.value); setAddCity(e.target.value); }}
                            className="form-control form-control-sm flex-grow-1"
                            id="city-input" />
                </div>
                {/* State */}
                <div className="d-flex align-items-center mb-2">
                    <b className="me-2">State:</b>
                    <select className="form-select form-select-sm flex-grow-1" id="state-input" value={addState}
                        onChange={(e) => {setState(e.target.value); setAddState(e.target.value); }} >
                        <option value="">Choose State</option>
                        <option value="N/a">N/a</option>
                        {selectedStates.map((state) => (
                            <option key={state} value={state}>{state}</option> ))}
                    </select>
                </div>
                {/* Country */}
                <div className="d-flex align-items-center mb-2">
                    <b className="me-2">Country:</b>
                    <select className="form-select form-select-sm flex-grow-1" id="country-input" value={addCountry}
                        onChange={(e) => {setCountry(e.target.value); setAddCountry(e.target.value); }} >
                        <option value="">Choose Country</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>{country}</option> ))}
                    </select>
                </div>
                {/* Latitude */}
                <div className="d-flex align-items-center mb-2">
                <b className="me-2">Latitude:</b>
                <input placeholder="0" type="number" onChange={(e) => {setLat(e.target.valueAsNumber); setAddLat(e.target.valueAsNumber);}}
                        className="form-control form-control-sm flex-grow-1" defaultValue={addLat}
                        id="lat-input" />
                </div>
                {/* Longitude */}
                <div className="d-flex align-items-center mb-2">
                <b className="me-2">Longitude:</b>
                <input placeholder="0" type="number" onChange={(e) => {setLong(e.target.valueAsNumber); setAddLong(e.target.valueAsNumber); }}
                        className="form-control form-control-sm flex-grow-1" defaultValue={addLong}
                        id="long-input" />
                </div>
                {/* Source */}
                <div className="d-flex align-items-center mb-2">
                    <b className="me-2">Source:</b>
                    <select className="form-select form-select-sm flex-grow-1" id="source-input" value={addSource}
                        onChange={(e) => {setSource(e.target.value); setAddSource(e.target.value); }} >
                        <option value="">Choose Source</option>
                        {sources.map((source) => (
                            <option key={source} value={source}>{source}</option> ))}
                    </select>
                </div>
                {/* Recommended Dishes */}
                <div className="d-flex align-items-center mb-2">
                <b className="me-2">*Recommended Dishes:</b>
                <input placeholder="Recommended Dishes" defaultValue={addRecommendedDishes}
                       onChange={(e) => {setRecommendedDishes(e.target.value); setAddRecommendedDishes(e.target.value); }}
                       className="form-control form-control-sm flex-grow-1"
                       id="rec-dishes-input" />
                </div>
                {/* Note */}
                <div className="d-flex align-items-center mb-2">
                <b className="me-2">*Note:</b>
                <input placeholder="Note" defaultValue={addNote}
                        onChange={(e) => {setNote(e.target.value); setAddNote(e.target.value); }}
                        className="form-control form-control-sm flex-grow-1"
                        id="note-input" />
                </div>
                {/* Angelas Rating */}
                <div className="d-flex align-items-center mb-2">
                    <b className="me-2">*Angela's  Rating:</b>
                    <select className="form-select form-select-sm flex-grow-1" id="angelas-rating-input" value={addAngelasRating}
                        onChange={(e) => {setAngelasRatings(e.target.value); setAddAngelasRating(e.target.value); }}
                        disabled={!(currentUser.firstName === 'Angela' && currentUser.lastName === "Todd")}>
                        <option value="">Choose Rating</option>
                        {angelasRatingOpts.map((rating) => (
                            <option key={rating} value={rating}>{rating}</option> ))}
                    </select>
                </div>
                {/* Website */}
                <div className="d-flex align-items-center mb-2">
                <b className="me-2">*Website:</b>
                <input placeholder="Website" onChange={(e) => {setWebLink(e.target.value); setAddWebLink(e.target.value); }}
                        className="form-control form-control-sm flex-grow-1"
                        id="web-link-input" />
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={resetForm} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel 
                </button>
                <button type="button" data-bs-dismiss="modal" className="btn btn-success"
                  onClick={() => {addRestaurant(); resetForm(); }}>
                  Add Restaurant 
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }