"use client";

import { type FC, type ReactNode } from "react";
import {
  IconCardSparkle,
  IconRefreshClockwise,
  IconCircleCopy2,
  IconSquareLayoutGrid3,
  IconBookmark,
  IconFile,
  IconNotebookBookmark,
  IconLink,
  IconSlider,
  IconHeadset,
  IconBell,
  IconSidebarLeft4Hide,
  IconSidebarLeft4Show,
  IconChevronExpandY,
} from "nucleo-micro-bold";
import SidebarTab from "../SidebarTab";
import { Avatar } from "../Avatar";
import { Tooltip } from "../Tooltip";

/* ── Ruli logo (black) ── */
function RuliLogo() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 120 129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M55.4115 0L27.0329 16.2197L90.7531 52.6263V103.509L119.495 88.8339V36.6289L55.4115 0Z"
        fill="currentColor"
      />
      <path
        d="M3.86184 53.375L46.3888 77.6694V126.153L75.1303 111.478V61.6721L32.2288 37.1553L3.86184 53.375Z"
        fill="currentColor"
      />
      <path
        d="M0 110.952L30.766 128.529V86.7159L0 69.127V110.952Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── Notification bell with badge + optional tooltip ── */
function BellButton({
  hasNotification,
  showTooltip,
}: {
  hasNotification: boolean;
  showTooltip?: boolean;
}) {
  return (
    <div
      className="sidebar-tab"
      data-collapsed={showTooltip || undefined}
      style={{ position: "relative", flexShrink: 0, width: 25, height: 25 }}
    >
      <button
        type="button"
        className="flex items-center justify-center p-1-5 rounded-md hover:bg-alpha-75 cursor-pointer text-text-pale hover:text-text-secondary"
      >
        <IconBell size="13px" />
      </button>
      {hasNotification && (
        <span
          style={{
            position: "absolute",
            top: 6,
            left: 14,
            width: 5,
            height: 5,
            backgroundColor: "var(--color-red-500, #e55767)",
            borderRadius: 100,
            border: "1.5px solid var(--color-gray-25, #fcfcfb)",
          }}
        />
      )}
      {showTooltip && (
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
          <Tooltip label="Notifications" direction="left" />
        </span>
      )}
    </div>
  );
}

/* ── Icon button with optional tooltip ── */
function IconButton({
  icon,
  label,
  onClick,
  showTooltip,
}: {
  icon: ReactNode;
  label?: string;
  onClick?: () => void;
  showTooltip?: boolean;
}) {
  return (
    <div
      className={showTooltip ? "sidebar-tab" : undefined}
      data-collapsed={showTooltip || undefined}
      style={{ position: "relative" }}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex items-center justify-center p-1-5 rounded-md hover:bg-alpha-75 cursor-pointer text-text-pale hover:text-text-secondary"
      >
        {icon}
      </button>
      {showTooltip && label && (
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
    </div>
  );
}

/* ── Types ── */
export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

export interface NavGroup {
  header?: string;
  items: NavItem[];
}

/* ── Default navigation ── */
const DEFAULT_NAV: NavGroup[] = [
  {
    items: [
      { id: "assistant", label: "Assistant", icon: <IconCardSparkle size="13px" /> },
      { id: "monitor", label: "Monitor", icon: <IconRefreshClockwise size="13px" /> },
      { id: "contract-lens", label: "Contract Lens", icon: <IconCircleCopy2 size="13px" /> },
    ],
  },
  {
    header: "DataGrid",
    items: [
      { id: "grids", label: "Grids", icon: <IconSquareLayoutGrid3 size="13px" /> },
      { id: "templates", label: "Templates", icon: <IconBookmark size="13px" /> },
    ],
  },
  {
    header: "Knowledge",
    items: [
      { id: "documents", label: "Documents", icon: <IconFile size="13px" /> },
      { id: "playbooks", label: "Playbooks", icon: <IconNotebookBookmark size="13px" /> },
    ],
  },
  {
    header: "Other",
    items: [
      { id: "integrations", label: "Integrations", icon: <IconLink size="13px" /> },
      { id: "settings", label: "Settings", icon: <IconSlider size="13px" /> },
      { id: "support", label: "Support", icon: <IconHeadset size="13px" /> },
    ],
  },
];

/* ── Sidebar Props ── */
interface SidebarProps {
  collapsed?: boolean;
  activeTab?: string;
  nav?: NavGroup[];
  userName?: string;
  userInitial?: string;
  hasNotification?: boolean;
  onToggle?: () => void;
  onNavClick?: (id: string) => void;
  onUserClick?: () => void;
  className?: string;
}

const Sidebar: FC<SidebarProps> = ({
  collapsed = false,
  activeTab = "assistant",
  nav = DEFAULT_NAV,
  userName = "Jay",
  userInitial = "J",
  hasNotification = true,
  onToggle,
  onNavClick,
  onUserClick,
  className,
}) => {
  const sidebarWidth = collapsed ? 45 : 208;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: sidebarWidth,
        minWidth: sidebarWidth,
        height: "100%",
        backgroundColor: "#f7f7f6",
        flexShrink: 0,
        overflow: collapsed ? "visible" : "hidden",
      }}
      className={className}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          overflow: collapsed ? "visible" : "clip",
          ...(collapsed
            ? { padding: 10 }
            : { paddingLeft: 16, paddingRight: 10, paddingTop: 10, paddingBottom: 10, justifyContent: "space-between" }),
        }}
      >
        {!collapsed && (
          <>
            <span
              style={{
                flexShrink: 0,
                width: 13,
                height: 13,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="text-text-primary"
            >
              <RuliLogo />
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <BellButton hasNotification={hasNotification} />
              <IconButton
                icon={<IconSidebarLeft4Hide size="13px" />}
                onClick={onToggle}
              />
            </div>
          </>
        )}
        {collapsed && (
          <IconButton
            icon={<IconSidebarLeft4Show size="13px" />}
            label="Expand"
            onClick={onToggle}
            showTooltip
          />
        )}
      </div>

      {/* ── Navigation ── */}
      <div
        style={{
          flex: "1 0 0",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          overflow: collapsed ? "visible" : "auto",
        }}
      >
        {nav.map((group, gi) => (
          <div
            key={group.header ?? `group-${gi}`}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              padding: 10,
              overflow: collapsed ? "visible" : "clip",
            }}
          >
            {gi === 0 && collapsed && (
              <BellButton hasNotification={hasNotification} showTooltip />
            )}

            {group.header && !collapsed && (
              <div style={{ display: "flex", alignItems: "flex-start", padding: 6, borderRadius: 6 }}>
                <span className="flex-[1_0_0] flex flex-col justify-center min-h-px min-w-px font-sans text-sm font-medium leading-single-sm tracking-sm text-text-pale">
                  {group.header}
                </span>
              </div>
            )}

            {group.items.map((item) => (
              <SidebarTab
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.id}
                collapsed={collapsed}
                onClick={() => onNavClick?.(item.id)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* ── Footer / User ── */}
      <button
        type="button"
        onClick={onUserClick}
        style={{
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          overflow: "hidden",
          cursor: "pointer",
          ...(collapsed
            ? { padding: 12, justifyContent: "center" }
            : { gap: 8, padding: 16 }),
        }}
        className="hover:bg-alpha-75"
      >
        <Avatar type="amber" size="sm" text={userInitial} />

        {!collapsed && (
          <>
            <span className="flex-[1_0_0] flex flex-col justify-center min-h-px min-w-px font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary text-left">
              {userName}
            </span>
            <span
              style={{
                flexShrink: 0,
                width: 13,
                height: 13,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
              className="text-text-pale"
            >
              <IconChevronExpandY size="13px" />
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default Sidebar;
