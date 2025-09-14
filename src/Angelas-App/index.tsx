import store from "./store";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";
import PeopleMgmtProtectedRoute from "./extraProtectedRoute";
import RestaurantsMap from "./Map/RestaurantsMap";
import PeopleTable from "./People/Table";
import { Provider } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navigation from "./Navigation";


export default function AngelasApp() {
    return (
    <HashRouter>
        <div className="min-vh-100" id='angelas-app'>
            <Provider store={store}>
                <div className='d-flex min-vh-100'>
                    <div className="d-none d-md-block bg-black">
                        <Navigation />
                    </div>
                    <div className="flex-fill p-4">
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
                            <Route path='Data' element={
                                <ProtectedRoute>
                                    <PeopleMgmtProtectedRoute>
                                        <PeopleTable />
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