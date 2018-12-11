import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import querystring from 'querystring';

import { isEmpty } from '../utils';
import Loading from '../Loading';
import EditDistribuidor from './EditDistribuidor';
import ShowDistribuidor from './ShowDistribuidor';

import { acGetDistribuidor } from '../store/actions';

import {
  selDistribuidor,
  selDistribuidoresIsLoading
} from '../store/selectors';

import { useDispatch, useSelector } from '../store/hooks';

export default function Distribuidor({ match, location }) {
  const id = match.params.id;
  const edit = querystring.parse(location.search.substring(1)).edit;
  const [distribuidor, isLoading] = useSelector(
    [selDistribuidor, selDistribuidoresIsLoading],
    id
  );
  const [getDistribuidor] = useDispatch([acGetDistribuidor]);
  const [notFound, setNotFound] = useState(false);
  if (notFound) {
    return (
      <Alert color="danger">El distribuidor no existe o fue borrado</Alert>
    );
  } else if (id) {
    if (!isLoading && isEmpty(distribuidor)) {
      getDistribuidor(id).then(action => {
        if (!action.response) setNotFound(true);
      });
      return <Loading title="Distribuidor" />;
    }
  }

  return edit || !id ? (
    <EditDistribuidor id={id} distribuidor={distribuidor} />
  ) : (
    <ShowDistribuidor id={id} distribuidor={distribuidor} />
  );
}
