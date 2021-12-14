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
        <Login />

        <Auth>
          <div>Any valid user can see this</div>
        </Auth>

        <Auth capability="create">
          <div>Users with create access can see this</div>
        </Auth>

        <Auth capability="update">
          <div>Users with update access can see this</div>
        </Auth>

        <Auth capability="delete">
          <div>Users with delete access can see this</div>
        </Auth>

        </LoginProvider>
      <Settings>
      <Header/>
      <Router>
          <Switch>
            <Route exact path="/">
            <ToDo/>
            </Route>
            <Route path="/settings">
            <SettingsDev/>
            </Route>
            
          </Switch>
        </Router>
      
      
      </Settings>
     
      </>
    );
}
