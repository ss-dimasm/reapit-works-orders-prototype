import React, { FC, useCallback } from 'react'

import { Loader } from '@reapit/elements'

import { useUserRoleContext } from 'contexts/user-role-context'
import { useFetchGetWorksOrder } from 'platform-api/works-order/get-works-order'

const CompanySubPage: FC = () => {
  const { userId, userRole } = useUserRoleContext()

  const { data, isFetched } = useFetchGetWorksOrder({
    roleId: userId!,
    roleType: userRole!,
  })

  const renderJSXContent = useCallback((): JSX.Element => {
    if (!!data && isFetched) {
      return <div>CompanySubPage - {data.totalCount}</div>
    } else {
      return <Loader fullPage label="Please wait..." />
    }
  }, [isFetched, data])

  return renderJSXContent()
}

export default CompanySubPage
