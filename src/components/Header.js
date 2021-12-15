import React, { useContext } from "react";
import { Navbar, Alignment } from "@blueprintjs/core";
import { Button } from "react-bootstrap";
import { LoginContext } from "./auth/context";
import { Link } from "react-router-dom";

const style = {
  fontSize: "1.6em",
  paddingTop: "0.3em",
  marginRight: "1em",
  color: "#ffffffb3"
};

export default function Header() {
  const context = React.useContext(LoginContext);
  console.log("header===>", context.user);

  return (
    <Navbar
      className="bp3-dark"
      style={{
        height: "5em",
        paddingTop: "0.5em",
        backgroundColor: "rgb(46 112 137)",
      }}
    >
      <Navbar.Group align={Alignment.LEFT}>
        <Link to="/" style={{ color: "white" }}>
          {" "}
          <Navbar.Heading
            style={{
              fontSize: "3.5em",
              fontFamily: "'Lobster', cursive",
              fontFamily: "'Passion One', cursive",
            }}
          >
            ToDo{" "}
          </Navbar.Heading>
        </Link>
      </Navbar.Group>
      {context.loggedIn && (
        <Navbar.Group align={Alignment.RIGHT}>
          <h3 style={style}>Hello, {context.user.username}!</h3>
          <Link
            to="/setting"
            style={{ color: "#ffffff9c" }}
          >
             <Button
              style={{
                borderRadius: "50px",
                fontWeight: "bold",
                margin: ".5em 5px",
                backgroundColor: "#d7cbcc69",
                border: "0px",
                paddingTop: "0.2em"
              }}
            >
              Settings
            </Button>{" "}
          </Link>
          <Button
            style={{
              borderRadius: "50px",
              fontWeight: "bold",
              margin: ".5em 5px",
              backgroundColor: "rgb(223 62 75 / 66%)",
              border: "0px",
              paddingTop: "0.2em"
            }}
            onClick={context.logout}
          >
            Logout
          </Button>
        </Navbar.Group>
      )}
      {!context.loggedIn && (
        <Navbar.Group align={Alignment.RIGHT}>
          <Button
            style={{
              borderRadius: "50px",
              fontWeight: "bold",
              margin: "0 5px",
              backgroundColor: "#d7cbcc69",
              border: "0px",
            }}
            onClick={context.logout}
          >
            Log In
          </Button>
        </Navbar.Group>
      )}
    </Navbar>
  );
}
