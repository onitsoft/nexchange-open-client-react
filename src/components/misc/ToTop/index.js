import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

const ToTop = ({children}) => {
  const [prev, setPrev] = useState("")
  const location = useLocation()
  const { pathname } = location
  useEffect(() => {
    if (prev && prev !== pathname) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
    setPrev(pathname)
  }, [pathname])

  return children
}

export default ToTop
