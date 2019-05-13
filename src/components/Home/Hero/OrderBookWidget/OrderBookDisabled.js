import React from 'react';
import OrderModeSwitch from '../OrderModeSwitch/OrderModeSwitch';
import styles from './OrderBookDisabled.scss';
import jsonp from 'jsonp';
import { I18n } from 'react-i18next';

const getAjaxUrl = url => url.replace('/post?', '/post-json?');
const subscribeUrl = 'https://nexchange.us16.list-manage.com/subscribe/post?u=918b60ce5b05d82384c293db0&amp;id=b2af978303';

class OrderBookDisabled extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      status: null,
      msg: null,
    };
  }

  componentDidMount() {
    window.gtag('event', 'Advanced Mode Disabled open', {event_category: 'Order Book', event_label: ``});
  }

  onSubmit = e => {
    e.preventDefault();
    if (!this.input.value || this.input.value.length < 5 || this.input.value.indexOf('@') === -1) {
      this.setState({
        status: 'error',
      });
      return;
    }

    const url = getAjaxUrl(subscribeUrl) + `&EMAIL=${encodeURIComponent(this.input.value)}`;
    this.setState(
      {
        status: 'sending',
        msg: null,
      },
      () =>
        jsonp(
          url,
          {
            param: 'c',
          },
          (err, data) => {
            if (err) {
              this.setState({
                status: 'error',
                msg: err,
              });
            } else if (data.result !== 'success') {
              this.setState({
                status: 'error',
                msg: data.msg,
              });
            } else {
              this.setState({
                status: 'success',
                msg: data.msg,
              });
            }
          }
        )
    );
  };

  render()  {
    return   (
        <I18n ns="translations">
        {(t, { i18n }) => (
        <div className={styles.container}>
                <div className='container'>
                 <div className='row'>
                    <div className='col-xs-12'>
                        <div className={styles.widget}>
                        <OrderModeSwitch orderMode={this.props.orderMode} changeOrderMode={this.props.changeOrderMode}/>
                        <div className={styles.subscription}>
                        <div className={styles.heading}>
                            <h2>{t('orderbookwidget.disabledmessage1')}</h2>
                            <h3>{t('orderbookwidget.disabledmessage2')}</h3>
                            <h3>{t('orderbookwidget.disabledmessage3')}</h3>
                        </div>
                        <form method="post" noValidate>
                            <div className="col-xs-12 col-ms-8 col-ms-push-2">
                                <div className={`${styles.group} form-group is-empty has-success`}>
                                <input
                                    ref={node => (this.input = node)}
                                    type="email"
                                    name="email"
                                    placeholder={t('subscription.2')}
                                    className={`${styles.input} form-control`}
                                    required
                                />

                                <button
                                    disabled={this.state.status === 'sending' || this.state.status === 'success'}
                                    type="submit"
                                    className={`${styles.btn} btn btn-primary`}
                                    onClick={this.onSubmit}
                                >
                                    {t('subscription.3')}
                                </button>
                                </div>

                            <div className={`${styles.message} col-xs-12`}>
                                {this.state.status === 'success' && <p className="success">{t('subscription.4')}</p>}
                                {this.state.status === 'error' && <p className="error">{t('subscription.5')}</p>}
                            </div>
                            </div>
                        </form>
                        </div>
                         </div>
                        </div>
                    </div>
                    </div>
                </div>)}
        </I18n>)
  }
};

export default OrderBookDisabled;
