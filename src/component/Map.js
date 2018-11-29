import React, {Component} from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props =>(
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 41.8724128, lng: 12.4767137 }}
    zoom={props.zoom}
    // center={props.center}
   >
    {props.markers && props.markers
                      .filter(marker => marker.isVisible)
                      .map((marker, idx)=>(
                        <Marker
                          key={idx}
                          position={{lat: marker.lat, lng: marker.lng}}
                          onClick={() => props.handleMarkerClick(marker)}>
                            {marker.isOpen && (
                              <InfoWindow>
                                <p>Gigi</p>
                              </InfoWindow>
                            )}
                          </Marker>
                        ))}
  </GoogleMap>
 ))
);

export default class Map extends Component{
  render(){
    return(
  <MyMapComponent
    {...this.props}
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDb1mvyz7Rh-48CCw_WtQK3PFltfKAILzA"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
  />
);
}
}
