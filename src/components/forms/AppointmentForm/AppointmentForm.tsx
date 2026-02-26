import type { Nanny } from '../../../types/nanny';
import Modal from '../../modals/Modal/Modal';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import css from './AppointmentForm.module.css';

interface AppointmentFormProps {
  onClose: () => void;
  nanny: Nanny;
}

const AppointmentForm = ({ onClose, nanny }: AppointmentFormProps) => {
  console.log(nanny);

  return (
    <Modal onClose={onClose}>
      <div className={css.appointment_form_container}>
        <button type="button" onClick={onClose} className={css.close_btn}>
          <svg width="32" height="32" className={css.close_btn_icon}>
            <use href="sprite.svg#x"></use>
          </svg>
        </button>
        <div className={css.title_container}>
          <h1 className={css.title}>Make an appointment with a babysitter</h1>
          <p className={css.text}>
            Arranging a meeting with a caregiver for your child is the first
            step to creating a safe and comfortable environment. Fill out the
            form below so we can match you with the perfect care partner.
          </p>
        </div>
        <div className={css.nanny_container}>
          <div className={css.avatar_container}>
            <img
              src={nanny.avatar_url}
              alt={nanny.name}
              width="44"
              height="44"
              className={css.img}
            />
          </div>
          <div className={css.name_container}>
            <h3 className={css.nanny_name_title}>Your nanny</h3>
            <p className={css.nanny_name}>{nanny.name}</p>
          </div>
        </div>
        <form action="" className={css.form}>
          <div className={css.form_block}>
            <Input />
            <Input />
            <Input />
            <Input />
          </div>
          <Input />
          <Input />
          <Input />
        </form>
        <Button type="button" className="button" height={52}>
          Send
        </Button>
      </div>
    </Modal>
  );
};

export default AppointmentForm;
