import React, { FC, useCallback } from 'react'

import { Card, FlexContainer, Loader, PageContainer } from '@reapit/elements'
import { WorksOrderModelPagedResult } from '@reapit/foundations-ts-definitions'

import { useUserRoleContext } from 'contexts/user-role-context'
import { useFetchGetWorksOrder } from 'platform-api/works-order/get-works-order'

const NegotiatorSubPage: FC = () => {
  const { userId, userRole } = useUserRoleContext()

  const { data, isFetched } = useFetchGetWorksOrder({
    roleId: userId!,
    roleType: userRole!,
  })

  const renderJSXContent = useCallback((): JSX.Element => {
    if (!!data && isFetched) {
      return <NegotiatorSubPageWithFetchedData data={data} />
    } else {
      return <Loader fullPage label="Please wait..." />
    }
  }, [isFetched, data])

  return <PageContainer>{renderJSXContent()}</PageContainer>
}

export default NegotiatorSubPage

type NegotiatorSubPageWithFetchedDataProps = {
  data: WorksOrderModelPagedResult
}

const NegotiatorSubPageWithFetchedData: FC<NegotiatorSubPageWithFetchedDataProps> = ({ data }) => {
  console.info(data)
  return (
    <FlexContainer>
      <div style={{ width: '350px', height: '100%' }} className=" el-pr6">
        <FlexContainer isFlexColumn>
          {data._embedded?.map((data) => {
            return (
              <Card
                key={data.id}
                className="el-mb5"
                hasMainCard
                mainCardHeading="Hooma"
                mainCardImgUrl="https://via.placeholder.com/300x300.svg"
                mainCardSubHeading="Main Subheading"
                mainCardSubHeadingAdditional="Main Subheading Additional"
                mainCardBody="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                listCardHeading="List Card Heading"
                listCardSubHeading="List Card Sub Heading"
              />
            )
          })}
        </FlexContainer>
      </div>
      <div style={{ position: 'sticky', top: '0', height: '100vh' }}>Content - will do soon</div>
    </FlexContainer>
  )
}
