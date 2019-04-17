import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as actions from "../../../actions/actions";
import RentalManageCard from "./RentalManageCard";
import RentalManageModal from "./RentalManageModal";
import { ToastContainer, toast } from "react-toastify";

export default class RentalManage extends Component {
  constructor() {
    super();

    this.state = {
      userRentals: [],
      errors: [],
      isFetching: false
    };

    this.deleteRental = this.deleteRental.bind(this);
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
      <RentalManageCard
        modal={<RentalManageModal bookings={rental.bookings} />}
        key={index}
        rental={rental}
        rentalIndex={index}
        deleteRentalCb={this.deleteRental}
      />
    ));
  }

  deleteRental(rentalId, rentalIndex) {
    actions.deleteRental(rentalId).then(
      () => {
        this.deleteRentalFromList(rentalIndex);
      },
      errors => {
        toast.error(errors[0].detail);
      }
    );
  }

  deleteRentalFromList(rentalIndex) {
    const userRentals = this.state.userRentals.splice();

    userRentals.splice(rentalIndex, 1);
    this.setState({ userRentals });
  }

  render() {
    const { userRentals, isFetching } = this.state;

    return (
      <section id="userRentals">
        <ToastContainer />
        <h1 className="page-title">My Rentals</h1>
        <div className="row">{this.renderRentalCards(userRentals)}</div>
        {!isFetching && userRentals.length === 0 && (
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
