import React , {Component} from 'react';
import Settings from './context/Settings.js';
import ToDo from './components/todo/todo.js';
import SettingsDev from './components/settings.js';
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
    return (
      <Settings>
      <Header/>
      <SettingsDev/>
      <ToDo/>
      </Settings>
    );
}
