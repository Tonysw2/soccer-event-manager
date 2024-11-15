import { Loader2, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { storageKeys } from '@/config/storageKeys'
import { useGetUserInfo } from '@/hooks/use-get-user-info'
import { GoogleAuthServices } from '@/services/google-auth-services'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Skeleton } from './ui/skeleton'

export function ProfileMenu() {
  const navigate = useNavigate()
  const { userInfo } = useGetUserInfo()

  async function handleSignOut() {
    const toastId = toast.loading('Signing out...', {
      duration: Number.POSITIVE_INFINITY,
    })

    try {
      await GoogleAuthServices.signOut()
    } catch {
    } finally {
      const storageKeysArray = Object.values(storageKeys)
      storageKeysArray.forEach((key) => localStorage.removeItem(key))
      toast.dismiss(toastId)
      navigate('/sign-in')
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-auto flex items-center justify-center rounded-full ring-2 ring-primary">
        <Avatar className="ml-auto">
          <AvatarImage src={userInfo?.picture} />
          <AvatarFallback>
            {userInfo ? (
              <>
                {userInfo.given_name.slice(0, 1)}
                {userInfo.family_name.slice(0, 1)}
              </>
            ) : (
              <Loader2 className="size-4 animate-spin" />
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span>
            {userInfo ? userInfo.name : <Skeleton className="h-4 w-24" />}
          </span>
          <span className="text-xs text-muted-foreground">
            {userInfo ? (
              userInfo.email
            ) : (
              <Skeleton className="mt-1.5 h-3 w-32" />
            )}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          asChild
          className="text-red-500"
        >
          <button
            type="button"
            className="w-full"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 size-4" />
            <span>Sign-out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
