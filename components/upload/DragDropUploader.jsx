"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import useQuotation from "../../hooks/useQuotation.js";
import ImagePreviewGrid from "./ImagePreviewGrid.jsx";

export default function DragDropUploader() {
  const { formState, updateRootField, triggerAlert } = useQuotation();
  const [isDragActive, setIsDragActive] = useState(false);
  const images = formState.images || [];

  const processFiles = (files) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith("image/"));
    
    if (validFiles.length === 0) {
      triggerAlert("error", "Please upload image files only (JPG, PNG).");
      return;
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // limit images to 3 max
        updateRootField("images", [...images, reader.result].slice(0, 3));
      };
      reader.readAsDataURL(file);
    });

    triggerAlert("success", `Uploaded ${validFiles.length} image(s).`);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    updateRootField("images", updated);
    triggerAlert("info", "Image deleted.");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`sm:col-span-2 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer relative transition-all ${
          isDragActive
            ? "border-amber-500 bg-amber-500/5"
            : "border-slate-200 hover:border-amber-500/40 bg-slate-50 dark:border-slate-800 dark:hover:border-amber-500/40 dark:bg-slate-950/45"
        }`}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
        />
        <Upload className="w-8 h-8 text-slate-400 mb-2" />
        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
          Drag & Drop drawings here, or tap to choose
        </p>
        <p className="text-[9px] text-slate-500 mt-1 font-semibold uppercase tracking-wider">
          Supports JPEG, PNG reference graphics (Max 3 files)
        </p>
      </div>

      {/* Previews collection */}
      <div className="flex flex-col justify-center">
        <ImagePreviewGrid images={images} onRemove={handleRemoveImage} />
      </div>
    </div>
  );
}
