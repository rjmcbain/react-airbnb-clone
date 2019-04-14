import React, { Component } from "react";

import * as actions from "../../../actions/actions";

export default class RentalManage extends Component {
  constructor() {
    super();

    this.state = {
      userRentals: [],
      errors: []
    };
  }

  componentWillMount() {
    actions.getUserRentals().then(
      userRentals => {
        this.setState({ userRentals });
      },
      errors => {
        this.setState({ errors });
      }
    );
  }

  render() {
    const { userRentals } = this.state;

    return (
      <div>
        {userRentals.map((rental, index) => {
          return <p key={index}>{rental.title}</p>;
        })}
      </div>
    );
  }
}
