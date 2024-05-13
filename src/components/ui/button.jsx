import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils.js";

const buttonVariants = cva(
  "yinline-flex yitems-center yjustify-center ywhitespace-nowrap yrounded-md ytext-sm yfont-medium yring-offset-white ytransition-colors focus-visible:youtline-none focus-visible:yring-2 focus-visible:yring-stone-950 focus-visible:yring-offset-2 disabled:ypointer-events-none disabled:yopacity-50 dark:yring-offset-stone-950 dark:focus-visible:yring-stone-300",
  {
    variants: {
      variant: {
        default:
          "ybg-stone-900 ytext-stone-50 hover:ybg-stone-900/90 dark:ybg-stone-50 dark:ytext-stone-900 dark:hover:ybg-stone-50/90",
        destructive:
          "ybg-red-500 ytext-stone-50 hover:ybg-red-500/90 dark:ybg-red-900 dark:ytext-stone-50 dark:hover:ybg-red-900/90",
        outline:
          "yborder yborder-stone-200 ybg-white hover:ybg-stone-100 hover:ytext-stone-900 dark:yborder-stone-800 dark:ybg-stone-950 dark:hover:ybg-stone-800 dark:hover:ytext-stone-50",
        secondary:
          "ybg-stone-100 ytext-stone-900 hover:ybg-stone-100/80 dark:ybg-stone-800 dark:ytext-stone-50 dark:hover:ybg-stone-800/80",
        ghost:
          "hover:ybg-stone-100 hover:ytext-stone-900 dark:hover:ybg-stone-800 dark:hover:ytext-stone-50",
        link: "ytext-stone-900 yunderline-offset-4 hover:yunderline dark:ytext-stone-50",
      },
      size: {
        default: "yh-10 ypx-4 ypy-2",
        sm: "yh-9 yrounded-md ypx-3",
        lg: "yh-11 yrounded-md ypx-8",
        icon: "yh-10 yw-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
