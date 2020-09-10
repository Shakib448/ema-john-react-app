import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {

    const [loggedInUser, setLoggedInUser] = useState({});

    return (
        <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
            <h3> email: {loggedInUser.email} </h3>
            <Router>
                <Header></Header>
                <Switch>
                    <Route exact path="/shop">
                        <Shop></Shop>
                    </Route>
                    <Route exact path="/review">
                        <Review></Review>
                    </Route>
                    <PrivateRoute exact path="/inventory">
                        <Inventory></Inventory>
                    </PrivateRoute>
                    <Route exact path="/">
                        <Shop></Shop>
                    </Route>
                    <Route path="/product/:productKey">
                        <ProductDetail></ProductDetail>
                    </Route>
                    <Route exact path="/login">
                        <Login></Login>
                    </Route>
                    <PrivateRoute exact path="/shipment">
                        <Shipment></Shipment>
                    </PrivateRoute>
                    <Route exact path="*">
                        <NotFound></NotFound>
                    </Route>
                </Switch>
            </Router>

        </UserContext.Provider>
    );
}

export default App;
