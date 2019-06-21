import React from 'react';
import useReactRouter from 'use-react-router';
import { Form, TextField, SubmitButton } from 'Components/Form';
import Page from 'Components/Page';

import { acAddUser, acUpdateUser, acDeleteUser } from 'Store/actions';

import { useDispatch } from 'react-redux';
import userSchema from 'Store/users/schema';
import { ButtonIconAdd, ButtonIconDelete, ButtonSet } from 'Components/Icons';

export default function EditUser({ id, user }) {
  const { history } = useReactRouter();
  const dispatch = useDispatch();
  return (
    <Page
      title={`Vendedor - ${user ? user.nombre : 'nuevo'}`}
      heading={`${id ? 'Edit' : 'Add'} Vendedor`}
    >
      <Form
        values={user}
        onSubmit={(values, { setFieldError }) =>
          (id
            ? dispatch(acUpdateUser(id, values))
            : dispatch(acAddUser(values))
          ).then(({ response }) => {
            history.replace(`/user/${response.id}?edit=true`);
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
              dispatch(acDeleteUser(id)).then(() => history.replace('/users'));
            }}
          >
            Borrar
          </ButtonIconDelete>
        </ButtonSet>
      </Form>
    </Page>
  );
}
