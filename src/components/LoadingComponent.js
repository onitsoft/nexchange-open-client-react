import React from 'react';
import '../css/loader.scss';


const LoadingComponent = ({isLoading, error}) => {
  // Handle the loading state
  if (isLoading) {
    return <div className="spinner">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
      <div className="rect6"></div>
      <div className="rect7"></div>
      <div className="rect8"></div>
      <div className="rect9"></div>
      <div className="rect10"></div>
    </div>;
  }
  // Handle the error state
  else if (error) {
    return <h2>Sorry, there was a problem loading the page :(</h2>;
  }
  else {
    return null;
  }
};

export default LoadingComponent;