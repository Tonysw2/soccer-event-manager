import { Loader2, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  GoogleAuthServices,
  UserInfoResponse,
} from '@/services/google-auth-services'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Skeleton } from './ui/skeleton'

export function ProfileMenu() {
  const [user, setUser] = useState<UserInfoResponse>()

  useEffect(() => {
    GoogleAuthServices.getUserInfo()
      .then(async (user) => {
        setUser(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-auto flex items-center justify-center rounded-full">
        <Avatar className="ml-auto">
          <AvatarImage src={user?.picture} />
          <AvatarFallback>
            {user ? (
              <>
                {user.given_name.slice(0, 1)}
                {user.family_name.slice(0, 1)}
              </>
            ) : (
              <Loader2 className="size-4 animate-spin" />
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span>{user ? user.name : <Skeleton className="h-4 w-24" />}</span>
          <span className="text-xs text-muted-foreground">
            {user ? user.email : <Skeleton className="mt-1.5 h-3 w-32" />}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="text-red-500">
          <button className="w-full">
            <LogOut className="mr-2 size-4" />
            <span>Sign-out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
