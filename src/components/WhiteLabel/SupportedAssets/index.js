import React, { Fragment } from 'react'
import { I18n } from 'react-i18next'
import SupportedAsset from './SupportedAsset'
import { Col } from 'reactstrap'
import { SectionHeading } from 'Pages/WhiteLabelSEO'

const coinImgPath = 'img/cryptocurrency-icons/color'

const coins = [
  { src: `${coinImgPath}/bch.png`, symbol: 'BCH', name: 'Bitcoin Cash' },
  { src: `${coinImgPath}/bnb.png`, symbol: 'BNB', name: 'Binance Coin' },
  { src: `${coinImgPath}/bnt.png`, symbol: 'BNT', name: 'Bancor Network Token' },
  { src: `${coinImgPath}/btc.png`, symbol: 'BTC', name: 'Bitcoin' },
  { src: `${coinImgPath}/doge.png`, symbol: 'DOGE', name: 'Dogecoin' },
  { src: `${coinImgPath}/eos.png`, symbol: 'EOS', name: 'EOS' },
  { src: `${coinImgPath}/eth.png`, symbol: 'ETH', name: 'Ethereum' },
  { src: `${coinImgPath}/eur.png`, symbol: 'EUR', name: 'Euros' },
  { src: `${coinImgPath}/gbp.png`, symbol: 'GBP', name: 'Pounds Sterling' },
  { src: `${coinImgPath}/kcs.png`, symbol: 'KCS', name: 'KuCoin Shares' },
  { src: `${coinImgPath}/knc.png`, symbol: 'KNC', name: 'Kyber Network' },
  { src: `${coinImgPath}/ltc.png`, symbol: 'LTC', name: 'Litecoin' },
  { src: `${coinImgPath}/nano.png`, symbol: 'NANO', name: 'Nano' },
  { src: `${coinImgPath}/omg.png`, symbol: 'OMG', name: 'OmiseGO' },
  { src: `${coinImgPath}/xlm.png`, symbol: 'XLM', name: 'Stellar Lumens' },
  { src: `${coinImgPath}/usd.png`, symbol: 'USD', name: 'US Dollar' },
  { src: `${coinImgPath}/usdt.png`, symbol: 'USDT', name: 'Tether' },
  { src: `${coinImgPath}/xmr.png`, symbol: 'XMR', name: 'Monero' },
  { src: `${coinImgPath}/xvg.png`, symbol: 'XVG', name: 'Verge' },
  { src: `${coinImgPath}/zec.png`, symbol: 'ZEC', name: 'Zcash' }
]

export default function SupportedAssets() {
  return (
    <I18n ns="translations">
      {t => (
        <Fragment>
          <Col md={12}>
            <SectionHeading>{t('supportedassets.title')}</SectionHeading>
          </Col>
            {coins.map(coin => <SupportedAsset coin={coin} />)}
        </Fragment>
      )}
    </I18n>
  )
}