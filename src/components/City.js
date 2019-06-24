import React from "react";

class City extends React.Component {
  render() {
    return (
      <div className="white">
        Currently Displaying Weather For: {this.props.location}
        <br />
      </div>
    );
  }
}

export default City;
