"use client";

import { type FC, useState } from "react";
import { FileIcon, type FileType } from "../FileIcon";
import { Tooltip } from "../Tooltip";

export type FileCardSize = "lg" | "sm" | "micro";
export type FileCardState = "uploaded" | "uploading" | "error";

export interface FileCardProps {
  /** File name */
  label: string;
  /** File type — determines icon badge color and label */
  fileType?: FileType;
  /** Card size */
  size?: FileCardSize;
  /** Upload state */
  state?: FileCardState;
  /** Upload progress (0–100) for uploading state */
  progress?: number;
  /** File size string for uploaded state */
  fileSize?: string;
  /** Called when remove/X is clicked */
  onRemove?: () => void;
  /** Called when retry is clicked (error state only) */
  onRetry?: () => void;
  className?: string;
}

/* ─── Icon components ─── */

function LoaderIcon() {
  const opacities = [1, 0.875, 0.75, 0.625, 0.5, 0.375, 0.25, 0.125];
  return (
    <svg className="animate-spin" width="13" height="13" viewBox="0 0 16 16" fill="none">
      {opacities.map((opacity, i) => (
        <line
          key={i}
          x1="8" y1="2.4" x2="8" y2="5"
          stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
          opacity={opacity} transform={`rotate(${i * 45} 8 8)`}
        />
      ))}
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5l6.5 11.25H1.5L8 1.5z"
        stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"
        fill="currentColor" fillOpacity="0.15"
      />
      <path d="M8 6.5v2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.6" fill="currentColor" />
    </svg>
  );
}

function XMarkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path
        d="M2.5 8a5.5 5.5 0 019.72-3.5M13.5 8a5.5 5.5 0 01-9.72 3.5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
      <path d="M12.5 2v3h-3M3.5 14v-3h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Action Button (X / Retry) ─── */
function ActionButton({
  icon,
  tooltip,
  onClick,
}: {
  icon: React.ReactNode;
  tooltip?: string;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        borderRadius: 6,
        cursor: "pointer",
        outline: "none",
        border: "none",
        boxShadow: "none",
        background: hovered ? "rgba(36,35,31,0.08)" : "transparent",
        backdropFilter: hovered ? "blur(6px)" : "none",
        WebkitBackdropFilter: hovered ? "blur(6px)" : "none",
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="size-[13px] flex items-center justify-center text-text-secondary">
        {icon}
      </span>
      {/* Tooltip */}
      {hovered && tooltip && (
        <div className="absolute bottom-[29px] left-1/2 -translate-x-1/2 z-10">
          <Tooltip label={tooltip} direction="down" />
        </div>
      )}
    </button>
  );
}

/* ─── Main FileCard ─── */
const FileCard: FC<FileCardProps> = ({
  label,
  fileType = "PDF",
  size = "lg",
  state = "uploaded",
  progress = 0,
  fileSize = "0.00MB",
  onRemove,
  onRetry,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [removeHovered, setRemoveHovered] = useState(false);

  /* ── Micro size ─── */
  if (size === "micro") {

    return (
      <div
        className={`
          relative flex items-center justify-center
          size-[33px] rounded-md
          bg-fill-levels-engraved-lg border-[0.5px] border-solid border-fill-levels-natural-lg
          ${className ?? ""}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setRemoveHovered(false); }}
      >
        <FileIcon size="sm" type={fileType ?? "PDF"} />

        {/* Filename tooltip — shown on card hover, hidden when remove is hovered */}
        {isHovered && !removeHovered && (
          <div className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 z-10">
            <Tooltip label={label} direction="down" />
          </div>
        )}

        {/* Remove button — bottom-right corner on hover */}
        {isHovered && onRemove && (
          <button
            style={{
              position: "absolute",
              bottom: -4,
              right: -4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 14,
              height: 14,
              borderRadius: "50%",
              cursor: "pointer",
              outline: "none",
              border: "none",
              boxShadow: "none",
              background: removeHovered ? "#dc455a" : "rgba(36,35,31,0.65)",
              zIndex: 10,
            }}
            onClick={onRemove}
            onMouseEnter={() => setRemoveHovered(true)}
            onMouseLeave={() => setRemoveHovered(false)}
          >
            <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        )}

        {/* Remove? tooltip — shown when remove button is hovered */}
        {removeHovered && (
          <div className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 z-10">
            <Tooltip label="Remove?" direction="down" />
          </div>
        )}
      </div>
    );
  }

  /* ── Small size ─── */
  if (size === "sm") {
    return (
      <div
        className={`
          relative flex items-center gap-2-5
          w-[330px] rounded-[10px] pl-0-5 pr-1 py-1
          border-[0.5px] border-solid
          ${isHovered ? "bg-fill-levels-engraved-sm border-border-medium" : "border-border-light"}
          ${className ?? ""}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <FileIcon size="sm" type={fileType} />

        {/* Content */}
        {state === "error" && (
          <div className="flex-1 min-w-0 flex items-center gap-1 font-sans text-sm font-medium leading-single-sm tracking-sm">
            <span className="text-text-danger-secondary truncate shrink-0">Error uploading:</span>
            <span className="text-text-primary truncate">{label}</span>
          </div>
        )}
        {state === "uploading" && (
          <div className="flex-1 min-w-0 flex items-center gap-1-5">
            <div className="flex items-center gap-[3px] shrink-0">
              <span className="size-[13px] flex items-center justify-center text-text-pale">
                <LoaderIcon />
              </span>
              <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-pale truncate">
                {progress}%
              </span>
            </div>
            <div className="size-[2px] rounded-full bg-border-light shrink-0" />
            <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary truncate">
              {label}
            </span>
          </div>
        )}
        {state === "uploaded" && (
          <span className="flex-1 min-w-0 font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary truncate">
            {label}
          </span>
        )}

        {/* Actions — absolute so they don't shift layout */}
        {isHovered && (
          <div className="absolute top-1/2 -translate-y-1/2 right-1 flex items-center">
            {state === "error" && onRetry && (
              <ActionButton icon={<RefreshIcon />} tooltip="Retry?" onClick={onRetry} />
            )}
            {onRemove && (
              <ActionButton icon={<XMarkIcon />} tooltip="Remove?" onClick={onRemove} />
            )}
          </div>
        )}
      </div>
    );
  }

  /* ── Large size (default) ─── */
  return (
    <div
      className={`
        flex flex-col items-start
        w-[330px] h-[53px] rounded-[10px]
        border-[0.5px] border-solid
        ${isHovered ? "bg-fill-levels-engraved-sm border-border-medium" : "border-border-light"}
        ${className ?? ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-2-5 w-full pl-[7px] pr-2-5 py-2-5 relative">
        <FileIcon size="lg" type={fileType} />

        <div className="flex-1 min-w-0 flex flex-col gap-[7px]">
          {/* Title */}
          <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary w-full">
            {label}
          </span>

          {/* Status line */}
          {state === "uploaded" && (
            <span className="font-sans text-sm font-normal leading-single-sm tracking-sm text-text-pale truncate">
              {fileSize}
            </span>
          )}
          {state === "uploading" && (
            <div className="flex items-center gap-[7px]">
              <div className="flex items-center gap-[3px]">
                <span className="size-[13px] flex items-center justify-center text-text-secondary">
                  <LoaderIcon />
                </span>
                <span className="font-sans text-sm font-normal leading-single-sm tracking-sm text-text-secondary">
                  Uploading
                </span>
              </div>
              <div className="size-[2px] rounded-full bg-text-pale opacity-50" />
              <span className="font-sans text-sm font-normal leading-single-sm tracking-sm text-text-secondary">
                {progress}%
              </span>
            </div>
          )}
          {state === "error" && (
            <div className="flex items-center gap-1">
              <span className="size-[13px] flex items-center justify-center text-text-danger-secondary">
                <WarningIcon />
              </span>
              <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-danger-secondary">
                Error uploading
              </span>
            </div>
          )}
        </div>

        {/* Close / Retry buttons — always visible on large cards */}
        <div className="absolute top-1 right-1 flex items-center">
          {state === "error" && onRetry && (
            <ActionButton icon={<RefreshIcon />} tooltip="Retry?" onClick={onRetry} />
          )}
          {onRemove && (
            <ActionButton icon={<XMarkIcon />} tooltip="Remove?" onClick={onRemove} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FileCard;
