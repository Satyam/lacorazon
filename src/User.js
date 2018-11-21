import React, { useContext } from "react";
import { UserProvider, UserContext } from "./context/user";
import { ButtonIconAdd, ButtonIconDelete } from "./Icons";
import { Form, FormGroup, Label, Input } from "reactstrap";

function UserForm({ id }) {
  const { user, error, addUser, deleteUser } = useContext(UserContext);
  if (error) {
    throw new Error(error); // send if to the error boundary
  }
  return (
    <>
      <h1>Vendedores</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Form>
        <FormGroup>
          <Label for="codigo">Código</Label>
          <Input type="text" name="codigo" id="codigo" defaultValue={user.id} />
        </FormGroup>
        <FormGroup>
          <Label for="codigo">Alias</Label>
          <Input
            type="text"
            name="alias"
            id="alias"
            defaultValue={user.alias}
          />
        </FormGroup>
        <FormGroup>
          <Label for="codigo">Nombre</Label>
          <Input
            type="text"
            name="nombre"
            id="nombre"
            defaultValue={user.name}
          />
        </FormGroup>
        <ButtonIconAdd
          className="mr-2"
          onClick={() => {
            console.log("accept");
          }}
          label="agregar"
        />
        <ButtonIconDelete
          onClick={() => {
            console.log("borrar");
          }}
          label="borrar"
        />
      </Form>
    </>
  );
}
export default function User({ match }) {
  return (
    <UserProvider id={match.params.id}>
      <UserForm id={match.params.id} />
    </UserProvider>
  );
}
