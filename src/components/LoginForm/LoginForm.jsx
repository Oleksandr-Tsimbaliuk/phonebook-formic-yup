import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logIn } from 'redux/auth/authOperations';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object({
  email: Yup.string('Enter your email')
    .matches(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    )
    .required('Email is required'),
  password: Yup.string('Enter your password')
    .min(6, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function LoginForm() {
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: loginSchema,

    onSubmit: values => {
      dispatch(
        logIn({
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
        <h2>Login</h2>

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
          Log in
        </button>
        <NavLink to="/registration">Sign Up</NavLink>
      </form>
    </div>
  );
}
