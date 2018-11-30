import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import Map from "./component/Map";
import Menu from "./component/Menu";
// import SquareAPI from './API/'
import * as LocationsAPI from "./API/";

class App extends Component {
  state = {
    zoom: 14,
    all: [],
    markers: [],
    visibleMarkers: [],
    filtered: [],
    open: false,
    query: "",
    selectedId: null,
    selectedIndex: null,
    activeMarker: null
  };
  //This is to close other markers's info window when a single one is clicked
  closeOtherMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };
  //when a venue's marker is clicked
  handleMarkerClick = marker => {
    console.log(marker);
    this.closeOtherMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
  };

  handleMenuClick = venue => {
    console.log(venue);
    const markers = [...this.state.markers];
    const visMark = [...this.state.visibleMarkers];
    console.log(visMark);
    visMark.forEach(marker => (marker.isOpen = false));
    const newMarkers = visMark.map(marker => {
      if (venue.name === marker.name) {
        marker.isOpen = true;
        return marker;
      }
      return marker;
    });
    this.setState({ visibleMarkers: newMarkers });
  };

  componentDidMount = () => {

    window.gm_authFailure = () => {
      alert("Your GoogleMaps data could not be retrieved due to an error");
    }

    LocationsAPI.getLocations().then(json => {
      const all = json.response.venues;
      // const filtered = this.filterVenues(all, "");
      this.setState({
        all: all,
        filtered: all
      });
      // console.log(all);
      // console.log(filtered);
      const markers = all.map(venue => {
        return {
          lat: parseFloat(venue.location.lat),
          lng: parseFloat(venue.location.lng),
          isOpen: false,
          isVisible: true,
          name: venue.name,
          address: venue.location.address
        };
      });
      // console.log(markers);
      this.setState({ markers: markers, visibleMarkers: markers });
    });
  };
//Jason White helped me with this function. He is great!
  filterVenues = query => {
    const venues = [...this.state.all];
    const filtered = venues.filter(venue =>
      venue.name.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filtered);
    this.setState(
      {
        query: query,
        selectedIndex: null,
        filtered: filtered
      },
      () => this.filterMarkers()
    );
  };
//Adapted from Doug Brown's Tutorial
  filterMarkers = () => {
    const markers = [...this.state.markers];
    const filtered = [...this.state.filtered];
    const markerArr = [];
    markers.forEach(marker => {
      filtered.forEach(location => {
        if (marker.name === location.name) {
          markerArr.push(marker);
        }
      });
    });
    console.log(markerArr);
    this.setState({ visibleMarkers: markerArr });
  };

  render() {
    return (
      <div className="App">
        <Menu
          filterVenues={this.filterVenues}
          filtered={this.state.filtered}
          {...this.state}
          handleMenuClick={this.handleMenuClick}
        />
        <Map
          {...this.state}
          closeOtherMarkers={this.closeOtherMarkers}
          handleMarkerClick={this.handleMarkerClick}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }
}

export default App;
