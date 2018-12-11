import React from 'react';
import useReactRouter from 'use-react-router';
import { Form, TextField, SubmitButton } from '../Form';
import Page from '../Page';

import { acAddUser, acUpdateUser, acDeleteUser } from '../store/actions';

import { useDispatch } from '../store/hooks';
import userSchema from '../store/users/schema';
import { ButtonIconAdd, ButtonIconDelete, ButtonSet } from '../Icons';

export default function EditUser({ id, user }) {
  const { history } = useReactRouter();
  const [addUser, updateUser, deleteUser] = useDispatch([
    acAddUser,
    acUpdateUser,
    acDeleteUser
  ]);
  return (
    <Page
      title={`Vendedor - ${user ? user.nombre : 'nuevo'}`}
      heading={`${id ? 'Edit' : 'Add'} Vendedor`}
    >
      <Form
        values={user}
        onSubmit={(values, { setFieldError }) =>
          (id ? updateUser(id, values) : addUser(values))
            .then(({ response }) => {
              history.replace(`/user/${response.id}`);
            })
            .catch(err => {
              setFieldError('*', err);
            })
        }
        schema={userSchema}
      >
        <TextField name="email" label="eMail" />
        <TextField name="nombre" label="Nombre" />
        <ButtonSet>
          <SubmitButton component={ButtonIconAdd}>
            {id ? 'Modificar' : 'Agregar'}
          </SubmitButton>
          <ButtonIconDelete
            disabled={!id}
            onClick={() => {
              deleteUser(id).then(() => history.replace('/users'));
            }}
          >
            Borrar
          </ButtonIconDelete>
        </ButtonSet>
      </Form>
    </Page>
  );
}
