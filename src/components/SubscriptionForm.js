import React from "react";
import PropTypes from "prop-types";
import jsonp from "jsonp";

const getAjaxUrl = url => url.replace("/post?", "/post-json?");
const subscribeUrl = "//kriptoburosu.us16.list-manage.com/subscribe/post?u=e03e0dde8cf6f915dff05dc69&amp;id=9ea3a976b3";


class SubscriptionForm extends React.Component {
	constructor(props, ...args) {
		super(props, ...args);
		this.state = {
			status: null,
			msg: null
		};
	}

	onSubmit = e => {
		e.preventDefault();
		if (!this.input.value ||this.input.value.length < 5 ||this.input.value.indexOf("@") === -1) {
			this.setState({
				status: "error"
			});
			return;
		}

		const url = getAjaxUrl(subscribeUrl) + `&EMAIL=${encodeURIComponent(this.input.value)}`;
		this.setState({
				status: "sending",
				msg: null
			},
			() => jsonp(
				url, {
					param: "c"
				},
				(err, data) => {
					if (err) {
						this.setState({
							status: "error",
							msg: err
						});
					} else if (data.result !== "success") {
						this.setState({
							status: "error",
							msg: data.msg
						});
					} else {
						this.setState({
							status: "success",
							msg: data.msg
						});
					}
				}
			)
		);
	};

	render() {
		const { action, messages, className, style, styles } = this.props;
		const { status } = this.state;

		return (
			<div id="subscription-form">
				<div className="container text-center">
					<h2>Haberdar Olun</h2>

					<form action={action} method="post" noValidate>
						<div id="subscription-form-inner">

							<div className="col-xs-12 col-sm-10">
								<div className="form-group is-empty has-success">
									<input ref={node => (this.input = node)} type="email" name="EMAIL" placeholder="Kripto Bürosu'ndaki yeniliklerden haberdar olmak için e-posta adresinizi girin" className="form-control" required />
								<span className="material-input"></span></div>
							</div>

							<div className="col-xs-12 col-sm-2">
								<button 
									disabled={
										this.state.status === "sending" ||
										this.state.status === "success"
									}
									type="submit"
									className="btn btn-themed"
									onClick={this.onSubmit}
								>
									Kayıt Ol
								</button>
							</div>

							<div className="col-xs-12 message">
							{status === "success" && (<p className="success">Neredeyse tamam... Onay için size gönderilen e-postadaki bağlantıya tıklamanız yeterli.</p>)}
							{status === "error" && (<p className="failure">Hata! Lütfen daha sonra tekrar deneyin.</p>)}
							</div>

						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default SubscriptionForm;
