import { type FC, type ReactNode } from "react";

export interface TableRowBgProps {
  /** Whether the hover background is active */
  active?: boolean;
  /** Row content */
  children?: ReactNode;
  /** Additional className */
  className?: string;
}

const TableRowBg: FC<TableRowBgProps> = ({
  active = false,
  children,
  className,
}) => {
  return (
    <div
      className={[
        "flex items-center w-full h-[41px] shrink-0",
        active ? "bg-fill-levels-natural-sm" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
};

export default TableRowBg;
