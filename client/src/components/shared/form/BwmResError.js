import React from "react";

export default function BwmResError(props) {
  const errors = props.errors;
  return (
    errors.length > 0 && (
      <div className="alert alert-danger bwn-res-errors">
        {errors.map((error, index) => (
          <p key={index}>{error.detail}</p>
        ))}
      </div>
    )
  );
}
