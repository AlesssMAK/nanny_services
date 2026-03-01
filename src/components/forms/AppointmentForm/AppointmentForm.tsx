import { useForm } from 'react-hook-form';
import type { Nanny } from '../../../types/nanny';
import Modal from '../../modals/Modal/Modal';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import css from './AppointmentForm.module.css';
import {
  appointmentSchema,
  type AppointmentFormData,
} from '../../../validation/validation';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';

interface AppointmentFormProps {
  onClose: () => void;
  nanny: Nanny;
}

const AppointmentForm = ({ onClose, nanny }: AppointmentFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: yupResolver(appointmentSchema),
  });

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      console.log('Appointment submitted:', data);
      toast.success('Appointment request sent!');
      reset();
      onClose();
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

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
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div className={css.form_container}>
            <div className={css.form_block}>
              <div className={css.input_container}>
                <Input
                  {...register('address')}
                  type="text"
                  placeholder="Address"
                />
                {errors.address && (
                  <p className={css.error}>{errors.address.message}</p>
                )}
              </div>
              <div className={css.input_container}>
                <Input {...register('phone')} type="tel" placeholder="+380" />
                {errors.phone && (
                  <p className={css.error}>{errors.phone.message}</p>
                )}
              </div>
              <div className={css.input_container}>
                <Input
                  {...register('childAge')}
                  type="text"
                  placeholder="Child's age"
                />
                {errors.childAge && (
                  <p className={css.error}>{errors.childAge.message}</p>
                )}
              </div>
              <div className={css.input_container}>
                <Input {...register('time')} type="time" value="00:00" />
                {errors.time && (
                  <p className={css.error}>{errors.time.message}</p>
                )}
              </div>
            </div>
            <div className={css.input_container}>
              <Input
                {...register('email')}
                type="email"
                name="email"
                placeholder="Email"
              />
              {errors.email && (
                <p className={css.error}>{errors.email.message}</p>
              )}
            </div>
            <div className={css.input_container}>
              <Input
                {...register('parentName')}
                type="text"
                placeholder="Father's or mother's name"
              />
              {errors.parentName && (
                <p className={css.error}>{errors.parentName.message}</p>
              )}
            </div>
            <div className={css.input_container}>
              <textarea
                {...register('comment')}
                className={css.textarea}
                placeholder="Comment"
              />
              {errors.comment && (
                <p className={css.error}>{errors.comment.message}</p>
              )}
            </div>
          </div>
          <Button type="submit" className="button" height={52}>
            {isSubmitting ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AppointmentForm;
