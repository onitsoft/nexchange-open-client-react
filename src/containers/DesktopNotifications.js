import React, { Component } from 'react';
import Notify from 'notifyjs';
import _ from 'lodash';
import shallowEqual from '../helpers/shallowEqual';
import objectsShallowDiff from '../helpers/objectsShallowDiff';

class DesktopNotifications extends Component {
	constructor(props) {
		super(props);

        this.onClick = this.onClick.bind(this);
        this.notify = this.notify.bind(this);
    }
    
    notify(nextProps) {
        const diff = objectsShallowDiff(this.props.kyc, nextProps.kyc)
        let body = ``;

        const containsVerified = _.contains(diff, 'is_verified');
        const containsId = _.contains(diff, 'id_document_status');
        const containsResidence = _.contains(diff, 'residence_document_status');
        const containsComment = _.contains(diff, 'user_visible_comment');
        const idStatus = nextProps.kyc.id_document_status;
        const residenceStatus = nextProps.kyc.residence_document_status;

        if (containsVerified && nextProps.kyc.is_verified) {
            body = `Your KYC has been approved.`;
        } else if (containsId || containsResidence) {
            if (containsId && containsResidence) {
                if (idStatus === 'REJECTED' && residenceStatus === 'REJECTED') {
                    body = `ID and proof of residence have been rejected`;
                }
            } else if (containsId) {
                body = `Government issued ID status updated to - ${idStatus}`;
            } else if (containsResidence) {
                body = `Residence status updated to - ${residenceStatus}`;
            }
        } else if (containsComment) {
            body = 'Comment has been added';
        }

        new Notify(`KYC status updated for order #${this.props.order.unique_reference}`, {
            body,
            closeOnClick: true,
            notifyClick: function() {
                window.focus();
                this.close();
            }
        }).show();
    }

	componentWillReceiveProps(nextProps) {
        if (this.props.kyc && !shallowEqual(this.props.kyc, nextProps.kyc)) {
            this.notify(nextProps);
        }
    }
    
    onClick() {
        if (Notify.isSupported()) {
            Notify.requestPermission(() => {
                window.ga('send', 'event', 'Order', 'track', this.props.order.unique_reference);
            });
        }
    }

	render() {
        if (!Notify.needsPermission
            || (this.props.kyc && this.props.kyc.is_verified)
            || !this.props.visible) return null;

		return (
    		<div className="row">
    			<div className="col-xs-12 text-center">
    				<a href="javascript:void(0)" 
                        className="text-warning"
                        onClick={this.onClick}
                    >
                        <h4 style={{fontWeight: 500, width: '100%'}}>
                            Click here to get notified about your KYC status change
                        </h4>
                    </a>
    			</div>
    		</div>
		);
	}
}

export default DesktopNotifications;