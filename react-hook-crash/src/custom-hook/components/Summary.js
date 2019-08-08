import React from "react";
import "./Summary.css";

export default ({
  name,
  gender,
  height,
  hairColor,
  skinColor,
  movieCount
}) => (
  <div className="summary">
    <h1>{name}</h1>
    <p>
      Gender: <span className="summary__output">{gender}</span>
    </p>
    <p>
      Height: <span className="summary__output">{height}</span>
    </p>
    <p>
      Hair Color / Skin Color:{" "}
      <span className="summary__output">{hairColor}</span> /{" "}
      <span className="summary__output">{skinColor}</span>
    </p>
    <p>
      Appears in # Movies: <span className="summary__output">{movieCount}</span>
    </p>
  </div>
);
