"use client";

import Image from "next/image";
import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonELProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "hover";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const ButtonEL = forwardRef<HTMLButtonElement, ButtonELProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const isHover = variant === "hover";

    const sizeClasses = {
      sm: "h-10 px-6 text-sm",
      md: "h-[37px] px-[40px] text-[11px]",
      lg: "h-14 px-10 text-lg"
    };

    return (
      <div
        className={cn(
          "relative p-[2px] rounded-full transition-all duration-300",
          isHover ? "" : "group"
        )}
        style={{
          background: isHover
            ? "linear-gradient(180deg, #E2E2D6 0%, #160856 100%)"
            : "#2c2c2c",
        }}
      >
        {/* Gradient border on hover */}
        <div
          className={cn(
            "absolute inset-0 rounded-full transition-opacity duration-300",
            isHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
          style={{ background: "linear-gradient(180deg, #E2E2D6 0%, #160856 100%)" }}
        />

        <button
          ref={ref}
          className={cn(
            "relative overflow-hidden transition-all duration-300 rounded-full",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {/* Background */}
          <div
            className={cn(
              "absolute inset-0 pointer-events-none transition-all duration-300 rounded-full",
              isHover
                ? "bg-linear-to-b from-[#123161] to-[#06162f]"
                : "bg-[#061326] group-hover:bg-linear-to-b group-hover:from-[#123161] group-hover:to-[#06162f]"
            )}
          />

          {/* Texture overlay */}
          <div
            className={cn(
              "absolute inset-0 overflow-hidden pointer-events-none mix-blend-luminosity transition-opacity duration-300 rounded-full",
              isHover ? "opacity-40" : "opacity-30 group-hover:opacity-40"
            )}
          >
            <Image
              src="/images/button-texture.png"
              alt=""
              fill
              className="object-cover scale-150 -translate-y-1/4"
            />
          </div>

          {/* Text */}
          <span
            className={cn(
              "relative z-10 font-chamberi-headline transition-colors duration-300",
              isHover
                ? "text-[#e6e6e6]"
                : "text-[#868686] group-hover:text-[#e6e6e6]"
            )}
          >
            {children}
          </span>
        </button>
      </div>
    );
  }
);

ButtonEL.displayName = "ButtonEL";

export { ButtonEL };
