import { GridItemProps } from "../../types/types";
import React from "react";

const GridItem: React.FC<GridItemProps> = ({ children, className }) => (
  <div className={`border border-[#2D2D2D] p-4 ${className}`}>
    <h2 className="text-lg font-bold">{children}</h2>
  </div>
);

export default GridItem;
