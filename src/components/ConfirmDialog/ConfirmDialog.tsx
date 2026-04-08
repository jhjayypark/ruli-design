"use client";

import { type FC, type ReactNode, useEffect, useCallback } from "react";
import { IconXmark } from "nucleo-micro-bold";

export interface ConfirmDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Icon displayed in the colored circle */
  icon: ReactNode;
  /** Background color class for the icon circle */
  iconBg?: string;
  /** Dialog title */
  title: string;
  /** Dialog description / body text */
  description: string;
  /** Cancel button label */
  cancelLabel?: string;
  /** Confirm button label */
  confirmLabel?: string;
  /** Use danger styling for confirm button */
  danger?: boolean;
  /** Called when cancel or close is clicked */
  onCancel: () => void;
  /** Called when confirm button is clicked */
  onConfirm: () => void;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open,
  icon,
  iconBg = "bg-fill-light-danger-static",
  title,
  description,
  cancelLabel = "Cancel",
  confirmLabel = "Yes, delete",
  danger = true,
  onCancel,
  onConfirm,
}) => {
  /* Close on Escape */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    },
    [onCancel],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-overlay-cover"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div
        className="
          relative flex flex-col items-start gap-7 p-3-5
          bg-white rounded-[14px] overflow-clip
          shadow-[0px_12px_24px_0px_rgba(36,35,31,0.05),0px_6px_12px_-6px_rgba(36,35,31,0.03),0px_0px_0px_0.5px_rgba(36,35,31,0.1)]
        "
        style={{ width: 384 }}
      >
        {/* Icon circle */}
        <div
          className={`flex items-center justify-center rounded-full ${iconBg}`}
          style={{ width: 25, height: 25 }}
        >
          <span className="flex items-center justify-center text-text-danger-secondary" style={{ width: 13, height: 13 }}>
            {icon}
          </span>
        </div>

        {/* Close button */}
        <button
          type="button"
          className="absolute flex items-center justify-center cursor-pointer rounded-md hover:bg-[rgba(36,35,31,0.06)]"
          style={{ top: 8, right: 8, width: 25, height: 25 }}
          onClick={onCancel}
        >
          <span className="flex items-center justify-center text-text-secondary" style={{ width: 13, height: 13 }}>
            <IconXmark size="13px" />
          </span>
        </button>

        {/* Text content */}
        <div className="flex flex-col gap-3 items-start w-full">
          <p className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary w-full">
            {title}
          </p>
          <div className="flex items-center justify-center w-full py-0-5">
            <p className="flex-1 font-sans text-sm font-normal tracking-sm text-text-secondary" style={{ lineHeight: "21.5px" }}>
              {description}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between w-full">
          <button
            type="button"
            className="
              flex items-center justify-center gap-1-5 p-1-5
              bg-fill-levels-floating-md rounded-md cursor-pointer
              font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary
              hover:bg-fill-levels-natural-sm
            "
            style={{ boxShadow: "inset 0 0 0 0.5px var(--color-border-medium)" }}
            onClick={onCancel}
          >
            <span className="px-0">{cancelLabel}</span>
          </button>
          <button
            type="button"
            className={`
              flex items-center justify-center gap-1-5 p-1-5
              rounded-md cursor-pointer
              font-sans text-sm font-medium leading-single-sm tracking-sm text-text-static
              ${danger ? "bg-fill-bold-danger-static hover:bg-fill-bold-danger-hover" : "bg-fill-bold-neutral-static hover:bg-fill-bold-neutral-hover"}
            `}
            style={{
              boxShadow: danger
                ? "inset 0 0 0 0.5px var(--color-fill-bold-danger-static)"
                : "inset 0 0 0 0.5px var(--color-fill-bold-neutral-static)",
            }}
            onClick={onConfirm}
          >
            <span className="px-0">{confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
