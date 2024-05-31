import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config/config";
const BASE_URL = "https://api.nasa.gov/planetary/apod";

interface ApodData {
  url: string;
  title: string;
  explanation: string;
  date: string;
  media_type: string;
}

// Function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
};

// fetch image for a specific date
const Apod: React.FC<{ date?: string }> = ({ date }) => {
  const [data, setData] = useState<ApodData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            api_key: config.NASA_API_KEY,
            date,
          },
        });
        setData(response.data);
      } catch (error) {
        setError(
          "Oops! Something went wrong while fetching the data. Please try again later."
        );
      }
    };
    fetchData();
  }, [date]);

  if (error) return <div className="error-message">{error}</div>;
  if (!data) return <div className="loading">Loading...</div>;

  // Format the date with day first
  const formattedDate = formatDate(data.date);

  return (
    <div>
      <h3>{data.title}</h3>
      <p className="ApodDate">{formattedDate}</p>
      {data.media_type === "image" ? (
        <img src={data.url} alt={data.title} className="ApodImage" />
      ) : (
        <iframe
          title={data.title}
          src={data.url}
          className="ApodVideo"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
      <p className="ApodExplanation">{data.explanation}</p>
    </div>
  );
};

export default Apod;
