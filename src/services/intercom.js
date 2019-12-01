import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import config from 'Config'

const { INTERCOM_APP_ID: app_id } = config

export const Intercom = (props) => {
  const location = useLocation()
  const { pathname, search } = location

  useEffect(() => {
    window.Intercom("boot", { app_id })
  }, [])

  useEffect(() => {
    window.Intercom("update")
  }, [pathname, search])

  return null
}

export default Intercom


