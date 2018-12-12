import React from 'react';

const USP = props => {
  return (
    <div className="col-xs-12 col-sm-4">
      <img src={props.image} />
      <h3>{props.title}</h3>
      <h4>{props.text}</h4>
    </div>
  );
};

export default USP;
