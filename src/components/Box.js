import React from 'react';

const Box = props => (
  <div id={props.id} className="col-xs-12">
    <div className="box">
      <div className="row">
        <div className="col-xs-12">{props.children}</div>
      </div>
    </div>
  </div>
);

export default Box;
