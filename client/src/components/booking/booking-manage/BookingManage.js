import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../../actions/actions";

class BookingManage extends Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchUserBookings());
  }

  render() {
    const { userBookings } = this.props;
    return (
      <section id="userBookings">
        <h1 className="page-title">My Bookings</h1>
        <div className="row">
          {userBookings.data.map((booking, index) => (
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-header">
                  {booking.rental ? booking.rental.category : "Deleted"}
                </div>
                <div className="card-block">
                  {booking.rental && (
                    <div>
                      <h4 className="card-title">
                        {" "}
                        {booking.rental.title} - {booking.rental.city}
                      </h4>
                      <p className="card-text booking-desc">
                        {booking.rental.description}
                      </p>
                    </div>
                  )}
                  <p className="card-text booking-days">
                    {booking.startAt} - {booking.endAt} | {booking.days} days
                  </p>
                  <p className="card-text booking-price">
                    <span>Price: </span>{" "}
                    <span className="booking-price-value">
                      ${booking.totalPrice}
                    </span>
                  </p>
                  {booking.rental && (
                    <Link
                      className="btn btn-bwm"
                      to={`/rentals/${booking.rental._id}`}
                    >
                      Go to Rental
                    </Link>
                  )}
                </div>
                <div className="card-footer text-muted">
                  Created {booking.createdAt}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="alert alert-warning">
          You have no bookings created go to rentals section and book your place
          today.
          <Link
            style={{ marginLeft: "10px" }}
            className="btn btn-bwm"
            to="rentals index page"
          >
            Available Rental
          </Link>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    userBookings: state.userBookings
  };
}

export default connect(mapStateToProps)(BookingManage);
