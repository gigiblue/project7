import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import Map from "./component/Map";
import Menu from "./component/Menu";
// import SquareAPI from './API/'
import * as LocationsAPI from "./API/";

class App extends Component {
  state = {
    zoom: 13,
    all: [],
    markers: [],
    filtered: [],
    open: false,
    selectedId: null,
    activeMarker: null
  };

  closeOtherMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

  handleMarkerClick = marker => {
    this.closeOtherMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
  };

  handleMenuClick = venue => {
    console.log(venue);
  }

  componentDidMount = () => {
    LocationsAPI.getLocations().then(json => {
      const all = json.response.venues;
      // const filtered = this.filterVenues(all, "");
      this.setState({
        all: all,
        filtered: all
      });
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
      this.setState({ markers });
    });
  };
  filterVenues = (venues, query) => {
    // Filter locations to match query string
    return venues.filter(venue =>
      venue.name.toLowerCase().includes(query.toLowerCase())
    );
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
          filtered={this.state.filtered} 
          {...this.state}
          handleMenuClick={this.handleMenuClick}
        />
        <Map
          {...this.state}
          handleMarkerClick={this.handleMarkerClick}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }
}

export default App;
