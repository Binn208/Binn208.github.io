import React from 'react';
import { X, Layers, MapPin, Tag, Database } from 'lucide-react';
import { GRP_INFO, classifyLandFunction, statusOf } from '../utils/mapConfig';

export default function FeatureCard({ feature, onClose, isMetroView }) {
  if (!feature) return null;

  const { name, grp, fc } = feature.properties || {};
  const group = GRP_INFO[grp] || { name: grp || 'Chưa phân nhóm', color: '#64748b', note: '' };
  const [icon, category, categoryDesc] = classifyLandFunction(name);
  const status = statusOf(name);

  return (
    <div
      className={`p-4 rounded-2xl shadow-2xl border backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-200 ${
        isMetroView
          ? 'bg-slate-900/95 border-slate-800 text-slate-100'
          : 'bg-white/95 border-slate-200 text-slate-800'
      } max-w-sm w-full text-xs space-y-3 relative`}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Top badges */}
      <div className="flex items-center gap-2 pr-6 flex-wrap">
        <span
          className="px-2 py-0.5 rounded-full text-[10.5px] font-bold text-white shadow-xs"
          style={{ backgroundColor: group.color }}
        >
          {group.name}
        </span>
        {group.note && <span className="text-[11px] text-slate-400">{group.note}</span>}
      </div>

      {/* Land Name & Color Swatch */}
      <div className="flex items-center gap-2.5 pt-1">
        <span
          className="w-4 h-4 rounded-md border border-black/10 flex-none shadow-xs"
          style={{ backgroundColor: fc || '#cccccc' }}
        />
        <h4 className="font-bold text-sm leading-snug">
          {name || '(Chưa gán tên loại đất)'}
        </h4>
      </div>

      {/* Classification details */}
      <div className="p-2.5 rounded-xl bg-slate-500/10 space-y-1.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-semibold">
            <span>{icon}</span>
            <span>Nhóm: {category}</span>
          </span>
          {status && (
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: status[1] }}
            >
              {status[0]}
            </span>
          )}
        </div>
        <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed">
          {categoryDesc}
        </p>
      </div>

      {/* Source Footer */}
      <div className="pt-2 border-t border-slate-200/20 text-[10.5px] text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Database className="w-3 h-3 text-red-500" />
          <span>Cổng Quy hoạch TP Hà Nội</span>
        </span>
        <span>Vector Tiles PBF</span>
      </div>
    </div>
  );
}
