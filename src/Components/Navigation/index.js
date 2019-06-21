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
  DropdownItem,
} from 'reactstrap';

import laCorazon from 'Shared/La Corazon.png';

import { UserContext, signIn, signOut } from 'Components/Auth';

import styles from './styles.module.css';

export function Navigation() {
  const [isOpen, setOpen] = useState(false);
  const user = useContext(UserContext);
  function toggle() {
    setOpen(!isOpen);
  }
  return (
    <div>
      <Navbar expand="md" light className={styles.navbar}>
        <NavbarBrand href="/" className={styles.navbrand}>
          <img src={laCorazon} alt="La Corazón" />
          La Corazón
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
              <DropdownToggle nav caret className={styles.user}>
                {user ? (
                  <>
                    <img alt={user.displayName} src={user.photoURL} />
                    {user.displayName}
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
                <DropdownItem>Create Account</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
