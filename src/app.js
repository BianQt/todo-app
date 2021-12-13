import React  from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Settings from './context/Settings.js';
import ToDo from './components/todo/todo.js';
import SettingsDev from './components/settings.js';
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
    return (
      
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
    );
}
