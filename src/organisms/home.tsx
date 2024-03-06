import React, { useState } from "react";
import axios, { isCancel, AxiosError } from "axios";
import Header from "./header";
import Hero from "./hero";
import "../styles/home.scss";

async function getAllUsers() {
  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await axios.get(`${apiUrl}/user`);
    const allUsers = response.data;
    console.log(response);
    return allUsers;
  } catch (error) {
    console.error(error);
  }
}

function Home() {
  const [data, setData] = useState("");

  async function doQuery(e) {
    e.preventDefault();
    const allUsers = await getAllUsers();
    setData(JSON.stringify(allUsers));
  }

  return (
    <div className="home-container">
      <Header />

      {/* <NavigationBar /> */}
      <Hero />
    </div>
  );
}

export default Home;
