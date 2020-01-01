import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./Search";

const API_KEY = "2f627ebc-9c50-44a7-bfc2-ba93f4721a09";

function App() {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(
      `https://dictionaryapi.com/api/v3/references/collegiate/json/${searchValue}?key=${API_KEY}`
    )
      .then(response => response.json())
      .then(jsonResponse => {
        setLoading(false);
        if (typeof jsonResponse[0] === "object") {
          setResult(`Yay! ${searchValue} IS a word!`);
        } else {
          setResult(`Oh noes! ${searchValue} is not a word!`);
        }
      });
  }, [searchValue]);

  const search = searchValue => {
    setLoading(true);
    setSearchValue(searchValue);
  };

  return (
    <div className="App">
      <Search search={search} />
      <div className="words-info">
        {loading && !result ? <span>loading...</span> : <div>{result}</div>}
      </div>
    </div>
  );
}

export default App;
