import React, { Component } from 'react';
import Notify from 'notifyjs';


class DesktopNotifications extends Component {
	constructor(props) {
		super(props);

		this.state = {
			order: props.order,
			orderOld: null,
			track: false
		}

		this.updateOrder = this.updateOrder.bind(this);
	}

	updateOrder() {
		if (!Notify.needsPermission && this.state.orderOld && this.state.orderOld.status_name[0][0] != this.state.order.status_name[0][0]) {
			let msg = null;

			switch (this.state.order.status_name[0][0]) {
				case 12:
					msg = `Transaction detected, awaiting confirmations.`;
					break;
				case 13:
					msg = `Funds received. Preparing to release coins.`;
					break;
				case 14:
					msg = `Being processed. Allow up to 15 minutes.`;
					break;
				case 15:
					msg = `Funds released, awaiting confirmations.`;
					break;
				case 16: 
					msg = `Order completed successfully!`;
					break;
				case 0:
					msg = `Order Processing Failed. There’s been a problem with your order. Please contact support to resolve at support@nexchange.io.`;
					break;
				default:
					msg = ``;
	  	}

			new Notify(`Order ${this.state.order.unique_reference} update`, {
				body: msg,
				closeOnClick: true,
				notifyClick: function() {
					window.focus();
					this.close();
				}
			}).show();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.order == null && nextProps.order) {
			if (localStorage.getItem(`track-${nextProps.order.unique_reference}`)) {
				this.setState({track: true});
			} 
		}

		this.setState({orderOld: this.props.order, order: nextProps.order}, () => {		
			if (this.state.track) {
				this.updateOrder();
			}
		});
	}

	render() {
		return (
    		<div className="row">
    			<div className="col-xs-12 text-center">
    				<a href="javascript:void(0)" 
							className="text-warning"
							style={{color: '#f0ad4e'}}
							data-toggle="tooltip"
							data-placement="top" title=""
							data-original-title="Whenever your order status updates, we will send you a desktop notification given you enable the permissions."
							onClick={() => {
								if (!Notify.needsPermission) {
									this.setState({track: true});
									localStorage.setItem(`track-${this.props.order.unique_reference}`, true)
								} else if (Notify.isSupported()) {
									Notify.requestPermission(() => {
										this.setState({track: true})
										localStorage.setItem(`track-${this.props.order.unique_reference}`, true)
										ga('send', 'event', 'Order', 'track', this.props.order.unique_reference);
									});
								}
    					}}
						>
							<h4 style={{fontWeight: 500}}>
								You don’t have to wait on this page.
								Click here to get notifications on order progress
							</h4>
						</a>
    			</div>
    		</div>
		);
	}
}

export default DesktopNotifications;
