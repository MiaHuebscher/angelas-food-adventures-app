import store from "./store";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";
import PeopleMgmtProtectedRoute from "./extraProtectedRoute";
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
    <HashRouter>
        <div className="min-vh-100" id='angelas-app'>
            <Provider store={store}>
                <div className="d-flex min-vh-100">
                    <div className={`bg-black ${showNav ? 'd-block' : 'd-none d-md-block w-20'}`} style={{ width: "10%" }}>
                        <Navigation />
                    </div>
                    <div className="flex-fill p-4">
                        <button
                            className="btn btn-outline-secondary d-md-none mb-2"
                            onClick={() => setShowNav(!showNav)}>
                            ☰ Menu
                        </button>
                        <Routes>
                            <Route path="/" element={<Navigate to="/Account/Signin" />} />
                            <Route path="Account/*" element={<h1><Account /></h1>} />
                            <Route path="Map" element={<ProtectedRoute><RestaurantsMap /></ProtectedRoute>} />
                            <Route path='People' element={
                                <ProtectedRoute>
                                    <PeopleMgmtProtectedRoute>
                                        <PeopleTable />
                                    </PeopleMgmtProtectedRoute>
                                </ProtectedRoute>} />
                            <Route path='People/:pid' element={
                                <ProtectedRoute>
                                    <PeopleMgmtProtectedRoute>
                                        <PeopleTable />
                                    </PeopleMgmtProtectedRoute>
                                </ProtectedRoute>} />
                            <Route path='Data' element={
                                <ProtectedRoute>
                                    <PeopleMgmtProtectedRoute>
                                        <Data />
                                    </PeopleMgmtProtectedRoute>
                                </ProtectedRoute>} />
                        </Routes>
                    </div>
                </div>
            </Provider>
        </div>
    </HashRouter>
    )
}