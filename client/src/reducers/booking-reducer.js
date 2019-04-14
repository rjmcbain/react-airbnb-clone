import {
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS_FAIL,
  FETCH_USER_BOOKINGS_INIT
} from "../actions/types";

const INITIAL_STATE = {
  data: [],
  errors: []
};

export const userBookingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_BOOKINGS_INIT:
      return { ...state, data: [], errors: [] };
    case FETCH_USER_BOOKINGS_SUCCESS:
      return { ...state, data: action.userBookings, errors: [] };
    case FETCH_USER_BOOKINGS_FAIL:
      return { ...state, errors: [], data: [] };
    default:
      return state;
  }
};
