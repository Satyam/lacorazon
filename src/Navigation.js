import React, { useState } from 'react';
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

export function Navigation() {
  const [isOpen, setOpen] = useState(false);
  function toggle() {
    setOpen(!isOpen);
  }

  return (
    <div>
      <Navbar expand="md" light style={{ backgroundColor: '#e4ccaa' }}>
        <NavbarBrand href="/" style={{ color: '#644240' }}>
          <img
            src={laCorazon}
            width={32}
            height={32}
            alt="La Corazón"
            className="mr-2"
          />
          La Corazón
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/users">
                Users
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/bookstores">
                Puntos de Venta
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
