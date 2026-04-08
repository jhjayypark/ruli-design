import { type FC, type ReactNode } from "react";
import { Tooltip } from "../Tooltip";

interface SidebarTabProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
  className?: string;
}

const SidebarTab: FC<SidebarTabProps> = ({
  icon,
  label,
  active = false,
  collapsed = false,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      data-tab={label.toLowerCase().replace(/\s+/g, "-")}
      data-collapsed={collapsed || undefined}
      className={[
        "sidebar-tab relative flex items-start p-1-5 rounded-md w-full cursor-pointer",
        collapsed ? "gap-0" : "gap-1-5",
        active ? "bg-alpha-75" : "bg-transparent hover:bg-alpha-75",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        className={[
          "sidebar-tab-icon shrink-0 size-[13px] flex items-center justify-center overflow-hidden text-text-pale",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {icon}
      </span>

      {!collapsed && (
        <span className="flex-[1_0_0] flex flex-col justify-center min-h-px min-w-px font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary text-left">
          {label}
        </span>
      )}

      {collapsed && (
        <span
          className="sidebar-tab-tooltip pointer-events-none"
          style={{
            position: "absolute",
            left: 39,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 50,
            display: "none",
          }}
        >
          <Tooltip label={label} direction="left" />
        </span>
      )}
    </button>
  );
};

export default SidebarTab;
