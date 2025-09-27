import { useState, useEffect } from "react";
import * as client from './client';

const ALL_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY", "DC"
];
// make reducers for each datafield


export default function Data() {
    const [data, setData] = useState<any[]>([]);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [executed, setExecuted] = useState(false);
    const [error, setError] = useState(false);
    // States
    const [selectedStates, setSelectedStates] = useState<string[]>([]);
    // Angelas Ratings
    const [angelasRatings, setAngelasRatings] = useState<string[]>([]);
    const [fixRatings, setFixRatings] = useState("");
    const [newRating, setNewRating] = useState("");
    const [addRating, setAddRating] = useState("New Rating Category");
    // Countries
    const [countries, setCountries] = useState<string[]>([]);
    const [fixCountries, setFixCountries] = useState("");
    const [newCountry, setNewCountry] = useState("");
    const [addCountry, setAddCountry] = useState("New Country");
    // Cuisines
    const [cuisines, setCuisines] = useState<string[]>([]);
    const [fixCuisines, setFixCuisines] = useState("");
    const [newCuisines, setNewCuisine] = useState("");
    const [addCuisine, setAddCuisine] = useState("New Cuisine");
    // Sources
    const [sources, setSources] = useState<string[]>([]);
    const [fixSources, setFixSources] = useState("");
    const [newSource, setNewSource] = useState("");
    const [addSource, setAddSource] = useState("New Source");

    // Get data from server
    const getData = async () => {
        const serverData = await client.getData();
        setData(serverData[0]);
        setSelectedStates(serverData[0].states ?? []);
        setAngelasRatings(serverData[0].angelasRating ?? []);
        setCountries(serverData[0].country ?? []);
        setCuisines(serverData[0].cuisines ?? []);
        setSources(serverData[0].source ?? []);};

    // Load data from server when page loads
    useEffect(() => {getData();}, []);

    // Handle Ratings
    const handleRatings = (rating: string, command: string, updatedRating?: string) => {
        if (command === "delete") {
            setAngelasRatings(prev => prev.filter(r => r !== rating));}
        if (command === "add") {
            setAngelasRatings(prev => [...prev, addRating]);
            setAddRating("New Rating Category");
            setFixRatings("");}
        if (command === "update" && updatedRating) {
            setAngelasRatings(prev =>
                prev.map(r => (r === rating ? updatedRating : r)));
                setFixRatings("");
                setNewRating("");}};

    // Toggle state selection
    const handleStates = (state: string) => {
        setSelectedStates(prev =>
        prev.includes(state)
            ? prev.filter(s => s !== state)
            : [...prev, state]);};

    // Handle Countries
    const handleCountries = (country: string, command: string, updatedCountry?: string) => {
        if (command === "delete") {
            setCountries(prev => prev.filter(c => c !== country));}
        if (command === "add") {
            setCountries(prev => [...prev, addCountry]);
            setAddCountry("New Country");
            setFixCountries("");}
        if (command === "update" && updatedCountry) {
            setCountries(prev =>
                prev.map(c => (c === country ? updatedCountry : c)));
                setFixCountries("");
                setNewCountry("");}};
    
    // Handle Cuisines
    const handleCuisines = (cuisine: string, command: string, updatedCuisines?: string) => {
        if (command === "delete") {
            setCuisines(prev => prev.filter(c => c !== cuisine));}
        if (command === "add") {
            setCuisines(prev => [...prev, addCuisine]);
            setAddCuisine("New Cuisine");
            setFixCuisines("");}
        if (command === "update" && updatedCuisines) {
            setCuisines(prev =>
                prev.map(c => (c === cuisine ? updatedCuisines : c)));
                setFixCuisines("");
                setNewCuisine("");}};
    
    // Handle Source
    const handleSources = (source: string, command: string, updateSource?: string) => {
        if (command === "delete") {
            setSources(prev => prev.filter(s => s !== source));}
        if (command === "add") {
            setSources(prev => [...prev, addSource]);
            setAddSource("New Source");
            setFixSources("");}
        if (command === "update" && updateSource) {
            setSources(prev =>
                prev.map(s => (s === source ? updateSource : s)));
                setFixSources("");
                setNewSource("");}};

    // Save updates to server
    const saveChanges = async () => {
        const updatedData = { ...data, states: selectedStates, angelasRating: angelasRatings, country: countries,
                            cuisines: cuisines, source: sources};
        try {
        setSaving(true);
        await client.updateData(updatedData);
        setMessage("✅ Updates saved successfully!");
        setError(false);
        } catch (err: any) {
        setMessage(`❌ Failed to updated data. Error: ${err.response?.data?.message ?? err.message}.`)
        setError(true);
        } finally {
        setSaving(false);
        setExecuted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        }};
    return (
        <div className="container-fluid">
            <h1 className="m-4">Data Management</h1>
            {executed && <div className={` ms-4 alert ${error ? "alert-danger" : "alert-success"}`} role="alert">{message}</div>}
            {/* ANGELAS RATINGS */}
            <h3 className="ms-4">Angelas Ratings:</h3>
            <div id='angelas-ratings-options'>
                <li key='add-rating-input' className="list-group-item d-flex align-items-center ms-4 mt-3">
                    <input className="form-control me-2" placeholder="Enter New Rating Category" style={{ width: "46%" }}
                           onChange={(e) => setAddRating(e.target.value)}/>
                    <button className="btn btn-success" onClick={() => handleRatings(addRating, "add")}>Add</button>
                </li>
                {angelasRatings.map((rating: string) => 
                    fixRatings === rating ? 
                        (<li key={rating} className="list-group-item d-flex align-items-center ms-4 mt-2">
                            <input className="form-control form-control-sm me-2" placeholder={rating} style={{ width: "40%" }}
                                   onChange={(e) => setNewRating(e.target.value)}/>
                            <button className="btn btn-warning me-2"
                                    onClick={() => handleRatings(rating, "update", newRating ? newRating : rating)}>Update</button>
                            <button className="btn btn-secondary" onClick={() => setFixRatings("")}>Cancel</button>
                        </li>)
                    : 
                        (<li key={rating} className="list-group-item d-flex align-items-center ms-4 mt-2">
                           <span className="fs-6 me-3 text-truncate" style={{ width: "40%", display: "inline-block" }}>
                                 {rating}
                            </span>
                            <button className="btn btn-primary me-2" onClick={() => (setFixRatings(rating))}> 
                                Edit 
                            </button>
                            <button className="btn btn-danger" onClick={() =>handleRatings(rating, "delete")}> 
                                Delete 
                            </button>
                        </li>)
                )}
            </div>
            
            {/* STATES */}
            <h3 className="ms-4 mt-4">States:</h3>
            <div id='state-options' className="grid grid-cols-6 gap-3 ms-4 mt-4 mb-3"
                 style={{display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1rem"}}>
                {ALL_STATES.map((state: any) => (
                    <div className="form-check form-switch" key={state}>
                        <input className="form-check-input" type="checkbox" id={state} checked={selectedStates.includes(state)}
                               onChange={() => handleStates(state)} />
                        <label className="form-check-label" htmlFor={state}>{state}</label>
                    </div>
                ))}
            </div>

            {/* COUNTRIES */}
            <h3 className="ms-4 mt-4">Countries:</h3>
            <div id='countries-options'>
                <li key='add-country-input' className="list-group-item d-flex align-items-center ms-4 mt-3">
                    <input className="form-control me-2" placeholder="Enter New Country" style={{ width: "46%" }}
                           onChange={(e) => setAddCountry(e.target.value)}/>
                    <button className="btn btn-success" onClick={() => handleCountries(addCountry, "add")}>Add</button>
                </li>
                {countries.map((country: string) => 
                    fixCountries === country ? 
                        (<li key={country} className="list-group-item d-flex align-items-center ms-4 mt-2">
                            <input className="form-control form-control-sm me-2" placeholder={country} style={{ width: "40%" }}
                                   onChange={(e) => setNewCountry(e.target.value)}/>
                            <button className="btn btn-warning me-2"
                                    onClick={() => handleCountries(country, "update", newCountry ? newCountry : country)}>Update</button>
                            <button className="btn btn-secondary" onClick={() => setFixCountries("")}>Cancel</button>
                        </li>)
                    : 
                        (<li key={country} className="list-group-item d-flex align-items-center ms-4 mt-2">
                           <span className="fs-6 me-3 text-truncate" style={{ width: "40%", display: "inline-block" }}>
                                 {country}
                            </span>
                            <button className="btn btn-primary me-2" onClick={() => (setFixCountries(country))}> 
                                Edit 
                            </button>
                            <button className="btn btn-danger" onClick={() =>handleCountries(country, "delete")}> 
                                Delete 
                            </button>
                        </li>)
                )}
            </div>

            {/* CUISINES */}
            <h3 className="ms-4 mt-4">Cuisines:</h3>
            <div id='cuisines-options'>
                <li key='add-cuisine-input' className="list-group-item d-flex align-items-center ms-4 mt-3">
                    <input className="form-control me-2" placeholder="Enter New Cuisine" style={{ width: "46%" }}
                           onChange={(e) => setAddCuisine(e.target.value)}/>
                    <button className="btn btn-success" onClick={() => handleCuisines(addCuisine, "add")}>Add</button>
                </li>
                {cuisines.map((cuisine: string) => 
                    fixCuisines === cuisine ? 
                        (<li key={cuisine} className="list-group-item d-flex align-items-center ms-4 mt-2">
                            <input className="form-control form-control-sm me-2" placeholder={cuisine} style={{ width: "40%" }}
                                   onChange={(e) => setNewCuisine(e.target.value)}/>
                            <button className="btn btn-warning me-2"
                                    onClick={() => handleCuisines(cuisine, "update", newCuisines ? newCuisines : cuisine)}>Update</button>
                            <button className="btn btn-secondary" onClick={() => setFixCuisines("")}>Cancel</button>
                        </li>)
                    : 
                        (<li key={cuisine} className="list-group-item d-flex align-items-center ms-4 mt-2">
                           <span className="fs-6 me-3 text-truncate" style={{ width: "40%", display: "inline-block" }}>
                                 {cuisine}
                            </span>
                            <button className="btn btn-primary me-2" onClick={() => (setFixCuisines(cuisine))}> 
                                Edit 
                            </button>
                            <button className="btn btn-danger" onClick={() =>handleCuisines(cuisine, "delete")}> 
                                Delete 
                            </button>
                        </li>)
                )}
            </div>

            {/* SOURCES */}
            <h3 className="ms-4 mt-4">Sources:</h3>
            <div id='sources-options'>
                <li key='add-source-input' className="list-group-item d-flex align-items-center ms-4 mt-3">
                    <input className="form-control me-2" placeholder="Enter New Source" style={{ width: "46%" }}
                           onChange={(e) => setAddSource(e.target.value)}/>
                    <button className="btn btn-success" onClick={() => handleSources(addSource, "add")}>Add</button>
                </li>
                {sources.map((source: string) => 
                    fixSources === source ? 
                        (<li key={source} className="list-group-item d-flex align-items-center ms-4 mt-2">
                            <input className="form-control form-control-sm me-2" placeholder={source} style={{ width: "40%" }}
                                   onChange={(e) => setNewSource(e.target.value)}/>
                            <button className="btn btn-warning me-2"
                                    onClick={() => handleSources(source, "update", newSource ? newSource : source)}>Update</button>
                            <button className="btn btn-secondary" onClick={() => setFixSources("")}>Cancel</button>
                        </li>)
                    : 
                        (<li key={source} className="list-group-item d-flex align-items-center ms-4 mt-2">
                           <span className="fs-6 me-3 text-truncate" style={{ width: "40%", display: "inline-block" }}>
                                 {source}
                            </span>
                            <button className="btn btn-primary me-2" onClick={() => (setFixSources(source))}> 
                                Edit 
                            </button>
                            <button className="btn btn-danger" onClick={() =>handleSources(source, "delete")}> 
                                Delete 
                            </button>
                        </li>)
                )}
            </div>

            {/* SAVE BUTTON */}
            <div className="m-4">
              <button
                className="btn btn-primary float-end me-4"
                onClick={saveChanges}
                disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
        </div>
    );
}