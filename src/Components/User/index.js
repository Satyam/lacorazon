import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import querystring from 'querystring';

import { isEmpty } from 'Shared/utils';
import Loading from 'Components/Loading';

import EditUser from './EditUser';
import ShowUser from './ShowUser';
import { acGetUser } from 'Store/actions';

import { selUser, selUsersIsLoading } from 'Store/selectors';

import { useDispatch } from 'react-redux';
import { useSel } from 'Store/useSel';
export default function User({ match, location }) {
  const id = match.params.id;
  const edit = querystring.parse(location.search.substring(1)).edit;
  const user = useSel(selUser, id);
  const isLoading = useSel(selUsersIsLoading, id);
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
