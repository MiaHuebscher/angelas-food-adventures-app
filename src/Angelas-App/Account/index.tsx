import { Routes, Route, Navigate } from "react-router-dom";
import Signin from './Signin';
import Profile from './Profile';
import Signup from './Signup';
import { useSelector } from "react-redux";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div>
      <div className="d-flex">
        <div className="flex-fill p-4 pt-0">
          <Routes>
            <Route path="/" element={ <Navigate to={ currentUser ? "/Account/Profile" : "/Account/Signin" } /> } />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Signup" element={<h1><Signup /></h1>} />
            <Route path="/Profile" element={<h1><Profile /></h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}