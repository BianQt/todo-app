import React from "react";
import cookie from "react-cookies";
import base64 from "base-64";

const testUsers = {
  admin: {
    password: "password",
    name: "Administrator",
    role: "admin",
    capabilities: ["create", "read", "update", "delete"],
  },
  editor: {
    password: "password",
    name: "Editor",
    role: "editor",
    capabilities: ["read", "update"],
  },
  writer: {
    password: "password",
    name: "Writer",
    role: "writer",
    capabilities: ["create"],
  },
};

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      can: this.can,
      login: this.login,
      signup: this.signup,
      logout: this.logout,
      user: { capabilities: [] },
    };
  }

  can = (capability) => {
    return this?.state?.user?.capabilities?.includes(capability);
  };

  login = async (username, password) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Basic ${base64.encode(`${username}:${password}`)}`
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      let response = await fetch(
        "https://bianqt-todo.herokuapp.com/signin",
        requestOptions
      );
      let result = await response.json();
      const token = result.token;
      const user = result.user;
      this.setLoginState(true, token, user);
    } catch (e) {
      this.setLoginState(false, null, {});
      console.log("Token Validation Error", e);
    }
  };

  signup = async (username, password, role) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: username,
      password: password,
      role: role,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      let response = await fetch(
        "https://bianqt-todo.herokuapp.com/signup",
        requestOptions
      );
      let result = await response.json();
      // const token = result.token;
      // const user = result.user;
      // this.setLoginState(true, token, user);
    } catch (e) {
      // this.setLoginState(false, null, {});
      console.log("Token Validation Error", e);
    }
  };
  logout = () => {
    this.setLoginState(false, null, {});
  };

  validateToken = async (token) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };
      const response = await fetch(
        "https://bianqt-todo.herokuapp.com/signinI",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      const user = result.user;
      const tokenII = result.token;
      this.setLoginState(true, tokenII, user);
    } catch (e) {
      this.setLoginState(false, null, {});
      console.log("Token Validation Error", e);
    }
  };

  setLoginState = (loggedIn, token, user) => {
    cookie.save("auth", token);
    this.setState({ token, loggedIn, user });
  };

  componentDidMount = () => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    console.log("cookie", cookieToken);
    const token = qs.get("token") || cookieToken || null;
    this.validateToken(token);
  };

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export default LoginProvider;
