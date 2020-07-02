import { combineReducers } from "redux";
import { userLocationReducer } from "./userLocationReducer";
import { vehicleDetailsReducer } from "./vehicleDetailsReducer";

const rootReducer = combineReducers({
  userLocation: userLocationReducer,
  vehicleDetails: vehicleDetailsReducer,
});

export default rootReducer;
