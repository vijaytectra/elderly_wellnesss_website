import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Render as a different HTML element (e.g. "section"). Defaults to "div". */
  as?: ElementType;
}

/**
 * Centered, max-width page container. Mirrors the legacy `.container` max of
 * 1170px (from `css/style.css` line 82) at wide viewports, with responsive
 * horizontal padding at smaller breakpoints.
 */
export function Container({
  children,
  className = "",
  as,
  ...rest
}: ContainerProps & Omit<ComponentPropsWithoutRef<"div">, keyof ContainerProps>) {
  const Component: ElementType = as ?? "div";
  const classes = [
    "mx-auto w-full max-w-[1170px] px-4 sm:px-6 lg:px-8",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
