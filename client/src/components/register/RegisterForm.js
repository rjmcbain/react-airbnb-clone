import React from "react";
import { Field, reduxForm } from "redux-form";
import { BwmInput } from "../../components/shared/form/BwmInput";
import BwmResError from "../shared/form/BwmResError";

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="username"
        type="text"
        label="Username"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="email"
        type="email"
        label="Email"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="password"
        type="password"
        label="Password"
        className="form-control"
        component={BwmInput}
      />
      <Field
        name="passwordConfirmation"
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
        Register
      </button>
      <BwmResError errors={errors} />
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
