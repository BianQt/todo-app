import React from "react";
import { When } from "react-if";
import { LoginContext } from "./context.js";
import { Form, Button, Modal } from "react-bootstrap";
import "./login.scss";

class Login extends React.Component {
  static contextType = LoginContext;
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", showSignUp: false };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.login(this.state.username, this.state.password);
  };

  handleSignUp = (e) => {
    e.preventDefault();
    this.context.signup(e.target.username.value, e.target.password.value, e.target.role.value);
    this.setState({ showSignUp: false })
  };

  render() {
    return (
      <>
        <When condition={!this.context.loggedIn}>
          <Form className="loginForm" onSubmit={this.handleSubmit}>
            <h1>ToDo </h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="username"
                data-testid="username-input"
                onChange={this.handleChange}
                placeholder="Enter email or User Name"
                style={{ height: "3em" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                name="password"
                data-testid="password-input"
                onChange={this.handleChange}
                placeholder="Password"
                style={{ height: "3em", marginBottom: "30px" }}
              />
            </Form.Group>
            <Button
              variant="danger"
              type="submit"
              data-testid="btn"
              style={{
                width: "15em",
                borderRadius: "5em",
                fontSize: "20px",
              }}
            >
              Sign In
            </Button>
            <br />
            Or
            <br />
            <Button
              variant="primary"
              style={{
                width: "15em",
                borderRadius: "5em",
                fontSize: "20px",
              }}
              onClick={() => {
                this.setState({ showSignUp: true });
              }}
            >
              Sign Up
            </Button>
          </Form>

          <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.showSignUp}
          >
            <Modal.Header
              closeButton
              onClick={() => {
                this.setState({ showSignUp: false });
              }}
              style={{
                border: "0px",
              }}
            ></Modal.Header>
            <div
              style={{
                padding: "0px 70px 60px",
              }}
            >
              <Modal.Title
                style={{
                  textAlign: "center",
                  padding: "0 0 20px",
                }}
              >
                <br />
                <h2 style={{ fontWeight: "700" }}>Welcome To ToDo</h2>
              </Modal.Title>
              <Modal.Body>
                <Form onSubmit={this.handleSignUp}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter UserName"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </Form.Group>

                    <select name="role">
                      <option>Select a Role</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="writer">Writer</option>
                    </select>
                    
                  <Button
                    variant="danger"
                    style={{
                      width: "15em",
                      borderRadius: "5em",
                      fontSize: "20px",
                      marginTop: "20px",
                    }}
                    type="submit"
                  >
                    Register
                  </Button>
                </Form>
              </Modal.Body>
            </div>
          </Modal>
        </When>
      </>
    );
  }
}

export default Login;

// import React, { useState } from 'react';
// import {When} from 'react-if';

// import { LoginContext } from './context.js';

// function Login(props) {
//   // static contextType = LoginContext;
//   const context = React.useContext(LoginContext);
//   const [userName, setUserName] = useState('');
//   const [password, setPassword] = useState('');

//   // constructor(props) {
//   //   super(props);
//   //    state = { username: '', password: '' };
//   // }

//   const handleChange = e => {
//     if(e.target.name === 'username') setUserName(e.target.value);
//     if(e.target.name === 'password') setPassword(e.target.value);
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//      console.log(userName,  password);
//      context.login( userName,  password);
//   };

//     return (
//       <>
//         {context.loggedIn &&
//           <button onClick={ context.logout}>Log Out</button>
//       }
//         {!context.loggedIn &&
//           <form onSubmit={ handleSubmit}>
//             <input
//               placeholder="UserName"
//               name="username"
//               onChange={ handleChange}
//             />
//             <input
//               placeholder="password"
//               name="password"
//               onChange={ handleChange}
//             />
//             <button>Login</button>
//           </form>
//         }
//       </>
//     );

// }

// export default Login;
