import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Lsat } from "lsat-js";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState(false);
  const [token, setToken] = useState({});
  const [preImageModal, setPreImageModal] = useState(false);
  const [preImageInput, setPreImageInput] = useState("");

  const handlePreImageChange = (e) => {
    e.preventDefault();
    setPreImageInput(e.target.value);
  };
  const { username } = useParams();

  useEffect(() => {
    let options = {};
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    if (token.length > 0) headers.append("Authorization", token);
    options = { headers, cache: "no-cache" };
    fetch(`http://localhost:5000/u/${username}`, options).then((res) => {
      const header = res.headers.get("www-authenticate");
      const lsat = Lsat.fromHeader(header);
      setToken(lsat);
      console.log("grabbed lsat: ", lsat);
      console.log("token", token);
      // show some information about the lsat
      console.log(lsat.invoice);
      console.log(lsat.baseMacaroon);
      console.log(lsat.paymentHash);
    });
    console.log("token: ", token);
  }, []);

  const subscribe = (token, preImageInput) => {
    console.log("token: ", token);
    console.log("input", preImageInput);

    const lsat = new Lsat(token);
    lsat.setPreimage(preImageInput);
    return fetch("http://localhost:5000/u/ben", {
      headers: {
        Authorization: lsat.toToken(),
      },
    })
      .then((res) => res.json())
      .then((json) => console.log("Authenticated", json));
  };

  return (
    <>
      <h1>User Page</h1>
      <Button onClick={() => setPreImageModal(true)}>
        Subscribe to my OnlyFans
      </Button>
      <Modal
        show={preImageModal}
        onHide={() => setPreImageModal(!preImageModal)}
        centered
      >
        <h1 className="text-center">Prove Payment to Fan</h1>
        <h3>Invoice</h3>
        <Container className="text-wrap">
          <p>{token.invoice}</p>
        </Container>
        <Form onSubmit={() => subscribe(token, preImageInput)}>
          <Form.Group className="mb-3 text-wrap" controlId="preimageInput">
            <Form.Label>Payment preimage</Form.Label>
            <Form.Control
              type="text"
              value={preImageInput}
              onChange={handlePreImageChange}
              placeholder="Enter preimage"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UserPage;
