import React from "react";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";

export const IconAdd = props => (
  <FAIcon icon="plus-circle" color="blue" {...props} />
);

export const ButtonIconAdd = ({ label, ...props }) => (
  <Button outline color="primary" {...props}>
    <IconAdd {...props} style={{ marginRight: label ? "0.5em" : 0 }} />
    {label}
  </Button>
);

export const IconDelete = props => (
  <FAIcon icon="trash-alt" color="red" {...props} />
);

export const ButtonIconDelete = ({ label, ...props }) => (
  <Button outline color="primary" {...props}>
    <IconDelete {...props} style={{ marginRight: label ? "0.5em" : 0 }} />
    {label}
  </Button>
);

export const IconEdit = props => <FAIcon icon="edit" color="blue" {...props} />;

export const ButtonIconEdit = ({ label, ...props }) => (
  <Button outline color="primary" {...props}>
    <IconEdit {...props} style={{ marginRight: label ? "0.5em" : 0 }} />
    {label}
  </Button>
);

export const IconCheck = props => (
  <FAIcon icon="check-circle" color="green" {...props} />
);

export const ButtonIconCheck = ({ label, ...props }) => (
  <Button outline color="primary" {...props}>
    <IconCheck {...props} style={{ marginRight: label ? "0.5em" : 0 }} />
    {label}
  </Button>
);

export const IconNotCheck = props => (
  <FAIcon icon="times-circle" color="red" {...props} />
);

export const ButtonIconNotCheck = ({ label, ...props }) => (
  <Button outline color="danger" {...props}>
    <IconNotCheck {...props} style={{ marginRight: label ? "0.5em" : 0 }} />
    {label}
  </Button>
);

export const IconCalendar = props => <FAIcon icon="calendar-alt" {...props} />;

export const ButtonIconCalendar = ({ label, ...props }) => (
  <Button outline {...props}>
    <IconCalendar {...props} style={{ marginRight: label ? "0.5em" : 0 }} />
    {label}
  </Button>
);

export const IconWarning = props => (
  <FAIcon icon="exclamation-warning" color="orange" {...props} />
);

export const IconStop = props => (
  <FAIcon icon="exclamation-circle" color="red" {...props} />
);
