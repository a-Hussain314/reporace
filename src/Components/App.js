import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from '../utilities/History';

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Home from "./pages/Home";

import "../styles/global.scss"
import "./layout/layout.scss";


function App() {


    return (
        <Router history={createBrowserHistory}>
            <Header />
            <main className="appMain">
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={() => <Home />}
                    />
                </Switch>
            </main>
            <Footer />
        </Router>
    );
}



export default App;
