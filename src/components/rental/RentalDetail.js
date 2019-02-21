import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions/actions";

class RentalDetail extends Component {
  componentWillMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(actions.fetchRentalById(rentalId));
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>I am rental detail component</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rentals: state.rentals.data
  };
}

export default connect(mapStateToProps)(RentalDetail);
