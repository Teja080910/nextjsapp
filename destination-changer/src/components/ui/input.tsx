import { cn } from "@/lib/utils";
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="input-container">
      <div className="flex border-black">
        <FontAwesomeIcon icon={faLink} 
        className={cn("flex h-9 w-5 rounded-tr-none rounded-br-none rounded-l-m  border-l border-t border-b")}
        />
        <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-tr-md rounded-br-md rounded-bl-none border-r border-t border-b border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}

        placeholder="https://destination-changer.com/"
      />
      </div>
      
    </div>
      
    )
  }
)
Input.displayName = "Input"

export { Input };

