import React from "react";
import { Trash2 } from "lucide-react";

export default function RemoveImageButton({ onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`p-1.5 rounded-full bg-slate-900/80 hover:bg-rose-600 text-slate-200 text-xs shadow-md backdrop-blur-sm transition-all focus:outline-none ${className}`}
      title="Remove Image"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}
