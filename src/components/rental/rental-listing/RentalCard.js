import React from "react";
import { Link } from "react-router-dom";

export default function RentalCard({ rental }) {
  console.log(rental);
  return (
    <div className="col-md-3 col-xs-6">
      <Link className="rental-detail-link" to={`/rentals/${rental.id}`}>
        <div className="card bwm-card">
          <img className="card-img-top" src={rental.image} alt={rental.title} />
          <div className="card-block">
            <h6 className={`card-subtitle ${rental.category}`}>
              {rental.shared ? "shared" : "whole"} {rental.category} ·{" "}
              {rental.city}
            </h6>
            <h4 className="card-title">{rental.title}</h4>
            <p className="card-text">
              ${rental.dailyRate} per Night · Free Cancelation
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
