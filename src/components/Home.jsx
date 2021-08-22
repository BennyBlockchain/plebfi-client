import React, { useEffect, useState } from "react";
import axios from "axios";
import AppNavbar from "./AppNavbar";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/").then((res) => setUsers(res.data));
  }, []);
  return (
    <>
      <AppNavbar />
      <Container className="pt-5">
        <ListGroup>
          {users &&
            users.map((user, index) => {
              return (
                <ListGroup.Item key={index}>
                  <a href={`/u/${user.username}`}>{user.username}</a>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Container>
    </>
  );
};

export default Home;
