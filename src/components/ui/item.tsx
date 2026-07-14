import * as React from "react"

import { cn } from "@/lib/utils"

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, title, description, icon, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between rounded-lg border p-4",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-4">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <div>
            <h3 className="font-medium">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    )
  }
)
Item.displayName = "Item"

export { Item, type ItemProps }
