import React, { Component } from "react";

class RentalDetail extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>I am rental detail component {this.props.match.params.id}</h1>
      </div>
    );
  }
}

export default RentalDetail;
