import React, { useState } from 'react'
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import * as icons from './icons'

export const SupportedAssets = (props) => {
  const [assets] = useState(ASSETS)

  return (
    <>
      <h1>Supported Assets</h1>
      <StyledAssets>
          {assets && assets.length && assets.map((asset, index) => <Asset asset={asset} key={`asset-${index}`}></Asset>)}
      </StyledAssets>
    </>
  )

}

const Asset = ({asset}) => {
  const { linkTo, name } = asset
  return (
    <StyledAsset>
      <NavLink to={linkTo}>
        <div className='art'>
          <img src={icons[`${name.toLowerCase()}Coin`]} alt={name} />
        </div>
        <div className='name'>
          {name}
        </div>
      </NavLink>
    </StyledAsset>
  )
}

const StyledAssets = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 2rem;
`

const StyledAsset = styled.div`
  a {
    transition: all 120ms ease-in-out;
    display: inline-block;
    filter: grayscale(100%);
    transition: all 120ms ease-in-out;

    img {
      transition: all 120ms ease-in-out;
      transform: scale(0.8);
    }


    &:hover {
      text-decoration: none;
      filter: grayscale(23%);

      img {
        transform: scale(1);
      }
    }
    
  }

`

const ASSETS = [
  { name: 'BCH', linkTo: '/convert/BCH-to-EUR' },
  { name: 'BNB', linkTo: '/convert/BNB-to-EUR' },
  { name: 'BNT', linkTo: '/convert/BNT-to-EUR' },
  { name: 'BTC', linkTo: '/convert/BTC-to-EUR' },
  { name: 'DOGE', linkTo: '/convert/DOGE-to-EUR' },
  { name: 'EOS', linkTo: '/convert/EOS-to-EUR' },
  { name: 'ETH', linkTo: '/convert/ETH-to-EUR' },
  { name: 'EUR', linkTo: '/convert/EUR-to-BTC' },
  { name: 'GBP', linkTo: '/convert/GBP-to-BTC' },
  { name: 'KCS', linkTo: '/convert/KCS-to-EUR' },
  { name: 'KNC', linkTo: '/convert/KNC-to-EUR' },
  { name: 'LTC', linkTo: '/convert/LTC-to-EUR' },
  { name: 'NANO', linkTo: '/convert/NANO-to-EUR' },
  { name: 'OMG', linkTo: '/convert/OMG-to-EUR' },
  { name: 'USD', linkTo: '/convert/USD-to-BTC' },
  { name: 'USDT', linkTo: '/convert/USDT-to-EUR' },
  { name: 'XMR', linkTo: '/convert/XMR-to-EUR' },
  { name: 'XVG', linkTo: '/convert/XVG-to-EUR' },
  { name: 'ZEC', linkTo: '/convert/ZEC-to-EUR' }
]

export default SupportedAssets
