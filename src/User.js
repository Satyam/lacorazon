import React, { useContext } from "react";
import { UserProvider, UserContext } from "./context/user";
import { ButtonIconAdd, ButtonIconDelete } from "./Icons";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Formik, Form as KForm, Field as KField } from "formik";

function UserForm({ id }) {
  const { user, error, addUser, deleteUser } = useContext(UserContext);
  if (error) {
    throw new Error(error); // send if to the error boundary
  }
  return (
    <>
      <h1>Add/Edit Vendedor</h1>
      <Formik
        initialValues={Object.assign({ id: "", name: "", alias: "" }, user)}
        enableReinitialize={true}
        isInitialValid={true}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form tag={KForm}>
            <FormGroup>
              <Label for="id">Código</Label>
              <Input tag={KField} type="text" name="id" id="id" />
            </FormGroup>
            <FormGroup>
              <Label for="alias">Alias</Label>
              <Input tag={KField} type="text" name="alias" id="alias" />
            </FormGroup>
            <FormGroup>
              <Label for="name">Nombre</Label>
              <Input tag={KField} type="text" name="name" id="name" />
            </FormGroup>
            <ButtonIconAdd
              type="submit"
              disabled={isSubmitting || !isValid}
              className="mr-2"
              onClick={() => {
                console.log("accept");
              }}
              label="Agregar"
            />
            <ButtonIconDelete
              onClick={() => {
                console.log("borrar");
              }}
              label="borrar"
            />
          </Form>
        )}
      </Formik>
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
