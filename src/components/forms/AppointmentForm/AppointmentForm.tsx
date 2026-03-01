import { useForm, useWatch } from 'react-hook-form';
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
import { useEffect, useRef, useState } from 'react';

interface AppointmentFormProps {
  onClose: () => void;
  nanny: Nanny;
}

const timeSlots = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
];

const AppointmentForm = ({ onClose, nanny }: AppointmentFormProps) => {
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
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

  const timeWrapperRef = useRef<HTMLDivElement>(null);
  const selectedTime = useWatch({
    control,
    name: 'time',
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        timeWrapperRef.current &&
        !timeWrapperRef.current.contains(event.target as Node)
      ) {
        setIsTimeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTimeSelect = (time: string) => {
    setValue('time', time, { shouldValidate: true });
    setIsTimeOpen(false);
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

              <div
                className={css.time_container}
                ref={timeWrapperRef}
                onClick={() => setIsTimeOpen(!isTimeOpen)}
              >
                <div
                  className={`${css.time_input} ${
                    isTimeOpen ? css.time_input_active : ''
                  }`}
                >
                  <span
                    className={`${css.time_value} ${
                      !selectedTime ? css.placeholder : ''
                    }`}
                  >
                    {selectedTime || '00:00'}
                  </span>
                  <svg width="20" height="20" className={css.clock}>
                    <use href="/sprite.svg#clock"></use>
                  </svg>
                </div>

                {isTimeOpen && (
                  <div className={css.time_menu}>
                    <div className={css.time_menu_title}>Meeting time</div>
                    <div className={css.time_list}>
                      {timeSlots.map(time => (
                        <div
                          key={time}
                          className={`${css.time_option} ${
                            time === selectedTime
                              ? css.time_option_selected
                              : ''
                          }`}
                          onClick={e => {
                            e.stopPropagation();
                            handleTimeSelect(time);
                          }}
                        >
                          {time.replace(':', '   :   ')}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <input type="hidden" {...register('time')} />
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
