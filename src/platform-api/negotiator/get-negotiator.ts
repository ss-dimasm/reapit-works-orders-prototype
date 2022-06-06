import { useQuery } from 'react-query'
import { NegotiatorModel } from '@reapit/foundations-ts-definitions'

import { URLS } from 'constants/api'
import { Axios } from 'core/axios'

type SingleNegotiatorType = {
  negotiatorId: string
}

const fetchSingleNegotiator = async ({ negotiatorId }: SingleNegotiatorType): Promise<NegotiatorModel> => {
  const { data } = await Axios.get<NegotiatorModel>(`${URLS.NEGOTIATORS}/${negotiatorId}`)
  return data
}

export const useFetchGetSingleNegotiator = (props: SingleNegotiatorType) => {
  return useQuery(['single-negotiator', props], () => fetchSingleNegotiator({ ...props }))
}
