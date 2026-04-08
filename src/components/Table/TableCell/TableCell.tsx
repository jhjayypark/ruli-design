import { type FC, type ReactNode, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Avatar from "../../Avatar/Avatar";
import Checkbox from "../../Checkbox/Checkbox";
import Tooltip from "../../Tooltip/Tooltip";

type AvatarType = "green" | "amber" | "purple" | "blue" | "red" | "photo";

export interface TableCellProps {
  /** Cell type */
  type?: "default" | "number" | "avatar";
  /** Primary label text */
  label?: string;
  /** Right-aligned help text (default/avatar) or left-aligned (number) */
  helpText?: string;
  /** Number value (number type only) */
  number?: string;
  /** Show badge count */
  badge?: boolean;
  /** Badge number */
  badgeCount?: number;
  /** Show checkbox */
  checkbox?: boolean;
  /** Whether checkbox is checked */
  checkboxChecked?: boolean;
  /** Show checkbox in preview state (hover on header checkbox) */
  checkboxPreview?: boolean;
  /** Avatar color type (avatar type only) */
  avatarType?: AvatarType;
  /** Avatar initials (avatar type only) */
  avatarText?: string;
  /** Avatar photo src (avatar type only) */
  avatarSrc?: string;
  /** Show status badge on avatar */
  avatarStatus?: boolean;
  /** Custom status icon for avatar badge */
  avatarStatusIcon?: ReactNode;
  /** Tooltip text shown on avatar hover */
  avatarTooltip?: string;
  /** Custom leading element */
  leadingElement?: ReactNode;
  /** Hide bottom border (e.g. last row) */
  hideBorderBottom?: boolean;
  /** Additional className */
  className?: string;
}

const TableCell: FC<TableCellProps> = ({
  type = "default",
  label = "Label",
  helpText,
  number = "1,000",
  badge = false,
  badgeCount = 5,
  checkbox = false,
  checkboxChecked = false,
  checkboxPreview = false,
  avatarType = "amber",
  avatarText = "A",
  avatarSrc,
  avatarStatus = false,
  avatarStatusIcon,
  avatarTooltip,
  hideBorderBottom = false,
  leadingElement,
  className,
}) => {
  const isAvatar = type === "avatar";
  const [avatarHovered, setAvatarHovered] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={[
        "flex items-center gap-2 w-full overflow-hidden",
        isAvatar ? "pl-2-5 pr-3-5 py-2-5" : "p-3-5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        height: 41,
        ...(hideBorderBottom
          ? {}
          : { borderBottom: "0.5px solid var(--color-border-light)" }),
      }}
    >
      {/* Checkbox */}
      {checkbox && (
        <div className="shrink-0 flex items-center justify-center" style={{ margin: -6 }}>
          <Checkbox checked={checkboxPreview || checkboxChecked} preview={checkboxPreview && !checkboxChecked} />
        </div>
      )}

      {/* Avatar (avatar type) */}
      {isAvatar && (
        <div
          ref={avatarRef}
          className="shrink-0"
          onMouseEnter={() => avatarTooltip && setAvatarHovered(true)}
          onMouseLeave={() => setAvatarHovered(false)}
        >
          <Avatar
            size="sm"
            type={avatarType}
            text={avatarText}
            src={avatarSrc}
            status={avatarStatus}
            statusIcon={avatarStatusIcon}
          />
          {avatarTooltip && avatarHovered && avatarRef.current &&
            createPortal(
              <AvatarTooltipPortal anchorEl={avatarRef.current} label={avatarTooltip} />,
              document.body,
            )}
        </div>
      )}

      {/* Custom leading element */}
      {leadingElement && !isAvatar && (
        <div className="shrink-0">{leadingElement}</div>
      )}

      {/* Number type: help text on left */}
      {type === "number" && helpText && (
        <p className="shrink-0 font-sans text-sm font-medium leading-single-sm tracking-sm text-text-pale whitespace-nowrap">
          {helpText}
        </p>
      )}

      {/* Label (default & avatar) / Number value (number) */}
      {type === "number" ? (
        <p className="flex-1 min-w-0 font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary text-right">
          {number}
        </p>
      ) : (
        <p className="flex-1 min-w-0 font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary overflow-hidden whitespace-nowrap text-ellipsis">
          {label}
        </p>
      )}

      {/* Help text (default & avatar: right side) */}
      {type !== "number" && helpText && (
        <p className="shrink-0 font-sans text-sm font-medium leading-single-sm tracking-sm text-text-pale whitespace-nowrap text-right">
          {helpText}
        </p>
      )}

      {/* Badge */}
      {badge && (
        <div className="shrink-0 flex items-center gap-0 px-px">
          <span
            className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-pale"
            style={{ fontSize: 13 }}
          >
            [
          </span>
          <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary text-center whitespace-nowrap">
            {badgeCount}
          </span>
          <span
            className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-pale"
            style={{ fontSize: 13 }}
          >
            ]
          </span>
        </div>
      )}
    </div>
  );
};

export default TableCell;

/* ─── Portal-based avatar tooltip (escapes overflow clipping) ─── */

function AvatarTooltipPortal({ anchorEl, label }: { anchorEl: HTMLElement; label: string }) {
  const rect = anchorEl.getBoundingClientRect();
  return (
    <div
      className="pointer-events-none"
      style={{
        position: "fixed",
        zIndex: 9999,
        left: rect.left + rect.width / 2,
        top: rect.top,
        transform: "translate(-50%, -100%)",
        paddingBottom: 4,
      }}
    >
      <Tooltip label={label} direction="down" />
    </div>
  );
}
