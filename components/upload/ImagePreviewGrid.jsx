import React from "react";
import ImagePreviewCard from "./ImagePreviewCard.jsx";

export default function ImagePreviewGrid({ images = [], onRemove }) {
  return (
    <div className="flex sm:flex-col gap-2 overflow-x-auto h-full min-h-[5rem] sm:min-h-0">
      {images.map((img, idx) => (
        <ImagePreviewCard
          key={idx}
          src={img}
          index={idx}
          onRemove={() => onRemove(idx)}
        />
      ))}
      
      {images.length === 0 && (
        <div className="flex-1 border border-slate-200 border-dashed dark:border-slate-800 rounded-xl flex items-center justify-center text-center p-3">
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
            No sketches uploaded
          </span>
        </div>
      )}
    </div>
  );
}
