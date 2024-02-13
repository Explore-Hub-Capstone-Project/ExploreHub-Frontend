import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Button, AccentButton } from "../atoms/button";
import { Link } from "react-router-dom";
import axios, { isCancel, AxiosError } from "axios";

import "./signup-section.scss";

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

export function Home() {
  const [data, setData] = useState("");

  async function doQuery(e) {
    e.preventDefault();
    const allUsers = await getAllUsers();
    setData(JSON.stringify(allUsers));
  }

  return (
    <div className="home">
      <Container>
        <Link to="/signup">
          <Button title={"Signup"} />
        </Link>
        <AccentButton title={"Query Backend"} onClick={(e) => doQuery(e)} />
        <p>{data}</p>
      </Container>
    </div>
  );
}
