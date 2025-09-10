import store from "./store";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";
import PeopleMgmtProtectedRoute from "./peopleMgmtProtectedRoute";
import RestaurantsMap from "./Map/restuarants-map";
import PeopleTable from "./People/Table";
import { Provider } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';


export default function AngelasApp() {
    return (
    <HashRouter>
        <div className="h-100">
            <Provider store={store}>
                <div id='angelas-app'>
                    <div>
                        <Routes>
                            <Route path="/" element={<Navigate to="/Signin" />} />
                            <Route path="Account/*" element={<h1><Account /></h1>} />
                            <Route path="Map" element={<ProtectedRoute><RestaurantsMap /></ProtectedRoute>} />
                            <Route path='People' element={<PeopleMgmtProtectedRoute><PeopleTable /></PeopleMgmtProtectedRoute>} />
                        </Routes>
                    </div>
                </div>
            </Provider>
        </div>
    </HashRouter>
    )

}