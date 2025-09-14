import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./accountReducer";
import * as client from "./client";

export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async () => {
    try {
      user._id = new Date().getTime().toString();
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1>Sign up</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <input value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })}
             className="form-control mb-2" placeholder="username" />
      <input value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })}
             className="form-control mb-2" placeholder="username" />
      <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
             className="form-control mb-2" placeholder="username" />
      <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password"
             className="form-control mb-2" placeholder="password" />
      <select value={user.access} onChange={(e) =>setUser({ ...user, access: e.target.value})} className="form-select mb-2" >
        <option value="READ-ONLY">Read Only</option>        
        <option value="READ-WRITE">Read & Write</option>
        <option value='READ-WRITE-DELETE'>Read, Write, & Delete</option>
      </select>
      <button onClick={signup} className="btn btn-primary mb-2"> Sign up </button><br />
    </div>
  );
}

