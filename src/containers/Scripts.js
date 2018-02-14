import React, { Component } from 'react';
import Script from 'react-load-script'

class Scripts extends Component {
    render() {
        return (
            <Script
                url="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"
            />
        )
    }
}

export default Scripts;