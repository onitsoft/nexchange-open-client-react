import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const Intercom = (props) => {
  const location = useLocation()
  const { pathname, search } = location

  useEffect(() => {
    window.Intercom("boot", {
      app_id: "a3zrft9d"
    })
  }, [])

  useEffect(() => {
    window.Intercom("update")
  }, [pathname, search])

  return (<></>)
}

export default Intercom


