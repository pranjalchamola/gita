import "./App.css";
import MuiNavbar from "./components/navbar/MuiNavbar";
import SideBarChapters from "./components/sidebar/sideBarChapters";
import React, { useState } from "react";

function App() {
  const [authorsName, setAuthorName] = useState([]);
  const [scrollToIndex, setScrollToIndex] = useState(null);
  function updateAuthorsName(newAuthorsName) {
    setAuthorName(newAuthorsName);
  }
  function updateScrollToIndex(newScrollToIndex) {
    setScrollToIndex(newScrollToIndex);
  }
  console.log(scrollToIndex);
  return (
    <div className="App">
      <MuiNavbar onUpdateAuthorsName={updateAuthorsName} />
      <SideBarChapters
        authorsName={authorsName}
        onUpdateScrollToIndex={updateScrollToIndex}
        scrollToIndex={scrollToIndex}
      />
    </div>
  );
}

export default App;
