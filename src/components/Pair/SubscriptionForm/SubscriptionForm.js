import React from 'react';
import jsonp from 'jsonp';
import styles from './SubscriptionForm.scss';
import { I18n } from 'react-i18next';

const getAjaxUrl = url => url.replace('/post?', '/post-json?');
const subscribeUrl = 'https://nexchange.us16.list-manage.com/subscribe/post?u=918b60ce5b05d82384c293db0&amp;id=b2af978303';

class SubscriptionForm extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      status: null,
      msg: null,
    };
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

  render() {
    const { action } = this.props;
    const { status } = this.state;

    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className={styles.container}>
            <div className="container text-center">
              <h2>{t('subscription.1')}</h2>
              <h3>{t('subscription.6')}</h3>

              <form action={action} method="post" noValidate>
                <div className="col-xs-12 col-ms-8 col-ms-push-2">
                  <div className="row">
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
                  </div>

                  <div className={`${styles.message} col-xs-12`}>
                    {status === 'success' && <p className="success">{t('subscription.4')}</p>}
                    {status === 'error' && <p className="error">{t('subscription.5')}</p>}
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default SubscriptionForm;
