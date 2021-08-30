import React from "react";
import {Redirect} from 'react-router-dom';
import HeroCardless from "../components/HeroCardless";
import { useQuery } from "@apollo/client";
import { QUERY_GENRE_ITEMS } from "../utils/queries";
import { Image } from "cloudinary-react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import "../style/SingleGenre.css";
import Auth from '../utils/auth';

function ItemsInSingleGenre(props) {
  console.log(props.genre);

  const { loading, error, data } = useQuery(QUERY_GENRE_ITEMS, {
    variables: {
      genre: props.genre,
    },
  });
  const items = data?.genreItems || [];

  console.log(items);

  if (loading) {
    return <div>Loading...</div>;
  };

  if(!Auth.loggedIn()){
    return <Redirect to="/SignUp" />;
  };

  if (error) {
    console.log(error);
  };

  return (
<<<<<<< HEAD
      <div>
        <Hero />
        <main>
          <div style={{ display: "flex" }}>
            {items.map((item) => (
              <Card style={{ width: "18rem", height: "40rem" }} key={item._id}>
                <Image
                  variant="top"
                  cloudName="outdoor-trading-co"
                  publicId={item.image_id}
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>{item.location}</ListGroupItem>
                  <ListGroupItem>{item.condition}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                  <Card.Link href={item._id}>More Information</Card.Link>
                </Card.Body>
              </Card>
            ))}
          </div>
        </main>
      </div>
=======
    <div>
      <HeroCardless />
      <br></br>
      <div className="container">
        {items.map((item) => (
          <Card
            className="card"
            style={{ width: "25rem", height: "40rem" }}
            key={item._id}
          >
            <Image
              style={{ width: "25rem", height: "25rem" }}
              variant="top"
              className="img-fluid"
              alt="Product image."
              cloudName="outdoor-trading-co"
              publicId={item.image_id}
            />
            <Card.Body>
              <Card.Title class="card-title text-center title">
                {item.name}
              </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Location: {item.location}</ListGroupItem>
              <ListGroupItem>Condition: {item.condition}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <button type="submit" className="request-btn" href="#">
                More Information
              </button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <br></br>
    </div>
>>>>>>> 6f9722eb18b27333e8b9ab424b7bbc751afcd14e
  );
}

export default ItemsInSingleGenre;
