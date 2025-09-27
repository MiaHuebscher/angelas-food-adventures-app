import store from "./store";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";
import ExtraProtectedRoute from "./extraProtectedRoute";
import RestaurantsMap from "./Map/RestaurantsMap";
import PeopleTable from "./People/Table";
import { Provider } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import Navigation from "./Navigation";
import Data from "./Data/Data";

export default function AngelasApp() {
    const [showNav, setShowNav] = useState(false);
    return (
    <Provider store={store}>
        <HashRouter>
            <div className="min-vh-100" id='angelas-app'>
                <div className="d-flex min-vh-100">
                    <div className={`bg-black ${showNav ? 'd-block' : 'd-none d-md-block'}`} 
                    style={{ width: "10%", minHeight: '100vh', position: 'fixed', top:0, left: 0, zIndex: 1000 }}>
                        <Navigation />
                    </div>
                    <div className="flex-fill p-4" style={{ marginLeft: '10%'}}>
                        <button
                            className="btn btn-outline-secondary d-md-none mb-2"
                            onClick={() => setShowNav(!showNav)}>
                            ☰ Menu
                        </button>
                        <Routes>
                            <Route path="/" element={<Navigate to="/Account/Signin" />} />
                            <Route path="Account/*" element={<Account />} />
                            <Route path="Map" element={<ProtectedRoute><RestaurantsMap /></ProtectedRoute>} />
                            <Route path='People' element={
                                <ProtectedRoute>
                                    <ExtraProtectedRoute>
                                        <PeopleTable />
                                    </ExtraProtectedRoute>
                                </ProtectedRoute>} />
                            <Route path='People/:pid' element={
                                <ProtectedRoute>
                                    <ExtraProtectedRoute>
                                        <PeopleTable />
                                    </ExtraProtectedRoute>
                                </ProtectedRoute>} />
                            <Route path='Data' element={
                                <ProtectedRoute>
                                    <ExtraProtectedRoute>
                                        <Data />
                                    </ExtraProtectedRoute>
                                </ProtectedRoute>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </HashRouter>
    </Provider>
    )
}