import React from "react";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";
import classNames from "classnames";

export const IconAdd = ({
  color = "primary",
  outline,
  className,
  ...props
}) => (
  <FAIcon
    icon="plus-circle"
    className={classNames(className, {
      [`btn-${color}`]: !outline,
      [`btn-outline-${color}`]: outline
    })}
    {...props}
  />
);

export const ButtonIconAdd = ({
  label,
  color = "primary",
  outline,
  className,
  ...props
}) => (
  <Button color={color} outline={outline} className={className} {...props}>
    <FAIcon
      icon="plus-circle"
      {...props}
      style={{ marginRight: label ? "0.5em" : 0 }}
    />
    {label}
  </Button>
);

export const IconDelete = ({ color = "danger", className, ...props }) => (
  <FAIcon
    icon="trash-alt"
    className={classNames(className, `btn-outline${color}`)}
    {...props}
  />
);

export const ButtonIconDelete = ({
  label,
  color = "danger",
  outline,
  className,
  ...props
}) => (
  <Button color={color} outline={outline} className={className} {...props}>
    <FAIcon
      icon="trash-alt"
      {...props}
      style={{ marginRight: label ? "0.5em" : 0 }}
    />
    {label}
  </Button>
);

export const IconEdit = ({ color = "primary", className, ...props }) => (
  <FAIcon
    icon="edit"
    className={classNames(className, `btn-outline${color}`)}
    {...props}
  />
);

export const ButtonIconEdit = ({
  label,
  color = "primary",
  outline,
  className,
  ...props
}) => (
  <Button color={color} outline={outline} className={className} {...props}>
    <FAIcon
      icon="edit"
      {...props}
      style={{ marginRight: label ? "0.5em" : 0 }}
    />
    {label}
  </Button>
);

export const IconCheck = ({ color = "success", className, ...props }) => (
  <FAIcon
    icon="check-circle"
    className={classNames(className, `btn-outline${color}`)}
    {...props}
  />
);

export const ButtonIconCheck = ({
  label,
  color = "primary",
  outline,
  className,
  ...props
}) => (
  <Button color={color} outline={outline} className={className} {...props}>
    <FAIcon
      icon="check-circle"
      {...props}
      style={{ marginRight: label ? "0.5em" : 0 }}
    />
    {label}
  </Button>
);

export const IconNotCheck = ({ color = "danger", className, ...props }) => (
  <FAIcon
    icon="times-circle"
    className={classNames(className, `btn-outline${color}`)}
    {...props}
  />
);

export const ButtonIconNotCheck = ({
  label,
  color = "primary",
  outline,
  className,
  ...props
}) => (
  <Button color={color} outline={outline} className={className} {...props}>
    <FAIcon
      icon="times-circle"
      {...props}
      style={{ marginRight: label ? "0.5em" : 0 }}
    />
    {label}
  </Button>
);

export const IconCalendar = ({ color = "body", className, ...props }) => (
  <FAIcon
    icon="calendar-alt"
    className={classNames(className, `btn-outline${color}`)}
    {...props}
  />
);

export const ButtonIconCalendar = ({
  label,
  color = "primary",
  outline,
  className,
  ...props
}) => (
  <Button color={color} outline={outline} className={className} {...props}>
    <FAIcon
      icon="calendar-alt"
      {...props}
      style={{ marginRight: label ? "0.5em" : 0 }}
    />
    {label}
  </Button>
);

export const IconWarning = ({ color = "warning", className, ...props }) => (
  <FAIcon
    icon="exclamation-warning"
    className={classNames(className, `btn-outline${color}`)}
    {...props}
  />
);

export const IconStop = ({ color = "danger", className, ...props }) => (
  <FAIcon
    icon="exclamation-circle"
    className={classNames(className, `btn-outline${color}`)}
    {...props}
  />
);
