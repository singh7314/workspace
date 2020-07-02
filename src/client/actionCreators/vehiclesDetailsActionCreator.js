import {
  GET_VEHICLE_DETAILS_LOADING,
  GET_VEHICLE_DETAILS_SUCCESS,
  GET_VEHICLE_DETAILS_ERROR,
} from "../actions/mainActions";

const getVehicleDetailsLoading = () => ({
  type: GET_VEHICLE_DETAILS_LOADING,
});

const getVehicleDetailsSuccess = (response) => ({
  type: GET_VEHICLE_DETAILS_SUCCESS,
  payload: response,
});

const getVehicleDetailsError = () => ({
  type: GET_VEHICLE_DETAILS_ERROR,
});

export const getVehicleDetails = (formData) => {
  return (dispatch) => {
    dispatch(getVehicleDetailsLoading());
    fetch("/api/getAllAvailableVehicles")
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 0) {
          dispatch(getVehicleDetailsSuccess(response.result));
        } else {
          dispatch(getVehicleDetailsError());
        }
      });
  };
};
