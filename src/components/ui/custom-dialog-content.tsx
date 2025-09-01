import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import { DialogOverlay, DialogPortal } from "./dialog"

export const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "bg-background fixed top-[55%] left-[50%] z-50 grid w-[95vw] max-w-[95vw] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:max-w-[95vw] max-h-[calc(85vh-96px)] mt-2",
        className
      )}
      {...props}
    >
      <div className="dialog-content overflow-y-auto p-6 pr-8">
        {children}
      </div>
      {/* No default close button */}
    </DialogPrimitive.Content>
  </DialogPortal>
))
CustomDialogContent.displayName = "CustomDialogContent" 