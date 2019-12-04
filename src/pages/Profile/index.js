import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signOut, loadUserOrders } from 'Actions'

import { Nav, NavItem } from 'react-bootstrap'

export const Profile = (props) => {
  const { auth } = props

  useEffect(() => {
    if (auth && auth.profile) {
      if (!auth.profile.orders && !auth.loading) {
        props.loadUserOrders()
      }
    }
  }, [auth])


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
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => bindActionCreators({ signOut, loadUserOrders }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
