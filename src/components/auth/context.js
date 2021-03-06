import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';

const testUsers = {
  admin: {password:'password', name:'Administrator', role:'admin', capabilities:['create','read','update','delete']},
  editor: { password: 'password', name: 'Editor', role: 'editor', capabilities: ['read', 'update']},
  writer: { password: 'password', name: 'Writer', role: 'writer', capabilities: ['create']},

};

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      can: this.can,
      login: this.login,
      logout: this.logout,
      user: {capabilities:[]},
    };
  }

  can = (capability) => {
    return this?.state?.user?.capabilities?.includes(capability);
  }

  login = (username, password) => {
    if (testUsers[username]) {
      // Create a "good" token, like you'd get from a server
      const token = jwt.sign(testUsers[username], process.env.REACT_APP_SECRET);
      this.validateToken(token);
    }
  }

  logout = () => {
    this.setLoginState(false, null, {});
  };

  validateToken = token => {
    try {
      let user = jwt.verify(token, process.env.REACT_APP_SECRET);
      this.setLoginState(true, token, user);
    }
    catch (e) {
      this.setLoginState(false, null, {});
      console.log('Token Validation Error', e);
    }

  };

  setLoginState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    this.setState({ token, loggedIn, user });
  };

  componentDidMount() {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    this.validateToken(token);
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export default LoginProvider;

// import React, { useEffect, useState, useContext } from "react";
// import cookie from 'react-cookies';
// import jwt from 'jsonwebtoken';

// const testUsers = {
//   admin: {password:'password', name:'Administrator', role:'admin', capabilities:['create','read','update','delete']},
//   editor: { password: 'password', name: 'Editor', role: 'editor', capabilities: ['read', 'update']},
//   writer: { password: 'password', name: 'Writer', role: 'writer', capabilities: ['create']},
// };

// export const LoginContext = React.createContext();

// export default function LoginProvider(props){

//   const [loggedIn, setLoggedState] = useState(false);
//   const [user, setUser] = useState({capabilities:[]});
//   const [tokenState, setToken] = useState('');

//   const can = (capability) => {
//     return state?.user?.capabilities?.includes(capability);
//   }

//   const login = (username, password) => {
//     if (testUsers[username]) {
//       // Create a "good" token, like you'd get from a server
//       const token = jwt.sign(testUsers[username], 'process.env.REACT_APP_SECRET');
//       console.log('token======>',token);
//       validateToken(token);
//     }
//   }

//   const logout = () => {
//     setLoginState(false, null, {});
//   };

//   const validateToken = token => {
//     // try {
//       // let user = jwt.verify(token, process.env.REACT_APP_SECRET);
//       // setLoginState(true, token, user);
//     // }
//     // catch (e) {
//     //   setLoginState(false, null, {});
//     //   // console.log('Token Validation Error', e);
//     // }

//     if (token) {
//      let user = jwt.verify(token, 'process.env.REACT_APP_SECRET');
//       //setLoginState(true, token, user);
//       // const userL = jwt.decode(token);
//       console.log('user >>>', user);
//       // setLoggedState(true);
//       setUser(user);
//       cookie.save('token', token);
//   } else {
//     setLoggedState(false);
//       setUser({});
//   }

//   };

//   const setLoginState = (loggedIn, token, user) => {
//     // cookie.save('auth', token);
//     setUser(user);
//     setLoggedState(loggedIn);
//     setToken(token);
//   };

//   const state = {
//     loggedIn: loggedIn,
//     user: user,
//     token: tokenState,
//     can: can,
//     login: login,
//     logout: logout,
    
//   };

//   useEffect(()=>{
//     const qs = new URLSearchParams(window.location.search);
//     const cookieToken = cookie.load('auth');
//     console.log(cookieToken)
//     const token = qs.get('token') || cookieToken || null;
//     validateToken(token);
//   })


//     return (
//       <LoginContext.Provider value={state}>
//         {props.children}
//       </LoginContext.Provider>
//     );
  
// }

 
