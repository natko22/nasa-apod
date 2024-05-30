import React, { useState } from "react";
import Apod from "./components/Apod";
import SearchDate from "./components/SearchDate";
import "./App.css";

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <div className="App">
      <h1>NASA's Astronomy Picture of the Day</h1>
      <SearchDate onDateSelect={handleDateSelect} />
      {selectedDate && <Apod date={selectedDate} />}
    </div>
  );
};

export default App;
