import React, { Fragment } from 'react'
import { I18n } from 'react-i18next'
import SupportedAsset from './SupportedAsset'


const coins = [
  { id: 1, src: 'img/coins/BCH.png', name: 'BCH' },
  { id: 2, src: 'img/coins/BNB.png', name: 'BNB,' },
  { id: 3, src: 'img/coins/BNT.png', name: 'BNT', },
  { id: 4, src: 'img/coins/BTC.png', name: 'BTC' },
  { id: 5, src: 'img/coins/DOGE.png', name: 'DOGE' },
  { id: 6, src: 'img/coins/EOS.png', name: 'EOS' },
  { id: 7, src: 'img/coins/ETH.png', name: 'ETH' },
  { id: 8, src: 'img/coins/EUR.png', name: 'EUR' },
  { id: 9, src: 'img/coins/GBP.png', name: 'GBP' },
  { id: 10, src: 'img/coins/KCS.png', name: 'KCS' },
  { id: 11, src: 'img/coins/KNC.png', name: 'KNC' },
  { id: 12, src: 'img/coins/LTC.png', name: 'LTC' },
  { id: 13, src: 'img/coins/NANO.png', name: 'NANO' },
  { id: 14, src: 'img/coins/OMG.png', name: 'OMG' },
  { id: 15, src: 'img/coins/USD.png', name: 'USD' },
  { id: 16, src: 'img/coins/USDT.png', name: 'USDT' },
  { id: 17, src: 'img/coins/XMR.png', name: 'XMR' },
  { id: 18, src: 'img/coins/XVG.png', name: 'XVG' },
  { id: 19, src: 'img/coins/ZEC.png', name: 'ZEC' }
]

export default function SupportedAssets() {
  return (
    <I18n ns="translations">
      {t => (
        <Fragment>
          <div className="col-md-12">
            <h2>{t('supportedassets.title')}</h2>
          </div>
          <div className="col-md-2">
            {coins.map(coin => <SupportedAsset coin={coin} />)}
          </div>
        </Fragment>
      )}
    </I18n>
  )
}