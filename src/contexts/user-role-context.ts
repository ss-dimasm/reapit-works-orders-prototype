import { createContext, Dispatch, SetStateAction, useContext } from 'react'

export type UserRoleContextType = {
  userId: string | null
  userRole: 'negotiator' | 'company' | 'tenant' | null
  changeUserRole: Dispatch<SetStateAction<Pick<UserRoleContextType, 'userId' | 'userRole'>>>
  openUserRoleModal: () => void
  closeUserRoleModal: () => void
}

export const UserRoleContext = createContext<UserRoleContextType | null>(null)

export const useUserRoleContext = () => useContext(UserRoleContext)!
