"use client"

import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "saffron" | "outline" | "ghost" | "maroon"
  size?: "sm" | "md" | "lg"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "saffron", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-base",
          size === "lg" && "px-8 py-4 text-lg",
          variant === "saffron" && "btn-primary",
          variant === "outline" && "btn-ghost",
          variant === "ghost" &&
            "text-ink-soft hover:text-maroon hover:bg-maroon/[0.05]",
          variant === "maroon" &&
            "bg-maroon text-paper hover:bg-maroon-deep shadow-lg shadow-maroon/20 hover:scale-105",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
export { Button }
