import React from "react";

function Details({ info }) {
  return (
    <div className={"details-container"}>
      <h3 className={"details-label"}>{info.label}</h3>
      <p className={"details-text"}>{info.text}</p>
    </div>
  );
}

export default Details;
