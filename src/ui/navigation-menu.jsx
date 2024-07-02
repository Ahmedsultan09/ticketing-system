import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "../../lib/utils.js";

const NavigationMenu = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn(
        "yrelative yz-10 yflex ymax-w-max yflex-1 yitems-center yjustify-center",
        className
      )}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  )
);
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "ygroup yflex yflex-1 ylist-none yitems-center yjustify-center yspace-x-1",
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "ygroup yinline-flex yh-10 yw-max yitems-center yjustify-center yrounded-md ybg-white ypx-4 ypy-2 ytext-sm yfont-medium ytransition-colors hover:ybg-stone-100 hover:ytext-stone-900 focus:ybg-stone-100 focus:ytext-stone-900 focus:youtline-none disabled:ypointer-events-none disabled:yopacity-50 data-[active]:ybg-stone-100/50 data-[state=open]:ybg-stone-100/50 dark:ybg-stone-950 dark:hover:ybg-stone-800 dark:hover:ytext-stone-50 dark:focus:ybg-stone-800 dark:focus:ytext-stone-50 dark:data-[active]:ybg-stone-800/50 dark:data-[state=open]:ybg-stone-800/50"
);

const NavigationMenuTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(navigationMenuTriggerStyle(), "ygroup", className)}
      {...props}
    >
      {children}
      {""}
      <ChevronDown
        className="yrelative ytop-[1px] yml-1 yh-3 yw-3 ytransition yduration-200 group-data-[state=open]:yrotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
);
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn(
        "yleft-0 ytop-0 yw-full data-[motion^=from-]:yanimate-in data-[motion^=to-]:yanimate-out data-[motion^=from-]:yfade-in data-[motion^=to-]:yfade-out data-[motion=from-end]:yslide-in-from-right-52 data-[motion=from-start]:yslide-in-from-left-52 data-[motion=to-end]:yslide-out-to-right-52 data-[motion=to-start]:yslide-out-to-left-52 md:yabsolute md:yw-auto",
        className
      )}
      {...props}
    />
  )
);
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div className={cn("yabsolute yleft-0 ytop-full yflex yjustify-center")}>
      <NavigationMenuPrimitive.Viewport
        className={cn(
          "yorigin-top-center yrelative ymt-1.5 yh-[var(--radix-navigation-menu-viewport-height)] yw-full yoverflow-hidden yrounded-md yborder yborder-stone-200 ybg-white ytext-stone-950 yshadow-lg data-[state=open]:yanimate-in data-[state=closed]:yanimate-out data-[state=closed]:yzoom-out-95 data-[state=open]:yzoom-in-90 md:yw-[var(--radix-navigation-menu-viewport-width)] dark:yborder-stone-800 dark:ybg-stone-950 dark:ytext-stone-50",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
);
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        "ytop-full yz-[1] yflex yh-1.5 yitems-end yjustify-center yoverflow-hidden data-[state=visible]:yanimate-in data-[state=hidden]:yanimate-out data-[state=hidden]:yfade-out data-[state=visible]:yfade-in",
        className
      )}
      {...props}
    >
      <div className="yrelative ytop-[60%] yh-2 yw-2 yrotate-45 yrounded-tl-sm ybg-stone-200 yshadow-md dark:ybg-stone-800" />
    </NavigationMenuPrimitive.Indicator>
  )
);
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
