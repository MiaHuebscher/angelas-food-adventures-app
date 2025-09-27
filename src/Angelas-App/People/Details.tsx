import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as client from "./client";

export default function PeopleDetails({ fetchUsers }:
    { fetchUsers: () => void; }) {
  const { pid } = useParams();
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");  
  const [access, setAccess] = useState("");
  const [favCuisines, setFavCuisines] = useState("");
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const fetchUser = async () => {
    if (!pid) return;
    const user = await client.findUserById(pid);
    setUser(user);
    setUsername(user.username);
    setName(user.firstName + " " + user.lastName);
    setAccess(user.access);
    setFavCuisines(user.favCuisines);
  };
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    fetchUsers();
    navigate(`/People`);
  };
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, username: username, firstName: firstName, lastName: lastName, 
        access: access, favCuisines: favCuisines};
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    fetchUsers();
    navigate(`/People`);
  };
  useEffect(() => {
    if (pid) fetchUser();
  }, [pid]);
  if (!pid) return null;
  return (
    <div className="position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25 text-black">
        <Link to={`/People`} className="btn position-fixed end-0 top-0">
            <IoCloseSharp className="fs-1" /> </Link>
        <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
        <div className="custom-color fs-4"> 
            {!editing && (
                <FaPencil onClick={() => setEditing(true)}
                          className="float-end fs-5 mt-2 text-primary" /> )}
            {editing && (
                <FaCheck onClick={() => saveUser()}
                        className="float-end fs-5 mt-2 me-2 text-success" /> )}
            {!editing && (
                <div onClick={() => setEditing(true)}>
                    {user.firstName} {user.lastName}</div>)}
            {user && editing && (
                <input className="form-control w-50"
                    defaultValue={`${user.firstName} ${user.lastName}`}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === "Enter") { saveUser(); }}}
                />
            )}
        </div><br />
        <div className="d-flex flex-column">
            {/* Username */}
            <div className="mb-2">
                <b>Username:</b>
                {!editing && (
                <div
                    className="ms-2 d-inline-block"
                    onClick={() => setEditing(true)}
                    style={{ cursor: "pointer"}}>
                    {user.username}
                </div>)}
                {user && editing && (
                <input defaultValue={user.username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control form-control-sm ms-2 mt-1 fs-7 d-inline-block"
                    style={{ width: "55%" }}
                    id="details-username-input"
                    onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        saveUser();
                    }
                    }} />
                )}
            </div>

            {/* Access Type */}
            <div className="mb-2">
                <b>Access Type:</b>
                {!editing && (
                <div
                    className="ms-2 d-inline-block"
                    onClick={() => setEditing(true)}
                    style={{ cursor: "pointer"}}>
                    {user.access}
                </div>)}
                {user && editing && (
                <select
                    defaultValue={user.access}
                    onChange={(e) => setAccess(e.target.value)}
                    className="form-select form-select-sm ms-2 mt-1 fs-7 d-inline-block"
                    style={{ width: "55%" }}
                    id="details-role-dropdown"
                    onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        saveUser();
                    }
                    }}>
                    <option value="READ-ONLY">Read Only</option>
                    <option value="READ-WRITE">Read & Write</option>
                    <option value="READ-WRITE-DELETE">Read, Write, & Delete</option>
                    <option value="FULL-POWER">Full Power</option>
                </select>
                )}
            </div>
            {/* Login ID */}
            <div className="mb-2">
                <b>Login ID:</b> {user._id}
            </div>

            {/* Number of Restaurants */}
            <div className="mb-2">
                <b># of Restaurants Added:</b> {user?.numRestsAdded ?? 0}
            </div>

            {/* Favorite Cuisines */}
            <div className="mb-2">
                <b>Favorite Cuisine(s):</b>
                {!editing && (
                <div
                    className="ms-2 d-inline-block"
                    onClick={() => setEditing(true)}
                    style={{ cursor: "pointer"}}>
                    {user.favCuisines}
                </div>)}
                {user && editing && (
                <input defaultValue={user.favCuisines}
                    onChange={(e) => setFavCuisines(e.target.value)}
                    className="form-control form-control-sm ms-2 mt-1 fs-7 d-inline-block"
                    style={{ width: "55%" }}
                    id="details-username-input"
                    onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        saveUser();
                    }
                    }} />
                )}
            </div>
        </div>
        <hr />
        <button onClick={() => deleteUser(pid)} className="btn btn-danger float-end" > Delete </button>
        <Link to={`/People`} className="btn btn-secondary float-start float-end me-2" > Cancel </Link>
    </div> 
  ); 
}