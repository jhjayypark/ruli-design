"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import type { NavGroup } from "@/components/Sidebar/Sidebar";
import {
  IconCardSparkle,
  IconRefreshClockwise,
  IconCircleCopy2,
  IconSquareLayoutGrid3,
  IconBookmark,
  IconFile,
  IconNotebookBookmark,
  IconDatabase,
  IconLink,
  IconSlider,
  IconHeadset,
} from "nucleo-micro-bold";

const NAV: NavGroup[] = [
  {
    items: [
      { id: "chat", label: "Chat", icon: <IconCardSparkle size="13px" /> },
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
      { id: "repository", label: "Repository", icon: <IconDatabase size="13px" /> },
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

const NAV_ID_TO_PATH: Record<string, string> = {
  grids: "/grids",
};

const PATH_TO_NAV_ID: Record<string, string> = {
  "/grids": "grids",
};

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const activeTab = PATH_TO_NAV_ID[pathname] ?? (pathname.startsWith("/grids") ? "grids" : "grids");

  const handleNavClick = (id: string) => {
    const path = NAV_ID_TO_PATH[id];
    if (path) router.push(path);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <Sidebar
        collapsed={collapsed}
        activeTab={activeTab}
        nav={NAV}
        userName="Jay Park"
        userInitial="JP"
        hasNotification={true}
        onToggle={() => setCollapsed(!collapsed)}
        onNavClick={handleNavClick}
      />
      <main className="flex-1 min-w-0 overflow-auto">{children}</main>
    </div>
  );
}
