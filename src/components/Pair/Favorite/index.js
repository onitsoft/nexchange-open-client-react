import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { favoritePair } from 'Actions'

export const FavoritePair = ({ pair, favoritePair }) => {
  const [isFave, setFave] = useState(false)

  const onFavorite = useCallback((event) => {
    favoritePair(pair)
      .then(res => {
        console.log('result of favorite pair:', res)
        setFave(!isFave)
      })
  }, [isFave])

  return (
    <button
      className={`btn ${!isFave ? 'btn-default' : 'btn-primary'}`}
      onClick={onFavorite}>
      {isFave ?
        '💜 Add to Favorites'  :
        '❌ Remove from Favorites '}
    </button>
  )
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => bindActionCreators({ favoritePair }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritePair);
