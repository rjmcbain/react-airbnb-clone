import React, { Component } from "react";
import Listings from "./Listings";
import { connect } from "react-redux";

import * as actions from "../../actions/actions";

class RentalList extends Component {
  renderRentals() {
    return this.props.rentals.map((rental, index) => {
      return <Listings key={index} rental={rental} />;
    });
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchRentals());
  }

  render() {
    return (
      <div>
        <section id="rentalListing">
          <h1 className="page-title">Your Home All Around the World</h1>
          <div className="row">{this.renderRentals()}</div>
          <button onClick={this.addRental}> Add Rental </button>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rentals: state.rentals.data
  };
}

export default connect(mapStateToProps)(RentalList);
