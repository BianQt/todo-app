import React, { useEffect, useState, useContext } from "react";
import useForm from "../../hooks/form.js";
import { SettingContext } from "../../context/Settings.js";
import { LoginContext } from "../auth/context";
import Auth from "..//auth/auth";
import { Form, Button, Container, Row, Col, Pagination } from "react-bootstrap";
import "./todo.scss";
import { show } from "@blueprintjs/core/lib/esm/components/context-menu/contextMenu";

const ToDo = () => {
  const [list, setList] = useState([]);
  const [pages, setPages] = useState(1);
  const [active, setActive] = useState(1);
  const [counter, setCounter] = useState(0);
  const [showedList, setShow] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);
  const { display, itemNumbers, sortItems, hardCode } =
    React.useContext(SettingContext);
  const context = React.useContext(LoginContext);
  const stateDisplay = display[0];
  const stateItemNum = itemNumbers[0];
  const stateSortItems = sortItems[0];

  function addItem(item) {
    if (context.user.capabilities.includes("create")) {
      item.complete = false;

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${context.user.token}`);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(item);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://bianqt-todo.herokuapp.com/todo/tasks", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      setList([...list, item]);
    }
  }

  function deleteItem(id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${context.user.token}`);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://bianqt-todo.herokuapp.com/todo/tasks/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    if (context.user.capabilities.includes("delete")) {
      const items = list.filter((item) => item.id !== id);
      setList(items);
    }
  }

  function toggleComplete(itemI, id) {
    if (context.user.capabilities.includes("update")) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${context.user.token}`);
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        complete: !itemI.complete,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `https://bianqt-todo.herokuapp.com/todo/tasks/${id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      const items = list.map((item) => {
        if (item.id == id) {
          item.complete = !item.complete;
        }
        return item;
      });
      setList(items);
    }
  }

  useEffect(async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${context.user.token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    if (context.loggedIn && counter < 3) {
      fetch("https://bianqt-todo.herokuapp.com/todo/tasks", requestOptions)
        .then((response) => response.json())
        .then((result) => setList(result))
        .catch((error) => console.log("error", error));
      setCounter(counter + 1);
    }

    let page = Math.ceil(list.length / stateItemNum);
    setPages(page);

    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    let filterArr = list.filter((item) => item.complete === false);
    stateDisplay ? setShow(filterArr) : setShow(list);
  }, [context.loggedIn, list, active]);

  let items = [];
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        activeLabel=""
        onClick={() => {
          setActive(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Container className="container">
        <Row>
          <Auth>
            <header className="header">
              <h1>To Do List: {incomplete} items pending</h1>
            </header>
          </Auth>
        </Row>
        <Row>
          <Auth>
            <Col style={{ flex: "none" }} lg={3}>
              <Form onSubmit={handleSubmit} className="add-items">
                <h2>Add To Do Item</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>To Do Item</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    name="task"
                    type="text"
                    placeholder="Item Details"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Assigned To</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    name="name"
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
          </Auth>
          <Auth>
            <Col xs={9}>
              <div className="list">
                {(stateSortItems
                  ? showedList.sort((a, b) => b.difficulty - a.difficulty)
                  : showedList
                ).map((item, index) => {
                  if (
                    index >= (active - 1) * stateItemNum &&
                    index < active * stateItemNum
                  ) {
                    return (
                      <div className="list-item" key={item.id}>
                        <div className="item-header">
                          {context.loggedIn &&
                            context.user.capabilities.includes("delete") && (
                              <button onClick={() => deleteItem(item.id)}>
                                X
                              </button>
                            )}
                          <div
                            onClick={() => toggleComplete(item, item.id)}
                            style={
                              item.complete
                                ? { backgroundColor: "#35cd35" }
                                : { backgroundColor: "red" }
                            }
                          >
                            {item.complete ? "Complete" : "Pending"}
                          </div>
                          <p>{item.name}</p>
                        </div>
                        <div className="item-body">
                          <p>{item.task}</p>
                          <small>Difficulty: {item.difficulty}</small>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <Pagination size="sm">{items}</Pagination>
            </Col>
          </Auth>
        </Row>
      </Container>
    </>
  );
};

export default ToDo;
