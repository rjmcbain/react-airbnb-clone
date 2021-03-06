import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTAL_INIT,
  FETCH_RENTAL_FAIL
} from "../actions/types";

const INITIAL_STATE = {
  rentals: {
    data: [],
    errors: []
  },
  rental: {
    data: {}
  }
};

export const rentalReducer = (state = INITIAL_STATE.rentals, action) => {
  switch (action.type) {
    case FETCH_RENTAL_INIT:
      return { ...state, data: [], errors: [] };
    case FETCH_RENTAL_SUCCESS:
      return { ...state, data: action.rentals };
    case FETCH_RENTAL_FAIL:
      return Object.assign({}, state, { errors: action.errors, data: [] });
    default:
      return state;
  }
};

export const selectedRentalReducer = (state = INITIAL_STATE.rental, action) => {
  switch (action.type) {
    case FETCH_RENTAL_BY_ID_SUCCESS:
      return { ...state, data: action.rental };
    case FETCH_RENTAL_BY_ID_INIT:
      return { ...state, data: {} };
    default:
      return state;
  }
};
