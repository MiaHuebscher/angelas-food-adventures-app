import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./accountReducer";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import "../../App.css";

export default function Signin() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signin = async () => {
    try {
      const currentUser = await client.signin(credentials);
      dispatch(setCurrentUser(currentUser));
      navigate("/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="d-flex justify-content-center" style={{ marginTop: "15vh" }}>
      <div className='w-50'>
        <h1 className='text-center'>Sign in</h1><br />
        {error && <div className=" alert alert-danger fs-6">{error}</div>}
        <input onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          value={credentials.username} className="form-control mb-2" placeholder="username" />
        <input onChange={(e) => setCredentials({ ...credentials, password: e.target.value }) }
          value={credentials.password} className="form-control mb-2" placeholder="password" type="password" 
          onKeyDown={(e) => { if (e.key === "Enter") { signin(); }}}/>
        <button onClick={signin} className="btn custom-button-design w-100"> Sign in </button>
        <br />
      </div>
    </div>
  );
}