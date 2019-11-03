import React from 'react'
import { Col } from 'reactstrap'
import styles from './SupportedAsset.scss'
import styled from '@emotion/styled'

export default function SupportedAsset({ coin: { name, src } }) {
  return (
    <StyledCol md={3}>
      <div className={styles.profile}>
        <img src={src} alt={`${name}`} />
      </div>
      <div className={styles.title}>
        {name}
      </div>
    </StyledCol >
  )
}

const StyledCol = styled(Col)`
  height: 230px;
  .${styles.profile} {
    text-align: center;
    > img {
      display: inline-block;
      height: 180px;
      width: auto;
    }
  }
`