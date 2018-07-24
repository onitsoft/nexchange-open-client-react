import React, { Component } from 'react';
import Bookmark from './Bookmark/Bookmark';
import { I18n } from 'react-i18next';
import styles from './OrderTop.scss';

class OrderTop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBookmarkModal: false,
    };
  }

  render() {
    return (
      <I18n ns="translations">
        {t => (
          <div>
            <div className="col-xs-12">
              <h3 className={styles.ref}>
                {t('order.reference')}: <b>{this.props.order.unique_reference}</b>
              </h3>

              <button
                type="button"
                className={`${styles.bookmark} btn btn-default btn-simple`}
                onClick={() => this.setState({ showBookmarkModal: true })}
              >
                {t('bookmark.0')}
              </button>
            </div>

            <Bookmark show={this.state.showBookmarkModal} onClose={() => this.setState({ showBookmarkModal: false })} />
          </div>
        )}
      </I18n>
    );
  }
}

export default OrderTop;
