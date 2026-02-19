import ModalAuth from '../../modals/Modal/ModalAuth';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import css from './AuthForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  LoginSchema,
  registrationSchema,
  type LoginFormData,
  type RegistrationFormData,
} from '../../../utils/validation';
import { signIn, signUp } from '../../../service/firebase/auth.service';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';

interface AuthFormProps {
  onClose: () => void;
  mode: 'login' | 'registration';
}

const AuthForm = ({ onClose, mode }: AuthFormProps) => {
  const [authError, setAuthError] = useState<string | null>(null);

  const title = mode === 'login' ? 'Log In' : 'Registration';
  const text =
    mode === 'login'
      ? 'Welcome back! Please enter your credentials to access your account and continue your babysitter search. In'
      : 'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.';

  const isLogin = mode === 'login';

  const loginForm = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
    mode: 'onSubmit',
    defaultValues: { email: '', password: '' },
  });

  const registratioForm = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema),
    mode: 'onSubmit',
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmitRegistration = async (values: RegistrationFormData) => {
    try {
      await signUp({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      registratioForm.reset({ name: '', email: '', password: '' });
      onClose();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (
          error.code === 'auth/wrong-password' ||
          error.code === 'auth/user-not-found'
        ) {
          setAuthError('Invalid email or password');
        } else {
          setAuthError('Something went wrong. Try again.');
        }
      } else if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError('Something went wrong. Try again.');
      }
    }
  };

  const onSubmitLogin = async (values: LoginFormData) => {
    try {
      await signIn({
        email: values.email,
        password: values.password,
      });
      loginForm.reset({ email: '', password: '' });
      onClose();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setAuthError('Email already in use');
            break;
          case 'auth/weak-password':
            setAuthError('Password is too weak');
            break;
          default:
            setAuthError('Something went wrong. Try again.');
        }
      } else {
        setAuthError('Something went wrong. Try again.');
      }
    }
  };

  return (
    <ModalAuth onClose={onClose}>
      <div className={css.auth_form_container}>
        <button type="button" onClick={onClose} className={css.close_btn}>
          <svg width="32" height="32" className={css.close_btn_icon}>
            <use href="sprite.svg#x"></use>
          </svg>
        </button>
        <h1 className={css.title}>{title}</h1>
        <p className={css.text}>{text}</p>
        {isLogin ? (
          <form
            className={css.form}
            onSubmit={loginForm.handleSubmit(onSubmitLogin)}
          >
            <div className={css.input_container}>
              <div className={css.input_item}>
                <Input
                  {...loginForm.register('email')}
                  placeholder="Email"
                  type="email"
                />
                {loginForm.formState.errors.email && (
                  <p className={css.error}>
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className={css.input_item}>
                <Input
                  {...loginForm.register('password')}
                  type="password"
                  placeholder="Password"
                />
                {loginForm.formState.errors.password && (
                  <p className={css.error}>
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <Button type="submit" className="button button_modal" width="100%">
              Log In
            </Button>
            {authError && <p className={css.auth_error}>{authError}</p>}
          </form>
        ) : (
          <form
            className={css.form}
            onSubmit={registratioForm.handleSubmit(onSubmitRegistration)}
          >
            <div className={css.input_container}>
              <div className={css.input_item}>
                <Input
                  {...registratioForm.register('name')}
                  placeholder="Name"
                  type="text"
                />
                {registratioForm.formState.errors.name && (
                  <p className={css.error}>
                    {registratioForm.formState.errors.name?.message}
                  </p>
                )}
              </div>
              <div className={css.input_item}>
                <Input
                  {...registratioForm.register('email')}
                  placeholder="Email"
                  type="email"
                />
                {registratioForm.formState.errors.email && (
                  <p className={css.error}>
                    {registratioForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className={css.input_item}>
                <Input
                  {...registratioForm.register('password')}
                  type="password"
                  placeholder="Password"
                />
                {registratioForm.formState.errors.password && (
                  <p className={css.error}>
                    {registratioForm.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <Button type="submit" className="button_modal button " width="100%">
              Sign Up
            </Button>
            {authError && <p className={css.auth_error}>{authError}</p>}
          </form>
        )}
      </div>
    </ModalAuth>
  );
};

export default AuthForm;
