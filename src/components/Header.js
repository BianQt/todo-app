
import React from 'react';
import {Navbar, Button, Alignment} from "@blueprintjs/core";

export default function Header() {
return <Navbar className='bp3-dark' style={{height:'5em', paddingTop:'0.5em',backgroundColor:'rgb(46 112 137)'}}> 
    <Navbar.Group  align={Alignment.LEFT}>
    <a href='/' style={{color:'white'}}> <Navbar.Heading style={{fontSize:'3.5em',fontFamily: "'Lobster', cursive",fontFamily: "'Passion One', cursive"}}>ToDo </Navbar.Heading></a>
    </Navbar.Group>
    <Navbar.Group  align={Alignment.RIGHT}>
        <a href='/settings'style={{color:'white'}}><i class="fas fa-ellipsis-v" style={{fontSize:'2em', paddingTop:'0.2em'}}></i> </a>
    </Navbar.Group>
</Navbar>
}
