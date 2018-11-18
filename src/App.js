import React, { useContext } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";

import "./App.css";

import { UsersProvider, UsersContext } from "./context/users";
import { BookstoresProvider, BookstoresContext } from "./context/bookstores";

function User() {
  const { users, addUser, deleteUser } = useContext(UsersContext);
  return (
    <>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <Button
        outline
        color="primary"
        onClick={() => addUser("satyam", { name: "Daniel Barreiro" })}
      >
        <Icon icon="plus-circle" color="blue" /> agregar
      </Button>
      <Button outline color="danger" onClick={() => deleteUser("satyam")}>
        <Icon icon="trash-alt" color="red" /> borrar
      </Button>
    </>
  );
}

function Bookstores() {
  const { bookstores, addBookstore, deleteBookstore } = useContext(
    BookstoresContext
  );
  return (
    <>
      <pre>{JSON.stringify(bookstores, null, 2)}</pre>
      <Button
        outline
        color="primary"
        onClick={() => addBookstore("Satyam", { nombre: "Daniel Barreiro" })}
      >
        <Icon icon="plus-circle" color="blue" /> agregar
      </Button>
      <Button outline color="danger" onClick={() => deleteBookstore("Satyam")}>
        <Icon icon="trash-alt" color="red" /> borrar
      </Button>
    </>
  );
}

function App() {
  return (
    <>
      <h1>
        <Icon icon="infinity" color="brown" /> La Corazón
      </h1>
      <UsersProvider>
        <User />
      </UsersProvider>
      <BookstoresProvider>
        <Bookstores />
      </BookstoresProvider>
    </>
  );
}

export default App;
