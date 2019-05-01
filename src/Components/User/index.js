import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import querystring from 'querystring';

import { isEmpty } from '../../utils';
import Loading from '../Loading';

import EditUser from './EditUser';
import ShowUser from './ShowUser';
import { acGetUser } from '../../store/actions';

import { selUser, selUsersIsLoading } from '../../store/selectors';

import { useDispatch } from 'react-redux';
import { useSelector } from '../../store/useSelector';
export default function User({ match, location }) {
  const id = match.params.id;
  const edit = querystring.parse(location.search.substring(1)).edit;
  const user = useSelector(selUser, id);
  const isLoading = useSelector(selUsersIsLoading, id);
  const dispatch = useDispatch();
  const [notFound, setNotFound] = useState(false);
  if (notFound) {
    return <Alert color="danger">El usuario no existe o fue borrado</Alert>;
  } else if (id) {
    if (!isLoading && isEmpty(user)) {
      dispatch(acGetUser(id)).then(action => {
        if (!action.response) setNotFound(true);
      });
      return <Loading title="Usuario" />;
    }
  }
  return edit || !id ? (
    <EditUser id={id} user={user} />
  ) : (
    <ShowUser id={id} user={user} />
  );
}
