import axios from 'axios'
import { BASE_HEADERS } from 'constants/api'

import { ReapitConnectSession } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'

export const Axios = axios.create({
  baseURL: window.reapit.config.platformApiUrl,
  headers: {
    ...BASE_HEADERS,
  },
})
;(async () => {
  const connectSession = (await reapitConnectBrowserSession.connectSession()) as ReapitConnectSession
  Axios.defaults.headers.common['Authorization'] = connectSession.accessToken
})()
