import store from "./store";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";
import RestaurantsMap from "./Map/restuarants-map";
import { Provider, useDispatch, useSelector } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signin from "./Account/Signin";


export default function AngelasApp() {
    return (
    <HashRouter>
        <div className="h-100">
            <Provider store={store}>
                <div id='angelas-app'>
                    <div>
                        <Routes>
                            <Route path="/" element={<Navigate to="/Signin" />} />
                            <Route path='/Signin' element={<Signin />} />
                            <Route path="Account/*" element={<ProtectedRoute><h1><Account /></h1></ProtectedRoute>} />
                            <Route path="Map" element={<ProtectedRoute><RestaurantsMap /></ProtectedRoute>} />
                        </Routes>
                    </div>
                </div>
            </Provider>
        </div>
    </HashRouter>
    )

}