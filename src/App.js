import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Map from './component/Map';
// import SquareAPI from './API/'
import * as LocationsAPI from './API/';

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     venues: [],
  //     center: [],
  //     markers: [],
  //     zoom: 12
  //   };
  // }
  componentDidMount = () => {
    LocationsAPI.getLocations()
    .then(results => {
      this.setState({
        locations: results
      });
      console.log(results);
      //results => this.setState({ locations: results })
      //const {venues} = results.venue;
      // // const {center} = results.geocode.feature.geometry;
      // const markers = venues.map(venue=>{
      //   return {
      //     lat: venue.location.lat,
      //     lng: venue.location.lng,
      //     isOpen: false,
      //     isVisible: true
      //   };
      // });
      // this.setState({markers});
    });
   }

  render() {
    return (
      <div className="App">
      <div>
        <h1>Roma Ostiense, Italy: Ramen Restaurants</h1>
      </div>
        <Map/>
      </div>
    );
  }
}

export default App;
