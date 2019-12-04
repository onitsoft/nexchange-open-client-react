import React from 'react'
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signOut } from 'Actions'

import { Nav, NavItem } from 'react-bootstrap'

export const Profile = (props) => {
  const { auth } = props


  return (
    <div className='container'>
      <div className='row'><div className='col-md-12'>&nbsp;</div></div>
      <div className='row'><div className='col-md-12'>&nbsp;</div></div>
      <div className='row'><div className='col-md-12'>&nbsp;</div></div>
      <div className='row'>
        <div className='col-md-4'>
          <Nav>
            <NavItem>
              <NavLink to='/profile'>My Porfile</NavLink>
            </NavItem>
          </Nav>
        </div>
        <div className='col-md-8'>
          <h2>Content</h2>
          <NavLink to='/signout'>Sign Out</NavLink>
          <pre>{JSON.stringify(auth, 1, 1)}</pre>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => bindActionCreators({ signOut }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
