import React, { useEffect, useState, useContext } from "react";
import useForm from "../../hooks/form.js";
import { SettingContext } from "../../context/Settings.js";
import { v4 as uuid } from "uuid";
import { Form, Button, Container, Row, Col,Pagination } from "react-bootstrap";
import "./todo.scss";
import { show } from "@blueprintjs/core/lib/esm/components/context-menu/contextMenu";

const ToDo = () => {
  const [list, setList] = useState([]);
  const [pages, setPages] = useState(1);
  const [active, setActive] = useState(1);
  const [showedList, setShow] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  const { display, itemNumbers, sortItems, hardCode } = React.useContext(SettingContext);
  const stateDisplay = display[0];
  const stateItemNum = itemNumbers[0];
  const stateSortItems = sortItems[0];

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    console.log(item.id);
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);
  }

  useEffect(() => {
    let page = Math.ceil(list.length/stateItemNum);
    setPages(page);
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    let filterArr = list.filter((item)=> item.complete===false);
    stateDisplay? setShow(filterArr) : setShow(list);

  }, [list, stateItemNum, active,stateDisplay, stateSortItems]);


let items = [];
for (let number = 1; number <= pages; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active} activeLabel='' onClick={()=>{setActive(number)}}>
      {number}
    </Pagination.Item>,
  );
}

  return (
    <>
      <Container>
      <Row>
      <header className="header">
        <h1>To Do List: {incomplete} items pending</h1>
      </header>
      </Row>
        <Row>
          <Col style={{ flex: "none" }} lg={3}>
            <Form onSubmit={handleSubmit} className="add-items">
              <h2>Add To Do Item</h2>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>To Do Item</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="text"
                  type="text"
                  placeholder="Item Details"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Assigned To</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="assignee"
                  type="text"
                  placeholder="Assignee Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Difficulty</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  defaultValue={3}
                  type="range"
                  min={1}
                  max={5}
                  name="difficulty"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Item
              </Button>
            </Form>
          </Col>
          <Col xs={9}>
            <div className="list">
              {(stateSortItems ? showedList.sort((a, b) => b.difficulty - a.difficulty):showedList).map((item,index) => {
                if(index>=((active-1)*stateItemNum) && index<(active*stateItemNum)){
                  return <div className="list-item" key={item.id}>
                  <div className="item-header">
                  <button onClick={() => deleteItem(item.id)}>X</button>
                  <div onClick={() => toggleComplete(item.id)} style={item.complete? {backgroundColor:'#35cd35'}:{backgroundColor:'red'} }>
                  {item.complete? 'Complete':'Pending' }
                  </div>
                  <p>
                  {item.assignee}
                  </p>
                  </div>
                <div className="item-body">
                  <p>{item.text}</p>
                    <small>Difficulty: {item.difficulty}</small>
                  </div>
                </div>
                }})}
            </div>
            <Pagination size="sm">{items}</Pagination>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ToDo;
