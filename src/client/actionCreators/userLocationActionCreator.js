import {
  GET_USER_CURRENT_LOCATION_LOADING,
  GET_USER_CURRENT_LOCATION_SUCCESS,
  GET_USER_CURRENT_LOCATION_ERROR,
} from "../actions/mainActions";

const getUserCurrentLocationLoading = () => ({
  type: GET_USER_CURRENT_LOCATION_LOADING,
});

const getUserCurrentLocationSuccess = (response) => ({
  type: GET_USER_CURRENT_LOCATION_SUCCESS,
  payload: response,
});

const getUserCurrentLocationError = () => ({
  type: GET_USER_CURRENT_LOCATION_ERROR,
});

export const getUserCurrentLocation = (formData) => {
  return (dispatch) => {
    dispatch(getUserCurrentLocationLoading());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const pos = [position.coords.latitude, position.coords.longitude];
          dispatch(getUserCurrentLocationSuccess(pos));
        },
        function () {
          dispatch(getUserCurrentLocationError());
        }
      );
    }
  };
};
