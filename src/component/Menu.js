import React, { Component } from "react";

class Menu extends Component {
  state = {
    open: false,
    query: ""
  };

  updateQuery = newQuery => {
    // Save the new query string in state and pass the string up the call tree
    this.setState({ query: newQuery });
    this.props.filterVenues(newQuery);
  };

  render = () => {
    return (
      <div className="menuBar">
        <h1>Filter Restaurants</h1>
        <input
          type="text" id={"search"}
          onChange={e => this.updateQuery(e.target.value)}
          value={this.state.query}
        />
        <div>
          <ul className="menuList">
            {this.props.filtered &&
              this.props.filtered.map((venue, index) => {
                return (
                  <li className="itemList" key={venue.name}>
                    <button
                      key={index}
                      onClick={() => this.props.handleMenuClick(venue)}>
                      <div>
                        <div>{venue.name}</div>
                      </div>
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  };
}

export default Menu;
// {this.props.filtered.map(venue => {
//   return <li key={venue.name}>{venue.name}</li>;
//   onClick={() => this.props.handleMenuClick(this.props)}
// })}
