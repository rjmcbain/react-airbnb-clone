import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as actions from "../../../actions/actions";
import RentalManageCard from "./RentalManageCard";

export default class RentalManage extends Component {
  constructor() {
    super();

    this.state = {
      userRentals: [],
      errors: [],
      isFetching: false
    };
  }

  componentWillMount() {
    this.setState({ isFetching: true });
    actions.getUserRentals().then(
      userRentals => {
        this.setState({ userRentals, isFetching: false });
        console.log("STATE: ", this.state.userRentals);
      },
      errors => {
        this.setState({ errors, isFetching: false });
      }
    );
  }

  renderRentalCards(rentals) {
    return rentals.map((rental, index) => (
      <RentalManageCard key={index} rental={rental} />
    ));
  }

  render() {
    const { userRentals } = this.state;

    return (
      <section id="userRentals">
        <h1 className="page-title">My Rentals</h1>
        <div className="row">{this.renderRentalCards(userRentals)}</div>
        {!this.state.isFetching && userRentals.length === 0 && (
          <div className="alert alert-warning">
            You dont have any rentals currenty created. If you want advertised
            your property please follow this link.
            <Link
              style={{ marginLeft: "10px" }}
              className="btn btn-bwm"
              to="/rentals/new"
            >
              Register Rental
            </Link>
          </div>
        )}
      </section>
    );
  }
}
