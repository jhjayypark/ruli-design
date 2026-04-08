import { type FC, type ReactNode } from "react";
import { IconDots } from "nucleo-micro-bold";

export interface ActionRevealProps {
  /** Component state */
  state?: "default" | "hover" | "clicked";
  /** Dropdown content when clicked */
  dropdownContent?: ReactNode;
  /** Callback when dots button is clicked */
  onDotsClick?: () => void;
  /** Additional className */
  className?: string;
}

const ActionReveal: FC<ActionRevealProps> = ({
  state = "default",
  dropdownContent,
  onDotsClick,
  className,
}) => {
  const isVisible = state === "hover" || state === "clicked";
  const isClicked = state === "clicked";

  if (!isVisible) {
    return (
      <div
        className={[
          "absolute inset-0 pointer-events-none",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    );
  }

  return (
    <div
      className={[
        "absolute inset-0 pointer-events-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Gradient overlay on right side */}
      <div
        className="absolute top-0 h-full pointer-events-auto"
        style={{
          right: 0,
          width: 144,
          background:
            "linear-gradient(to right, var(--color-overlay-natural, rgba(249,249,249,0)), var(--color-fill-levels-natural-sm, #f9f9f9))",
        }}
      >
        {/* Dots button — vertically centered, 8px from right */}
        <button
          type="button"
          className={[
            "absolute flex items-center justify-center rounded-md cursor-pointer",
            isClicked ? "text-text-primary" : "text-text-secondary",
          ].join(" ")}
          style={{
            top: "50%",
            right: 8,
            transform: "translateY(-50%)",
            padding: 6,
            ...(isClicked
              ? {
                  backdropFilter: "blur(6px)",
                  background:
                    "var(--color-alpha-75, rgba(27,27,27,0.08))",
                  border:
                    "0.5px solid var(--color-alpha-75, rgba(27,27,27,0.08))",
                }
              : {}),
          }}
          onClick={onDotsClick}
        >
          <IconDots size="13px" />
        </button>
      </div>

      {/* Dropdown — sibling of gradient so it can overflow the row height */}
      {isClicked && dropdownContent && (
        <div
          className="absolute pointer-events-auto"
          style={{
            top: 4,
            right: 39,
            zIndex: 10,
          }}
        >
          <div className="relative flex flex-col items-start">
            <div
              className="absolute inset-0"
              style={{
                background: "white",
                borderRadius: "var(--radius-1-5lg, 10px)",
                boxShadow:
                  "0px 12px 24px 0px var(--color-shadow-xs, rgba(36,35,31,0.05)), 0px 6px 12px -6px var(--color-shadow-xxs, rgba(36,35,31,0.03)), 0px 0px 0px 0.5px var(--color-shadow-border, rgba(36,35,31,0.1))",
              }}
            />
            <div className="relative flex flex-col w-full">
              {dropdownContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionReveal;
