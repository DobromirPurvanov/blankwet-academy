"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const kbdVariants = cva(
  "inline-flex items-center justify-center rounded border px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-muted-foreground",
        outline: "border-input bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface KbdProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof kbdVariants> {}

const Kbd = React.forwardRef<HTMLSpanElement, KbdProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Kbd.displayName = "Kbd"

export { Kbd, kbdVariants }
