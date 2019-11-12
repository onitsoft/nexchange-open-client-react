import React, { Fragment } from 'react'
import { I18n } from 'react-i18next'
import SupportedAsset from './SupportedAsset'
import { Col } from 'reactstrap'
import Bounce from 'react-reveal/Bounce'

const coins = [
  { src: 'img/coins/BCH.png', name: 'BCH' },
  { src: 'img/coins/BNB.png', name: 'BNB' },
  { src: 'img/coins/BNT.png', name: 'BNT' },
  { src: 'img/coins/BTC.png', name: 'BTC' },
  { src: 'img/coins/DOGE.png', name: 'DOGE' },
  { src: 'img/coins/EOS.png', name: 'EOS' },
  { src: 'img/coins/ETH.png', name: 'ETH' },
  { src: 'img/coins/EUR.png', name: 'EUR' },
  { src: 'img/coins/GBP.png', name: 'GBP' },
  { src: 'img/coins/KCS.png', name: 'KCS' },
  { src: 'img/coins/KNC.png', name: 'KNC' },
  { src: 'img/coins/LTC.png', name: 'LTC' },
  { src: 'img/coins/NANO.png', name: 'NANO' },
  { src: 'img/coins/OMG.png', name: 'OMG' },
  { src: 'img/coins/USD.png', name: 'USD' },
  { src: 'img/coins/USDT.png', name: 'USDT' },
  { src: 'img/coins/XMR.png', name: 'XMR' },
  { src: 'img/coins/XVG.png', name: 'XVG' },
  { src: 'img/coins/ZEC.png', name: 'ZEC' }
]

export default function SupportedAssets() {
  return (
    <I18n ns="translations">
      {t => (
        <Fragment>
          <Col md={12}>
            <h2>{t('supportedassets.title')}</h2>
          </Col>
          {coins.map((coin, index) => <SupportedAsset coin={coin} key={`coin-${index}`} />)}

        </Fragment>
      )}
    </I18n>
  )
}