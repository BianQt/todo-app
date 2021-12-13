import React, { useEffect, useState, useContext } from "react";
import { SettingContext } from "../context/Settings.js";
import { Form, Button } from "react-bootstrap";
import "./todo/todo.scss";

const SettingsDev = () => {
  const { display, itemNumbers, sortItems, hardCode } =
    React.useContext(SettingContext);
  const [stateDisplay, setStateDisplay] = display;
  const [stateItemNum, setStateItemNum] = itemNumbers;
  const [stateSortItems, setStateSortItems] = sortItems;

  function handleSubmit(e) {
    e.preventDefault();
    setStateItemNum(e.target.text.value);
    setStateSortItems(e.target.sort.checked);
    setStateDisplay(e.target.display.checked);
    let saved ={
      itemNum : e.target.text.value,
      display: e.target.display.checked,
      sort:e.target.sort.checked
    }
    localStorage.setItem('ItemsNum',JSON.stringify(saved));
  }

  return (
    <>
      
      <Form onSubmit={handleSubmit} className='setting'>
      <header>
        <h1>Settings</h1>
      </header>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Number of Items</Form.Label>
          <Form.Control
            name="text"
            type="number"
            placeholder="Items to Display"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{display:'inline'}}>
          <Form.Label>Sort By Difficulty</Form.Label>
          <Form.Check type="checkbox" name="sort" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{display:'inline'}}>
          <Form.Label>Hide Completed Items</Form.Label>
          <Form.Check type="checkbox" name="display" />
        </Form.Group>

        <Button variant="primary" type="submit" text="Save">
          Save
        </Button>
      </Form>
    </>
  );
};

export default SettingsDev;
