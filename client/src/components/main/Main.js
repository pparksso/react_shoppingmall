import React from "react";
import "../../scss/main.scss";

const main = () => {
  const bg = {
    background: "url(/images/main/mainVisual.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <div className="mainCover" style={bg}>
      <div className="mainVisual"></div>
    </div>
  );
};

export default main;
