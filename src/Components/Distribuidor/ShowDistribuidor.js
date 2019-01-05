import React from 'react';
import { LabeledText } from '../Form';
import Page from '../Page';

export default function ShowDistribuidor({ id, distribuidor }) {
  return (
    distribuidor && (
      <Page
        title={`Distribuidor - ${distribuidor.nombre}`}
        heading={`Distribuidor`}
      >
        <LabeledText label="Nombre" value={distribuidor.nombre} />
        <LabeledText label="eMail" value={distribuidor.email} />
        <LabeledText label="Localidad" value={distribuidor.localidad} />
        <LabeledText label="Dirección" value={distribuidor.direccion} pre />
        <LabeledText label="Contacto" value={distribuidor.contacto} />
        <LabeledText label="Teléfono" value={distribuidor.telefono} />
      </Page>
    )
  );
}
