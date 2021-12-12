
import React from 'react';
import {Navbar, Button, Alignment} from "@blueprintjs/core";

export default function Header() {
return <Navbar className='bp3-dark'> 
    <Navbar.Group  align={Alignment.LEFT}>
        <Navbar.Heading style={{fontSize:'1.8em'}}>ToDo </Navbar.Heading>
        {/* <Button className="bp3-minimal" icon="home" text="Home" />
        <Button className="bp3-minimal" icon="document" text="Files" /> */}
    </Navbar.Group>
</Navbar>
}