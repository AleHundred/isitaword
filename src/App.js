import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./Search";

const Dictionary = require("oxford-dictionary");
const config = {
  app_id: "1770efd9",
  app_key: "b0f9fab04917158412b25a5de1490ba4",
  source_lang: "en-us"
};

const dict = new Dictionary(config);
console.log(dict);

const OXFORD_DICTIONARY_API_URL =
  " 	https://od-api.oxforddictionaries.com/api/v2";

function App() {
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(OXFORD_DICTIONARY_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setWords(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);
    const lookup = dict.find(searchValue);
    console.log("We are just searching now", searchValue);
    lookup.then(
      function(res) {
        // stringify JSON object to see full structure in console log
        console.log(JSON.stringify(res, null, 4));
      },
      function(err) {
        console.log(err);
      }
    );
  };

  return (
    <div className="App">
      <Search search={search} />
      <div className="words-info">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
          words.map(
            (word, index) => console.log("Word: ", word)
            // add component for words
          )
        )}
      </div>
    </div>
  );
}

export default App;
