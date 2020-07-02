import {
  GET_VEHICLE_DETAILS_LOADING,
  GET_VEHICLE_DETAILS_SUCCESS,
  GET_VEHICLE_DETAILS_ERROR,
} from "../actions/mainActions";

const initialState = {
  vehicles: [],
  isVehicleDetailsLoading: false,
};

export const vehicleDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VEHICLE_DETAILS_LOADING:
      return {
        ...state,
        isVehicleDetailsLoading: true,
      };

    case GET_VEHICLE_DETAILS_SUCCESS:
      return {
        ...state,
        isVehicleDetailsLoading: false,
        vehicles: action.payload,
      };

    case GET_VEHICLE_DETAILS_ERROR:
      return {
        ...state,
        isVehicleDetailsLoading: false,
      };

    default:
      return state;
  }
};
