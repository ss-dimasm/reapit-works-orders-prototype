import { useQuery } from 'react-query'
import { Axios } from 'core/axios'

import { URLS } from 'constants/api'
import { WorksOrderModelPagedResult } from '@reapit/foundations-ts-definitions'
import { UserRoleContextType } from 'contexts/user-role-context'

type UseFetchGetWorksOrderProps = {
  roleId: string
  roleType: Exclude<UserRoleContextType['userRole'], null>
}

export const useFetchGetWorksOrder = (props: UseFetchGetWorksOrderProps) => {
  return useQuery(['get-works-order', props], () => fetchGetWorksOrders({ ...props }))
}

const fetchGetWorksOrders = async (props: UseFetchGetWorksOrderProps): Promise<WorksOrderModelPagedResult> => {
  const { data } = await Axios.get(URLS.WORKS_ORDERS, {
    params: {
      embed: props.roleType,
      ...parameterConvert({ ...props }),
    },
  })

  return data
}

const parameterConvert = ({ roleType, roleId }: UseFetchGetWorksOrderProps) => {
  const availableParameter: {
    [val in UseFetchGetWorksOrderProps['roleType']]: string
  } = {
    company: 'companyId',
    tenant: 'tenancyId',
    negotiator: 'negotiatorId',
  }

  return {
    [availableParameter[roleType]]: roleId,
  }
}
