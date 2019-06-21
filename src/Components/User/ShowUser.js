import React from 'react';
import { LabeledText } from 'Components/Form';
import Page from 'Components/Page';

export default function ShowUser({ id, user }) {
  return (
    user && (
      <Page title={`Vendedor - ${user.nombre}`} heading={`Vendedor`}>
        <LabeledText label="Nombre" value={user.nombre} />
        <LabeledText label="eMail" value={user.email} />
      </Page>
    )
  );
}
