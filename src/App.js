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
  //when a venue's item on the Menu list is clicked
  handleMenuClick = venue => {
    console.log(venue);
    const markers = [...this.state.markers];
    markers.forEach(marker => (marker.isOpen = false));
    const newMarkers = markers.map(marker => {
      if (venue.name === marker.name) {
        marker.isOpen = true;
        return marker;
      }
      return marker;
    });
    this.setState({ visibleMarkers: newMarkers });
  };

  componentDidMount = () => {
    LocationsAPI.getLocations().then(json => {
      const all = json.response.venues;
      // const filtered = this.filterVenues(all, "");
      this.setState({
        all: all,
        filtered: all // const filtered = this.filterVenues(all, ""); should be like this, but I temporarily changed it to all because I'm having issues with my filtervenues function and I want to show a list for now
      });
      console.log(all);
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
      console.log(markers);
      this.setState({ markers: markers, visibleMarkers: markers });
    });
  };

  filterVenues = query => {
    const venues = [...this.state.all];
    const filtered = venues.filter(venue =>
      venue.name.toLowerCase().includes(query.toLowerCase())
    );
    this.setState(
      {
        query: query,
        selectedIndex: null,
        filtered: filtered
      },
      () => this.filterMarkers()
    );
  };

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
    this.setState({ visibleMarkers: markerArr });
  };

  render() {
    return (
      <div
        className="App"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          gridTemplateRows: "1fr"
        }}>
        <div>
          <h1>Roma Ostiense, Italy: Ramen Restaurants</h1>
        </div>
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
