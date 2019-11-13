import React, { Fragment } from 'react'
import { I18n } from 'react-i18next'
import SupportedAsset from './SupportedAsset'
import { Col } from 'reactstrap'
import Bounce from 'react-reveal/Bounce'

const coins = [
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

export default function SupportedAssets() {
  return (
    <I18n ns="translations">
      {t => (
        <Fragment>
          <Col md={12}>
            <h2>{t('supportedassets.title')}</h2>
            <br />
          </Col>
          {coins.map((coin, index) => <SupportedAsset coin={coin} key={`coin-${index}`} />)}

        </Fragment>
      )}
    </I18n>
  )
}