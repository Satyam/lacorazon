import React from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import classNames from 'classnames';

import './Icons.css';

export const Icon = ({ color, button, disabled, className, ...props }) => (
  <FAIcon
    className={classNames(className, {
      'active-icon': button && !disabled,
      [`icon-${color}`]: color,
      disabled: disabled
    })}
    {...props}
  />
);

export const IconAdd = ({ color = 'primary', ...props }) => (
  <Icon icon="plus-circle" color={color} {...props} />
);

export const ButtonIconAdd = ({
  label,
  color = 'primary',

  className,
  ...props
}) => (
  <Button color={color} className={className} {...props}>
    <FAIcon icon="plus-circle" className={classNames({ 'mr-2': label })} />
    {label}
  </Button>
);

export const IconDelete = ({ color = 'danger', ...props }) => (
  <Icon icon="trash-alt" color={color} {...props} />
);

export const ButtonIconDelete = ({
  label,
  color = 'danger',

  className,
  ...props
}) => (
  <Button color={color} className={className} {...props}>
    <FAIcon icon="trash-alt" className={classNames({ 'mr-2': label })} />
    {label}
  </Button>
);
export const IconEdit = ({ color = 'primary', ...props }) => (
  <Icon icon="edit" color={color} {...props} />
);

export const ButtonIconEdit = ({
  label,
  color = 'primary',

  className,
  ...props
}) => (
  <Button color={color} className={className} {...props}>
    <FAIcon icon="edit" className={classNames({ 'mr-2': label })} />
    {label}
  </Button>
);
export const IconCheck = ({ color = 'success', ...props }) => (
  <Icon icon="check-circle" color={color} {...props} />
);

export const ButtonIconCheck = ({
  label,
  color = 'success',

  className,
  ...props
}) => (
  <Button color={color} className={className} {...props}>
    <FAIcon icon="check-circle" className={classNames({ 'mr-2': label })} />
    {label}
  </Button>
);
export const IconNotCheck = ({ color = 'danger', ...props }) => (
  <Icon icon="times-circle" color={color} {...props} />
);

export const ButtonIconNotCheck = ({
  label,
  color = 'primary',

  className,
  ...props
}) => (
  <Button color={color} className={className} {...props}>
    <FAIcon icon="times-circle" className={classNames({ 'mr-2': label })} />
    {label}
  </Button>
);
export const IconCalendar = ({ color = 'body', ...props }) => (
  <Icon icon="calendar-alt" color={color} {...props} />
);

export const ButtonIconCalendar = ({
  label,
  color = 'primary',

  className,
  ...props
}) => (
  <Button color={color} className={className} {...props}>
    <FAIcon icon="calendar-alt" className={classNames({ 'mr-2': label })} />
    {label}
  </Button>
);
export const IconWarning = ({ color = 'warning', ...props }) => (
  <Icon icon="exclamation-triangle" color={color} {...props} />
);

export const IconStop = ({ color = 'danger', ...props }) => (
  <Icon icon="exclamation-circle" color={color} {...props} />
);
