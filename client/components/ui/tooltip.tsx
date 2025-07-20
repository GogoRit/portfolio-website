import * as React from "react";
import { useLayoutEffect, useState } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = (props) => (
  <TooltipPrimitive.Provider {...props} collisionPadding={8} />
);

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & { side?: 'top' | 'right' | 'bottom' | 'left' }
>(({ className, side, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    side={side}
    sideOffset={sideOffset}
    collisionPadding={8}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Shared hook to compute best tooltip side based on available space
export function useTooltipPosition(triggerRef, contentRef, preferredSide = 'top', margin = 8) {
  const [side, setSide] = useState(preferredSide);

  useLayoutEffect(() => {
    if (!triggerRef?.current || !contentRef?.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = contentRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Calculate available space on each side
    const spaces = {
      top: triggerRect.top - margin,
      bottom: vh - triggerRect.bottom - margin,
      left: triggerRect.left - margin,
      right: vw - triggerRect.right - margin,
    };
    // Check if preferred side fits
    const fits = {
      top: spaces.top >= tooltipRect.height,
      bottom: spaces.bottom >= tooltipRect.height,
      left: spaces.left >= tooltipRect.width,
      right: spaces.right >= tooltipRect.width,
    };
    // Pick preferred if it fits, else pick the side with most space
    if (fits[preferredSide]) {
      setSide(preferredSide);
    } else {
      const best = Object.entries(spaces).sort((a, b) => b[1] - a[1])[0][0];
      setSide(best);
    }
  }, [triggerRef, contentRef, preferredSide, margin]);

  return side;
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
