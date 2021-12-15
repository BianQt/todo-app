
import React, {useContext} from 'react';
import {Navbar,  Alignment} from "@blueprintjs/core";
import {Button } from "react-bootstrap";
import { LoginContext } from "./auth/context";

const style ={
    fontSize: '1.6em',
    paddingTop: '0.5em',
    marginRight: '1em',
    color:'#ffffffb3'
}

export default function Header() {
const context = React.useContext(LoginContext);
console.log('header===>', context.user);

return <Navbar className='bp3-dark' style={{height:'5em', paddingTop:'0.5em',backgroundColor:'rgb(46 112 137)'}}> 
    <Navbar.Group  align={Alignment.LEFT}>
    <a href='/' style={{color:'white'}}> <Navbar.Heading style={{fontSize:'3.5em',fontFamily: "'Lobster', cursive",fontFamily: "'Passion One', cursive"}}>ToDo </Navbar.Heading></a>
    </Navbar.Group>
    {context.loggedIn && <Navbar.Group  align={Alignment.RIGHT}>
        <h3 style={style}>Hello, {context.user.name}!</h3>
        <a href='/settings'style={{color:'#ffffff9c', marginRight:'1.5em'}}><i class="fas fa-cog" style={{fontSize:'2em', paddingTop:'0.2em'}}></i> </a>
        <a onClick={ context.logout} style={{color:'#ffffff9c'}}><i class="fas fa-sign-out-alt" style={{fontSize:'2em', paddingTop:'0.2em'}}></i></a>
    </Navbar.Group>}
    {!context.loggedIn &&<Navbar.Group  align={Alignment.RIGHT}>
     
        <Button
              style={{
                borderRadius: "50px",
                fontWeight: "bold",
                margin: "0 5px",
                backgroundColor:'#d7cbcc69',
                border:'0px'
              }}
              onClick={ context.logout}
            >
              Log In
            </Button>
    </Navbar.Group>
}
</Navbar>
}
