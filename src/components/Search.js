import React from "react";

const Search = props => {
  return (
    <div className="ui input">
      <input
        className="prompt"
        type="text"
        placeholder="City"
        onChange={props.handleCityChange}
      />
      <input
        className="prompt"
        type="text"
        placeholder="Country"
        onChange={props.handleCountryChange}
      />
      <input
        type="button"
        value="Get Location"
        className="ui primary button"
        onClick={props.handleClick}
      />
    </div>
  );
};

export default Search;
