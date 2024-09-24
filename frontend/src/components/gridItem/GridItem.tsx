import { GridItemProps } from "../../types/types";
import React from "react";

const GridItem: React.FC<GridItemProps> = ({
  children,
  className,
  classNameText,
}) => (
  <div className={`border border-[#2D2D2D] p-4 ${className}`}>
    <h1
      className={`font-glysa text-white font-medium sm:hidden ${classNameText}`}
    >
      {children}
    </h1>
  </div>
);

export default GridItem;
