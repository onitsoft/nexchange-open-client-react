import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { errorAlert, setDestinationTag } from 'Actions/index.js';
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

  handleChange(event) {
    const destinationTag = event.target.value.replace(new RegExp(/ /g, 'g'), '');
    this.setState({ destinationTag });
    this.props.setDestinationTag({ destinationTag, valid: true })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  render() {
    let coin = this.props.selectedCoin.receive ? this.props.selectedCoin.receive : '...';
    return (
      <I18n ns="translations">
        {t => (
          <div className="col-xs-12 active">
            <form className="form-group" onSubmit={this.handleSubmit}>
              <input
                type="text"
                ref={this.props.inputRef}
                className={`form-control ${styles.input}`}
                id="withdraw-addr"
                onChange={this.handleChange}
                value={this.state.destinationTag}
                placeholder={t('generalterms.destinationtag')}
              />
            </form>
          </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = ({ selectedCoin, destinationTag }) => ({ selectedCoin, destinationTag });
const mapDispatchToProps = dispatch => bindActionCreators({ errorAlert, setDestinationTag }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DestinationTag);
