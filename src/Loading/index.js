import React from 'react';
import icon from './loading.gif';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import styles from './styles.module.css';

export default function Loading({ title = '' }) {
  return (
    <Modal isOpen={true}>
      <ModalHeader className={styles.header}>{title}</ModalHeader>
      <ModalBody className={styles.container}>
        <img src={icon} alt="loading..." />
      </ModalBody>
    </Modal>
  );
}
