import React from "react";
import RemoveImageButton from "./RemoveImageButton.jsx";

export default function ImagePreviewCard({ src, onRemove, index }) {
  return (
    <div className="relative w-20 h-20 sm:w-full sm:h-20 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden shrink-0 group shadow-md transition-all duration-200 hover:scale-[1.02]">
      <img
        src={src}
        alt={`Product blueprint ${index + 1}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <RemoveImageButton
        onClick={onRemove}
        className="absolute top-1.5 right-1.5 opacity-80 group-hover:opacity-100 group-hover:scale-105"
      />
    </div>
  );
}
