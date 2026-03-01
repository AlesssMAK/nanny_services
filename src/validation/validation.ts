import * as yup from 'yup';

export const LoginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Invalid email address')
    .required('This field is required'),
  password: yup
    .string()
    .min(6, 'Must be at least 6 characters')
    .required('This field is required'),
});

export const registrationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .matches(/^[A-Za-z]+$/, 'Only letters are allowed')
    .min(2, 'Must be at least 2 characters')
    .required('This field is required'),
  email: yup
    .string()
    .trim()
    .email('Invalid email address')
    .required('This field is required'),
  password: yup
    .string()
    .min(6, 'Must be at least 6 characters')
    .required('This field is required'),
});

export const appointmentSchema = yup.object({
  address: yup.string().required('Address is required'),
  phone: yup.string().required('Phone is required'),
  childAge: yup.string().required("Child's age is required"),
  time: yup.string().required('Time is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  parentName: yup.string().required('Parent name is required'),
  comment: yup.string().required('Comment is required'),
});

export type LoginFormData = yup.InferType<typeof LoginSchema>;
export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
export type AppointmentFormData = yup.InferType<typeof appointmentSchema>;
