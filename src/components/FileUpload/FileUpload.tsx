"use client";

import {
  type FC,
  useState,
  useRef,
  type DragEvent,
  type ChangeEvent,
} from "react";
import { IconUpload4 } from "nucleo-micro-bold";

export interface FileUploadProps {
  /** Whether files have been uploaded */
  uploaded?: boolean;
  /** Primary text shown in default state */
  title?: string;
  /** Secondary text shown in default state */
  subtitle?: string;
  /** Text shown in uploaded state */
  uploadedText?: string;
  /** Accepted file types (e.g. "image/*,.pdf") */
  accept?: string;
  /** Whether multiple files can be selected */
  multiple?: boolean;
  /** Called when files are selected or dropped */
  onFiles?: (files: FileList) => void;
  className?: string;
}

const FileUpload: FC<FileUploadProps> = ({
  uploaded = false,
  title = "Drag here or click to select",
  subtitle = "Images and documents up to 5MB",
  uploadedText = "Click or drag to upload more",
  accept,
  multiple = true,
  onFiles,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      onFiles?.(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFiles?.(e.target.files);
      e.target.value = "";
    }
  };

  const showHighlight = isHovered || isDragOver;

  const hiddenInput = (
    <input
      ref={inputRef}
      type="file"
      className="hidden"
      accept={accept}
      multiple={multiple}
      onChange={handleFileChange}
    />
  );

  /* ── Uploaded (compact) state ── */
  if (uploaded) {
    return (
      <div
        className={`
          flex items-center justify-center gap-1-5
          w-[330px] h-[53px] p-2
          bg-fill-levels-engraved-ss
          border-[0.5px] border-dashed rounded-xl
          ${showHighlight ? "border-border-highlight" : "border-border-medium"}
          cursor-pointer
          ${className ?? ""}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {hiddenInput}
        <span className="size-[13px] flex items-center justify-center text-text-secondary">
          <IconUpload4 size="13px" />
        </span>
        <span className="font-sans text-sm font-medium leading-single-sm tracking-sm text-text-secondary text-center whitespace-nowrap">
          {uploadedText}
        </span>
      </div>
    );
  }

  /* ── Default (empty) state ── */
  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-6
        w-[330px] h-[144px]
        bg-fill-levels-engraved-ss
        border-[0.5px] border-dashed rounded-xl
        ${showHighlight ? "border-border-highlight" : "border-border-medium"}
        cursor-pointer
        ${className ?? ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {hiddenInput}
      {/* Icon in circle */}
      <div className="flex items-center p-2-5 rounded-full bg-alpha-50">
        <span className="size-[13px] flex items-center justify-center text-text-primary">
          <IconUpload4 size="13px" />
        </span>
      </div>
      {/* Text */}
      <div className="flex flex-col gap-[7px] items-center w-[280px] text-center">
        <span className="font-sans text-sm font-medium leading-[14px] tracking-sm text-text-primary">
          {title}
        </span>
        <span className="font-sans text-sm font-normal leading-[14px] tracking-sm text-text-secondary truncate w-full">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

export default FileUpload;
