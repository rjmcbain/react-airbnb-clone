import axios from "axios";
import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  LOGIN_FAILURE,
  LOGIN_SUCCESS
} from "./types";

function fetchRentalByIdInit() {
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  };
}

const fetchRentalByIdSuccess = rental => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental
  };
};
const fetchRentalsSuccess = rentals => {
  return {
    type: FETCH_RENTAL_SUCCESS,
    rentals
  };
};

export const fetchRentals = () => {
  return dispatch => {
    axios
      .get("/api/v1/rentals")
      .then(res => {
        return res.data;
      })
      .then(rentals => {
        dispatch(fetchRentalsSuccess(rentals));
      });
  };
};

export const fetchRentalById = rentalId => {
  return function(dispatch) {
    dispatch(fetchRentalByIdInit());
    // Send Request To Server, Async Code

    axios
      .get(`/api/v1/rentals/${rentalId}`)
      .then(res => res.data)
      .then(rental => dispatch(fetchRentalByIdSuccess(rental)));
  };
};

// Auth Action ----------------

export const register = userData => {
  return axios.post("/api/v1/users/register", { ...userData }).then(
    res => {
      return res.data;
    },
    err => {
      return Promise.reject(err.response.data.errors);
    }
  );
};

const loginSuccess = token => {
  return {
    type: LOGIN_SUCCESS,
    token
  };
};

const loginFailure = errors => {
  return {
    type: LOGIN_FAILURE,
    errors
  };
};

export const login = userData => {
  return dispatch => {
    return axios
      .post("/api/v1/users/auth", { ...userData })
      .then(res => res.data)
      .then(token => {
        localStorage.setItem("auth_token", token);
        dispatch(loginSuccess(token));
      })
      .catch(response => {
        dispatch(loginFailure(response.data.errors));
      });
  };
};
