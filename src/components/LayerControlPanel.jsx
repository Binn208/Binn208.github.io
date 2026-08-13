import React from 'react';
import { Layers, Eye, MapPin, Sliders, Moon, Sun, Info } from 'lucide-react';
import { PRESET_LOCATIONS } from '../utils/mapConfig';

export default function LayerControlPanel({
  layerState,
  setLayerState,
  isMetroView,
  setIsMetroView,
  onFlyToLocation
}) {
  const toggleLayer = (key) => {
    setLayerState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={`p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all ${
      isMetroView
        ? 'bg-slate-900/90 border-slate-800 text-slate-100'
        : 'bg-white/95 border-slate-200 text-slate-800'
    } max-w-xs w-full text-xs space-y-4`}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/20">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-red-500" />
          <h3 className="font-bold text-sm">Lớp bản đồ Quy hoạch</h3>
        </div>
        <button
          onClick={() => setIsMetroView(!isMetroView)}
          className={`p-1.5 rounded-lg border transition ${
            isMetroView
              ? 'bg-slate-800 border-slate-700 text-amber-400'
              : 'bg-slate-100 border-slate-200 text-slate-600'
          }`}
          title="Bật/tắt giao diện Metro Đêm"
        >
          {isMetroView ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Layer Toggles */}
      <div className="space-y-2">
        <label className="flex items-center justify-between cursor-pointer p-1.5 rounded-lg hover:bg-slate-500/10 transition">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-purple-600 inline-block shadow-xs"></span>
            <span className="font-medium">Quy hoạch chung (QHC)</span>
          </div>
          <input
            type="checkbox"
            checked={layerState.qhc}
            onChange={() => toggleLayer('qhc')}
            className="accent-purple-600 w-4 h-4 rounded-xs cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer p-1.5 rounded-lg hover:bg-slate-500/10 transition">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-orange-600 inline-block shadow-xs"></span>
            <span className="font-medium">Phân khu (QHPK)</span>
          </div>
          <input
            type="checkbox"
            checked={layerState.qhpk}
            onChange={() => toggleLayer('qhpk')}
            className="accent-orange-600 w-4 h-4 rounded-xs cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer p-1.5 rounded-lg hover:bg-slate-500/10 transition">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-emerald-600 inline-block shadow-xs"></span>
            <span className="font-medium">Metro hiện hữu / đang xây</span>
          </div>
          <input
            type="checkbox"
            checked={layerState.metro}
            onChange={() => toggleLayer('metro')}
            className="accent-emerald-600 w-4 h-4 rounded-xs cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer p-1.5 rounded-lg hover:bg-slate-500/10 transition">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-gradient-to-r from-pink-500 via-blue-500 to-emerald-500 inline-block shadow-xs"></span>
            <span className="font-medium">Tuyến Metro quy hoạch</span>
          </div>
          <input
            type="checkbox"
            checked={layerState.metrop}
            onChange={() => toggleLayer('metrop')}
            className="accent-blue-600 w-4 h-4 rounded-xs cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer p-1.5 rounded-lg hover:bg-slate-500/10 transition">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border-2 border-amber-500 inline-block shadow-xs"></span>
            <span className="font-medium">192 Vị trí ga dự kiến</span>
          </div>
          <input
            type="checkbox"
            checked={layerState.gadk}
            onChange={() => toggleLayer('gadk')}
            className="accent-amber-500 w-4 h-4 rounded-xs cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer p-1.5 rounded-lg hover:bg-slate-500/10 transition">
          <div className="flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium">Nền rõ đường / nhãn</span>
          </div>
          <input
            type="checkbox"
            checked={layerState.opacityBoost}
            onChange={() => toggleLayer('opacityBoost')}
            className="accent-slate-700 w-4 h-4 rounded-xs cursor-pointer"
          />
        </label>
      </div>

      {/* Quick Jump Shortcuts */}
      <div className="pt-2 border-t border-slate-200/20 space-y-1.5">
        <div className="flex items-center gap-1.5 text-slate-400 font-medium">
          <MapPin className="w-3 h-3 text-red-500" />
          <span>Đến nhanh địa điểm:</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {PRESET_LOCATIONS.map((loc, idx) => (
            <button
              key={idx}
              onClick={() => onFlyToLocation(loc.center, loc.zoom)}
              className={`px-2 py-1 rounded-md text-[11px] font-medium text-left truncate transition ${
                isMetroView
                  ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>
      </div>

      {/* Legend & Hint */}
      <div className="pt-2 border-t border-slate-200/20 text-[10.5px] leading-relaxed text-slate-500 space-y-1">
        <div className="flex items-center gap-1 text-slate-400 font-medium">
          <Info className="w-3 h-3 text-blue-500" />
          <span>Chú giải đường sắt:</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-0.5">
          <span className="flex items-center gap-1">
            <span className="w-3 h-0.5 bg-emerald-600 inline-block"></span> Đang chạy
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-0.5 border-b-2 border-dashed border-orange-500 inline-block"></span> Đang xây
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-0.5 border-b-2 border-dotted border-blue-500 inline-block"></span> Quy hoạch
          </span>
        </div>
      </div>

    </div>
  );
}
