import L from "leaflet";

export const markerIcon = (imgUrl) => {
  return new L.Icon({
    iconUrl: require("../assets/taxi.png"),
    iconSize: [40, 40],
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });
};
