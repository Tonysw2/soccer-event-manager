import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/config/queryKeys'
import { GoogleAuthServices } from '@/services/google-auth-services'

export function useGetUserInfo() {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.userInfo],
    queryFn: () => GoogleAuthServices.getUserInfo(),
    staleTime: Number.POSITIVE_INFINITY,
  })

  return {
    userInfo: data,
    isLoadingUserInfo: isLoading,
  }
}
