import * as accountClient from "./client";
import * as peopleClient from './../People/client';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./accountReducer";
import '../People/People.css';

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [status, setStatus] = useState(false);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [access, setAccess] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [favCuisines, setFavCuisines] = useState(""); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const account = await accountClient.profile();
      setProfile(account);
      setFirstName(account.firstName || "");
      setLastName(account.lastName || "");
      setAccess(account.access || "");
      setUsername(account.username || "");
      setPassword(account.password || "");
    } catch (err: any) {
      navigate("/Account/Signin");
    }
  };
  const saveUser = async () => {
    const updatedUser = { ...profile, firstName: firstName, lastName: lastName, access: access, username: username, 
      password: password };
    const resp = await peopleClient.updateUser(updatedUser);
    setProfile(updatedUser);
    navigate("/Account/Profile");
    setStatus(true);
    dispatch(setCurrentUser(updatedUser));
  };
  const signout = async () => {
    await accountClient.signout();
    navigate("/Account/Signin");
    dispatch(setCurrentUser(null));
  };
  useEffect(() => { fetchProfile(); }, []);
  return (
    <div className="container-fluid">
      <h1>Profile</h1><hr />
      {status && 
      <div className="alert alert-success" role="alert">
        Successfully Updated Account Information!
      </div>}
      {profile && (
        <form>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label fs-5 mb-2" htmlFor="username">Username</label>
            <div className="col-sm-10">
              <input id="username" className="form-control mb-2" placeholder="Username"
                defaultValue={currentUser ? currentUser.username : profile.username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label fs-5 mb-2" htmlFor="password">Password</label>
            <div className="col-sm-10">
              <input id="password" className="form-control mb-2" placeholder="Password"
                defaultValue={currentUser ? currentUser.password : profile.password} onChange={(e) => setPassword(e.target.value)}/>
            </div> 
          </div> 
          <div className="form-group row">
            <label className="col-sm-2 col-form-label fs-5 mb-2" htmlFor="first-name">First Name</label>
            <div className="col-sm-10">
              <input id="first-name" className="form-control mb-2" placeholder="First Name"
                defaultValue={currentUser ? currentUser.firstName : profile.firstName} onChange={(e) => setFirstName(e.target.value)}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label fs-5 mb-2" htmlFor="last-name">Last Name</label>
            <div className="col-sm-10">
              <input id="last-name" className="form-control mb-2" placeholder="Last Name" 
                defaultValue={currentUser ? currentUser.lastName : profile.lastName}  onChange={(e) => setLastName(e.target.value)}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label fs-5 mb-2" htmlFor="access">Access Type</label>
            <div className="col-sm-10">
              <select id="access" className="form-control mb-2" onChange={(e) => setAccess(e.target.value)} defaultValue={profile.access} 
                      disabled={(currentUser.firstName === "Angela" && currentUser.lastName === "Todd") ? false : true}>
                <option selected={currentUser ? currentUser.access === "READ-ONLY" : profile.access === "READ-ONLY"} value="READ-ONLY">Read Only</option>        
                <option selected={currentUser ? currentUser.access === "READ-WRITE" : profile.access === "READ-WRITE"} value="READ-WRITE">Read & Write</option>
                <option selected={currentUser ? currentUser.access === "READ-WRITE-DELETE" : profile.access === "READ-WRITE-DELETE"} 
                        value="READ-WRITE-DELETE">Read, Write, & Delete</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label fs-5 mb-1" htmlFor="fav-cuisines">Favorite Cuisine(s)</label>
            <div className="col-sm-10">
              <input id="fav-cuisines" className="form-control mb-2" placeholder="Favorite Cuisine(s)"
                     defaultValue={currentUser ? currentUser.favCuisines : profile.favCuisines}
                     onChange={(e) => setFavCuisines(e.target.value)}/>
            </div>
          </div>
        </form>
      )}
      <button onClick={saveUser} className="btn custom-button-design w-100">
        Update Information
      </button>
      <button onClick={signout} className="btn btn-danger w-100">
        Sign out
      </button>
    </div>
  );
}

