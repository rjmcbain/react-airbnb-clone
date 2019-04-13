import axios from "axios";
import authService from "../services/auth-service.js";
import axiosService from "../services/axios-service";

import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_SUCCESS,
  FETCH_RENTAL_INIT,
  FETCH_RENTAL_FAIL,
  FETCH_RENTAL_BY_ID_INIT,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT
} from "./types";

const axiosInstance = axiosService.getInstance();

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

const fetchRentalsInit = () => {
  return {
    type: FETCH_RENTAL_INIT
  };
};

const fetchRentalsFail = errors => {
  return {
    type: FETCH_RENTAL_FAIL,
    errors
  };
};

export const fetchRentals = city => {
  const url = city ? `/rentals?city=${city}` : "/rentals";
  return dispatch => {
    dispatch(fetchRentalsInit());

    axiosInstance
      .get(url)
      .then(res => res.data)
      .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
      .catch(({ response }) =>
        dispatch(fetchRentalsFail(response.data.errors))
      );
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

export const createRental = rentalData => {
  return axiosInstance.post("/rentals", rentalData).then(
    res => {
      return res.data;
    },
    err => {
      return Promise.reject(err.response.data.errors);
    }
  );
};

// Auth Action ----------------

const loginSuccess = () => {
  const username = authService.getUsername();
  return {
    type: LOGIN_SUCCESS,
    username
  };
};

const loginFailure = errors => {
  return {
    type: LOGIN_FAILURE,
    errors
  };
};

export const register = userData => {
  return axios.post("/api/v1/users/register", userData).then(
    res => {
      return res.data;
    },
    err => {
      return Promise.reject(err.response.data.errors);
    }
  );
};

export const checkAuthState = () => {
  return dispatch => {
    if (authService.isAuthenticated()) {
      dispatch(loginSuccess());
    }
  };
};

export const login = userData => {
  return dispatch => {
    return axios
      .post("/api/v1/users/auth", userData)
      .then(res => res.data)
      .then(token => {
        authService.saveToken(token);
        dispatch(loginSuccess());
      })
      .catch(({ response }) => {
        dispatch(loginFailure(response.data.errors));
      });
  };
};

export const logout = () => {
  authService.invalidateUser();

  return {
    type: LOGOUT
  };
};

export const createBooking = booking => {
  return axiosInstance
    .post("/bookings", booking)
    .then(res => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors));
};
