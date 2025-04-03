import { ModalHeader } from '../Modal/ModalHeader';
import { ModalFooter } from '../Modal/ModalFooter';
import { ModalBody } from '../Modal/ModalBody';

export const Modal = ({ onClose, title, children, onSave, saveButtonText }) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <ModalHeader title={title} />
        <ModalBody>{children}</ModalBody>
        <ModalFooter
          onClose={onClose}
          onSave={onSave}
          saveButtonText={saveButtonText}
        />
      </div>
    </div>
  );
};
