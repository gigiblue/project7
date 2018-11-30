/*global google*/
import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      onClick={() => props.closeOtherMarkers()}
      role="application"
      aria-label="map"
      defaultZoom={8}
      defaultCenter={{ lat: 41.8724128, lng: 12.4767137 }}
      zoom={props.zoom}
      // center={props.center}
    >
      {props.visibleMarkers &&
        props.visibleMarkers
          .filter(marker => marker.isVisible)
          .map((marker, idx, arr) => (
            <Marker
              key={idx}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => props.handleMarkerClick(marker)}
              animation={marker.isOpen && google.maps.Animation.BOUNCE}>
              {marker.isOpen && (
                <InfoWindow onCloseClick={() => props.closeOtherMarkers()}>
                  <div>
                    <p>{marker.name}</p>
                    <p>{marker.address}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
    </GoogleMap>
  ))
);

export default class Map extends Component {
  render() {
    return (
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDb1mvyz7Rh-48CCw_WtQK3PFltfKAILzA"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}
