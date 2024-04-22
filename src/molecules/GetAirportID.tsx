import React from "react";

const fetchAirportID = async (airportName, direction) => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL + "/user";
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
    const fromDataPromise = fetchAirportID(from, "from");
    const toDataPromise = fetchAirportID(to, "to");
    return { fromData: await fromDataPromise, toData: await toDataPromise };
  } catch (error) {
    console.error("Failed to fetch airport IDs:", error);
    onDataFetched({ error: error.message });
  }
};
