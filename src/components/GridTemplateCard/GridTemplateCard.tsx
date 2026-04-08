"use client";

import { type FC, type ReactNode, useState, useRef, useEffect, useCallback } from "react";
import {
  IconCalendar,
  IconAdjustContrastFilled4,
  IconHashtag,
  IconCoins,
  IconDots,
  IconPlus,
  IconViewMinusSign,
  IconTrash,
  IconLockFilled,
} from "nucleo-micro-bold";
import Tooltip from "../Tooltip/Tooltip";

/* ─── Tag format types (from agency annotations) ─── */
export type TagFormat = "text" | "verbatim" | "yes_no" | "date" | "number" | "currency";

export interface TagItem {
  label: string;
  format?: TagFormat;
}

export type CardAvatarType = "green" | "amber" | "purple" | "blue" | "red";

export interface GridTemplateCardProps {
  /** Card title */
  title: string;
  /** Extraction field tags */
  tags: TagItem[];
  /** Number of tags visible before "+N" counter */
  visibleTagCount?: number;
  /** Avatar color type */
  avatarType?: CardAvatarType;
  /** Avatar initials */
  avatarText?: string;
  /** Show lock badge on avatar */
  showLock?: boolean;
  /** Owner name shown in tooltip on avatar hover */
  ownerName?: string;
  /** Context menu items */
  menuItems?: { label: string; icon?: ReactNode; danger?: boolean; onClick?: () => void }[];
  className?: string;
}

/* ─── Tag format → icon + icon color ─── */
function getTagConfig(format: TagFormat): {
  icon: ReactNode | null;
  iconColorClass: string;
} {
  switch (format) {
    case "text":
    case "verbatim":
      return { icon: null, iconColorClass: "" };
    case "yes_no":
      return { icon: <IconAdjustContrastFilled4 size="13px" />, iconColorClass: "text-text-danger-secondary" };
    case "date":
      return { icon: <IconCalendar size="13px" />, iconColorClass: "text-text-blue-secondary" };
    case "number":
      return { icon: <IconHashtag size="13px" />, iconColorClass: "text-text-success-secondary" };
    case "currency":
      return { icon: <IconCoins size="13px" />, iconColorClass: "text-text-success-secondary" };
    default:
      return { icon: null, iconColorClass: "" };
  }
}

/* ─── Single Tag ─── */
function Tag({
  label,
  format = "text",
  highlighted = false,
}: {
  label: string;
  format?: TagFormat;
  highlighted?: boolean;
}) {
  const { icon, iconColorClass } = getTagConfig(format);
  const [isHighlighted, setIsHighlighted] = useState(highlighted);

  /* On mount: if highlighted, paint blue first then fade out */
  useEffect(() => {
    if (!isHighlighted) return;
    let raf1: number;
    let raf2: number;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setIsHighlighted(false);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`
        inline-flex items-center justify-center gap-[3px] p-1 rounded-[5px]
        max-w-[162px] shrink-0
        border-[0.5px] border-solid
        transition-all duration-1000 ease-in
        ${
          isHighlighted
            ? "bg-fill-light-blue-static border-transparent"
            : "bg-fill-light-neutral-inverse border-border-light"
        }
      `}
    >
      {icon && (
        <span
          className={`
            shrink-0 size-[13px] flex items-center justify-center
            transition-colors duration-1000 ease-in
            ${isHighlighted ? "text-text-blue-secondary" : iconColorClass}
          `}
        >
          {icon}
        </span>
      )}
      <span className="flex items-center justify-center max-w-[138px] px-px">
        <span
          className={`
            font-sans text-sm font-medium leading-single-sm tracking-sm
            max-w-[136px] truncate whitespace-nowrap
            transition-colors duration-1000 ease-in
            ${isHighlighted ? "text-text-blue-secondary" : "text-text-secondary"}
          `}
        >
          {label}
        </span>
      </span>
    </div>
  );
}

/* ─── Avatar color config ─── */
const AVATAR_COLORS: Record<CardAvatarType, { bg: string; tint: string; text: string }> = {
  green:  { bg: "#cff4cf", tint: "rgba(36,35,31,0.075)", text: "#104617" },
  amber:  { bg: "#ffebb8", tint: "rgba(36,35,31,0.075)", text: "#603c00" },
  purple: { bg: "#eee5ff", tint: "rgba(36,35,31,0.075)", text: "#412f6b" },
  blue:   { bg: "#d1edff", tint: "rgba(36,35,31,0.075)", text: "#033c6f" },
  red:    { bg: "#ffe0e1", tint: "rgba(36,35,31,0.075)", text: "#6a232b" },
};

/* ─── Card Component ─── */
const GridTemplateCard: FC<GridTemplateCardProps> = ({
  title,
  tags,
  visibleTagCount = 5,
  avatarType = "amber",
  avatarText = "A",
  showLock = false,
  ownerName,
  menuItems,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  const visibleTags = tags.slice(0, visibleTagCount);
  const hiddenTags = tags.slice(visibleTagCount);
  const hiddenCount = hiddenTags.length;

  const avatarColor = AVATAR_COLORS[avatarType];

  /* Close menu on outside click */
  useEffect(() => {
    if (!showMenu) return;
    function handleClick(e: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showMenu]);

  /* Tag expand handler */
  const handleCounterEnter = useCallback(() => {
    setIsTagsExpanded(true);
  }, []);

  const handleCounterLeave = useCallback(() => {
    setIsTagsExpanded(false);
  }, []);

  const active = isHovered || isTagsExpanded || showMenu;

  return (
    <div
      ref={cardRef}
      className={`relative min-w-[360px] w-[360px] ${className ?? ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowMenu(false);
        setIsTagsExpanded(false);
      }}
    >
      {/* ── Main card body — always overflow-clip ── */}
      <div
        className={`
          flex flex-col items-start gap-7 p-3-5 w-full rounded-[14px]
          bg-white overflow-clip
          border-[0.5px] border-solid
          transition-shadow duration-150
          ${active ? "border-transparent shadow-[0px_12px_24px_0px_rgba(36,35,31,0.05),0px_6px_12px_-6px_rgba(36,35,31,0.03),0px_0px_0px_0.5px_rgba(36,35,31,0.1)]" : "border-border-light"}
        `}
      >
        {/* ── Title + Tags ─── */}
        <div className="flex flex-col gap-2-5 items-start w-full">
          <p className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary w-full">
            {title}
          </p>
          <div className="flex flex-wrap gap-1 items-start w-full">
            {visibleTags.map((tag, i) => (
              <Tag key={i} label={tag.label} format={tag.format} />
            ))}
            {hiddenCount > 0 && (
              <div
                ref={counterRef}
                className="
                  inline-flex items-center justify-center gap-[3px] p-1 rounded-[5px]
                  max-w-[162px] shrink-0
                  bg-fill-light-neutral-inverse border-[0.5px] border-solid border-border-light
                  cursor-pointer
                "
                onMouseEnter={handleCounterEnter}
              >
                <span className="flex items-center justify-center max-w-[138px] px-px">
                  <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-secondary">
                    +{hiddenCount}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Footer: Avatar + Menu ─── */}
        <div className="flex flex-wrap items-center justify-between w-full">
          {/* Avatar with lock badge + tooltip */}
          <div
            className="relative flex items-center gap-1"
            onMouseEnter={() => ownerName && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <div className="relative inline-flex">
              <div
                className="flex flex-col items-center justify-center rounded-full size-[21px] overflow-clip"
                style={{
                  backgroundImage:
                    `linear-gradient(90deg, ${avatarColor.tint} 0%, ${avatarColor.tint} 100%), linear-gradient(90deg, ${avatarColor.bg} 0%, ${avatarColor.bg} 100%)`,
                }}
              >
                <span
                  className="text-[11px] leading-[11px] text-center w-full"
                  style={{ fontFamily: "'SF Compact Rounded', sans-serif", fontWeight: 600, color: avatarColor.text }}
                >
                  {avatarText}
                </span>
              </div>
              {/* Lock badge */}
              {showLock && (
                <div
                  className="absolute bg-white rounded-full flex items-center justify-center"
                  style={{ width: 15, height: 15, bottom: -5, right: -5 }}
                >
                  <span className="text-text-secondary flex items-center justify-center" style={{ width: 12, height: 12 }}>
                    <IconLockFilled size="12px" />
                  </span>
                </div>
              )}
            </div>
            {/* Tooltip */}
            {showTooltip && ownerName && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 pointer-events-none" style={{ marginLeft: 2 }}>
                <Tooltip
                  label={showLock ? `Private · ${ownerName}` : ownerName}
                  direction="left"
                />
              </div>
            )}
          </div>

          {/* Menu button */}
          <button
            ref={menuBtnRef}
            className={`
              relative size-[21px] flex items-center justify-center
              cursor-pointer rounded-md transition-colors
              ${
                showMenu
                  ? "bg-[rgba(36,35,31,0.1)] backdrop-blur-[6px]"
                  : "hover:bg-[rgba(36,35,31,0.06)]"
              }
            `}
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <span className="text-text-secondary flex items-center justify-center">
              <IconDots size="13px" />
            </span>
          </button>
        </div>
      </div>

      {/* ── Tags expansion overlay (outside overflow-clip) ─── */}
      {isTagsExpanded && (
        <div
          className="
            absolute top-0 left-0 right-0
            flex flex-col gap-2-5 items-start
            p-3-5 rounded-[14px] bg-white overflow-clip z-[3]
            shadow-[0px_12px_24px_0px_rgba(36,35,31,0.05),0px_6px_12px_-6px_rgba(36,35,31,0.03),0px_0px_0px_0.5px_rgba(36,35,31,0.1)]
          "
          onMouseLeave={handleCounterLeave}
        >
          <p className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary w-full">
            {title}
          </p>
          <div className="flex flex-wrap gap-1 items-start w-full">
            {visibleTags.map((tag, i) => (
              <Tag key={i} label={tag.label} format={tag.format} />
            ))}
            {hiddenTags.map((tag, i) => (
              <Tag
                key={`hidden-${i}`}
                label={tag.label}
                format={tag.format}
                highlighted
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Dropdown menu (outside overflow-clip) ─── */}
      {showMenu && menuItems && (
        <div
          className="
            absolute w-44 z-[10]
            bg-white rounded-[10px]
            shadow-[0px_12px_24px_0px_rgba(36,35,31,0.05),0px_6px_12px_-6px_rgba(36,35,31,0.03),0px_0px_0px_0.5px_rgba(36,35,31,0.1)]
          "
          style={{ right: -180, bottom: 0 }}
        >
          <div className="flex flex-col gap-1 p-1">
            {menuItems.map((item, i) => (
              <button
                key={i}
                className="
                  flex items-start gap-1-5 p-1-5 rounded-md w-full
                  cursor-pointer hover:bg-fill-light-neutral-static
                "
                onClick={() => {
                  item.onClick?.();
                  setShowMenu(false);
                }}
              >
                {item.icon && (
                  <span
                    className={`shrink-0 size-[13px] flex items-center justify-center ${
                      item.danger ? "text-text-danger-secondary" : "text-text-pale"
                    }`}
                  >
                    {item.icon}
                  </span>
                )}
                <span
                  className={`
                    font-sans text-sm font-medium leading-single-sm tracking-sm
                    truncate
                    ${item.danger ? "text-text-danger-secondary" : "text-text-primary"}
                  `}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GridTemplateCard;
