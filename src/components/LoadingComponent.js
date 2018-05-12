import React from 'react';
import '../css/loader.scss';

const LoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return (
      <div className="spinner">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
        <div className="rect6" />
        <div className="rect7" />
        <div className="rect8" />
        <div className="rect9" />
        <div className="rect10" />
      </div>
    );
  } else if (error) {
    // Handle the error state
    return <h2>Sorry, there was a problem loading the page :(</h2>;
  } else {
    return null;
  }
};

export default LoadingComponent;
