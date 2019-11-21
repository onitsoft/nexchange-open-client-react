import React, { useState } from 'react'
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'

import Bounce from 'Components/misc/reveal'

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
  const { linkTo, name, src } = asset
  return (
    <StyledAsset>
      <NavLink to={linkTo}>
        <Bounce bottom>
          <div className='art'>
            <img src={src} alt={name} />
          </div>
          <div className='name'>
            {name}
          </div>
        </Bounce>
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
  { src: 'img/coins/BCH.png', name: 'BCH', linkTo: '/convert/BCH-to-EUR' },
  { src: 'img/coins/BNB.png', name: 'BNB', linkTo: '/convert/BNB-to-EUR' },
  { src: 'img/coins/BNT.png', name: 'BNT', linkTo: '/convert/BNT-to-EUR' },
  { src: 'img/coins/BTC.png', name: 'BTC', linkTo: '/convert/BTC-to-EUR' },
  { src: 'img/coins/DOGE.png', name: 'DOGE', linkTo: '/convert/DOGE-to-EUR' },
  { src: 'img/coins/EOS.png', name: 'EOS', linkTo: '/convert/EOS-to-EUR' },
  { src: 'img/coins/ETH.png', name: 'ETH', linkTo: '/convert/ETH-to-EUR' },
  { src: 'img/coins/EUR.png', name: 'EUR', linkTo: '/convert/EUR-to-BTC' },
  { src: 'img/coins/GBP.png', name: 'GBP', linkTo: '/convert/GBP-to-BTC' },
  { src: 'img/coins/KCS.png', name: 'KCS', linkTo: '/convert/KCS-to-EUR' },
  { src: 'img/coins/KNC.png', name: 'KNC', linkTo: '/convert/KNC-to-EUR' },
  { src: 'img/coins/LTC.png', name: 'LTC', linkTo: '/convert/LTC-to-EUR' },
  { src: 'img/coins/NANO.png', name: 'NANO', linkTo: '/convert/NANO-to-EUR' },
  { src: 'img/coins/OMG.png', name: 'OMG', linkTo: '/convert/OMG-to-EUR' },
  { src: 'img/coins/USD.png', name: 'USD', linkTo: '/convert/USD-to-BTC' },
  { src: 'img/coins/USDT.png', name: 'USDT', linkTo: '/convert/USDT-to-EUR' },
  { src: 'img/coins/XMR.png', name: 'XMR', linkTo: '/convert/XMR-to-EUR' },
  { src: 'img/coins/XVG.png', name: 'XVG', linkTo: '/convert/XVG-to-EUR' },
  { src: 'img/coins/ZEC.png', name: 'ZEC', linkTo: '/convert/ZEC-to-EUR' }
]

export default SupportedAssets
