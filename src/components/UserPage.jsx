import React, { useEffect, useState } from "react";
import { Lsat } from "lsat-js";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserPage = () => {
  const [posts, setPosts] = useState([]);
  const { username } = useParams();
  console.log(username);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/u/${username}`)
      .then((res) => {
        const header = res.headers.get("www-authenticate");
        console.log(header);
        const lsat = Lsat.fromHeader(header);

        // show some information about the lsat
        console.log("Invoice", lsat.invoice);
        console.log(lsat.baseMacaroon);
        console.log(lsat.paymentHash);
      })
      .catch((err) => console.log(err));
  });
  return <h1>User Page</h1>;
};

export default UserPage;
