import { type FC, type ReactNode } from "react";

type AvatarType = "green" | "amber" | "purple" | "blue" | "red" | "photo";
type AvatarSize = "xs" | "sm" | "md" | "lg";

interface AvatarProps {
  /** Color variant */
  type?: AvatarType;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Show status indicator */
  status?: boolean;
  /** Initials text (for non-photo types) */
  text?: string;
  /** Image source (for photo type) */
  src?: string;
  /** Custom status icon element */
  statusIcon?: ReactNode;
  className?: string;
}

const SIZES = {
  xs: {
    avatar: 17,
    font: 9,
    statusContainer: 15,
    statusIcon: 12,
    statusBottom: -7,
    statusRight: -7,
  },
  sm: {
    avatar: 21,
    font: 11,
    statusContainer: 15,
    statusIcon: 12,
    statusBottom: -5,
    statusRight: -5,
  },
  md: {
    avatar: 25,
    font: 12,
    statusContainer: 17,
    statusIcon: 13,
    statusBottom: -6,
    statusRight: -6,
  },
  lg: {
    avatar: 29,
    font: 13,
    statusContainer: 19,
    statusIcon: 14,
    statusBottom: -7,
    statusRight: -7,
  },
} as const;

const TYPE_BG: Record<Exclude<AvatarType, "photo">, string> = {
  green: "bg-green-50",
  amber: "bg-amber-50",
  purple: "bg-purple-50",
  blue: "bg-blue-25",
  red: "bg-red-50",
};

const TYPE_TEXT: Record<Exclude<AvatarType, "photo">, string> = {
  green: "text-text-success-primary",
  amber: "text-text-amber-primary",
  purple: "text-text-brand-primary",
  blue: "text-text-blue-primary",
  red: "text-text-danger-primary",
};

function DefaultStatusIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8"
        cy="8"
        r="5.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="3 2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const Avatar: FC<AvatarProps> = ({
  type = "green",
  size = "sm",
  status = false,
  text = "AA",
  src,
  statusIcon,
  className,
}) => {
  const s = SIZES[size];

  return (
    <div className={`relative inline-flex items-center ${className ?? ""}`}>
      {/* Avatar circle */}
      <div
        className={`relative flex items-center justify-center rounded-full overflow-hidden shrink-0 ${type !== "photo" ? TYPE_BG[type] : ""}`}
        style={{ width: s.avatar, height: s.avatar }}
      >
        {/* Subtle darkening overlay matching Figma */}
        {type !== "photo" && <div className="absolute inset-0 bg-alpha-75" />}

        {type === "photo" ? (
          <img
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover rounded-full"
          />
        ) : (
          <span
            className={`relative ${TYPE_TEXT[type]} text-center`}
            style={{
              fontFamily: '"SF Compact Rounded", sans-serif',
              fontWeight: 600,
              fontSize: s.font,
              lineHeight: `${s.font}px`,
            }}
          >
            {text}
          </span>
        )}
      </div>

      {/* Status indicator */}
      {status && (
        <div
          className="absolute bg-white rounded-full flex items-center justify-center"
          style={{
            width: s.statusContainer,
            height: s.statusContainer,
            bottom: s.statusBottom,
            right: s.statusRight,
          }}
        >
          {statusIcon ?? (
            <div
              className="text-gray-300"
              style={{ width: s.statusIcon, height: s.statusIcon }}
            >
              <DefaultStatusIcon size={s.statusIcon} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Avatar;
