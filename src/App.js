import "./App.css";
import { useState } from "react";
import SearchResult from "./components/searchResult/SearchResult";
import SearchBar from "./components/searchBar/SearchBar";

function App() {
  const [query, setQuery] = useState("");
  return (
    <>
      <SearchBar change={(e) => setQuery(e.target.value)} />
      <SearchResult query={query}></SearchResult>
    </>
  );
}

export default App;
