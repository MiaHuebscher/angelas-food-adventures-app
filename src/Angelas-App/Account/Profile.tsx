import * as accountClient from "./client";
import * as peopleClient from './../People/client';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./accountReducer";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [status, setStatus] = useState(false);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [access, setAccess] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    await peopleClient.updateUser(updatedUser);
    setProfile(updatedUser);
    navigate("/Account/Profile");
    setStatus(true);
    dispatch(setCurrentUser(updatedUser));
  };
  const signout = async () => {
    await accountClient.signout();
    dispatch(setCurrentUser(null));
    navigate("/Account/Signin");
  };
  useEffect(() => { fetchProfile(); }, []);
  return (
    <div>
      <h1>Profile</h1>
      {status && 
      <div className="alert alert-success" role="alert">
        Successfully Updated Account Information!
      </div>}
      {profile && (
        <div>
          <input className="form-control mb-2" defaultValue={currentUser ? currentUser.username : profile.username}  onChange={(e) => setUsername(e.target.value)}
                 placeholder="username"/>
          <input className="form-control mb-2" defaultValue={currentUser ? currentUser.password : profile.password}  onChange={(e) => setPassword(e.target.value)}
                 placeholder="password"/>
          <input className="form-control mb-2" defaultValue={currentUser ? currentUser.firstName : profile.firstName} onChange={(e) => setFirstName(e.target.value)}
                 placeholder="first name"/>
          <input className="form-control mb-2" defaultValue={currentUser ? currentUser.lastName : profile.lastName}  onChange={(e) => setLastName(e.target.value)}
                 placeholder="last name"/>
          <select className="form-control mb-2" onChange={(e) => setAccess(e.target.value)} defaultValue={profile.access}>
            <option selected={currentUser ? currentUser.access === "READ-ONLY" : profile.access === "READ-ONLY"} value="READ-ONLY">Read Only</option>        
            <option selected={currentUser ? currentUser.access === "READ-WRITE" : profile.access === "READ-WRITE"} value="READ-WRITE">Read & Write</option>
          </select>
        </div>
      )}
      <button onClick={saveUser} className="btn btn-primary w-100">
        Update Information
      </button>
      <button onClick={signout} className="btn btn-danger w-100">
        Sign out
      </button>

    </div>
  );
}

