import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { errorAlert, setDestinationTag } from 'Actions/index.js';
//import validateWalletAddress from 'Utils/validateWalletAddress';
import styles from './WalletAddress.scss';
import { I18n } from 'react-i18next';
import i18n from '../../../../../i18n';

class DestinationTag extends Component {
  constructor(props) {
    super(props);

    this.state = { destinationTag: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate = (destinationTag, receiveCoin) => {
    if (destinationTag === '' || !receiveCoin) {
      this.props.setDestinationTag({
        destinationTag,
        valid: false,
      });

      return this.props.errorAlert({ show: false });
    }

    const valid = validateDestinationTag(
      destinationTag,
      receiveCoin,
      () =>
        this.props.errorAlert({
          show: true,
          message: `${destinationTag} ${i18n.t('error.novalid')} \
          ${this.props.selectedCoin.receive} ${i18n.t('generalterms.destinationTag')}.`,
        }),
      () => this.props.errorAlert({ show: false })
    );

    this.props.setDestinationTag({
      destinationTag,
      valid,
    });
  };

  handleChange(event) {
    const destinationTag = event.target.value.replace(new RegExp(/ /g, 'g'), '');
    this.setState({ destinationTag });
//    this.validate(address, this.props.selectedCoin.receive);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCoin.receive !== this.props.selectedCoin.receive) {
      this.validate(this.state.destinationTag, nextProps.selectedCoin.receive);
    }
  }

  render() {
    let coin = this.props.selectedCoin.receive ? this.props.selectedCoin.receive : '...';
    return (
      <I18n ns="translations">
        {t => (
          <div className="col-xs-12 active">.

            <form className="form-group" onSubmit={this.handleSubmit}>
              <input
                type="text"
                ref={this.props.inputRef}
                className={`form-control ${styles.input}`}
                id="withdraw-addr"
                onChange={this.handleChange}
                value={this.state.destinationTag}
                placeholder={t('generalterms.destinationtag', { selectedCoin: coin })}
              />
            </form>
          </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ selectedCoin, wallet }) => ({ selectedCoin, wallet });
const mapDispatchToProps = dispatch => bindActionCreators({ errorAlert, setDestinationTag }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DestinationTag);