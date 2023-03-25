import React, { PropsWithChildren } from "react";

export type ReactFC<T> = React.FC<PropsWithChildren & T>;

type CommonProps = {
  center?: boolean;
  centerH?: boolean;
  centerV?: boolean;
  className?: string;
  fullW?: boolean;
  fullH?: boolean;
  debug?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const Vertical: ReactFC<CommonProps> = ({
  children,
  center,
  fullW,
  fullH,
  centerH,
  centerV,
  className,
  debug,
  ...rest
}) => {
  return (
    <div
      className={`
    flex flex-col
    ${center ? "items-center justify-center" : ""}
    ${centerH ? "items-center" : ""}
    ${centerV ? "justify-center" : ""}
    ${fullW ? "w-full" : ""}
    ${fullH ? "h-full" : ""}
    ${className || ""}
    ${debug ? "border-2 border-red-500" : ""}
  `}
      {...rest}
    >
      {children}
    </div>
  );
};

export const Horizontal: ReactFC<CommonProps> = ({
  children,
  center,
  fullH,
  fullW,
  centerH,
  centerV,
  className,
  debug,
  ...rest,
}) => {
  return (
    <div
      className={`
        flex flex-row
        ${center ? "items-center justify-center" : ""}
        ${centerH ? "items-center" : ""}
        ${centerV ? "justify-center" : ""}
        ${fullW ? "w-full" : ""}
        ${fullH ? "h-full" : ""}
        ${className || ""}
    ${debug ? "border-2 border-teal-500" : ""}
    `}
      {...rest}
    >
      {children}
    </div>
  );
};
