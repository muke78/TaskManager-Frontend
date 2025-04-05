import React from 'react';
import { v } from '../../../styles/variables';

export const ModalFooter = ({ onClose, onSave, saveButtonText }) => {
  return (
    <div className="modal-action">
      <button className="btn" onClick={onClose}>
        Cerrar
      </button>
      {onSave && (
        <button className="btn btn-info" onClick={onSave}>
          {v.iconoGuardar && <v.iconoGuardar />}
          {saveButtonText}
        </button>
      )}
    </div>
  );
};
