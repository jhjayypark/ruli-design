"use client";

import { type ReactNode, useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  IconFilePlus,
  IconChartColumnHorizontal,
  IconPen,
  IconBarsFilter,
  IconArrowsExpandDiagonal2,
  IconBookmark,
  IconExport,
  IconSparkle3,
  IconSparkle4,
  IconUpload,
  IconFile,
} from "nucleo-micro-bold";
import { Button } from "@/components/Button";
import GridTable from "@/components/GridTable";
import type {
  GridTableColumn,
  GridTableRowData,
} from "@/components/GridTable/GridTable";

/* ─── File type icons (from Figma) ─── */

function FileIconGDrive() {
  return (
    <div className="shrink-0 relative overflow-clip flex items-center justify-center" style={{ width: 13, height: 13 }}>
      <img alt="" src="/icons/file-gdrive.svg" style={{ width: 13, height: 11.615, display: "block" }} />
    </div>
  );
}

function FileIconDropbox() {
  return (
    <img alt="" src="/icons/file-dropbox.svg" width={13} height={13} className="shrink-0" style={{ display: "block" }} />
  );
}

function FileIconSalesforce() {
  return (
    <div className="shrink-0 relative overflow-clip flex items-center justify-center" style={{ width: 13, height: 13 }}>
      <img alt="" src="/icons/file-blue.svg" style={{ width: 13, height: 7.995, display: "block" }} />
    </div>
  );
}

const FILE_ICONS: (() => ReactNode)[] = [FileIconGDrive, FileIconDropbox, FileIconSalesforce];

/* ─── Mock data ─── */

const GRID_TITLE = "Key Terms Extraction from Licensing Agreements";

const FILE_NAMES = [
  "WebmdHealthCorp_20050908_S-1A_EX-10.7_1027007_EX-10.7_Content License Agreement.pdf",
  "WebmdHealthCorp_20050908_S-1A_EX-10.12_1027012_EX-10.12_Licensing Agreement.pdf",
  "WebmdHealthCorp_20060315_10-K_EX-10.3_1034521_EX-10.3_Master License Agreement.pdf",
  "WebmdHealthCorp_20070412_8-K_EX-10.1_1041234_EX-10.1_Software License.pdf",
  "WebmdHealthCorp_20080901_S-1_EX-10.5_1052345_EX-10.5_Technology License.pdf",
  "WebmdHealthCorp_20090218_10-Q_EX-10.8_1063456_EX-10.8_IP License Agreement.pdf",
  "WebmdHealthCorp_20100605_8-K_EX-10.2_1074567_EX-10.2_Content Syndication.pdf",
  "WebmdHealthCorp_20110322_10-K_EX-10.9_1085678_EX-10.9_Data License.pdf",
  "WebmdHealthCorp_20120714_S-1A_EX-10.4_1096789_EX-10.4_Platform License.pdf",
  "WebmdHealthCorp_20130930_10-Q_EX-10.6_1107890_EX-10.6_API License.pdf",
  "WebmdHealthCorp_20140115_8-K_EX-10.11_1118901_EX-10.11_Brand License.pdf",
  "WebmdHealthCorp_20150428_10-K_EX-10.7_1129012_EX-10.7_Distribution License.pdf",
  "WebmdHealthCorp_20160712_S-1_EX-10.3_1140123_EX-10.3_Sublicense Agreement.pdf",
  "WebmdHealthCorp_20170826_10-Q_EX-10.8_1151234_EX-10.8_Cross License.pdf",
  "WebmdHealthCorp_20180103_8-K_EX-10.2_1162345_EX-10.2_Exclusive License.pdf",
  "WebmdHealthCorp_20190519_10-K_EX-10.5_1173456_EX-10.5_Non-Exclusive License.pdf",
  "WebmdHealthCorp_20200804_S-1A_EX-10.9_1184567_EX-10.9_Royalty Agreement.pdf",
  "WebmdHealthCorp_20210117_10-Q_EX-10.4_1195678_EX-10.4_Trademark License.pdf",
  "WebmdHealthCorp_20220631_8-K_EX-10.6_1206789_EX-10.6_Patent License.pdf",
  "WebmdHealthCorp_20230915_10-K_EX-10.1_1217890_EX-10.1_Copyright License.pdf",
  "WebmdHealthCorp_20240228_S-1_EX-10.10_1228901_EX-10.10_Trade Secret License.pdf",
  "WebmdHealthCorp_20250512_10-Q_EX-10.3_1239012_EX-10.3_Commercial License.pdf",
  "WebmdHealthCorp_20050612_8-K_EX-10.7_1024501_EX-10.7_OEM License.pdf",
  "WebmdHealthCorp_20060801_10-K_EX-10.2_1035612_EX-10.2_Reseller License.pdf",
  "WebmdHealthCorp_20070920_S-1A_EX-10.8_1046723_EX-10.8_Franchise License.pdf",
  "WebmdHealthCorp_20081105_10-Q_EX-10.4_1057834_EX-10.4_White Label License.pdf",
];

const PARTIES = [
  "Emdeon Corporation, WebMD, Inc.",
  "CHINA ECONOMIC INFORMATION SERVI...",
  "Oceanic Time Warner Cable, WATCHIT...",
  "The Johns Hopkins University, Virtuoso...",
  "Supplier, Purchaser, Playboy Enterprises...",
  "eFashion Solutions, LLC, Playboy.com, In...",
  "Palmer Square Capital Management LLC...",
  "Phoenix Satellite Television Company Li...",
  "PACIFICAP ENTERTAINMENT INC, THE...",
  "Emdeon Corporation, WebMD, Inc.",
  "CHINA ECONOMIC INFORMATION SERVI...",
  "Oceanic Time Warner Cable, WATCHIT...",
  "The Johns Hopkins University, Virtuoso...",
  "Supplier, Purchaser, Playboy Enterprises...",
  "eFashion Solutions, LLC, Playboy.com, In...",
  "Palmer Square Capital Management LLC...",
  "Phoenix Satellite Television Company Li...",
  "PACIFICAP ENTERTAINMENT INC, THE...",
  "CHINA ECONOMIC INFORMATION SERVI...",
  "Oceanic Time Warner Cable, WATCHIT...",
  "The Johns Hopkins University, Virtuoso...",
  "Supplier, Purchaser, Playboy Enterprises...",
  "Emdeon Corporation, WebMD, Inc.",
  "Palmer Square Capital Management LLC...",
  "Phoenix Satellite Television Company Li...",
  "PACIFICAP ENTERTAINMENT INC, THE...",
];

const TERMS = [
  "1 month",
  "20 years",
  "4 months",
  "Until expiration of the last to expire...",
  "Not provided",
  "5 years, with automatic 3-year ren...",
  "Not provided",
  "5 years",
  "10 years",
  "1 month",
  "20 years",
  "4 months",
  "Until expiration of the last to expire...",
  "Not provided",
  "5 years, with automatic 3-year ren...",
  "Not provided",
  "5 years",
  "10 years",
  "20 years",
  "4 months",
  "Until expiration of the last to expire...",
  "Not provided",
  "1 month",
  "Not provided",
  "5 years",
  "10 years",
];

const TERMINATIONS = [
  "In addition to expiration of this Agr...",
  "8. TERMINATION 8.1 XFN may termi...",
  "In the event that Oceanic Time War...",
  "6.2 Termination by Company: Com...",
  "This Contract may not be modified...",
  "5 years, with automatic 3-year ren...",
  "10.2. Termination for Breach. Each...",
  "This Agreement shall expire if the I...",
  "This Agreement may be terminated...",
  "In addition to expiration of this Agr...",
  "8. TERMINATION 8.1 XFN may termi...",
  "In the event that Oceanic Time War...",
  "6.2 Termination by Company: Com...",
  "This Contract may not be modified...",
  "5 years, with automatic 3-year ren...",
  "10.2. Termination for Breach. Each...",
  "This Agreement shall expire if the I...",
  "This Agreement may be terminated...",
  "8. TERMINATION 8.1 XFN may termi...",
  "In the event that Oceanic Time War...",
  "6.2 Termination by Company: Com...",
  "This Contract may not be modified...",
  "In addition to expiration of this Agr...",
  "10.2. Termination for Breach. Each...",
  "This Agreement shall expire if the I...",
  "This Agreement may be terminated...",
];

const GOVERNING_LAWS = [
  "New York",
  "Honk Kong",
  "Governing law not indicated",
  "Maryland",
  "Governing law not indicated",
  "Illinois",
  "New York",
  "China",
  "California",
  "New York",
  "Honk Kong",
  "Governing law not indicated",
  "Maryland",
  "Governing law not indicated",
  "Illinois",
  "New York",
  "China",
  "California",
  "Honk Kong",
  "Governing law not indicated",
  "Maryland",
  "Governing law not indicated",
  "New York",
  "New York",
  "China",
  "California",
];

/* ─── Column definitions ─── */

const COLUMNS: GridTableColumn[] = [
  { key: "file", label: "File", width: 224, filterable: false },
  { key: "parties", label: "Parties Involved", width: 288, filterable: false },
  { key: "term", label: "Term duration", width: 256, filterable: false },
  { key: "termination", label: "Termination Conditions", width: 256, filterable: false },
  { key: "governing", label: "Governing Law", width: 256, filterable: false },
];

/* ─── Row data ─── */

const ROWS: GridTableRowData[] = FILE_NAMES.map((name, i) => ({
  file: {
    label: name.length > 25 ? name.slice(0, 22) + "..." : name,
    checkbox: true,
    leadingElement: FILE_ICONS[i % FILE_ICONS.length](),
  },
  parties: { label: PARTIES[i] },
  term: { label: TERMS[i] },
  termination: { label: TERMINATIONS[i] },
  governing: { label: GOVERNING_LAWS[i] },
}));

/* ─── Page component ─── */

export default function GridDetailPage() {
  const router = useRouter();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  const [hasDocuments, setHasDocuments] = useState(false);

  useEffect(() => {
    const el = toolbarRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setCompact(entry.contentRect.width < 680);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="flex flex-col h-full p-6 gap-8">
      {/* ─── Header area ─── */}
      <div className="flex flex-col gap-4 shrink-0">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="font-sans text-md font-medium leading-single-md tracking-md text-text-pale cursor-pointer hover:text-text-secondary bg-transparent border-none p-0"
            onClick={() => router.push("/grids")}
          >
            Grids
          </button>
          <span className="font-sans text-md font-medium leading-single-md tracking-md text-text-pale">/</span>
          <div className="flex items-center gap-1">
            <span className="font-sans text-md font-medium leading-single-md tracking-md text-text-primary">
              {GRID_TITLE}
            </span>
            <button
              type="button"
              className="flex items-center justify-center rounded-md cursor-pointer hover:bg-fill-levels-natural-sm"
              style={{ width: 25, height: 25 }}
            >
              <span className="flex items-center justify-center text-text-pale" style={{ width: 13, height: 13 }}>
                <IconPen size="13px" />
              </span>
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div ref={toolbarRef} className="flex items-center gap-1 overflow-x-auto">
          {/* Primary actions */}
          <div className="flex items-center gap-2-5 shrink-0">
            <Button variant="outline" leftIcon={<IconFilePlus size="13px" />} shortcut={compact ? undefined : hasDocuments ? "29" : "0"}>
              {compact ? undefined : "Add documents"}
            </Button>
            <Button variant="outline" leftIcon={<IconChartColumnHorizontal size="13px" />} shortcut={compact ? undefined : "8"}>
              {compact ? undefined : "Add column"}
            </Button>
            <Button variant="outline" leftIcon={<IconPen size="13px" />}>
              {compact ? undefined : "Edit columns"}
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center shrink-0" style={{ width: 25, height: 25 }}>
            <div
              className="rounded-full"
              style={{
                width: 1,
                height: 10,
                backgroundColor: "var(--color-border-medium, #d6d4d2)",
              }}
            />
          </div>

          {/* Secondary actions */}
          <div className="flex items-center gap-2-5 shrink-0">
            <Button variant="outline" leftIcon={<IconBarsFilter size="13px" />}>
              {compact ? undefined : "Filters"}
            </Button>
            <Button variant="outline" leftIcon={<IconArrowsExpandDiagonal2 size="13px" />}>
              {compact ? undefined : "Expand"}
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center shrink-0" style={{ width: 25, height: 25 }}>
            <div
              className="rounded-full"
              style={{
                width: 1,
                height: 10,
                backgroundColor: "var(--color-border-medium, #d6d4d2)",
              }}
            />
          </div>

          {/* Extract */}
          <div className="flex items-center shrink-0">
            <Button variant="bold" intent="brand" leftIcon={<IconSparkle4 size="13px" />}>
              {compact ? undefined : "Extract"}
            </Button>
          </div>

          {/* Spacer */}
          <div className="flex-1 min-w-2-5" />

          {/* Right group */}
          <div className="flex items-center gap-2-5 shrink-0">
            <Button variant="outline" leftIcon={<IconBookmark size="13px" />} disabled={!hasDocuments}>
              {compact ? undefined : "Save"}
            </Button>
            <Button variant="outline" leftIcon={<IconExport size="13px" />} disabled={!hasDocuments}>
              {compact ? undefined : "Export"}
            </Button>
            <Button variant="bold" leftIcon={<IconSparkle3 size="13px" />}>
              {compact ? undefined : "Ruli Analyst"}
            </Button>
          </div>
        </div>
      </div>

      {/* ─── Data table ─── */}
      <div className="flex-1 min-h-0 flex flex-col">
        {/* Column headers (always visible) */}
        <GridTable
          columns={COLUMNS}
          rows={hasDocuments ? ROWS : []}
          headerCheckbox
          showFillerColumn
          className={hasDocuments ? "h-full" : undefined}
          style={!hasDocuments ? { borderBottom: "none", borderRadius: "14px 14px 0 0" } : undefined}
        />

        {/* Empty state */}
        {!hasDocuments && (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-6"
            style={{
              border: "0.5px solid var(--color-border-light, #e6e4e1)",
              borderTop: "none",
              borderRadius: "0 0 14px 14px",
            }}
          >
            <div
              className="flex items-center justify-center rounded-full bg-fill-levels-natural-lg"
              style={{ width: 29, height: 29 }}
            >
              <IconFile size="13px" className="text-text-pale" />
            </div>
            <div className="flex flex-col items-center gap-3" style={{ width: 244 }}>
              <p className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-primary text-center w-full">
                No documents found
              </p>
              <p className="font-sans text-sm font-normal tracking-sm text-text-secondary text-center" style={{ lineHeight: "21.5px" }}>
                Start by adding one and Ruli will extract info for the columns above
              </p>
            </div>
            <Button variant="bold" leftIcon={<IconUpload size="13px" />} onClick={() => setHasDocuments(true)}>
              Upload documents
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
