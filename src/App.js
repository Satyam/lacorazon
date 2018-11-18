import React, { useContext } from "react";
import "./App.css";

import { UsersProvider, UsersContext } from "./context/users";

function User() {
  const { users, addUser, deleteUser } = useContext(UsersContext);
  return (
    <div>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <button onClick={() => addUser("yo", { name: "Daniel Barreiro" })}>
        agregar
      </button>
      <button onClick={() => deleteUser("yo")}>borrar</button>
    </div>
  );
}

function App() {
  return (
    <UsersProvider>
      <User />
    </UsersProvider>
  );
}

export default App;
