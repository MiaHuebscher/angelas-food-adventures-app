import { FaPlus } from "react-icons/fa";

export default function mapFilters({setLocations} : { setLocations: (locations: string) => void}) {
    return (
        <div className="d-flex mb-3">
        <button onClick={() =>setLocations("")} className="float-end btn custom-button-design">
                  <FaPlus className="me-2" /> Add User
                </button>
                <input onChange={() =>setLocations("")} placeholder="Search people"
                       className="form-control float-start w-25 me-2" />
                <select onChange={() =>setLocations("")} className="form-select float-start w-25" >
                  <option value="">All Access Types</option>        
                  <option value="READ-ONLY">Read Only</option>
                  <option value="READ-WRITE">Read & Write</option>
                  <option value="READ-WRITE-DELETE">Read, Write, & Delete</option>
                </select>
        </div>
    )
};