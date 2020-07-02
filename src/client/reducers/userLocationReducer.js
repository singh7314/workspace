import {
  GET_USER_CURRENT_LOCATION_LOADING,
  GET_USER_CURRENT_LOCATION_SUCCESS,
  GET_USER_CURRENT_LOCATION_ERROR,
} from "../actions/mainActions";

const initialState = {
  currentLocation: [],
  isCurrentLocationLoading: false,
};

export const userLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_CURRENT_LOCATION_LOADING:
      return {
        ...state,
        isCurrentLocationLoading: true,
      };

    case GET_USER_CURRENT_LOCATION_SUCCESS:
      return {
        ...state,
        isCurrentLocationLoading: false,
        currentLocation: action.payload,
      };

    case GET_USER_CURRENT_LOCATION_ERROR:
      return {
        ...state,
        isCurrentLocationLoading: false,
      };

    default:
      return state;
  }
};
