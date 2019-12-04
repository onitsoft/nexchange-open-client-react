import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut } from 'Actions'

const SignIn = (props) => {
  useEffect(() => {
    if (props.auth && props.auth.token) {
      if (props.signOut && typeof props.signOut === 'function') {
        props.signOut()
      }
    }
  }, [props.auth])

  if (!props.auth || !props.auth.token) {
    return <Redirect to='/' />
  }
  return (
    <div>Loggin out...</div>
  );
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => bindActionCreators({ signOut }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
