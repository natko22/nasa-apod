import React, { useState } from "react";

interface SearchDateProps {
  onDateSelect: (date: string) => void;
}

const SearchDate: React.FC<SearchDateProps> = ({ onDateSelect }) => {
  // store the selected date
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Function to handle date input change
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onDateSelect(selectedDate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="date-label" htmlFor="dateInput">
        Select a Date:{" "}
      </label>
      <input
        className="search-input"
        type="date"
        id="dateInput"
        value={selectedDate}
        onChange={handleDateChange}
      />
      <button className="submit-btn" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchDate;
