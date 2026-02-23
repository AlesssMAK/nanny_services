import Modal from '../../modals/Modal/Modal';

interface AppointmentFormProps {
  onClose: () => void;
}

const AppointmentForm = ({ onClose }: AppointmentFormProps) => {
  return (
    <Modal onClose={onClose}>
      <div>AppointmentForm</div>
    </Modal>
  );
};

export default AppointmentForm;
