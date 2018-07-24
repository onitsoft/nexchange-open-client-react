import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { I18n } from 'react-i18next';
import platform from 'platform';
import CopyToClipboard from 'react-copy-to-clipboard';
import styles from './Bookmark.scss';

class Bookmark extends Component {
  constructor(props) {
    super();

    this.state = {
      show: false,
    };
  }

  triggerCopyTooltip() {
    $('#bookmark .fa-clipboard').tooltip({
      trigger: 'click',
      placement: 'top',
    });

    $('#bookmark .fa-clipboard')
      .tooltip('hide')
      .attr('data-original-title', 'Copied!')
      .tooltip('show');

    setTimeout(() => {
      $('#bookmark .fa-clipboard').tooltip('destroy');
    }, 1000);
  }

  componentDidUpdate() {
    if (this.state.show !== this.props.show) {
      this.setState({
        show: this.props.show,
      });
    }
  }

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <Modal show={this.state.show} onHide={this.props.onClose}>
            <div id="bookmark" className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.props.onClose}>
                  <i className="material-icons">clear</i>
                </button>
                <h4 className="modal-title" data-toggle="tooltip" data-placement="top" data-original-title="Copy">
                  {t('bookmark.0')}
                </h4>
              </div>

              <div className="modal-body">
                <p className={styles.text}>
                  {t('bookmark.1')} <b>{platform.os.family === 'OS X' ? 'Command (⌘)' : 'Ctrl'} + D</b> {t('bookmark.2')}
                </p>

                <div className="input-group">
                  <div className="form-group is-empty">
                    <input type="text" className="form-control" placeholder="With Material Icons" value={window.location.href} disabled />
                    <span className="material-input" />
                  </div>

                  <CopyToClipboard text={window.location.href} onCopy={() => this.triggerCopyTooltip()}>
                    <span className={`${styles['input-group-addon']} input-group-addon`}>
                      <i className="fas fa-clipboard" aria-hidden="true" />
                    </span>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </I18n>
    );
  }
}

export default Bookmark;
