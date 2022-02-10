import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from './components/Admin';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Reset from './components/Reset';
import { auth } from './firebase';

function App() {

    const [firebaseUser, setFarabseUser] = useState(false);
    
    useEffect( () => {
        auth.onAuthStateChanged(user => {
            console.log(user);

            if (user) {
                setFarabseUser(user);
            } else {
                setFarabseUser(null);
            }
        })
    },[])

    return firebaseUser !== false ? (
        <Router>
            <div className="container">
                <Navbar firebaseUser={firebaseUser} />

                <Switch>
                    <Route path='/login' exact>
                        <Login />
                    </Route>

                    <Route path='/admin' exact>
                        <Admin />
                    </Route>

                    <Route path='/' exact>
                        ...Inicio
                    </Route>

                    <Route path='/reset' exact>
                        <Reset />
                    </Route>
                </Switch>
            </div>
        </Router>
    ) : (
        <p>Cargando</p>
    )
}

export default App;
