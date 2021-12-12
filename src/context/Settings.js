import React, { Component ,useState, useContext } from 'react'

export const SettingContext = React.createContext();

export default function Settings(props) {
    const [display, setDisplay] = useState(true);
    const [itemNumbers, setItemNumbers] = useState(5);
    const [sortItems, setSortItems] = useState(false);
    const hardCodes ='';

    return (
      <SettingContext.Provider value={{display:[display, setDisplay],itemNumbers:[itemNumbers, setItemNumbers],sortItems:[sortItems, setSortItems],hardCodes:hardCodes}}>
        {props.children}
      </SettingContext.Provider >
    )
  }