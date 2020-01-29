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
      <div className='row profile-menu'>
        <div className='col-md-4'>
          <h2>Menu</h2>
          <Nav>
            <NavItem>
              <NavLink to='/profile'>My Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/orders'>My Orders</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/signout'>Sign Out</NavLink>
            </NavItem>
          </Nav>
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
