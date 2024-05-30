import React from "react";
import Apod from "./components/Apod";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>NASA's Astronomy Picture of the Day</h1>
      <Apod />
    </div>
  );
};

export default App;
