import React, { Component } from 'react';
import {Icon} from 'react-fa';


class OrderExpired extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		$('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
	}

	render() {
	    return (
			<div className="text-center">
			    <h2 style={{margin: "0"}}>Çok geç...</h2>
			    <h5>İşleminiz zaman aşımına uğradı. Yeni bir işlem başlatabilirsiniz.</h5>

			    <h4 style={{margin: "25px 0 18px", "fontWeight": "500"}} className="text-warning" data-toggle="tooltip" data-placement="top" title="" data-original-title="Eğer gönderim işlemini başlattıysanız merak etmeyin. Para hesabımıza geçtiğinde bu sayfadaki işlem durumu otomatik olarak yenilenecektir.">Ama ben göndermiştim?</h4>
			</div>
	    );
	}
}

export default OrderExpired;
