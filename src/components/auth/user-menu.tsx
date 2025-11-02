
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useState } from 'react';

// Mock user data for local state
const mockUser = {
  displayName: 'life.exe',
  email: 'kunalmule37@gmail.com',
  photoURL: 'https://picsum.photos/seed/user/100/100',
};

// A simple hook to manage local auth state
const useLocalUser = () => {
  const [user, setUser] = useState<typeof mockUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(mockUser);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const signOut = () => {
    setUser(null);
  };

  return { user, isLoading, signIn, signOut };
};


export function UserMenu() {
  const { user, isLoading, signIn, signOut } = useLocalUser();

  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = () => {
    signOut();
  };

  if (isLoading) {
    return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />;
  }

  if (!user) {
    return (
      <Button variant="outline" onClick={handleSignIn}>
        <LogIn className="mr-2 h-4 w-4" />
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
            <AvatarFallback>
              {user.displayName ? user.displayName.substring(0, 2) : <UserIcon />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.displayName || 'My Account'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
