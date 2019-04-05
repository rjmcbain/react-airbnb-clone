import React from "react";
import { Field, reduxForm } from "redux-form";
import { BwmInput } from "../../components/shared/form/BwmInput";

const RegisterForm = props => {
  const { handleSubmit, pristine, reset, submitting, submitCb, valid } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="username"
        component="input"
        type="text"
        label="Username"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="email"
        component="input"
        type="email"
        label="Email"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="password"
        component="input"
        type="password"
        label="Password"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="passwordConfirmation"
        component="input"
        type="password"
        label="Confirm Password"
        className="form-control"
        component={BwmInput}
      />
      <button
        className="btn btn-bwm btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Submit
      </button>
    </form>
  );
};

const validate = values => {
  const errors = {};
  if (values.username && values.username.length < 2) {
    errors.username = "User min length is 2 characters!";
  }
  if (!values.email) {
    errors.email = "Please enter an email address";
  }
  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter password";
  }
  if (values.password !== values.passwordConfirmation) {
    errors.password = "Passwords must match";
  }
  return errors;
};

export default reduxForm({
  form: "registerForm",
  validate
})(RegisterForm);
