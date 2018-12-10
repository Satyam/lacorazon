import React, { useState } from 'react';
import { Form, TextField, SubmitButton } from './Form';
import useReactRouter from 'use-react-router';
import { Alert } from 'reactstrap';

import { isEmpty } from './utils';
import Loading from './Loading';
import Page from './Page';
import {
  acGetUser,
  acAddUser,
  acUpdateUser,
  acDeleteUser
} from './store/actions';

import { selUser, selUsersIsLoading } from './store/selectors';

import { useDispatch, useSelector } from './store/hooks';
import userSchema from './store/users/schema';
import { ButtonIconAdd, ButtonIconDelete, ButtonSet } from './Icons';

export default function User({ match }) {
  const id = match.params.id;
  const { history } = useReactRouter();
  const [user, isLoading] = useSelector([selUser, selUsersIsLoading], id);
  const [getUser, addUser, updateUser, deleteUser] = useDispatch([
    acGetUser,
    acAddUser,
    acUpdateUser,
    acDeleteUser
  ]);
  const [notFound, setNotFound] = useState(false);
  if (notFound) {
    return <Alert color="danger">El usuario no existe o fue borrado</Alert>;
  } else if (id) {
    if (!isLoading && isEmpty(user)) {
      getUser(id).then(action => {
        if (!action.response) setNotFound(true);
      });
      return <Loading title="Usuario" />;
    }
  }

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
