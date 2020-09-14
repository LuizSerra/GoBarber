import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { Container, Toast } from './styles';

const ToastContainer: React.FC = () => {
  return (
    <Container>
      <Toast hasDescription>
        <FiAlertCircle />
        <div>
          <strong>Erro</strong>
          <p>Decrição do erro</p>
        </div>
        <button type="button">
          <FiXCircle size={20} />
        </button>
      </Toast>

      <Toast type="success" hasDescription={false}>
        <FiAlertCircle />
        <div>
          <strong>Erro</strong>
        </div>
        <button type="button">
          <FiXCircle size={20} />
        </button>
      </Toast>

      <Toast type="error" hasDescription>
        <FiAlertCircle />
        <div>
          <strong>Erro</strong>
          <p>Decrição do erro</p>
        </div>
        <button type="button">
          <FiXCircle size={20} />
        </button>
      </Toast>
    </Container>
  );
};
export default ToastContainer;
