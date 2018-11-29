import React, { Component } from "react";

class Menu extends Component {
    MenuStyle = {
    position: "absolute",
    width: "25%",
    minWidth: "80px",
    height: "100%",
    backgroundColor: "gray",
  };
  render() {
    return (
      <div style={this.MenuStyle}>
        <h1>Filter Restaurants</h1>
        <input type="text" />
        <div>
          <ul
            style={{
              listStyleType: "none",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}>
            {this.props.filtered.map(venue => {
              return <li key={venue.name}>{venue.name}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu;
