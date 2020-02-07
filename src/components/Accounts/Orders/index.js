import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadUserOrders } from 'Actions'
import { I18n } from 'react-i18next';

import OrdersList from './OrdersList'

export const Orders = (props) => {
  const { auth } = props
  const { profile } = auth

  useEffect(() => {
    if (auth.loggedIn && profile && !profile.orders) {
      props.loadUserOrders()
    }
  }, [auth])

  return (
  <I18n ns="translations">
    {(t, { i18n }) => (
      <div className='container'>
        <div className='row profile-menu'>
          <div className='col-md-12'>
            <OrdersList orders={profile && profile.orders} />
          </div>
        </div>
      </div>
    )}
  </I18n>
  )
}


const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => bindActionCreators({ loadUserOrders }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
