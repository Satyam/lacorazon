import React from 'react';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import classNames from 'classnames/bind';

import styles from './styles.module.css';

const cx = classNames.bind(styles);

export const Icon = ({
  color,
  button,
  disabled,
  className,
  onClick,
  ...props
}) => (
  <FAIcon
    className={cx(className, {
      'active-icon': button && !disabled,
      [`icon-${color}`]: color,
      disabled: disabled,
    })}
    onClick={disabled ? undefined : onClick}
    {...props}
  />
);

export const IconAdd = ({ color = 'primary', ...props }) => (
  <Icon icon="plus-circle" color={color} {...props} />
);

export const ButtonIconAdd = ({
  children,
  color = 'primary',

  className,
  ...props
}) => (
  <Button color={color} className={className} {...props}>
    <FAIcon icon="plus-circle" />
    <span className={styles.label}>{children}</span>
  </Button>
);

export const IconDelete = ({ color = 'danger', ...props }) => (
  <Icon icon="trash-alt" color={color} {...props} />
);

export const ButtonIconDelete = ({
  children,
  color = 'danger',

  className,
  ...props
}) => (
  <Button color={color} className={className} {...props}>
    <FAIcon icon="trash-alt" />
    <span className={styles.label}>{children}</span>
  </Button>
);
export const IconEdit = ({ color = 'secondary', ...props }) => (
  <Icon icon="edit" color={color} {...props} />
);

export const ButtonIconEdit = ({
  children,
  color = 'secondary',

  className,
  ...props
}) => (
  <Button color={color} className={className} {...props}>
    <FAIcon icon="edit" />
    <span className={styles.label}>{children}</span>
  </Button>
);
export const IconCheck = ({ color = 'success', ...props }) => (
  <Icon icon="check-circle" color={color} {...props} />
);

export const ButtonIconCheck = ({
  children,
  color = 'success',

  className,
  ...props
}) => (
  <Button color={color} className={className} {...props}>
    <FAIcon icon="check-circle" />
    <span className={styles.label}>{children}</span>
  </Button>
);
export const IconNotCheck = ({ color = 'danger', ...props }) => (
  <Icon icon="times-circle" color={color} {...props} />
);

export const ButtonIconNotCheck = ({
  children,
  color = 'warning',

  className,
  ...props
}) => (
  <Button color={color} className={className} {...props}>
    <FAIcon icon="times-circle" />
    <span className={styles.label}>{children}</span>
  </Button>
);
export const IconCalendar = ({ color = 'secondary', ...props }) => (
  <Icon icon="calendar-alt" color={color} {...props} />
);

export const ButtonIconCalendar = ({
  children,
  color = 'secondary',

  className,
  ...props
}) => (
  <Button color={color} className={className} {...props}>
    <FAIcon icon="calendar-alt" />
    <span className={styles.label}>{children}</span>
  </Button>
);
export const IconWarning = ({ color = 'warning', ...props }) => (
  <Icon icon="exclamation-triangle" color={color} {...props} />
);

export const IconStop = ({ color = 'danger', ...props }) => (
  <Icon icon="exclamation-circle" color={color} {...props} />
);

export const ButtonSet = ({ className, children, size, ...rest }) => (
  <div className={cx('buttonSet', { [`btn-group-${size}`]: size }, className)}>
    {children}
  </div>
);
