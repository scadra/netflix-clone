import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import "../../css/stars.css";

const Stars = (props) => {
  const renderStart1 = () => {
    return props.fakeArray1.map((element, i) => {
      return <FontAwesome key={i} className="stars" name="star" size="3x" />;
    });
  };
  const renderStart2 = () => {
    return props.fakeArray2.map((element, i) => {
      return <FontAwesome key={i} className="stars" name="star-o" size="3x" />;
    });
  };
  return (
    <div className="stars">
      {renderStart1()}
      {renderStart2()}
    </div>
  );
};

export { Stars };
