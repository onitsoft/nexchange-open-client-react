import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import config from '../config';


class PriceComparison extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nexchange: {},
            changelly: {},
            shapeshift: {},

        }

        this.fetchRates = this.fetchRates.bind(this);
    }

    componentDidMount() {
        this.fetchRates();
    }

    priceDiff(p1, p2) {
        let diff = (100 - (p2 * 100 / p1)).toFixed(2);

        if (isNaN(diff)) return '...';

        if (diff > 0)
            return (<span className="text-danger">(-{Math.abs(diff)}%)</span>);
        else if (diff == 0) {
            return (<span>({Math.abs(diff)}%)</span>);
        } else {
            return (<span className="text-success">(+{Math.abs(diff)}%)</span>);
        }
    }

    showBestRate(shapeshiftRate, changellyRate, nexchangeRate) {
        let rates = [shapeshiftRate, changellyRate, nexchangeRate],
            min = Math.max.apply(null, rates),
            info = ['shapeshift', 'changelly', 'nexchange2'];

        let max = 0,
            idx = null;
        for (let i = 0; i < rates.length; i++) {
            if (rates[i] >= max) {
                idx = i;
                max = rates[i];
            }
        }

        return (<img className={`${info[idx]}-logo`} src={`/img/prices/${info[idx]}.png`} alt={`${info[idx]}`} />);
    }

    fetchRates() {
        axios.all([
            axios.get(`${config.API_BASE_URL}/price/btceth/latest/`),
            axios.get(`${config.API_BASE_URL}/price/btcltc/latest/`),
            axios.get(`${config.API_BASE_URL}/price/dogebtc/latest/`),
            axios.get(`${config.API_BASE_URL}/price/ethltc/latest/`),
            axios.get(`${config.API_BASE_URL}/price/dogeeth/latest/`),
            axios.get(`${config.API_BASE_URL}/price/dogeltc/latest/`),
        ])
        .then(axios.spread((btceth, btcltc, dogebtc, ethltc, dogeeth, dogeltc) => {
            this.setState({
                nexchange: {
                    btceth: (1 / parseFloat(btceth.data[0].ticker.ask)).toFixed(4),
                    btcltc: (1 / parseFloat(btcltc.data[0].ticker.ask)).toFixed(4),
                    dogebtc: (1 / parseFloat(dogebtc.data[0].ticker.ask)).toFixed(1),
                    ethltc: (1 / parseFloat(ethltc.data[0].ticker.ask)).toFixed(2),
                    dogeeth: (1 / parseFloat(dogeeth.data[0].ticker.ask)).toFixed(1),
                    dogeltc: (1 / parseFloat(dogeltc.data[0].ticker.ask)).toFixed(1)
                }
            }, () => {
                this.priceDiff();
            });
        }))
        .catch(error => {
            console.log(error);
        });

        axios.get(`https://nexchange.io/exchange/rates`)
        .then(response => {
            this.setState({
                changelly: {
                    btceth: (parseFloat(response.data['ETH']['BTC']) * 0.98).toFixed(4),
                    btcltc: (parseFloat(response.data['LTC']['BTC']) * 0.98).toFixed(4),
                    dogebtc: (parseFloat(response.data['BTC']['DOGE']) * 0.98).toFixed(1),
                    ethltc: (parseFloat(response.data['LTC']['ETH']) * 0.98).toFixed(4),
                    dogeeth: (parseFloat(response.data['ETH']['DOGE']) * 0.98).toFixed(1),
                    dogeltc: (parseFloat(response.data['LTC']['DOGE']) * 0.98).toFixed(1),
                }
            }, () => {
                this.priceDiff();
            });
        })
        .catch(error => {
            console.log(error);
        });

        axios.all([
            axios.get(`https://shapeshift.io/rate/eth_btc`),
            axios.get(`https://shapeshift.io/rate/ltc_btc`),
            axios.get(`https://shapeshift.io/rate/btc_doge`),
            axios.get(`https://shapeshift.io/rate/ltc_eth`),
            axios.get(`https://shapeshift.io/rate/eth_doge`),
            axios.get(`https://shapeshift.io/rate/ltc_doge`),
        ])
        .then(axios.spread((btceth, btcltc, dogebtc, ethltc, dogeeth, dogeltc) => {
            this.setState({
                shapeshift: {
                    btceth: (parseFloat(btceth.data.rate) * 0.97).toFixed(4),
                    btcltc: (parseFloat(btcltc.data.rate) * 0.97).toFixed(4),
                    dogebtc: (parseFloat(dogebtc.data.rate) * 0.97).toFixed(1),
                    ethltc: (parseFloat(ethltc.data.rate) * 0.97).toFixed(4),
                    dogeeth: (parseFloat(dogeeth.data.rate) * 0.97).toFixed(1),
                    dogeltc: (parseFloat(dogeltc.data.rate) * 0.97).toFixed(1)
                }
            }, () => {
                this.priceDiff();
            });
        }))
        .catch(error => {
            console.log(error);
        });

        this.timeout = setTimeout(() => {
            this.fetchRates();
        }, config.PRICE_COMPARISON_INTERVAL);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        return (
            <div id="compare">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h2>Real Time Rates</h2>

                            <div className="comparison-table">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="text-center"></th>
                                            <th><img className="nexchange-logo" src="/img/prices/nexchange2.png" alt="Nexchange" /></th>
                                            <th><img src="/img/prices/shapeshift.png" alt="Shapeshift" /></th>
                                            <th><img src="/img/prices/changelly.png" alt="Changelly" /></th>
                                            <th>Best rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><b>1 ETH</b></td>
                                            <td>{this.state.nexchange.btceth} BTC</td>
                                            <td>{this.state.shapeshift.btceth} BTC {this.priceDiff(this.state.nexchange.btceth, this.state.shapeshift.btceth)}</td>
                                            <td>{this.state.changelly.btceth} BTC {this.priceDiff(this.state.nexchange.btceth, this.state.changelly.btceth)}</td>
                                            <td>{this.showBestRate(this.state.shapeshift.btceth, this.state.changelly.btceth, this.state.nexchange.btceth)}</td>
                                        </tr>

                                        <tr>
                                            <td><b>1 ETH</b></td>
                                            <td>{this.state.nexchange.dogeeth} DOGE</td>
                                            <td>{this.state.shapeshift.dogeeth} DOGE {this.priceDiff(this.state.nexchange.dogeeth, this.state.shapeshift.dogeeth)}</td>
                                            <td>{this.state.changelly.dogeeth} DOGE {this.priceDiff(this.state.nexchange.dogeeth, this.state.changelly.dogeeth)}</td>
                                            <td>{this.showBestRate(this.state.shapeshift.dogeeth, this.state.changelly.dogeeth, this.state.nexchange.dogeeth)}</td>
                                        </tr>

                                        <tr>
                                            <td><b>1 LTC</b></td>
                                            <td>{this.state.nexchange.btcltc} BTC</td>
                                            <td>{this.state.shapeshift.btcltc} BTC {this.priceDiff(this.state.nexchange.btcltc, this.state.shapeshift.btcltc)}</td>
                                            <td>{this.state.changelly.btcltc} BTC {this.priceDiff(this.state.nexchange.btcltc, this.state.changelly.btcltc)}</td>
                                            <td>{this.showBestRate(this.state.shapeshift.btcltc, this.state.changelly.btcltc, this.state.nexchange.btcltc)}</td>
                                        </tr>

                                        <tr>
                                            <td><b>1 LTC</b></td>
                                            <td>{this.state.nexchange.ethltc} ETH</td>
                                            <td>{this.state.shapeshift.ethltc} ETH {this.priceDiff(this.state.nexchange.ethltc, this.state.shapeshift.ethltc)}</td>
                                            <td>{this.state.changelly.ethltc} ETH {this.priceDiff(this.state.nexchange.ethltc, this.state.changelly.ethltc)}</td>
                                            <td>{this.showBestRate(this.state.shapeshift.ethltc, this.state.changelly.ethltc, this.state.nexchange.ethltc)}</td>
                                        </tr>

                                        <tr>
                                            <td><b>1 LTC</b></td>
                                            <td>{this.state.nexchange.dogeltc} DOGE</td>
                                            <td>{this.state.shapeshift.dogeltc} DOGE {this.priceDiff(this.state.nexchange.dogeltc, this.state.shapeshift.dogeltc)}</td>
                                            <td>{this.state.changelly.dogeltc} DOGE {this.priceDiff(this.state.nexchange.dogeltc, this.state.changelly.dogeltc)}</td>
                                            <td>{this.showBestRate(this.state.shapeshift.dogeltc, this.state.changelly.dogeltc, this.state.nexchange.dogeltc)}</td>
                                        </tr>

                                        <tr>
                                            <td><b>1 BTC</b></td>
                                            <td>{this.state.nexchange.dogebtc} DOGE</td>
                                            <td>{this.state.shapeshift.dogebtc} DOGE {this.priceDiff(this.state.nexchange.dogebtc, this.state.shapeshift.dogebtc)}</td>
                                            <td>{this.state.changelly.dogebtc} DOGE {this.priceDiff(this.state.nexchange.dogebtc, this.state.changelly.dogebtc)}</td>
                                            <td>{this.showBestRate(this.state.shapeshift.dogebtc, this.state.changelly.dogebtc, this.state.nexchange.dogebtc)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PriceComparison;
