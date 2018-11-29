import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Map from './component/Map';
// import SquareAPI from './API/'
import * as LocationsAPI from './API/';

class App extends Component {

  state = {
  // lat: 29.7844913,
  // lon: -95.7800231,
  zoom: 13,
  all: [],
  markers: [],
  filtered: null,
  open: false,
  selectedId: null,
  activeMarker: null
}

handleMarkerClick = (marker) => {
      marker.isOpen = true;
      this.setState({markers: Object.assign(this.state.markers.marker)})
   }

  componentDidMount = () => {
    LocationsAPI.getLocations()
      .then(json => {
        const all = json.response.venues;
        console.log(all);
        this.setState({
        all,
        filtered: this.filterVenues(all, "")
        });
        const markers = all.map(venue => {
          return {
          lat: parseFloat(venue.location.lat),
          lng: parseFloat(venue.location.lng),
          isOpen: false,
          isVisible:true,
          };
        });
        console.log(markers);
        this.setState({markers});
      })
   }
   filterVenues = (venues, query) => {
       // Filter locations to match query string
       return venues.filter(venue => venue.name.toLowerCase().includes(query.toLowerCase()));
     }

  render() {
    return (
      <div className="App">
      <div>
        <h1>Roma Ostiense, Italy: Ramen Restaurants</h1>
      </div>
        <Map {...this.state}
        handleMarkerClick={this.handleMarkerClick}/>
      </div>
    );
  }
}

export default App;
