import React, { Component } from "react";

class Menu extends Component {
    MenuStyle = {
    position: "absolute",
    width: "25%",
    minWidth: "80px",
    height: "100%",
    backgroundColor: "gray",
  };

  updateQuery = (newQuery) => {
          // Save the new query string in state and pass the string up the call tree
          this.setState({query: newQuery});
          this.props.filterVenues(newQuery);
      }

  render = () => {
    return (
      <div style={this.MenuStyle}>
        <h1>Filter Restaurants</h1>
        <input type="text"
        onChange={e => this.updateQuery(e.target.value)}
        value={this.state.query}
        />
        <div>
          <ul
                style={{
                  listStyleType: "none",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}>
            // {this.props.filtered.map(venue => {
            //   return <li key={venue.name}>{venue.name}</li>;
            //   onClick={() => this.props.handleMenuClick(this.props)}
            // })}
            {this.props.venues && this
                  .props
                  .venues
                  .map((venue, index) => {
                      return (
                          <li key={venue.name}>
                                <button
                                  key={index}
                                  onClick={() => this
                                  .props
                                  .handleMenuClick(this.props)}>
                                  <div>
                                      <div>
                                          {venue.name}
                                      </div>
                                  </div>
                                </button>
                          </li>
                        )
                    })}
          </ul>
        </div>
      </div>
    )
  }
}

export default Menu;
