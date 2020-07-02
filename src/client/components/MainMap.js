import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { markerIcon } from "../helpers";
import VehicleMakers from "./VehicleMakers";

export class MainMap extends React.Component {
  state = {
    destinationCoordinates: [],
  };
  addDestinationMarker = (e) => {
    console.log(e.latlng.lat, e.latlng.lng);

    this.setState({
      destinationCoordinates: [e.latlng.lat, e.latlng.lng],
    });
  };
  render() {
    const { position } = this.props;
    const { destinationCoordinates } = this.state;

    return (
      <Map
        center={position}
        zoom={16}
        onClick={this.addDestinationMarker}
        style={{ height: "100vh" }}
      >
        <VehicleMakers />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
        {destinationCoordinates.length > 0 && (
          <Marker
            icon={
              new L.Icon({
                iconUrl: require("../../assets/map-marker.png"),
                iconSize: [40, 40],
                iconAnchor: null,
                popupAnchor: null,
                shadowUrl: null,
                shadowSize: null,
                shadowAnchor: null,
              })
            }
            position={destinationCoordinates}
          >
            <Popup>Your Destination</Popup>
          </Marker>
        )}
      </Map>
    );
  }
}
