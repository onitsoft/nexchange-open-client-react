import React, { Fragment } from 'react'

import Referrals from 'Components/Layout/Referrals/Referrals'
import Header from 'Components/Layout/Header/Header'
import Footer from 'Components/Layout/Footer/Footer'


export default function Layout({ children }) {
    return (
        <Fragment>
            <Referrals />
            <Header />
              { children }
            <Footer />
        </Fragment>
    )
}