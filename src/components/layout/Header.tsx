import React from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function Header() {
  return (
    <header className="h-16 bg-slate-800 pixel-border border-b-2 border-slate-600 px-6 flex items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search quests, projects..."
            className="pl-10 pixel-border border-slate-600 bg-slate-700 text-slate-200 placeholder-slate-400 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="pixel-border border-slate-600 hover:border-purple-500 relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full pixel-font text-xs flex items-center justify-center text-white">
            3
          </span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="pixel-border border-slate-600 hover:border-purple-500"
            >
              <User className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="pixel-card border-slate-600">
            <DropdownMenuItem className="pixel-font text-xs">
              <User className="w-3 h-3 mr-2" />
              PROFILE
            </DropdownMenuItem>
            <DropdownMenuItem className="pixel-font text-xs">
              <LogOut className="w-3 h-3 mr-2" />
              LOGOUT
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}