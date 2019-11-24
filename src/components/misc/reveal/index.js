import React from 'react'
import { useBreakpoint } from 'Components/misc/breakpoint'
import Bounce from 'react-reveal/Bounce'

export const CustomBounce = (props) => {
  const breakpoint = useBreakpoint()

  return (!breakpoint.sm) ? <Bounce {...props} /> : props.children;
}

export default CustomBounce
