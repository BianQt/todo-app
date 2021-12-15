import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Settings from "./context/Settings.js";
import ToDo from "./components/todo/todo.js";
import SettingsDev from "./components/settings.js";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginProvider from "./components/auth/context.js";
import Login from "./components/auth/login";
import Auth from "./components/auth/auth";
import { LoginContext } from "./components/auth/context.js";

export default function App() {
  return (
  //   <>
  //  {/* <BrowserRouter>
  //     <LoginProvider>
  //     <Settings>
  //       <Header />
  //       <Link to="/">Home</Link>
  //       <Link to="/setting">Settings</Link>
  //         <Routes>
  //         <Route
  //           path="/setting"
  //           element={
  //             <Auth capability={'create','read','update','delete'}>
  //               <SettingsDev />
  //             </Auth>
  //           }
  //         />

  //         <Route
  //           path="/"
  //           element={
  //             <Auth>
  //                 <ToDo  />
  //             </Auth>
  //           }
  //         />
  //       </Routes>
  //       </Settings>
  //     </LoginProvider>
  //   </BrowserRouter>
  //   </> */}

<Router>
<LoginProvider>
<Header/>
<Login/>
<Settings>
<Switch>
<Route exact path="/">
      <ToDo />         
   </Route> 
   <Route path="/setting">
     <SettingsDev/>
   </Route>
   </Switch>
</Settings>
</LoginProvider>

 </Router>
  );
}
