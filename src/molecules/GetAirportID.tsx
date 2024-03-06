import React from "react";

const fetchAirportID = async (airportName, direction) => {
  const baseUrl = "http://localhost:5000/user";
  const endpoint = `${baseUrl}/search-${direction}-airport/`;
  const payload =
    direction === "from" ? { from_: airportName } : { to_: airportName };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": process.env.X_RapidAPI_KEY,
      "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok)
    throw new Error(`Network response was not ok: ${response.statusText}`);
  return response.json();
};

export const getAirportIDs = async (from, to, onDataFetched) => {
  try {
    const fromData = await fetchAirportID(from, "from");
    const toData = await fetchAirportID(to, "to");
    onDataFetched({ fromData, toData });
  } catch (error) {
    console.error("Failed to fetch airport IDs:", error);
    onDataFetched({ error: error.message });
  }
};
