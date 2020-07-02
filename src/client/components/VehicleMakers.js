import React, { Component } from "react";
import { connect } from "react-redux";
import { Marker, Popup } from "react-leaflet";
import { markerIcon } from "../helpers";

import PropTypes from "prop-types";
import { getVehicleDetails } from "../actionCreators/vehiclesDetailsActionCreator";

export class VehicleMakers extends Component {
  componentDidMount() {
    this.props.getVehicleDetails();
  }
  render() {
    return (
      <React.Fragment>
        {this.props.vehicles.length > 0 &&
          this.props.vehicles.map((vehicle) => (
            <Marker
              icon={
                new L.Icon({
                  iconUrl: require(vehicle.vehicle_type.color === "pink"
                    ? "../../assets/pink-taxi.png"
                    : "../../assets/taxi.png"),
                  iconSize: [30, 30],
                  iconAnchor: null,
                  popupAnchor: null,
                  shadowUrl: null,
                  shadowSize: null,
                  shadowAnchor: null,
                })
              }
              key={vehicle.vehicle_id}
              position={vehicle.vehicle_current_location}
            >
              <Popup>
                {vehicle.vehicle_type && vehicle.vehicle_type.color}
              </Popup>
            </Marker>
          ))}
      </React.Fragment>
    );
  }
}

VehicleMakers.propTypes = {};

const mapStateToProps = (state) => ({
  vehicles: state.vehicleDetails.vehicles,
});

const mapDispatchToProps = (dispatch) => ({
  getVehicleDetails: () => dispatch(getVehicleDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleMakers);
