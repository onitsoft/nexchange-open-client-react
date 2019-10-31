import React from 'react'

import Referrals from 'Components/Layout/Referrals/Referrals'
import Header from 'Components/Layout/Header/Header'
import Footer from 'Components/Layout/Footer/Footer'

import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
`


export default function Layout({ children }) {
    return (
        <Wrapper>
            <Referrals />
            <Header />
              { children }
            <Footer />
        </Wrapper>
    )
}