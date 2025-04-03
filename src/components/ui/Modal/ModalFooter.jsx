import React from 'react';

export const ModalFooter = ({ onClose, onSave, saveButtonText }) => {
  return (
    <div className="modal-action">
      <button className="btn" onClick={onClose}>
        Cerrar
      </button>
      {onSave && (
        <button className="btn btn-info" onClick={onSave}>
          {saveButtonText}
        </button>
      )}
    </div>
  );
};
