import React, { FC, useCallback, useMemo, useState } from 'react'

import { PersistentNotification, useModal } from '@reapit/elements'
import { UserRoleContext, UserRoleContextType } from 'contexts/user-role-context'

import { CompanySubPage, NegotiatorSubPage, TenantSubPage } from 'components/ui/home-page'
import UserRoleModalContent from 'components/ui/modals'

type HomePageProps = {}

export const HomePage: FC<HomePageProps> = () => {
  const [userStatus, setUserStatus] = useState<Pick<UserRoleContextType, 'userId' | 'userRole'>>({
    userId: null,
    userRole: null,
  })

  const { Modal: UserRoleModal, openModal: openUserRoleModal, closeModal: closeUserRoleModal } = useModal()

  const userRoleContextValue = useMemo(
    (): UserRoleContextType => ({
      ...userStatus,
      changeUserRole: setUserStatus,
      openUserRoleModal,
      closeUserRoleModal,
    }),
    [userStatus],
  )

  const availableSubPage = useMemo(
    (): {
      [val in NonNullable<Pick<UserRoleContextType, 'userRole'>['userRole']>]: JSX.Element
    } => ({
      company: <CompanySubPage />,
      negotiator: <NegotiatorSubPage />,
      tenant: <TenantSubPage />,
    }),
    [],
  )

  const renderJSXElement = useCallback(
    ({ userId, userRole }: typeof userStatus): JSX.Element => {
      if (userRole && userId) {
        return availableSubPage[userRole]
      }
      return <h1>You&apos;e not set role yet!</h1>
    },
    [userStatus],
  )

  return (
    <UserRoleContext.Provider value={userRoleContextValue}>
      <PersistentNotification isFixed onClick={openUserRoleModal} />
      {renderJSXElement({ ...userStatus })}
      <UserRoleModal>
        <UserRoleModalContent />
      </UserRoleModal>
    </UserRoleContext.Provider>
  )
}
export default HomePage
