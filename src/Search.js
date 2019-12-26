import React, { useState } from "react";

const Search = props => {
  const [searchWord, setWordValue] = useState("");

  const handleSearchInputChange = e => {
    setWordValue(e.target.value);
  };

  const cleanWordField = () => {
    setWordValue("");
  };

  const searchTheWord = e => {
    e.preventDefault();
    props.search(searchWord);
    cleanWordField();
  };

  return (
    <form className="searchWords">
      <input
        value={searchWord}
        onChange={handleSearchInputChange}
        type="text"
      />
      <input onClick={searchTheWord} type="submit" value="Search your word" />
    </form>
  );
};

export default Search;
