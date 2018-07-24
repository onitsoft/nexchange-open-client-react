import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import urlParams from 'Utils/urlParams';

class TokenSet extends Component {
  redirectRef() {
    let urlWithoutRef = window.location.pathname + window.location.search + window.location.hash;
    urlWithoutRef = urlWithoutRef.substring(0, urlWithoutRef.indexOf('?'));

    return <Redirect to={urlWithoutRef} />;
  }

  render() {
    const params = urlParams();
    if (params != null && params.hasOwnProperty('token')) {
      localStorage.setItem('token', params['token']);
      return this.redirectRef();
    }

    return null;
  }
}

export default TokenSet;
