import React  from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Settings from './context/Settings.js';
import ToDo from './components/todo/todo.js';
import SettingsDev from './components/settings.js';
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginProvider from './components/auth/context.js';
import Login from './components/auth/login';
import Auth from './components/auth/auth';


export default function App() {

    return (<>
      <LoginProvider>
      <Header/>
      <Login />
      <Auth >
      <Settings>
      <Router>
          <Switch>
            
            <Route path="/settings">
            <SettingsDev/>
            </Route>
            <Route exact path="/">
            <ToDo/>
            </Route>
            
          </Switch>
        </Router>
      
      
      </Settings>
      </Auth>
      </LoginProvider>
      </>
    );
}
