import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import laCorazon from './La Corazon.png';

import { UserContext, signIn, signOut } from './Auth';

export function Navigation() {
  const [isOpen, setOpen] = useState(false);
  const user = useContext(UserContext);
  function toggle() {
    setOpen(!isOpen);
  }
  console.log('Navigation', user);
  return (
    <div>
      <Navbar expand="md" light style={{ backgroundColor: '#e4ccaa' }}>
        <NavbarBrand href="/" style={{ color: '#644240' }}>
          <img src={laCorazon} width={32} height={32} alt="La Corazón" />
          &nbsp;La Corazón
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/users">
                Usuarios
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/distribuidores">
                Distribuidores
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {user ? (
                  <>
                    <img
                      alt={user.displayName}
                      src={user.photoURL}
                      style={{
                        width: '2em',
                        borderRadius: '1em',
                        marginRight: '1em',
                        height: '2em'
                      }}
                    />
                    {`Hola ${user.displayName}`}
                  </>
                ) : (
                  'guest'
                )}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => (user ? signOut() : signIn())}>
                  {user ? 'Logout' : 'Login'}
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={signIn}>Login</DropdownItem>
                <DropdownItem onClick={signOut}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
