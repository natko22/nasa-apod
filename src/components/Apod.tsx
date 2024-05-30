import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config/config";

const BASE_URL = "https://api.nasa.gov/planetary/apod";

interface ApodData {
  url: string;
  title: string;
  explanation: string;
  date: string;
}

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
        setError("Failed to fetch data from NASA APOD API");
      }
    };
    fetchData();
  }, [date]);

  if (error) return <div>{error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>{data.title}</h2>
      <img src={data.url} alt={data.title} />
      <p>{data.explanation}</p>
      <p>{data.date}</p>
    </div>
  );
};

export default Apod;
