import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import styles from "./HoldButton.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  onSubmit: () => void;
  holdDelay?: number;
}

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
);

const HoldButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, onSubmit, holdDelay = 2000, ...props }, ref) => {
    const [_percentage, setPercentage] = React.useState(0);
    const startTime = React.useRef<number | null>(null);
    const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(
      null
    );

    const startCounter = () => {
      if (intervalRef.current) {
        return;
      }
      startTime.current = Date.now();
      intervalRef.current = setInterval(() => {
        if (startTime.current) {
          setPercentage(
            Math.floor(((Date.now() - startTime.current) / holdDelay) * 100)
          );
          if (Date.now() - startTime.current > holdDelay) {
            stopCounter();
            onSubmit();
          }
        }
      }, 10);
    };

    const stopCounter = () => {
      if (startTime.current && Date.now() - startTime.current < holdDelay) {
        // TODO: show tooltip
      }

      startTime.current = null;
      setPercentage(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          startTime.current ? styles.holding : styles.idle
        )}
        ref={ref}
        {...props}
        onMouseDown={startCounter}
        onMouseUp={stopCounter}
        onMouseLeave={stopCounter}
        onTouchStart={startCounter}
        onTouchCancel={stopCounter}
        onTouchEnd={stopCounter}
      >
        {props.children}
      </button>
    );
  }
);
HoldButton.displayName = "Button";

export { HoldButton };
