import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/authOperations';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RegistrationSchema = Yup.object({
  name: Yup.string('Enter your name').required('Name is required').min(2),
  email: Yup.string('Enter your email')
    .required('Email is required')
    .email('Enter a valid email'),
  password: Yup.string('Enter your password')
    .required('Password is required')
    .min(8, 'Password should be of minimum 8 characters length'),
});

export default function RegisterForm() {
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
    validationSchema: RegistrationSchema,
    onSubmit: values => {
      dispatch(
        register({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
      alert(JSON.stringify(values, null, 2));
    },
  });

  const dispatch = useDispatch();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Registration</h2>

        <label className="">
          <span> Username:</span>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name ? <div>{errors.name}</div> : null}
        </label>

        <label className="">
          <span>Email:</span>
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email ? <div>{errors.email}</div> : null}
        </label>

        <label className="">
          <span>Password:</span>
          <input
            type="text"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password ? <div>{errors.password}</div> : null}
        </label>

        <button className="" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}

// const handleChange = ({ target: { name, value } }) => {
//   switch (name) {
//     case 'name':
//       return setName(value);
//     case 'email':
//       return setEmail(value);
//     case 'password':
//       return setPassword(value);
//     default:
//       return;
//   }
// };
