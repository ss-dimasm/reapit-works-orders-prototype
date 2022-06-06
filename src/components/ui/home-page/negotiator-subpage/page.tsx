import React, { FC, useCallback, useMemo, useState } from 'react'

import { Card, FlexContainer, Loader, PageContainer } from '@reapit/elements'
import {
  CompanyModel,
  DocumentModelPagedResult,
  NegotiatorModel,
  PropertyModel,
  TenancyModel,
  WorksOrderModelPagedResult,
} from '@reapit/foundations-ts-definitions'

import { useUserRoleContext } from 'contexts/user-role-context'
import { useFetchGetWorksOrder } from 'platform-api/works-order/get-works-order'
import { useFetchGetSingleNegotiator } from 'platform-api/negotiator/get-negotiator'
import { cx } from '@linaria/core'
import dayjs from 'dayjs'
import { useFetchGetLinkHref } from 'platform-api/_link'

const NegotiatorSubPage: FC = () => {
  const { userId, userRole } = useUserRoleContext()

  const { data: worksOrderData, isFetched: worksOrderIsFetched } = useFetchGetWorksOrder({
    roleId: userId!,
    roleType: userRole!,
  })

  const { data: negotiatorData, isFetched: singleNegotiatorIsFetched } = useFetchGetSingleNegotiator({
    negotiatorId: userId!,
  })

  const renderJSXContent = useCallback((): JSX.Element => {
    if (!!worksOrderData && worksOrderIsFetched && singleNegotiatorIsFetched && !!negotiatorData) {
      return <NegotiatorSubPageWithFetchedData worksOrderData={worksOrderData} negotiatorData={negotiatorData} />
    } else {
      return <Loader fullPage label="Please wait..." />
    }
  }, [worksOrderData, worksOrderIsFetched, singleNegotiatorIsFetched, negotiatorData])

  return <PageContainer>{renderJSXContent()}</PageContainer>
}

export default NegotiatorSubPage

type NegotiatorSubPageWithFetchedDataProps = {
  worksOrderData: WorksOrderModelPagedResult
  negotiatorData: NegotiatorModel
}

const NegotiatorSubPageWithFetchedData: FC<NegotiatorSubPageWithFetchedDataProps> = ({
  worksOrderData,
  // eslint-disable-next-line no-unused-vars
  negotiatorData,
}) => {
  const [activeWorksOrder, setActiveWorksOrder] = useState<number>(0)

  const { data: propertyData, isFetched: propertyIsFetched } = useFetchGetLinkHref<PropertyModel>({
    href: worksOrderData?._embedded?.[activeWorksOrder]?._links?.property?.href,
  })

  const { data: tenancyData, isFetched: tenancyIsFetched } = useFetchGetLinkHref<TenancyModel>({
    href: worksOrderData?._embedded?.[activeWorksOrder]?._links?.tenancy?.href,
  })

  const { data: documentsData, isFetched: documentsIsFetched } = useFetchGetLinkHref<DocumentModelPagedResult>({
    href: worksOrderData?._embedded?.[activeWorksOrder]?._links?.documents?.href,
  })

  const { data: companyData, isFetched: companyIsFetched } = useFetchGetLinkHref<CompanyModel>({
    href: worksOrderData?._embedded?.[activeWorksOrder]?._links?.company?.href,
  })

  console.log('property', propertyData)
  console.log('tenancy', tenancyData)
  console.log('document', documentsData)
  console.log('company', companyData)

  const isAllDataFetched = useMemo(
    (): boolean => !!(propertyIsFetched && documentsIsFetched && companyIsFetched && tenancyIsFetched),
    [propertyIsFetched, documentsIsFetched, companyIsFetched, tenancyIsFetched],
  )

  const renderJSXMainContent = useCallback((): JSX.Element => {
    if (isAllDataFetched) {
      return <> {worksOrderData?._embedded?.[activeWorksOrder]?.id}</>
    }
    return <Loader label="Please wait" fullPage />
  }, [isAllDataFetched])

  return (
    <FlexContainer style={{ maxHeight: '100vh' }}>
      <div style={{ width: '40%' }} className=" el-pr6">
        <FlexContainer isFlexColumn style={{ maxHeight: '100%', overflowY: 'scroll', paddingRight: '20px' }}>
          {worksOrderData._embedded?.map((workOrder, i) => (
            <Card
              key={workOrder.id}
              className={cx('el-mb5')}
              onClick={() => setActiveWorksOrder(i)}
              isSelected={activeWorksOrder === i}
              hasMainCard
              mainCardHeading={workOrder.description}
              mainCardBody={`Raised at ${dayjs(workOrder?.created).format('DD/MM/YYYY')}`}
            />
          ))}
        </FlexContainer>
      </div>
      <div style={{ width: '100%', height: '100vh' }}>{renderJSXMainContent()}</div>
    </FlexContainer>
  )
}
