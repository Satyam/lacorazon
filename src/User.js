import React, { useContext } from 'react';
import { Form, TextField } from './Form';
import useReactRouter from 'use-react-router';

import {
  UserProvider,
  UserContext,
  addUser,
  deleteUser,
  userExists,
  userSchema
} from './context/users';
import { ButtonIconAdd, ButtonIconDelete } from './Icons';

function UserForm({ id }) {
  const { user, error } = useContext(UserContext);
  const { history } = useReactRouter();
  if (error) {
    throw new Error(error); // send if to the error boundary
  }

  return (
    <>
      <h1>Add/Edit Vendedor</h1>
      <Form
        values={user}
        onSubmit={(values, { setFieldError }) => {
          debugger;
          addUser(values)
            .then(() => {
              history.replace(`/user/${values.id}`);
            })
            .catch(err => {
              setFieldError('*', err);
            });
        }}
        schema={userSchema}
      >
        <TextField
          name="id"
          label="Código"
          disabled={!!id}
          validate={value =>
            id
              ? ''
              : userExists(value).then(exists => {
                  if (exists) {
                    // eslint-disable-next-line no-throw-literal
                    throw `Código de usuario [${value}] ya existe`;
                  }
                })
          }
        />
        <TextField name="alias" label="Alias" />
        <TextField name="name" label="Nombre" />
        <ButtonIconAdd
          type="submit"
          disabled={false /*isSubmitting || !isValid*/}
          className="mr-2"
          label={id ? 'Modificar' : 'Agregar'}
        />
        <ButtonIconDelete
          disabled={!id}
          onClick={() => {
            deleteUser(id).then(() => history.replace('/users'));
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
