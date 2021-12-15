import React from "react";
import { When } from "react-if";
import { LoginContext } from "./context.js";
import { Form, Button, } from "react-bootstrap";
import "./login.scss";

class Login extends React.Component {
  static contextType = LoginContext;
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.login(this.state.username, this.state.password);
  };

  render() {
    return (
      <>
          <When condition={!this.context.loggedIn}>
             <Form className="loginForm" onSubmit={this.handleSubmit}>
             <h1 >ToDo </h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    name="username"
                    onChange={this.handleChange}
                    placeholder="Enter email or User Name"
                    style={{ height: "3em" }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    placeholder="Password"
                    style={{ height: "3em", marginBottom: "30px" }}
                  />
                </Form.Group>
                <Button
                  variant="danger"
                  type="submit"
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
                >
                  Sign Up
                </Button>
              </Form>
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
