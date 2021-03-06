import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import querystring from 'querystring';

import { isEmpty } from 'Shared/utils';
import Loading from 'Components/Loading';
import EditDistribuidor from './EditDistribuidor';
import ShowDistribuidor from './ShowDistribuidor';

import { acGetDistribuidor } from 'Store/actions';

import { selDistribuidor, selDistribuidoresIsLoading } from 'Store/selectors';

import { useDispatch } from 'react-redux';
import { useSel } from 'Store/useSel';

export default function Distribuidor({ match, location }) {
  const id = match.params.id;
  const edit = querystring.parse(location.search.substring(1)).edit;
  const distribuidor = useSel(selDistribuidor, id);
  const isLoading = useSel(selDistribuidoresIsLoading, id);
  const dispatch = useDispatch();
  const [notFound, setNotFound] = useState(false);
  if (notFound) {
    return (
      <Alert color="danger">El distribuidor no existe o fue borrado</Alert>
    );
  } else if (id) {
    if (!isLoading && isEmpty(distribuidor)) {
      dispatch(acGetDistribuidor(id)).then(action => {
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
