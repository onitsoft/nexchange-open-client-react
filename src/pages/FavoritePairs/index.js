import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export const FavoritePairs = (props) => {
  return (<>
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <h2>Favorite Pairs</h2>
          
        </div>
      </div>
    </div>
  </>)
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => bindActionCreators({ favoritePair }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritePairs);
