"use client";

import { useEffect, useRef } from "react";

interface LeadFormWidgetProps {
  code: string;
  width?: string;
  height?: string;
  primaryColor?: string;
  secondaryColor?: string;
  borderRadius?: string;
  shadow?: string;
}

export function LeadFormWidget({
  code,
  width = "100%",
  height = "300px",
  primaryColor,
  secondaryColor,
  borderRadius,
  shadow,
}: LeadFormWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Prevent duplicate injections on hot reload in React Strict Mode
    if (containerRef.current.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = `https://api.thelead101.com/api/v1/public/form-widget.js?code=${code}`;
    script.async = true;
    script.setAttribute("data-widget-code", code);
    
    if (width) script.setAttribute("data-width", width);
    if (height) script.setAttribute("data-height", height);
    if (primaryColor) script.setAttribute("data-primary-color", primaryColor);
    if (secondaryColor) script.setAttribute("data-secondary-color", secondaryColor);
    if (borderRadius) script.setAttribute("data-border-radius", borderRadius);
    if (shadow) script.setAttribute("data-shadow", shadow);

    containerRef.current.appendChild(script);

    return () => {
      // Cleanup the widget if component unmounts
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [code, width, height, primaryColor, secondaryColor, borderRadius, shadow]);

  return (
    <div 
      ref={containerRef} 
      className="w-full flex justify-center items-center" 
      style={{ minHeight: height }}
    />
  );
}
