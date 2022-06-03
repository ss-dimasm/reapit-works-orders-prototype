import React, { FC, useCallback, useMemo, useRef } from 'react'

import { BodyText, Button, ButtonGroup, Subtitle, useSnack } from '@reapit/elements'
import { useUserRoleContext } from 'contexts/user-role-context'
import { toBeCapitalizedSentence } from 'utils/string-manipulate'

type UserRoleContextType = Exclude<ReturnType<typeof useUserRoleContext>, null>

const UserRoleModal: FC = () => {
  const { userId, userRole, changeUserRole, closeUserRoleModal } = useUserRoleContext()

  const { success } = useSnack()

  const trackedUserRole = useRef<UserRoleContextType['userRole'] | null>(null)

  const availableOptionRoles = useMemo(
    (): {
      [key in Exclude<UserRoleContextType['userRole'], null>]: Exclude<
        Pick<UserRoleContextType, 'userRole' | 'userId'>,
        null
      >
    } => ({
      company: {
        userRole: 'company',
        userId: 'OXF18000001',
      },
      negotiator: {
        userRole: 'negotiator',
        userId: 'JAS',
      },
      tenant: {
        userRole: 'tenant',
        userId: 'OXF190022',
      },
    }),
    [],
  )

  const handleChangeUserRole = useCallback(
    ({ userRole: userRoleVal }: Pick<UserRoleContextType, 'userRole'>) =>
      () => {
        if (userRoleVal) {
          trackedUserRole.current = userRole
          changeUserRole(availableOptionRoles[userRoleVal!])

          const notificationMessage = (): string => {
            if (trackedUserRole.current === null) {
              return `Success set role to ${userRoleVal}`
            } else if (trackedUserRole.current === userRoleVal) {
              return `You already set the role to ${userRoleVal}`
            } else {
              return `Success change role from ${trackedUserRole.current} to ${userRoleVal}`
            }
          }

          success(notificationMessage())
          closeUserRoleModal()
        }
      },
    [userRole],
  )

  const renderHeaderJSXElement = useCallback(
    ({ userRole, userId }: Pick<UserRoleContextType, 'userRole' | 'userId'>): JSX.Element => {
      if (userRole && userId) {
        return <Subtitle hasBoldText>Currently your role is {toBeCapitalizedSentence(userRole)}</Subtitle>
      } else {
        return <Subtitle hasBoldText>You aren&apos;t set your role yet!</Subtitle>
      }
    },
    [userId, userRole],
  )

  return (
    <>
      {renderHeaderJSXElement({ userId, userRole })}
      <BodyText>Tap the button below to change your role</BodyText>
      <ButtonGroup alignment="center">
        {Object.entries(availableOptionRoles).map(([, { userRole, userId }]) => (
          <HandleUserRoleButton
            key={userId}
            value={userRole!}
            changeHandler={() => handleChangeUserRole({ userRole })}
          />
        ))}
      </ButtonGroup>
    </>
  )
}

type HandleUserRoleButtonProps = {
  value: Exclude<Pick<UserRoleContextType, 'userRole'>['userRole'], null>
  changeHandler: (val: HandleUserRoleButtonProps['value']) => () => void
}

const HandleUserRoleButton: FC<HandleUserRoleButtonProps> = ({ value, changeHandler }) => (
  <Button intent="low" onClick={changeHandler(value)}>
    {toBeCapitalizedSentence(value)}
  </Button>
)

export default UserRoleModal
