import React from "react";

const Search = props => {
  return (
    <div className="ui input">
      <input className="prompt" type="text" placeholder={props.name} />
    </div>
  );
};

export default Search;
