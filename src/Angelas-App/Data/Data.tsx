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
    const [fix, setFix] = useState("");
    const [message, setMessage] = useState("");
    const [executed, setExecuted] = useState(false);
    const [error, setError] = useState(false);
    const [selectedStates, setSelectedStates] = useState<string[]>([]);
    const [angelasRatings, setAngelasRatings] = useState<string[]>([]);
    const getData = async () => {
        const serverData = await client.getData();
        setData(serverData[0]);
        setSelectedStates(serverData[0].states ?? []);
        setAngelasRatings(serverData[0].angelasRatings ?? []);
    };
    // Load data from server when page loads
    useEffect(() => {
        getData();
    }, []);

    // Toggle rating selection
    const handleRatings = (rating: string, command: string) => {
        if (command === "delete") {
            setAngelasRatings(prev => prev.filter(r => r !== rating));
        };
        if (command === "add") {
            setAngelasRatings(prev => [...prev, rating]);
        };        
    };

    // Toggle state selection
    const handleStates = (state: string) => {
        setSelectedStates(prev =>
        prev.includes(state)
            ? prev.filter(s => s !== state)
            : [...prev, state]
        );
    };
    // Save updates to server
    const saveChanges = async () => {
        const updatedData = { ...data, states: selectedStates};
        console.log(updatedData);
        try {
        setSaving(true);
        await client.updateData(updatedData);
        setMessage("✅ Updates saved successfully!");
        setError(false);
        } catch (err: any) {
        setMessage(`❌ Failed to updated data. Error: ${err.response?.data?.message ?? err.message}.)`)
        setError(true);
        } finally {
        setSaving(false);
        setExecuted(true);
        }
    };
    return (
        <div className="container-fluid">
            <h1 className="m-4">Data Management</h1>
            {executed && <div className={`alert ${error ? "alert-danger" : "alert-success"}`} role="alert">{message}</div>}
            <h3 className="ms-4">Angelas Ratings:</h3>
            <div id='angelas-ratings-options'>
                {angelasRatings.map((rating: any) => (
                    <li key={rating} className="list-group-item">
                        <strong className="fs-3">{rating}</strong>
                        <button className="btn btn-danger float-end"
                                onClick={() =>handleRatings(rating, "delete")}
                                id="wd-delete-todo-click"> Delete </button>
                        <button className="btn btn-primary float-end me-2"
                                onClick={() => (setFix(rating))}
                                id="wd-set-todo-click"> Edit </button>
                    </li>
                ))}
            </div>
            <h3 className="ms-4 mt-4">States:</h3>
            <div id='state-options' className="grid grid-cols-10 gap-3 p-4"
                 style={{display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "1rem"}}>
                {ALL_STATES.map((state: any) => (
                    <div className="form-check form-switch" key={state}>
                        <input className="form-check-input" type="checkbox" id={state} checked={selectedStates.includes(state)}
                               onChange={() => handleStates(state)} />
                        <label className="form-check-label" htmlFor={state}>{state}</label>
                    </div>
                ))}
            </div>
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