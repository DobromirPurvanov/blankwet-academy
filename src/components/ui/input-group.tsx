import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputGroupVariants = cva("relative", {
  variants: {
    variant: {
      default: "",
      filled: "bg-muted rounded-md",
      outline: "border rounded-md",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface InputGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputGroupVariants> {
  label?: string
  error?: string
  helperText?: string
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, variant, label, error, helperText, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(inputGroupVariants({ variant }), className)}
        {...props}
      >
        {label && (
          <label className="block text-sm font-medium mb-1">{label}</label>
        )}
        {children}
        {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground mt-1">{helperText}</p>
        )}
      </div>
    )
  }
)
InputGroup.displayName = "InputGroup"

export { InputGroup, inputGroupVariants }
