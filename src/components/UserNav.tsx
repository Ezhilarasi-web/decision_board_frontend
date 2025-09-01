/**
 * @fileoverview UserNav component that displays the current user profile
 * with dropdown menu for profile-related actions.
 */
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { User, Settings, LogOut } from "lucide-react"
import accountAvatar from "../assets/account-avatar.png"
import { useRef, useState, useEffect } from "react"

/**
 * UserNav component displays the current user information with an avatar
 * and a dropdown menu with various user actions.
 * 
 * @returns {JSX.Element} The rendered UserNav component
 */
export function UserNav() {
  /**
   * State to store the width of the dropdown trigger for consistent dropdown sizing
   */
  const [dropdownWidth, setDropdownWidth] = useState<number | null>(null);
  
  /**
   * Reference to the dropdown trigger button element
   */
  const triggerRef = useRef<HTMLButtonElement>(null);

  /**
   * Effect to measure and update the dropdown width based on trigger element size
   */
  useEffect(() => {
    if (!triggerRef.current) return;

    /**
     * Updates the dropdown width based on the trigger element's width
     */
    const updateWidth = () => {
      if (triggerRef.current) {
        setDropdownWidth(triggerRef.current.offsetWidth);
      }
    };

    // Initial measurement
    updateWidth();

    // Set up resize observer to update width if window resizes
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(triggerRef.current);

    // Clean up resize observer on unmount
    return () => {
      if (triggerRef.current) {
        resizeObserver.unobserve(triggerRef.current);
      }
    };
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          ref={triggerRef}
          className="px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 cursor-pointer focus:outline-none hover:bg-gray-200 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-gray-800 text-base font-medium">Evie Bloom - VP of Marketing</span>
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src={accountAvatar} 
                alt="Evie Bloom" 
                className="object-cover"
                style={{ aspectRatio: '521/445' }}
              />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="z-[200] bg-white" 
        align="start" 
        alignOffset={0}
        forceMount 
        sideOffset={5}
        side="bottom"
        style={{ width: dropdownWidth ? `${dropdownWidth}px` : 'auto' }}
      >
        {/* User info section */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Evie Bloom</p>
            <p className="text-xs leading-none text-muted-foreground">
              VP of Marketing
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* User actions group */}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        
        {/* Logout option */}
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 