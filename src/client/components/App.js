import React, { Component } from "react";
import { connect } from "react-redux";

import "../app.css";
import { getUserCurrentLocation } from "../actionCreators/userLocationActionCreator";
import { MainMap } from "./MainMap";

export class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch("/api/getUsername")
      .then((res) => res.json())
      .then((user) => this.setState({ username: user.username }));
    // fetch("/api/getAllAvailableVehicles")
    //   .then((res) => res.json())
    //   .then((vehicles) => console.log(vehicles.response.result));
    this.props.getUserCurrentLocation();
    // this.startSSE();
  }

  startSSE = () => {
    if (!!window.EventSource) {
      var source = new EventSource("/api/countdown");

      source.addEventListener(
        "message",
        function (e) {
          console.log(e);
        },
        false
      );

      source.addEventListener(
        "open",
        function (e) {
          console.log(e);
        },
        false
      );

      source.addEventListener(
        "error",
        function (e) {
          const id_state = document.getElementById("state");
          if (e.eventPhase == EventSource.CLOSED) source.close();
          if (e.target.readyState == EventSource.CLOSED) {
            id_state.innerHTML = "Disconnected";
          } else if (e.target.readyState == EventSource.CONNECTING) {
            id_state.innerHTML = "Connecting...";
          }
        },
        false
      );
    } else {
      console.log("Your browser doesn't support SSE");
    }
  };

  render() {
    const { username } = this.state;
    const { location } = this.props;

    console.log(location);
    return (
      <div>
        {username ? (
          <h1>{`Hello ${username}`}</h1>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
        {location.length > 0 && <MainMap position={location} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  location: state.userLocation.currentLocation,
});

const mapDispatchToProps = (dispatch) => ({
  getUserCurrentLocation: () => dispatch(getUserCurrentLocation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
