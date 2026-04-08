import { type FC, type ReactNode } from "react";
import { IconCircleDashed } from "nucleo-micro-bold";

export interface ToastProps {
  /** Primary label text */
  label: string;
  /** Secondary support text (shown after label, truncated) */
  supportText?: string;
  /** Left icon (rendered at 40% opacity). Pass `false` to hide. */
  icon?: ReactNode | false;
  /** Action buttons — use ToastButton components */
  actions?: ReactNode;
  className?: string;
}

const Toast: FC<ToastProps> = ({
  label,
  supportText,
  icon = <IconCircleDashed size="13px" />,
  actions,
  className,
}) => {
  return (
    <div
      className={`
        flex items-center gap-2-5
        w-[384px] pl-2-5 pr-1 py-1
        bg-fill-bold-neutral-static-light
        border-[0.5px] border-solid border-fill-bold-neutral-static-light
        rounded-1-5lg backdrop-blur-[24px]
        ${className ?? ""}
      `}
    >
      {/* Icon */}
      {icon !== false && icon && (
        <span className="shrink-0 size-[13px] flex items-center justify-center overflow-hidden text-text-static opacity-40">
          {icon}
        </span>
      )}

      {/* Text */}
      <div className="flex-1 min-w-0 flex items-center gap-1 font-sans text-sm font-medium leading-single-sm tracking-sm text-text-static">
        <span className="shrink-0 whitespace-nowrap">{label}</span>
        {supportText && (
          <span className="flex-1 min-w-0 opacity-60 truncate">
            {supportText}
          </span>
        )}
      </div>

      {/* Buttons */}
      {actions && (
        <div className="shrink-0 flex items-center gap-1">{actions}</div>
      )}
    </div>
  );
};

export default Toast;
