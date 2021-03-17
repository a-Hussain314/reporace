import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from '../utilities/History';


import "../styles/global.scss";


function App() {


    return (
        <Router history={createBrowserHistory}>
            <main className="appMain">
              home page
            </main>
        </Router>

    );
}



export default App;
