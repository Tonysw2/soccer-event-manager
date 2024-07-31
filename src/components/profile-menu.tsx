import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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
import { useToast } from './ui/use-toast'

export function ProfileMenu() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { userInfo } = useGetUserInfo()

  async function handleSignOut() {
    const { dismiss } = toast({
      title: 'Signing out...',
      duration: Infinity,
    })

    try {
      await GoogleAuthServices.signOut()
    } catch {
    } finally {
      const storageKeysArray = Object.values(storageKeys)
      console.log(storageKeysArray)
      storageKeysArray.forEach((key) => localStorage.removeItem(key))
      dismiss()
      navigate('/sign-in')
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-auto flex items-center justify-center rounded-full">
        <Avatar className="ml-auto">
          <AvatarImage src={userInfo?.picture} />
          <AvatarFallback>
            {userInfo ? (
              <>
                {userInfo.given_name.slice(0, 1)}
                {userInfo.family_name.slice(0, 1)}
              </>
            ) : (
              <Skeleton className="h-full w-full bg-amber-500" />
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

        <DropdownMenuItem asChild className="text-red-500">
          <button type="button" className="w-full" onClick={handleSignOut}>
            <LogOut className="mr-2 size-4" />
            <span>Sign-out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
