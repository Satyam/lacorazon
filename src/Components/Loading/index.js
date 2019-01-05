import React from 'react';
import icon from './loading.gif';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import styles from './styles.module.css';

export default function Loading({
  title = '',
  children,
  noIcon,
  isOpen = true,
  ...props
}) {
  return (
    <Modal isOpen={isOpen} {...props}>
      <ModalHeader className={styles.header}>{title}</ModalHeader>
      <ModalBody className={styles.container}>
        {children}
        {!noIcon && <img className={styles.img} src={icon} alt="loading..." />}
      </ModalBody>
    </Modal>
  );
}
