import React from 'react';
import { Form, TextField, SubmitButton } from './Form';
import useReactRouter from 'use-react-router';

import {
  getUser,
  setUser,
  deleteUser,
  userExists
} from './store/users/actions';
import { useDispatch, useSelector } from './store/hooks';
import userSchema from './store/users/schema';
import { ButtonIconAdd, ButtonIconDelete, ButtonSet } from './Icons';

export default function User({ match }) {
  const id = match.params.id;
  const user = useSelector('users.$0', id);
  useDispatch(getUser, true, id);
  const addUser = useDispatch(setUser);
  const delUser = useDispatch(deleteUser);
  const { history } = useReactRouter();

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
        <TextField name="email" label="eMail" />
        <TextField name="nombre" label="Nombre" />
        <ButtonSet>
          <SubmitButton component={ButtonIconAdd}>
            {id ? 'Modificar' : 'Agregar'}
          </SubmitButton>
          <ButtonIconDelete
            disabled={!id}
            onClick={() => {
              delUser(id).then(() => history.replace('/users'));
            }}
          >
            Borrar
          </ButtonIconDelete>
        </ButtonSet>
      </Form>
    </>
  );
}
