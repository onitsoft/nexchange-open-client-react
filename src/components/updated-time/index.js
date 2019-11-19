import React, { useMemo } from 'react'
import styled from '@emotion/styled'
import moment from 'moment'

export const UpdatedTime = ({created, updated, format = 'MMM Do YYYY'}) => {
  const formatTime = time => time && moment(time).format(format)

  const createdTime = useMemo(() => formatTime(created), [created, formatTime])
  const updatedTime = useMemo(() => formatTime(updated), [updated, formatTime])

  return (
    <StyledUpdatedTime>
      <p>
        {created && <span>Created on: <time dateTime={created}>{createdTime}</time></span>}
        {created && updated && <span> &mdash; </span>}
        {updated && <span>Last Update: <time dateTime={updated}>{updatedTime}</time></span>}
      </p>
    </StyledUpdatedTime>
  )
}

const StyledUpdatedTime = styled.aside`
  opacity: 0.3;
  transition: all 220ms ease-out;
  &:hover {
    opacity: .99;
  }
  p {
    font-size: 1rem;
  }
`

export default UpdatedTime
