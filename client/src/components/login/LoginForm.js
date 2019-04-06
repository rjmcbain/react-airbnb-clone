import React from "react";
import { Field, reduxForm } from "redux-form";
import { BwmInput } from "../../components/shared/form/BwmInput";
import BwmResError from "../shared/form/BwmResError";
import { required, minLength4 } from "../shared/form/validators";

const LoginForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="email"
        component="input"
        type="email"
        label="Email"
        className="form-control"
        component={BwmInput}
        validate={[required, minLength4]}
      />
      <Field
        name="password"
        component="input"
        type="password"
        label="Password"
        className="form-control"
        component={BwmInput}
        validate={[required]}
      />
      <button
        className="btn btn-bwm btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Submit
      </button>
      {/* <BwmResError errors={errors} /> */}
    </form>
  );
};

export default reduxForm({
  form: "loginForm"
})(LoginForm);
